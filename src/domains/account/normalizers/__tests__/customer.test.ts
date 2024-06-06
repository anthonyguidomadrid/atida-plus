import {
  SprykerCustomer,
  SprykerUpdatedJWTAndRefreshTokens
} from '~domains/account/types'
import { sprykerCustomer } from '~domains/account/__mocks__/customer'
import {
  sprykerUpdatedJWTAndRefreshTokens,
  UpdatedJWTAndRefreshTokens
} from '~domains/account/__mocks__/update-customer-personal-details'
import {
  normalizeCustomer,
  normalizeUpdatedJWTAndRefreshTokens
} from '../customer'

describe(normalizeCustomer, () => {
  it('normalizes the data', () => {
    const normalizedData = normalizeCustomer(
      (sprykerCustomer as unknown) as SprykerCustomer
    )

    expect(normalizedData).toMatchSnapshot()
  })

  it('does not error if passed empty object', () => {
    const normalizedData = normalizeCustomer({} as SprykerCustomer)
    expect(normalizedData).toEqual(undefined)
  })

  it('does not error if passed undefined', () => {
    const normalizedData = normalizeCustomer()
    expect(normalizedData).toEqual(undefined)
  })
})

describe(normalizeUpdatedJWTAndRefreshTokens, () => {
  it('normalizes the data recieved after creating an order (orderId and payments)', () => {
    const normalizedData = normalizeUpdatedJWTAndRefreshTokens(
      (sprykerUpdatedJWTAndRefreshTokens as unknown) as SprykerUpdatedJWTAndRefreshTokens
    )

    expect(normalizedData).toEqual(UpdatedJWTAndRefreshTokens)
  })

  it('does not error if passed empty object', () => {
    const normalizedData = normalizeUpdatedJWTAndRefreshTokens(
      {} as SprykerUpdatedJWTAndRefreshTokens
    )
    expect(normalizedData).toEqual({})
  })

  it('does not error if passed undefined', () => {
    const normalizedData = normalizeUpdatedJWTAndRefreshTokens()
    expect(normalizedData).toEqual({})
  })
})
