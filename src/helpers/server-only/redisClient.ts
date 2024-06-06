import getConfig from 'next/config'
import redis from 'redis'
import { setupCache, RedisDefaultStore, ISetupCache } from 'axios-cache-adapter'

const { serverRuntimeConfig } = getConfig()

const getRandomInteger = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

let store
let cache: ISetupCache | undefined = undefined

if (serverRuntimeConfig.redisHost && !store) {
  const redisClient = redis.createClient({
    host: serverRuntimeConfig.redisHost,
    port: parseInt(serverRuntimeConfig.redisPort, 10),
    password: serverRuntimeConfig.redisAuth,
    tls: serverRuntimeConfig.redisHost === 'localhost' ? undefined : {}
  })

  store = new RedisDefaultStore(redisClient)
}

// use TTL defined by environment OR fallback to 2 hours
let TTL = parseInt(process.env.DEFAULT_CACHE_TTL_MS ?? '7200000', 10)
// Add random offset for TTL expiration (between 1 and 10 minutes)
const minOffset = parseInt(process.env.DEFAULT_CACHE_TTL_MIN ?? '60000', 10)
const maxOffset = parseInt(process.env.DEFAULT_CACHE_TTL_MAX ?? '600000', 10)

TTL += getRandomInteger(minOffset, maxOffset)

if (process.env.DISABLE_CACHE !== 'true') {
  cache = setupCache({
    clearOnError: false, // avoid clearing, which otherwise risks hitting Contentful rate limit
    maxAge: TTL,
    exclude: {
      query: false
    },
    debug: process.env.DEBUG_CACHE === 'true',
    store
  })
}

export { cache }
