import { Type, Expose } from "class-transformer"
import { safeLoad } from 'js-yaml'
import * as fs from 'fs'
import * as path from 'path'
import { plainToClass } from 'class-transformer'
import { PersistentSubscriptionSettings } from 'node-eventstore-client'

export class Stream
{
  stream: string
  type: 'volatile' | 'persistent'
  function: string
  settings: PersistentSubscriptionSettings = {}
}

export class Config
{
  @Type(() => Stream)
  streams: Stream[]
}

export function load(configDir: string) {
  const data = safeLoad(fs.readFileSync(path.join(configDir, 'config.yaml'), 'utf8'))
  const config = plainToClass(Config, data)

  return config
}
