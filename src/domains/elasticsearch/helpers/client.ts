import { ApiError, Client, RequestEvent } from '@elastic/elasticsearch'
import getConfig from 'next/config'
import { logger } from '~helpers'
import { isElasticsearchResponseError } from './error-handler'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

const logError = (
  error: ApiError,
  response: RequestEvent,
  timeInMs?: number
) => {
  const common = {
    url: response.meta.connection.url.href,
    response_code: response.statusCode,
    request_id: response.meta.request.id,
    time_in_ms: timeInMs
  }

  if (isElasticsearchResponseError(error)) {
    if (error.meta.body?.found === false) {
      logger.info({
        ...common,
        name: error.meta.meta.name,
        message: error.message
      })
    } else {
      logger.error({
        ...common,
        name: error.meta.meta.name,
        message: error.message
      })
    }
  } else {
    logger.error({
      ...common,
      name: error.name,
      message: JSON.stringify(error.message)
    })
  }
}

let client: Client

export const createElasticSearchClient = (): Client => {
  const { serverRuntimeConfig } = getConfig()

  if (!client) {
    client = new Client({
      node: serverRuntimeConfig.elasticSearch.host,
      auth: {
        username: serverRuntimeConfig.elasticSearch.username,
        password: serverRuntimeConfig.elasticSearch.password
      }
    })

    client.on('request', (error, request) => {
      request.meta.request.options.context = {
        ...((request.meta.request.options.context as Record<string, unknown>) ??
          {}),
        start: new Date().getTime()
      }

      if (error) {
        logError(error, request.meta.request.id)
      } else {
        logger.info(
          { request_id: request.meta.request.id.toString() },
          'sending Elasticsearch request'
        )
      }
    })

    client.on('response', (error, response) => {
      const start = (response.meta.request.options.context as Record<
        string,
        unknown
      >)?.start as number
      const now = new Date().getTime()
      const timeInMs = start ? now - start : undefined

      if (error) {
        logError(error, response, timeInMs)
      } else {
        logger.info(
          {
            url: response.meta.connection.url.href,
            response_code: response.statusCode,
            request_id: response.meta.request.id.toString(),
            time_in_ms: timeInMs
          },
          'received Elasticsearch response'
        )
      }
    })
  }

  return client
}

export const getElasticSearchProductIndex = (locale: string): string => {
  const { serverRuntimeConfig } = getConfig()
  return serverRuntimeConfig.elasticSearch.indexes.product[locale]
}

export const getElasticSearchUrlMapIndex = (
  locale: string | undefined
): string => {
  const { serverRuntimeConfig } = getConfig()
  return serverRuntimeConfig.elasticSearch.indexes.urlMap[locale as string]
}
