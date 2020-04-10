eventstore-lambda-pump
======================

Reads events from streams and triggers Lambda functions. Automatically sets up persistent subscriptions.

# Configuration

See the `.env.example` file for the required environment variables to be set. The streams to listen to are configured in a YAML file
located in `~/.config/eventstore-lambda-pump/config.yaml`

Sample config:

```yaml
streams:
  - stream: pump # name of the stream
    type: persistent # type of connection you want - persistent or volatile
    function: vapor-quote-api-production # name of the lambda function you want to execute
    settings: # Optional settings to configure a persistent subscription (https://eventstore.com/docs/http-api/competing-consumers/index.html)
      startFrom: 500
```

# Installation

```sh-session
$ git clone git@github.com:morrislaptop/eventstore-lambda-pump.git
$ cd eventstore-lambda-pump
$ yarn
```

> This will be as simple as `npx eventstore-lambda-pump pump in the future`

# Usage

## create

    ./bin/run create

This will delete and create the persistent subscriptions.

## pump

    ./bin/run pump

This will connect to persistent and volatile subscriptions to streams and trigger Lambda functions accordingly.
