/**
 * @jest-environment node
 */
import { getPageCacheHeader } from '../cacheHeaders'
import { loadFeatureFlag } from '../featureFlagClient'

describe(getPageCacheHeader, () => {
  afterEach(() => {
    ;(loadFeatureFlag as jest.Mock).mockReset()
  })

  it('should return the cache headers for private pages by default', async () => {
    ;(loadFeatureFlag as jest.Mock).mockResolvedValue(false)
    const headers = await getPageCacheHeader()
    expect(headers).toBe('no-cache, no-store, must-revalidate')
  })

  it('should return the right headers for public pages in production', async () => {
    ;(loadFeatureFlag as jest.Mock).mockResolvedValue(false)
    const headers = await getPageCacheHeader('es-es', true)
    expect(headers).toBe("public, no-cache='Set-Cookie', s-maxage=1")
  })

  it('should set the new cache values for public pages based on the Feature Flag', async () => {
    ;(loadFeatureFlag as jest.Mock).mockResolvedValue(true)
    const headers = await getPageCacheHeader('es-es', true)
    expect(headers).toBe(
      "public, no-cache='Set-Cookie', s-maxage=1, max-age=3, must-revalidate"
    )
  })

  it('works without feature flags', async () => {
    ;(loadFeatureFlag as jest.Mock).mockResolvedValue(undefined)
    const headers = await getPageCacheHeader('es-es', true)
    expect(headers).toBe("public, no-cache='Set-Cookie', s-maxage=1")
  })
})
