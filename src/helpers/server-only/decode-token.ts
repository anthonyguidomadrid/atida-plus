import jwtDecode from 'jwt-decode'
import {
  CustomerDecodedJWT,
  CustomerJWT,
  CustomerJWTSub
} from '~domains/account'
import { removeUndefinedPropertiesFromObject } from '~helpers/removeUndefinedPropertiesFromObject'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const decodeToken = (token: string): CustomerDecodedJWT => {
  const decodedToken = jwtDecode<CustomerJWT>(token)
  const customerDetails: CustomerJWTSub = JSON.parse(decodedToken?.sub ?? '{}')

  return removeUndefinedPropertiesFromObject({
    reference: customerDetails.customer_reference,
    givenName: customerDetails.given_name ?? ' ',
    hasPreviousSuccessfulOrder: customerDetails.has_previous_successful_order,
    expires: Number(decodedToken.exp),
    anonymousId:
      decodedToken.sub && JSON.parse(decodedToken.sub)?.customer_reference,
    lastUsedPaymentMethod:
      decodedToken.sub && JSON.parse(decodedToken.sub)?.last_used_payment_code
  })
}
