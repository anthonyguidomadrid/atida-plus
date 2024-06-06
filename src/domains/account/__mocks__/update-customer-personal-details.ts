export const updatedPersonalDetails = {
  firstName: 'Test',
  lastName: 'McTest',
  address: 'Brugstraat 123',
  zipCode: '1011 AD',
  iso2Code: 'GB',
  city: 'Amsterdam',
  phone: '088273791298432',
  country: ''
}

export const updatedCustomer = {
  data: {
    type: 'customers',
    id: 'string',
    attributes: {
      salutation: 'Mr',
      firstName: 'Test',
      lastName: 'McTest',
      email: 'some@email.com',
      password: 'somePassword1!',
      confirmPassword: 'somePassword1!',
      acceptedTerms: 'true'
    }
  }
} as const

export const updatedAddress = {
  data: {
    type: 'addresses',
    id: 'some-addressId',
    attributes: {
      salutation: 'Mr',
      firstName: 'Test',
      lastName: 'McTest',
      address1: 'Brugstraat 123',
      address2: 'string',
      address3: 'string',
      zipCode: '1011 AD',
      city: 'Amsterdam',
      country: '',
      iso2Code: 'GB',
      company: '',
      phone: '088273791298432',
      isDefaultShipping: true,
      isDefaultBilling: true
    }
  }
} as const

export const customerAddress = {
  id: 'test',
  salutation: 'Mr',
  firstName: 'test',
  lastName: 'test',
  address1: 'test',
  address2: 'test',
  address3: 'test',
  houseNumber: 'test',
  addition: 'test',
  zipCode: '',
  city: 'test',
  subdivision: 'Lisboa',
  province: 'test',
  district: 'Lisboa',
  country: 'Portugal',
  iso2Code: 'PT',
  company: 'test',
  phone: '',
  createdAt: '2021-12-27 14:52:50.392774',
  updatedAt: '2021-12-27 14:52:50.392774',
  isDefaultShipping: false,
  isDefaultBilling: false,
  isTaxExempt: false
}

export const UpdatedJWTAndRefreshTokens = {
  refreshToken: 'newRefreshToken',
  JWT: 'newJWT',
  expiresIn: '12345'
}

export const sprykerUpdatedJWTAndRefreshTokens = {
  data: {
    type: '',
    id: '',
    attributes: {
      tokenType: 'Bearer',
      expiresIn: '12345',
      accessToken: 'newJWT',
      refreshToken: 'newRefreshToken',
      idCompanyUser: ''
    },
    links: {
      self: ''
    }
  },
  links: {
    self: ''
  }
}
