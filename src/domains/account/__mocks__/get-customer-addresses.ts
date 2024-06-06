import { SprykerCustomerAddresses, CustomerAddress } from '../types'

export const sprykerCustomerAddresses: SprykerCustomerAddresses = {
  data: [
    {
      type: 'addresses',
      id: 'some-id',
      attributes: {
        salutation: 'some-salutation',
        firstName: 'some-name',
        lastName: 'some-last-name',
        address1: 'some-address',
        address2: 'some-address2',
        address3: 'some-address3',
        zipCode: 'some-zip-code',
        city: 'some-city',
        country: 'some-country',
        iso2Code: 'some-iso-code',
        company: 'some-company',
        phone: 'some-phone',
        createdAt: '2021-12-27 14:52:50.392774',
        updatedAt: '2021-12-27 14:52:50.392774',
        isDefaultShipping: true,
        isDefaultBilling: true,
        isTaxExempt: false
      }
    },
    {
      type: 'addresses',
      id: 'some-other-id',
      attributes: {
        salutation: 'some-other-salutation',
        firstName: 'some-other-name',
        lastName: 'some-other-last-name',
        address1: 'some-other-address',
        address2: 'some-other-address2',
        address3: 'some-other-address3',
        zipCode: 'some-other-zip-code',
        city: 'some-other-city',
        country: 'some-other-country',
        iso2Code: 'some-other-iso-code',
        company: 'some-other-company',
        phone: 'some-other-phone',
        createdAt: '2021-12-27 14:52:50.392774',
        updatedAt: '2021-12-27 14:52:50.392774',
        isDefaultShipping: false,
        isDefaultBilling: false,
        isTaxExempt: false
      }
    }
  ]
}

/*
This address list is used to test the AddressList sorting functionality

Priority ordering (with the reason for that priority):
  P0 > P1 (shipping over billing)
  P1 > P2 (billing over availability)
  P2 > P3 (availability over recently updated addresses)
  P3 > P4 (recently updated addresses over 'stale' addresses)
*/
export const unsortedCustomerAddresses: CustomerAddress[] = [
  {
    id: 'some-id',
    salutation: 'some-salutation',
    firstName: '[priority-through-shipping]',
    lastName: 'some-last-name',
    address1: 'P0',
    address2: 'some-address2',
    address3: 'some-address3',
    zipCode: 'some-zip-code',
    city: 'some-city',
    country: 'Spain',
    iso2Code: 'ES',
    company: 'some-company',
    phone: 'some-phone',
    createdAt: '2021-12-27 14:52:50.392774',
    updatedAt: '2021-12-27 14:52:50.392774',
    isDefaultShipping: true,
    isDefaultBilling: false,
    isTaxExempt: false
  },
  {
    id: 'some-other-id',
    salutation: 'some-other-salutation',
    firstName: '[priority-through-billing]',
    lastName: 'some-other-last-name',
    address1: 'P1',
    address2: 'some-other-address2',
    address3: 'some-other-address3',
    zipCode: 'some-other-zip-code',
    city: 'some-other-city',
    country: 'some-other-country',
    iso2Code: 'ES',
    company: 'Spain',
    phone: 'some-other-phone',
    createdAt: '2021-12-27 14:52:50.392774',
    updatedAt: '2021-12-27 14:52:50.392774',
    isDefaultShipping: false,
    isDefaultBilling: true,
    isTaxExempt: false
  },
  {
    id: 'some-other-id',
    salutation: 'some-other-salutation',
    firstName: '[priority-through-availability]',
    lastName: 'some-other-last-name',
    address1: 'P2',
    address2: 'some-other-address2',
    address3: 'some-other-address3',
    zipCode: 'some-other-zip-code',
    city: 'some-other-city',
    country: 'Spain',
    iso2Code: 'ES',
    company: 'some-other-company',
    phone: 'some-other-phone',
    createdAt: '2021-12-27 14:52:50.392774',
    updatedAt: '2021-12-27 14:52:50.392774',
    isDefaultShipping: false,
    isDefaultBilling: false,
    isTaxExempt: false
  },
  {
    id: 'some-other-id',
    salutation: 'some-other-salutation',
    firstName: '[priority-through-recency]',
    lastName: 'some-other-last-name',
    address1: 'P3',
    address2: 'some-other-address2',
    address3: 'some-other-address3',
    zipCode: 'some-other-zip-code',
    city: 'some-other-city',
    country: 'Portugal',
    iso2Code: 'PT',
    company: 'some-other-company',
    phone: 'some-other-phone',
    createdAt: '2021-12-28 14:52:50.392774',
    updatedAt: '2021-12-28 14:52:50.392774',
    isDefaultShipping: false,
    isDefaultBilling: false,
    isTaxExempt: false
  },
  {
    id: 'some-other-id',
    salutation: 'some-other-salutation',
    firstName: '[lowest-priority]',
    lastName: 'some-other-last-name',
    address1: 'P4',
    address2: 'some-other-address2',
    address3: 'some-other-address3',
    zipCode: 'some-other-zip-code',
    city: 'some-other-city',
    country: 'Portugal',
    iso2Code: 'PT',
    company: 'some-other-company',
    phone: 'some-other-phone',
    createdAt: '2021-12-27 14:52:50.392774',
    updatedAt: '2021-12-27 14:52:50.392774',
    isDefaultShipping: false,
    isDefaultBilling: false,
    isTaxExempt: false
  }
]

/*
This address list is used to test the AddressList sorting functionality

Priority ordering (with the reason for that priority):
  P0 > P1 (shipping over billing)
  P1 > P2 (billing over availability)
  P2 > P3 (availability over recently updated addresses)
  P3 > P4 (recently updated addresses over 'stale' addresses)
*/
export const unsortedCustomerAddressesISO801Compatible: CustomerAddress[] = [
  {
    id: 'some-id',
    salutation: 'some-salutation',
    firstName: '[priority-through-shipping]',
    lastName: 'some-last-name',
    address1: 'P0',
    address2: 'some-address2',
    address3: 'some-address3',
    zipCode: 'some-zip-code',
    city: 'some-city',
    country: 'Spain',
    iso2Code: 'ES',
    company: 'some-company',
    phone: 'some-phone',
    createdAt: '2021-12-27T14:52:50.392774',
    updatedAt: '2021-12-27T14:52:50.392774',
    isDefaultShipping: true,
    isDefaultBilling: false,
    isTaxExempt: false
  },
  {
    id: 'some-other-id',
    salutation: 'some-other-salutation',
    firstName: '[priority-through-billing]',
    lastName: 'some-other-last-name',
    address1: 'P1',
    address2: 'some-other-address2',
    address3: 'some-other-address3',
    zipCode: 'some-other-zip-code',
    city: 'some-other-city',
    country: 'some-other-country',
    iso2Code: 'ES',
    company: 'Spain',
    phone: 'some-other-phone',
    createdAt: '2021-12-27T14:52:50.392774',
    updatedAt: '2021-12-27T14:52:50.392774',
    isDefaultShipping: false,
    isDefaultBilling: true,
    isTaxExempt: false
  },
  {
    id: 'some-other-id',
    salutation: 'some-other-salutation',
    firstName: '[priority-through-availability]',
    lastName: 'some-other-last-name',
    address1: 'P2',
    address2: 'some-other-address2',
    address3: 'some-other-address3',
    zipCode: 'some-other-zip-code',
    city: 'some-other-city',
    country: 'Spain',
    iso2Code: 'ES',
    company: 'some-other-company',
    phone: 'some-other-phone',
    createdAt: '2021-12-27T14:52:50.392774',
    updatedAt: '2021-12-27T14:52:50.392774',
    isDefaultShipping: false,
    isDefaultBilling: false,
    isTaxExempt: false
  },
  {
    id: 'some-other-id',
    salutation: 'some-other-salutation',
    firstName: '[priority-through-recency]',
    lastName: 'some-other-last-name',
    address1: 'P3',
    address2: 'some-other-address2',
    address3: 'some-other-address3',
    zipCode: 'some-other-zip-code',
    city: 'some-other-city',
    country: 'Portugal',
    iso2Code: 'PT',
    company: 'some-other-company',
    phone: 'some-other-phone',
    createdAt: '2021-12-28T14:52:50.392774',
    updatedAt: '2021-12-28T14:52:50.392774',
    isDefaultShipping: false,
    isDefaultBilling: false,
    isTaxExempt: false
  },
  {
    id: 'some-other-id',
    salutation: 'some-other-salutation',
    firstName: '[lowest-priority]',
    lastName: 'some-other-last-name',
    address1: 'P4',
    address2: 'some-other-address2',
    address3: 'some-other-address3',
    zipCode: 'some-other-zip-code',
    city: 'some-other-city',
    country: 'Portugal',
    iso2Code: 'PT',
    company: 'some-other-company',
    phone: 'some-other-phone',
    createdAt: '2021-12-27T14:52:50.392774',
    updatedAt: '2021-12-27T14:52:50.392774',
    isDefaultShipping: false,
    isDefaultBilling: false,
    isTaxExempt: false
  }
]

export const Addresses: CustomerAddress[] = [
  {
    id: 'some-id',
    salutation: 'some-salutation',
    firstName: '[priority-through-shipping]',
    lastName: 'some-last-name',
    address1: 'P0',
    address2: 'some-address2',
    address3: 'some-address3',
    zipCode: 'some-zip-code',
    city: 'some-city',
    country: 'Portugal',
    iso2Code: 'PT',
    company: 'some-company',
    phone: 'some-phone',
    createdAt: '2021-12-27 14:52:50.392774',
    updatedAt: '2021-12-27 14:52:50.392774',
    isDefaultShipping: true,
    isDefaultBilling: false,
    isTaxExempt: false
  },
  {
    id: 'some-other-id',
    salutation: 'some-other-salutation',
    firstName: '[priority-through-billing]',
    lastName: 'some-other-last-name',
    address1: 'P1',
    address2: 'some-other-address2',
    address3: 'some-other-address3',
    zipCode: 'some-other-zip-code',
    city: 'some-other-city',
    country: 'some-other-country',
    iso2Code: 'PT',
    company: 'Portugal',
    phone: 'some-other-phone',
    createdAt: '2021-12-27 14:52:50.392774',
    updatedAt: '2021-12-27 14:52:50.392774',
    isDefaultShipping: false,
    isDefaultBilling: true,
    isTaxExempt: false
  }
]
