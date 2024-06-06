import pino, { LogFn } from 'pino'
import getConfig from 'next/config'
import NewRelic from 'newrelic'

const config = getConfig()

declare global {
  interface Window {
    newrelic: typeof NewRelic
  }
}

export const logger = pino({
  level: config?.publicRuntimeConfig?.logLevel || 'info',
  base: null,
  timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`,
  messageKey: 'message',
  formatters: {
    level: (label): { level: string } => ({ level: label })
  },
  browser: {
    write: {
      error: function (o) {
        const { message, name, msg } = o as LogFn & {
          msg: string
          message: string
        }
        if (name && message && msg) {
          window?.newrelic?.noticeError({ message, name }, JSON.parse(msg))
        } else {
          window?.newrelic?.noticeError({ ...o, name: msg, message: msg })
        }
      }
    }
  }
})
