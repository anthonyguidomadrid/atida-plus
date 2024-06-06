import { Object } from 'globalthis/implementation'
import type { NextApiRequest, NextApiResponse } from 'next'

import { I18nNamespace } from '~config/constants/i18n-namespaces'
import { getDefaultLocale } from '~domains/translated-routes'
import { fetchTranslations } from '~domains/translations/services/fetch-translations'
import { logger } from '~helpers'
import {
  handleContentfulError,
  isContentfulError,
  handleUnknownError
} from '~helpers/error'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { namespace } = req.query
  const locale = req.headers['accept-language'] ?? getDefaultLocale()

  if (!Object.values(I18nNamespace).includes(namespace as I18nNamespace)) {
    res.statusCode = 422
    logger.error({
      request: req.url,
      name: 'invalid_namespace',
      message: `Invalid namespace "${namespace}" provided for fetching translations`
    })
    res.json({ type: 'Error', name: 'InvalidNamespace' })
  }

  try {
    const translations = await fetchTranslations(
      locale.toString(),
      String(namespace) as I18nNamespace
    )
    res.statusCode = 200
    res.json(translations)
  } catch (error) {
    isContentfulError(error)
      ? handleContentfulError(req, res, error)
      : handleUnknownError(req, res, error, 'translations.unexpected-error')
  }
}
