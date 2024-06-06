import { getJWTCookieDomain } from '../get-jwt-cookie-domain'

describe(getJWTCookieDomain, () => {
  it('returns the jwt cookie domain when not localhost', () => {
    expect(getJWTCookieDomain()).toEqual('somejwtcookiedomain.com')
  })
  /* TODO:
    Find a way to change the serverRuntimeConfig.host value,
    which is mockedin jest.setup.ts, from within this file.
    Change it to to http://localhost:3000 and expect '',
    to test localhost scenario
  */
})
