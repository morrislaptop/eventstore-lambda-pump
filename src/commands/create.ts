require('reflect-metadata')

import {Command, flags} from '@oclif/command'
import { eventstore } from '../lib/eventstore'
import { load, Stream } from '../lib/config'
import { PersistentSubscriptionSettings, SystemConsumerStrategies } from 'node-eventstore-client'

export default class Create extends Command
{
  static description = 'Create the persistent subscriptions from config. Resets any existing subscriptions.'

  async run()
  {
    try {
      await eventstore.connect()
      const config = load(this.config.configDir)
      await Promise.all(config.streams.filter(s => s.type === 'persistent').map(stream => this.create(stream)))
    }
    finally {
      eventstore.close()
    }
  }

  async create(stream: Stream)
  {
    try {
      await eventstore.deletePersistentSubscription(stream.stream, stream.function)
      this.log(`Deleted existing ${stream.stream}/${stream.function} subscription`)
    }
    catch (err) {
      // subscription doesn't exist.
    }

    const settings = Object.assign(new PersistentSubscriptionSettings(
      false, // resolveLinkTos: boolean,
      0, // startFrom: Long | number,
      false, // extraStatistics: boolean,
      10000, // messageTimeout: number,
      10, // maxRetryCount: number,
      500, // liveBufferSize: number,
      20, // readBatchSize: number,
      500, // historyBufferSize: number,
      1000, // checkPointAfter: number,
      10, // minCheckPointCount: number,
      500, // maxCheckPointCount: number,
      10, // maxSubscriberCount: number,
      SystemConsumerStrategies.RoundRobin // namedConsumerStrategy: string
    ), stream.settings)

    await eventstore.createPersistentSubscription(stream.stream, stream.function, settings)

    this.log(`Created ${stream.stream}/${stream.function} subscription`)
  }
}
