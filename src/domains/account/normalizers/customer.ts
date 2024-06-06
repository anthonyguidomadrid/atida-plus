import { removeUndefinedPropertiesFromObject } from '~helpers'
import { Customer, SprykerCustomer } from '../types'
import { ACCOUNT_TYPE_PERSONAL } from '~config/constants/account-types'
import {
  UpdatedJWTAndRefreshTokens,
  SprykerUpdatedJWTAndRefreshTokens
} from '~domains/account/types'
import { parseDateOfBirthFormat } from '../helpers'

export const normalizeCustomer = (
  customer?: SprykerCustomer
): Customer | undefined =>
  customer?.data?.attributes
    ? removeUndefinedPropertiesFromObject({
        salutation: customer.data.attributes.salutation,
        firstName: customer.data.attributes.firstName,
        lastName: customer.data.attributes.lastName,
        dateOfBirth: customer.data.attributes.dateOfBirth
          ? parseDateOfBirthFormat(customer.data.attributes.dateOfBirth, true)
          : undefined,
        magentoCustomerId: customer.data.attributes.magentoCustomerId
          ? customer.data.attributes.magentoCustomerId
          : undefined,
        email: customer.data.attributes.email,
        emailNotification: customer.data.attributes.emailNotification,
        taxReference: customer.data.attributes.taxReference,
        company: customer.data.attributes.company,
        /* There is no default value for this attribute so let's default it to PERSONAL */
        accountType:
          customer.data.attributes.accountType || ACCOUNT_TYPE_PERSONAL,
        surcharge: customer.data.attributes.surcharge,
        receivePersonalRecommendations:
          customer.data.attributes.receivePersonalRecommendations,
        receivePinnedProductsNotifications:
          customer.data.attributes.receivePinnedProductsNotifications,
        invoiceRequired: customer.data.attributes.invoiceRequired,
        phoneNumber: customer.data.attributes.phone,
        createdAt: customer.data.attributes.createdAt
      })
    : undefined

export const normalizeUpdatedJWTAndRefreshTokens = (
  updatedJWTAndRefreshTokens?: SprykerUpdatedJWTAndRefreshTokens
): UpdatedJWTAndRefreshTokens =>
  removeUndefinedPropertiesFromObject({
    refreshToken: updatedJWTAndRefreshTokens?.data?.attributes?.refreshToken,
    JWT: updatedJWTAndRefreshTokens?.data?.attributes?.accessToken,
    expiresIn: updatedJWTAndRefreshTokens?.data?.attributes?.expiresIn
  })
