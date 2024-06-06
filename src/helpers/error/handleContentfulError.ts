import { NextApiRequest, NextApiResponse } from 'next'

import { hasOwnProperty, logger } from '~helpers'
import { contentfulErrorToStatusCode } from '~config/contentful-errors'
import { ContentfulError } from '~helpers/error'

export const isContentfulError = (error: unknown): error is ContentfulError =>
  typeof error === 'object' &&
  error !== null &&
  hasOwnProperty(error, 'sys') &&
  hasOwnProperty(error, 'details')

export const handleContentfulError = (
  req: NextApiRequest,
  res: NextApiResponse,
  error: ContentfulError
): void => {
  const { id, message, type } = error.sys as Record<string, string | string[]>

  res.statusCode =
    contentfulErrorToStatusCode[id as keyof typeof contentfulErrorToStatusCode]
  logger.error({
    request: req.url,
    source: 'contentful',
    name: id,
    message,
    details: (error.details as Record<string, string | string[]>)?.errors
  })
  res.json({ type, name: id })
}
