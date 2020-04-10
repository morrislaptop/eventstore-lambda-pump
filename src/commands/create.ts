import {Command, flags} from '@oclif/command'
import { eventstore } from '../lib/eventstore'
import { load, Stream } from '../lib/config'
import { PersistentSubscriptionSettings } from 'node-eventstore-client'

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

    const settings = Object.assign(PersistentSubscriptionSettings.create(), stream.settings)

    await eventstore.createPersistentSubscription(stream.stream, stream.function, settings)

    this.log(`Created ${stream.stream}/${stream.function} subscription`)
  }
}
