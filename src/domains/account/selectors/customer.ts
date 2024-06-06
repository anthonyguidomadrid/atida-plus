import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '~domains/redux'

export const selectCustomer = (state: RootState) =>
  state?.client?.account?.['customer']

export const selectIsLoading = createSelector(
  selectCustomer,
  customer => customer?.isLoading ?? false
)

export const selectWasError = createSelector(
  selectCustomer,
  customer => customer?.wasError ?? false
)

export const selectWasSuccess = createSelector(
  selectCustomer,
  customer => customer?.wasSuccess ?? false
)

export const selectError = createSelector(
  selectCustomer,
  customer => customer?.error
)

export const selectCustomerReference = createSelector(
  selectCustomer,
  customer => customer?.reference
)

export const selectMagentoCustomerReference = createSelector(
  selectCustomer,
  customer => customer?.details?.magentoCustomerId
)

export const selectCustomerDetails = createSelector(
  selectCustomer,
  customer => customer?.details
)

export const selectCustomerTaxReference = createSelector(
  selectCustomer,
  customer => customer?.details?.taxReference
)

export const selectCustomerSurcharge = createSelector(
  selectCustomer,
  customer => customer?.details?.surcharge
)

export const selectCustomerFirstName = createSelector(
  selectCustomerDetails,
  details => details?.firstName
)

export const selectHasPreviousSuccessfulOrder = createSelector(
  selectCustomerDetails,
  details => details?.hasPreviousSuccessfulOrder
)

export const selectInvoiceRequired = createSelector(
  selectCustomerDetails,
  details => details?.invoiceRequired
)

export const selectCustomerSalutation = createSelector(
  selectCustomerDetails,
  details => details?.salutation
)

export const selectCustomerEmail = createSelector(
  selectCustomerDetails,
  details => details?.email
)

export const selectCustomerType = createSelector(
  selectCustomerDetails,
  details => details?.accountType
)

export const selectTrimmedCustomerFirstName = createSelector(
  selectCustomerFirstName,
  firstName => {
    const maxNameLength = 15
    const trimNameLength = 12
    return (firstName?.length ?? 0) > maxNameLength
      ? (firstName = firstName?.substring(0, trimNameLength).concat('...'))
      : firstName
  }
)

export const selectIsLoggedIn = createSelector(
  selectCustomerReference,
  reference => !!reference
)

export const selectCustomerShowNotification = createSelector(
  selectCustomer,
  customer => customer?.showNotification
)

export const selectAddresses = createSelector(
  selectCustomer,
  customer => customer?.addresses ?? []
)

export const selectDefaultBillingAddress = createSelector(
  selectAddresses,
  addresses => addresses.find(address => address.isDefaultBilling)
)

export const selectDefaultBillingAddressZipCode = createSelector(
  selectDefaultBillingAddress,
  address => address?.zipCode ?? ''
)

export const selectDefaultShippingAddress = createSelector(
  selectAddresses,
  addresses => addresses.find(address => address.isDefaultShipping)
)

export const selectDefaultShippingAddressZipCode = createSelector(
  selectDefaultShippingAddress,
  address => address?.zipCode ?? ''
)

export const selectDefaultShippingAddressIsTaxExempt = createSelector(
  selectDefaultShippingAddress,
  address => address?.isTaxExempt
)

export const selectDefaultShippingAddressIsoCode = createSelector(
  selectDefaultShippingAddress,
  address => address?.iso2Code
)

export const selectDefaultShippingAddressRegion = createSelector(
  selectDefaultShippingAddress,
  address => address?.province ?? ''
)
