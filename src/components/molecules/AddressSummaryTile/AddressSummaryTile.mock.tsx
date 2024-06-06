import { Address } from '~domains/checkout/types'

export const addressNoDefault: Partial<Address> = {
  id: 'some-address-id',
  salutation: 'Mrs',
  middleName: null,
  firstName: 'Julia',
  lastName: 'Lopez',
  address1: 'Avenida Marconi 4C',
  address2: null,
  address3: null,
  poBox: null,
  zipCode: '1000-205',
  city: 'Lisbon',
  country: 'Portugal',
  iso2Code: 'PT',
  company: 'Lopez Farmacia',
  phone: '+351 234567',
  cellPhone: null,
  description: null,
  comment: null,
  email: null,
  province: 'Test province',
  district: 'Test District',
  isDefaultShipping: false,
  isDefaultBilling: false
}

export const addressDefaultShipping: Partial<Address> = {
  id: 'some-address-id',
  salutation: 'Mrs',
  middleName: null,
  firstName: 'Julia',
  lastName: 'Lopez',
  address1: 'Avenida Marconi 4C',
  address2: null,
  address3: null,
  poBox: null,
  zipCode: '1000-205',
  city: 'Lisbon',
  country: 'Portugal',
  iso2Code: 'PT',
  company: 'Lopez Farmacia',
  phone: '+351 234567',
  cellPhone: null,
  description: null,
  comment: null,
  email: null,
  isDefaultShipping: true,
  isDefaultBilling: false
}

export const addressDefaultBilling: Partial<Address> = {
  id: 'some-address-id',
  salutation: 'Mrs',
  middleName: null,
  firstName: 'Julia',
  lastName: 'Lopez',
  address1: 'Avenida Marconi 4C',
  address2: null,
  address3: null,
  poBox: null,
  zipCode: '1000-205',
  city: 'Lisbon',
  country: 'Portugal',
  iso2Code: 'PT',
  company: 'Lopez Farmacia',
  phone: '+351 234567',
  cellPhone: null,
  description: null,
  comment: null,
  email: null,
  isDefaultShipping: false,
  isDefaultBilling: true
}

export const addressDefaultShippingAndBilling: Partial<Address> = {
  id: 'some-address-id',
  salutation: 'Mrs',
  middleName: null,
  firstName: 'Julia',
  lastName: 'Lopez',
  address1: 'Avenida Marconi 4C',
  address2: null,
  address3: null,
  poBox: null,
  zipCode: '1000-205',
  city: 'Lisbon',
  country: 'Portugal',
  iso2Code: 'PT',
  company: 'Lopez Farmacia',
  phone: '+351 234567',
  cellPhone: null,
  description: null,
  comment: null,
  email: null,
  isDefaultShipping: true,
  isDefaultBilling: true
}
