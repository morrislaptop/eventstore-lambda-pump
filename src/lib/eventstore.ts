import { createConnection, ConnectionSettings } from 'node-eventstore-client'


export function createConnectionForUrl(url: string) {
  const parts = new URL(url)

  const settings: ConnectionSettings = {
    useSslConnection: parts.protocol === 'tls:',
    defaultUserCredentials: {
      username: parts.username,
      password: parts.password
    }
  }

  return createConnection(settings, 'tcp://' + parts.host)
}

export const eventstore = createConnectionForUrl(process.env.EVENTSTORE_TCP_URL || 'tcp://admin:changeit@127.0.0.1:1113')
