eventstore-lambda-pump
======================

Reads events from streams and triggers Lambda functions. Automatically sets up persistent subscriptions.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/eventstore-lambda-pump.svg)](https://npmjs.org/package/eventstore-lambda-pump)
[![Downloads/week](https://img.shields.io/npm/dw/eventstore-lambda-pump.svg)](https://npmjs.org/package/eventstore-lambda-pump)
[![License](https://img.shields.io/npm/l/eventstore-lambda-pump.svg)](https://github.com/morrislaptop/eventstore-lambda-pump/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g eventstore-lambda-pump
$ eventstore-lambda-pump COMMAND
running command...
$ eventstore-lambda-pump (-v|--version|version)
eventstore-lambda-pump/0.0.0 darwin-x64 node-v13.12.0
$ eventstore-lambda-pump --help [COMMAND]
USAGE
  $ eventstore-lambda-pump COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`eventstore-lambda-pump create [FILE]`](#eventstore-lambda-pump-create-file)
* [`eventstore-lambda-pump help [COMMAND]`](#eventstore-lambda-pump-help-command)

## `eventstore-lambda-pump create [FILE]`

describe the command here

```
USAGE
  $ eventstore-lambda-pump create [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/create.ts](https://github.com/morrislaptop/eventstore-lambda-pump/blob/v0.0.0/src/commands/create.ts)_

## `eventstore-lambda-pump help [COMMAND]`

display help for eventstore-lambda-pump

```
USAGE
  $ eventstore-lambda-pump help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_
<!-- commandsstop -->
