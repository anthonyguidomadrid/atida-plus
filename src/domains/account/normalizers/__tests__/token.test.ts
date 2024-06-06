import {
  sprykerToken,
  sprykerNonVerifiedToken,
  sprykerVerifiedToken,
  token,
  nonVerifiedToken,
  verifiedToken
} from '~domains/account/__mocks__/token'
import { normalizeToken } from '../token'

describe(normalizeToken, () => {
  it('normalizes the data', () => {
    const normalizedData = normalizeToken(sprykerToken)
    expect(normalizedData).toEqual(token)
  })

  it('normalizes the data - Non verified', () => {
    const normalizedData = normalizeToken(sprykerNonVerifiedToken)
    expect(normalizedData).toEqual(nonVerifiedToken)
  })

  it('normalizes the data - Verified', () => {
    const normalizedData = normalizeToken(sprykerVerifiedToken)
    expect(normalizedData).toEqual(verifiedToken)
  })

  it('does not error if passed empty object', () => {
    // @ts-expect-error
    const normalizedData = normalizeToken({})
    expect(normalizedData).toEqual(undefined)
  })

  it('does not error if passed undefined', () => {
    const normalizedData = normalizeToken()
    expect(normalizedData).toEqual(undefined)
  })
})
