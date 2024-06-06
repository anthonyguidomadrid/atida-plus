export const createCustomer = {
  salutation: 'Mr',
  firstName: 'Test',
  lastName: 'McTest',
  email: 'some@email.com',
  password: 'somePassword1!',
  confirmPassword: 'somePassword1!',
  acceptedTerms: true,
  emailNotification: true,
  phone: '654654654',
  company: null,
  surcharge: false,
  addresses: {
    addresses: [
      {
        salutation: 'Mr',
        firstName: 'Test',
        lastName: 'McTest',
        address1: 'Brugstraat 123',
        zipCode: '1011 AD',
        city: 'Amsterdam',
        iso2Code: 'PT',
        phone: '088273791298432',
        isDefaultShipping: true,
        isDefaultBilling: true
      }
    ]
  }
}

export const sprykerCustomer = {
  data: {
    type: 'customers',
    id: 'some-id',
    attributes: {
      salutation: 'Mr',
      firstName: 'Test',
      lastName: 'McTest',
      email: 'some@email.com',
      password: 'somePassword1!',
      confirmPassword: 'somePassword1!',
      acceptedTerms: true,
      emailNotification: true,
      company: null,
      surcharge: false
    }
  }
} as const

export const sprykerCustomerWithAddresses = {
  data: {
    ...sprykerCustomer,
    attributes: {
      ...sprykerCustomer.data.attributes
    },
    relationships: {
      addresses: {
        data: [
          { type: 'addresses', id: 'address-id-1' },
          { type: 'addresses', id: 'address-id-2' }
        ]
      }
    }
  },
  included: [
    {
      type: 'addresses',
      id: 'address-id-1',
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
        isDefaultShipping: true,
        isDefaultBilling: true,
        isTaxExempt: false
      }
    },
    {
      type: 'addresses',
      id: 'address-id-2',
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
        isDefaultShipping: false,
        isDefaultBilling: false,
        isTaxExempt: false
      }
    }
  ]
}
