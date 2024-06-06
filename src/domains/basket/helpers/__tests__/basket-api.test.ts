import { getBasketApiConfig } from '../basket-api'
import { basketApiConfig } from '../../config'

describe(getBasketApiConfig, () => {
  it('returns the correct basket api config when empty string provided for the token - guest', () => {
    expect(getBasketApiConfig('')).toEqual(basketApiConfig.guest)
  })

  it('returns the correct basket api config when token undefined - guest', () => {
    expect(getBasketApiConfig(undefined)).toEqual(basketApiConfig.guest)
  })

  it('returns the correct basket api config when token provided - authorised user', () => {
    expect(getBasketApiConfig('some-user-token')).toEqual(
      basketApiConfig.authorised
    )
  })
})
