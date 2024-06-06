/**
 * @jest-environment node
 */
import {
  partiallyValidToken,
  validToken,
  guestToken,
  tokenWithoutEmailAndFamilyName
} from '~domains/account/__mocks__/token'
import { decodeToken } from '../decode-token'

describe(decodeToken, () => {
  it('can successfully decode a valid token', () => {
    expect(decodeToken(validToken)).toEqual({
      anonymousId: 'PT--2349',
      expires: 1620257618.062519,
      givenName: 'Rebekah',
      reference: 'PT--2349'
    })
  })

  it('can decode a token with no customer information in', () => {
    expect(decodeToken(partiallyValidToken)).toEqual({
      email: undefined,
      expires: 1616539340.5176,
      name: undefined,
      reference: undefined,
      givenName: ' '
    })
  })

  it('can return the anonymousId from a guest token', () => {
    expect(decodeToken(guestToken)).toEqual({
      anonymousId: 'anonymous:882b48c4-a05b-11ec-bf52-666718a9a416',
      expires: 1646936352.865262,
      givenName: ' ',
      hasPreviousSuccessfulOrder: null,
      reference: 'anonymous:882b48c4-a05b-11ec-bf52-666718a9a416'
    })
  })

  it('can decode a token with no customer email and family name', () => {
    expect(decodeToken(tokenWithoutEmailAndFamilyName)).toEqual({
      anonymousId: 'PT--2349',
      expires: 2620257618.062519,
      givenName: 'Rebekah',
      reference: 'PT--2349'
    })
  })

  it('errors when an invalid token is passed', () => {
    expect.assertions(1)
    try {
      decodeToken('3544432423')
    } catch (err) {
      expect((err as Error).message).toMatch('Invalid token specified')
    }
  })

  it('errors when no token is passed', () => {
    expect.assertions(1)
    try {
      // @ts-expect-error
      decodeToken()
    } catch (err) {
      expect((err as Error).message).toMatch('Invalid token specified')
    }
  })
})
