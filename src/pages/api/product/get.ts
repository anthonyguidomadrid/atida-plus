import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchProduct } from '~domains/product/services/fetch-product'
import {
  handleElasticsearchError,
  isElasticsearchResponseError
} from '~domains/elasticsearch'
import { getDefaultLocale } from '~domains/translated-routes'
import { handleUnknownError } from '~helpers/error'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const locale = req.headers['accept-language'] ?? getDefaultLocale()
  const sku = req.query.sku as string
  const [channel, channelSku] = (
    (req.query.sessionChannel as string) ?? ','
  ).split(',')

  const data = {
    sku,
    sessionChannel: { channel, sku: channelSku }
  }

  try {
    const result = await fetchProduct(locale.toString(), data)
    res.statusCode = 200
    res.json(result)
  } catch (error) {
    isElasticsearchResponseError(error)
      ? handleElasticsearchError(
          res,
          error,
          'product.get-product.unexpected-error'
        )
      : handleUnknownError(req, res, error)
  }
}
