import type { NextApiResponse } from 'next'
import { hasOwnProperty } from '~helpers'
import { ApiError, ApiResponse } from '~helpers/error'
import { TranslationKeys } from '~config/constants/translation-keys'

/**
 * This is deemed a spryker error purely because ES and Contentful do not match this condition
 */
export const isApiError = (error: unknown): error is ApiError<ApiResponse> =>
  typeof error === 'object' && hasOwnProperty(error, 'response')

export const handleApiError = (
  res: NextApiResponse,
  error: ApiError<ApiResponse>,
  message: string,
  additional: Record<string, unknown> = {}
): void => {
  res.statusCode = error?.response?.status ?? 500
  res.json({
    type: 'Error',
    name: 'ApiError',
    message,
    details: error?.response?.data?.errors?.[0],
    ...additional
  })
}

export const handleLoginErrorCode = (error: ApiError<ApiResponse>): string => {
  const statusCode = error?.response?.status ?? 500
  let message

  switch (statusCode) {
    case 429:
      message = TranslationKeys.Login.AccountLockout.content
      break
    default:
      message = TranslationKeys.Login.Default.content
      break
  }

  return message
}

export const handleCheckoutErrorCode = (
  error: ApiError<ApiResponse>,
  prefix: string
): string[] => {
  return (
    error.response.data.errors?.map(error => {
      switch (error.code) {
        case '1101':
          return handle1101CheckoutErrorDetail(error.detail ?? '', prefix)
        case '1102':
          return `${prefix}.order-not-placed`
        case '1103':
          return `${prefix}.cart-not-found`
        case '1104':
          return `${prefix}.cart-is-empty`
        case '1105':
          return `${prefix}.user-not-specified`
        case '1106':
          return `${prefix}.unable-to-delete-cart`
        case '1107':
          return `${prefix}.multiple-payments-not-allowed`
        case '1108':
          return `${prefix}.invalid-payment`
        case '1109':
          return `${prefix}.unavailable-product`
        case '901':
          return handle901CheckoutErrorDetail(error.detail ?? '', prefix)
        case '801':
          return `${prefix}.order-not-found`
        case '200':
          return `${prefix}.token-already-in-cart`
        case '201':
          return `${prefix}.not-token`
        default:
          return `${prefix}.unexpected-error`
      }
    }) ?? []
  )
}

export const handleBasketErrorCode = (
  error: ApiError<ApiResponse>,
  prefix: string
): string[] => {
  return (
    error.response.data.errors?.map(error => {
      switch (error.code) {
        case '1109':
          return `${prefix}.unavailable-product`
        default:
          return `${prefix}.unexpected-error`
      }
    }) ?? []
  )
}

export const handle901CheckoutErrorDetail = (
  errorDetail: string,
  prefix: string
): string => {
  if (errorDetail.includes('phone')) {
    return `${prefix}.error.phone`
  }
  if (errorDetail.includes('shippingAddress')) {
    return `${prefix}.error.shipping-address`
  }
  if (errorDetail.includes('billingAddress')) {
    return `${prefix}.error.billing-address`
  }
  return `${prefix}.unexpected-error`
}

export const handle1101CheckoutErrorDetail = (
  errorDetail: string,
  prefix: string
): string => {
  // remove this first condition once PLUS-4903 has reached PROD and FF is enabled
  if (errorDetail.includes('discount.voucher_not_allowed_for_guest')) {
    const voucherCode = errorDetail.replace(
      'discount.voucher_not_allowed_for_guest:',
      ''
    )
    return `${prefix}.voucher-not-allowed.${voucherCode}`
  } else if (
    errorDetail.includes('discount.voucher_code.customer.already_used')
  ) {
    const voucherCode = errorDetail.replace(
      'discount.voucher_code.customer.already_used:',
      ''
    )
    return `${prefix}.voucher-not-allowed.${voucherCode}`
  }
  return `${prefix}.invalid-data`
}
