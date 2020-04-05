require('dotenv').config()

import { eventstore } from './lib/eventstore'
import aws from 'aws-sdk'

async function main() {
  await eventstore.connect()

  const stream = await eventstore.readStreamEventsForward('quotes-data-engineering', 0, 1)
  const lambda = new aws.Lambda()
  
  for (const event of stream.events) {
    const response = await lambda.invoke({
      FunctionName: 'vapor-quote-api-production-cli',
      Payload: event.event?.data
    }).promise()

    console.log(response)
  }

  eventstore.close()
}

main()