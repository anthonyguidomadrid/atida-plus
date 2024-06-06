import { NextApiRequest, NextApiResponse } from 'next'

import { getErrorMessage, getErrorStack, getErrorStatus } from '~helpers/error'
import { logger, removeUndefinedPropertiesFromObject } from '~helpers'

export const handleUnknownError = (
  req: NextApiRequest,
  res: NextApiResponse,
  error: unknown,
  message?: string,
  additional: Record<string, unknown> = {}
): void => {
  res.statusCode = getErrorStatus(error) || 500
  logger.error({
    request: req.url,
    name: 'UnknownError',
    message: message ?? getErrorMessage(error),
    stack: getErrorStack(error)
  })
  res.json(
    removeUndefinedPropertiesFromObject({
      type: 'Error',
      name: 'UnknownError',
      message,
      ...additional
    })
  )
}
