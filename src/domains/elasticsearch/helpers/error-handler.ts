import type { ResponseError } from '@elastic/elasticsearch/lib/errors'
import type { NextApiResponse } from 'next'
import { hasOwnProperty } from '~helpers'

export const isElasticsearchResponseError = (
  error: unknown
): error is ResponseError =>
  typeof error === 'object' && hasOwnProperty(error, 'meta')

export const handleElasticsearchError = (
  res: NextApiResponse,
  error: ResponseError,
  message: string
): void => {
  res.statusCode = error.meta.statusCode ?? 500
  res.json({
    type: 'Error',
    name: 'ElasticSearchError',
    message
  })
}
