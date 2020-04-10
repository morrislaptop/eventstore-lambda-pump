require('reflect-metadata')

import { Command } from '@oclif/command'
import { eventstore } from '../lib/eventstore'
import { Lambda } from 'aws-sdk'
import { load, Stream } from '../lib/config'
import { ResolvedEvent, EventStorePersistentSubscription, PersistentSubscriptionNakEventAction } from 'node-eventstore-client'

export default class Pump extends Command
{
  static description = 'Reads events from streams and triggers Lambda functions.'

  lambda = new Lambda()

  async run() {
    try {
      await eventstore.connect()
      const config = load(this.config.configDir)
      await Promise.all(config.streams.map(stream => this.connect(stream)))
      console.log(`Listening to ${config.streams.length} streams`)
    }
    catch (err) {
      eventstore.close()
      throw err
    }
  }

  async connect(stream: Stream) {
    if (stream.type === 'persistent') {
      return eventstore.connectToPersistentSubscription(stream.stream, stream.function, (sub, event) => this.onPersistentEventAppeared(stream, sub, event))
    }
    else if (stream.type === 'volatile') {
      return eventstore.subscribeToStream(stream.stream, false, (sub, event) => this.onVolatileEventAppeared(stream, event))
    }
  }

  async onPersistentEventAppeared(stream: Stream, subscription: EventStorePersistentSubscription, event: ResolvedEvent) {
    try {
      await this.invoke(stream, event)
    }
    catch (err) {
      subscription.fail(event, PersistentSubscriptionNakEventAction.Unknown, err.toString())
    }
  }

  async onVolatileEventAppeared(stream: Stream, event: ResolvedEvent) {
    try {
      await this.invoke(stream, event)
    }
    catch (err) {
      // ?
    }
  }

  async invoke(stream: Stream, event: ResolvedEvent) {
    try {
      console.log(`Received ${event.event?.eventType} ${event.originalStreamId}/${event.originalEventNumber}`)
      const invoked = await this.lambda.invoke({ FunctionName: stream.function, Payload: event.event?.data}).promise()
      console.log(`Sent ${event.event?.eventType} ${event.originalStreamId}/${event.originalEventNumber} to ${stream.function}: ${invoked.StatusCode}`)
    }
    catch (err) {
      this.warn(err)
      throw err
    }
  }
}
