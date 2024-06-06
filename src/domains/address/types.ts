import { CustomerSalutation } from '~domains/checkout/types'

export type SprykerCustomerAddress = {
  type: 'addresses'
  id: string
  attributes: CustomerAddress & { province?: string; district?: string }
}

export type CustomerAddress = {
  salutation: CustomerSalutation
  firstName: string
  lastName: string
  address1: string
  address2?: string | null
  address3?: string | null
  houseNumber?: string
  addition?: string
  zipCode: string
  city: string
  subdivision?: string
  district?: string
  province?: string
  country: string
  iso2Code: string
  company?: string | null
  phone?: string
  isDefaultShipping: boolean
  isDefaultBilling: boolean
}

export type CreateAddressTriggerPayload = Partial<CustomerAddress> & {
  reference?: string
  hasValidTaxRegion?: boolean
}

export type UpdateAddressTriggerPayload = Partial<CustomerAddress> & {
  reference?: string
  addressId?: string
  forceRefresh?: boolean
  hasValidTaxRegion?: boolean
}

export type UpdateBusinessDetailsTriggerPayload = {
  reference: string
  companyName: string
  taxReference: string
  equivalenceSurcharge?: boolean
}

export type DeleteAddressTriggerPayload = {
  reference: string
  addressId: string
}

export type DeleteAddressPayload = {
  addressId: string
  isDefaultShipping?: boolean
  isDefaultBilling?: boolean
}

export type DeleteAddressState = {
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
  error?: string
  items?: DeleteAddressItemState[]
}

export type DeleteAddressItemState = {
  id: string
  isLoading: boolean
  wasSuccess: boolean
  wasError: boolean
}

export type UpdatedJWTAndRefreshTokens = {
  refreshToken?: string
  JWT?: string
  expiresIn?: number
}

export type SprykerUpdatedJWTAndRefreshTokens = {
  data: {
    type: string
    attributes: {
      tokenType: string
      expiresIn: number
      accessToken: string
      refreshToken: string
    }
    links: {
      self: string
    }
  }
}

export type ValidateAddressTriggerPayload = {
  query: string
}

export type ValidatedAddress = Partial<{
  title?: string
  id?: string
  resultType?: string
  houseNumberType?: string
  address?: {
    label?: string
    countryCode?: string
    countryName?: string
    county?: string
    city?: string
    district?: string
    street?: string
    postalCode?: string
    houseNumber?: string
  }
  position?: {
    lat?: number
    lng?: number
  }
  access?: {
    lat?: number
    lng?: number
  }[]

  mapView?: {
    west?: number
    south?: number
    east?: number
    north?: number
  }
  scoring?: {
    queryScore?: number
    fieldScore?: {
      streets?: number[]
      houseNumber?: number
      postalCode?: number
    }
  }
}>

export type AddressSuggestionFeatureFlagProps = {
  debounceMs?: number
  maxNumberOfSuggestions?: number
  minQueryLength?: number
}
