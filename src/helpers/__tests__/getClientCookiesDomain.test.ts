import { getClientCookiesDomain } from '../getClientCookiesDomain'

describe(getClientCookiesDomain, () => {
  it('returns localhost when running locally', () => {
    expect(getClientCookiesDomain('localhost')).toEqual('localhost')
  })
  it('returns udefined when not domain is defined', () => {
    expect(getClientCookiesDomain(undefined)).toEqual(undefined)
  })
  it('adds a dot when a real domain passed', () => {
    expect(getClientCookiesDomain('www.atida.com')).toEqual('.www.atida.com')
  })
})
