import type { NextApiRequest, NextApiResponse } from 'next'
import { createDeviceData } from '~domains/checkout/services/create-device-data'
import { getGuestJWTName, getJWTName } from '~domains/account'
import { handleApiError, isApiError, handleUnknownError } from '~helpers/error'
import { getIPAddressString } from '~helpers/server-only/getIPAddressString'
import { getDefaultLocale } from '~domains/translated-routes'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const locale = req.headers['accept-language'] ?? getDefaultLocale()
    const token = req.cookies[getJWTName()] ?? req.cookies[getGuestJWTName()]
    const data = req.body
    const ipAddressHeader = req.headers['cloudfront-viewer-address']
    const ipAddress = getIPAddressString(ipAddressHeader)

    const result = await createDeviceData(
      locale,
      {
        ...data,
        ip_address: ipAddress
      },
      String(token)
    )
    res.statusCode = 200
    res.json(result)
  } catch (error) {
    isApiError(error)
      ? handleApiError(
          res,
          error,
          'checkout.create-device-data.unexpected-error'
        )
      : handleUnknownError(
          req,
          res,
          error,
          'checkout.create-device-data.unexpected-error'
        )
  }
}
