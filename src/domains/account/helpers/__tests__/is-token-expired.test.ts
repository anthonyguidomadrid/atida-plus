import dayjs from 'dayjs'
import { isTokenExpired } from '../is-token-expired'

describe(isTokenExpired, () => {
  it('returns true when the token is expired', () => {
    const twoDaysAgo = dayjs().subtract(2, 'days')
    expect(isTokenExpired(twoDaysAgo.unix())).toBe(true)
  })

  it('returns false when the token is not expired', () => {
    const twoDaysFromNow = dayjs().add(2, 'days')
    expect(isTokenExpired(twoDaysFromNow.unix())).toBe(false)
  })

  it('returns true when expiry date is not valid', () => {
    // @ts-expect-error
    expect(isTokenExpired('4vfdggerfwe')).toBe(true)
  })

  it('returns true when expiry date is not passed', () => {
    // @ts-expect-error
    expect(isTokenExpired()).toBe(true)
  })
})
