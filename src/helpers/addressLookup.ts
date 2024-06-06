import { AddressFormValues } from '~components/organisms/AddressForm'
import { CreateAccountFormAddressValues } from '~components/organisms/CreateAccountForm'
import { ValidatedAddress } from '~domains/address'

export const getQualifiedQueryForLookup = (
  values: Partial<AddressFormValues | CreateAccountFormAddressValues>,
  locale: string | undefined
): string => {
  switch (locale) {
    case 'pt-pt':
    case 'es-es':
    case 'de-de':
    case 'de-at':
      return `&qq=postalCode=${encodeURIComponent(
        values.zipCode ?? ''
      )};houseNumber=${encodeURIComponent(
        values.houseNumber ?? ''
      )}&q=${encodeURIComponent(values.address1 ?? '')}`
    default:
      return `&q=${encodeURIComponent(values.address1 ?? '')}`
  }
}

export const getQueryForLookup = (
  values: Partial<AddressFormValues | CreateAccountFormAddressValues>
): string => {
  return `&q=${encodeURIComponent(values.address1 ?? '')}`
}

export const getSuggestedAddressLabel = (
  address: ValidatedAddress['address']
): string => {
  return `${address?.street ? address?.street + ', ' : ''}${
    address?.postalCode ? address?.postalCode + ' ' : ''
  }${address?.city ? address?.city : ''}${
    address?.county ? ' (' + address.county + ')' : ''
  }${address?.countryName ? ', ' + address?.countryName : ''}`
}
