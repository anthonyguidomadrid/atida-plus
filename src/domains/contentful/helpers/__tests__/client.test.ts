/**
 * @jest-environment node
 */
// @ts-ignore
import { createClient } from 'contentful'
import redis from 'redis'

describe('createContentfulClient', () => {
  // NOTE: this test must be first
  describe('redis cache', () => {
    it('creates redis client when redis config is present', () => {
      require('../client')
      expect(redis.createClient).toHaveBeenCalledWith({
        host: 'some-redis',
        password: 'some-redis-auth',
        port: 6379,
        tls: {}
      })
    })
  })

  it("creates the client passes the locale to contentful's getEntries", () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { createContentfulClient } = require('../client')
    createContentfulClient()
    expect(createClient).toHaveBeenCalledWith({
      accessToken: 'some-access-token',
      environment: 'some-environment',
      space: 'some-space',
      removeUnresolved: true,
      adapter: expect.any(Function)
    })
  })
})
