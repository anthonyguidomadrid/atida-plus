export const createNewAddress = {
  redirect: 'some-path',
  salutation: 'string',
  firstName: 'string',
  lastName: 'string',
  address1: 'string',
  address3: 'string',
  zipCode: 'string',
  city: 'string',
  country: 'string',
  iso2Code: 'string',
  phone: 'string',
  isDefaultShipping: true,
  isDefaultBilling: true
}

export const createNewAddressPayload = {
  data: {
    type: 'customers',
    attributes: {
      salutation: 'string',
      firstName: 'string',
      lastName: 'string',
      address1: 'string',
      address3: 'string',
      zipCode: 'string',
      city: 'string',
      country: 'string',
      iso2Code: 'string',
      phone: 'string',
      isDefaultShipping: true,
      isDefaultBilling: true
    }
  }
} as const

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
