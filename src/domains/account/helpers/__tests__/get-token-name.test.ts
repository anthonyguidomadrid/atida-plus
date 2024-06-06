import {
  getCountrySelectorHeaderDataName,
  getGuestFavouritesName,
  getJWTName,
  getRefreshTokenName,
  getCustomerTokenName,
  getGuestJWTName,
  getGuestRefreshTokenName,
  getGuestName,
  getSocialLoginName
} from '../get-token-name'

describe(getJWTName, () => {
  it('returns a correctly formatted JWT name', () => {
    expect(getJWTName()).toEqual('atida-plus-jwt')
  })
})

describe(getRefreshTokenName, () => {
  it('returns a correctly formatted refresh token name', () => {
    expect(getRefreshTokenName()).toEqual('atida-plus-refresh-token')
  })
})

describe(getCustomerTokenName, () => {
  it('returns a correctly formatted customer token name', () => {
    expect(getCustomerTokenName()).toEqual('atida-plus-customer')
  })
})

describe(getGuestJWTName, () => {
  it('returns a correctly formatted JWT name', () => {
    expect(getGuestJWTName()).toEqual('atida-plus-guest-jwt')
  })
})

describe(getGuestRefreshTokenName, () => {
  it('returns a correctly formatted guest refresh token name', () => {
    expect(getGuestRefreshTokenName()).toEqual('atida-plus-guest-refresh-token')
  })
})

describe(getGuestName, () => {
  it('returns a correctly formatted customer token name', () => {
    expect(getGuestName()).toEqual('atida-plus-guest')
  })
})

describe(getSocialLoginName, () => {
  it('returns a correctly formatted social login token name', () => {
    expect(getSocialLoginName()).toEqual('atida-plus-social')
  })
})

describe(getCountrySelectorHeaderDataName, () => {
  it('returns a correctly formatted country selector header data token name', () => {
    expect(getCountrySelectorHeaderDataName()).toEqual(
      'countrySelectorHeaderData'
    )
  })
})

describe(getGuestFavouritesName, () => {
  it('returns a correctly formatted guest favourites name', () => {
    expect(getGuestFavouritesName()).toEqual('atida-plus-guest-favourites')
  })
})
