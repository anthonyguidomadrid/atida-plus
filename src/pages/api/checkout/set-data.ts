import type { NextApiRequest, NextApiResponse } from 'next'

import {
  getGuestJWTName,
  getJWTName
} from '~domains/account/helpers/get-token-name'
import { setCheckoutData } from '~domains/checkout/services/set-checkout-data'
import { getDefaultLocale } from '~domains/translated-routes'
import {
  handleApiError,
  handleCheckoutErrorCode,
  isApiError,
  handleUnknownError
} from '~helpers/error'
import { decodeToken } from '~helpers/server-only/decode-token'
import { checkDisabledProducts } from '~helpers/server-only/checkDisabledProducts'
import { loadFeatureFlags } from '~helpers/server-only/featureFlagClient'
import { FeatureFlag } from '~config/constants/feature-flags'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const locale = req.headers['accept-language'] ?? getDefaultLocale()
  const featureFlags = await loadFeatureFlags(locale, [
    FeatureFlag.ACCOUNT_PHONE_TO_CUSTOMER_LEVEL
  ])
  const isPhoneNumberAgainstCustomerEnabled =
    featureFlags?.[FeatureFlag.ACCOUNT_PHONE_TO_CUSTOMER_LEVEL]

  try {
    const guestToken = req.cookies[getGuestJWTName()]
    const customerToken = req.cookies[getJWTName()]
    const data = req.body

    /* 
      PLUS-6195 - When FeatureFlag.ACCOUNT_PHONE_TO_CUSTOMER_LEVEL is removed,
      this condition and logic in it have to be removed as well
    */
    if (
      isPhoneNumberAgainstCustomerEnabled &&
      customerToken &&
      data?.customer &&
      'phoneNumber' in data?.customer &&
      !data?.customer?.phoneNumber
    ) {
      const missingPhoneErrMessage = 'checkout.set-checkout-data.error.phone'
      const missingPhoneError = new Error(missingPhoneErrMessage)
      Object.assign(missingPhoneError, {
        response: {
          status: 422,
          data: {
            errors: [
              {
                detail: missingPhoneErrMessage,
                code: '901',
                prefix: 'checkout.set-checkout-data'
              }
            ]
          }
        }
      })

      throw missingPhoneError
    }
    const token = customerToken ?? guestToken
    const anonymousCustomerUniqueId = req.headers[
      'x-anonymous-customer-unique-id'
    ] as string

    const result = await setCheckoutData(locale.toString(), data, {
      token
    })

    if (result.basket) {
      result.basket = await checkDisabledProducts(
        result.basket,
        locale,
        anonymousCustomerUniqueId,
        String(token)
      )
    }

    res.statusCode = 200
    res.json({
      ...result,
      basket: {
        ...result.basket,
        anonymousId: guestToken ? decodeToken(guestToken)?.anonymousId : ''
      }
    })
  } catch (error) {
    if (isApiError(error)) {
      let errorMessages: string[]
      switch (error?.response?.status) {
        case 422:
          errorMessages = handleCheckoutErrorCode(
            error,
            'checkout.set-checkout-data'
          )
          break
        default:
          errorMessages = ['checkout.set-checkout-data.unexpected-error']
          break
      }

      if (
        errorMessages.includes(
          'checkout.set-checkout-data.error.shipping-address'
        ) &&
        errorMessages.includes(
          'checkout.set-checkout-data.error.billing-address'
        )
      ) {
        errorMessages = [
          'checkout.set-checkout-data.error.shipping-billing-addresses'
        ]
      }

      const errorMessage =
        errorMessages.find(
          message => message === 'checkout.set-checkout-data.cart-not-found'
        ) ?? errorMessages[0]

      handleApiError(res, error, errorMessage, {
        allErrors: errorMessages
      })
    } else {
      handleUnknownError(
        req,
        res,
        error,
        'checkout.set-checkout-data.unexpected-error'
      )
    }
  }
}
