import getConfig from 'next/config'
import { FeatureFlag } from '~config/constants/feature-flags'
import { loadFeatureFlag } from './featureFlagClient'

const DEFAULT_S_MAX_AGE = 1
const DEFAULT_MAX_AGE = 3

export const getPageCacheHeader = async (
  locale?: string,
  isPublicPage?: boolean
): Promise<string> => {
  const { serverRuntimeConfig } = getConfig()

  if (
    !serverRuntimeConfig.cacheControlProfile ||
    serverRuntimeConfig.cacheControlProfile === 'private'
  )
    return "private, stale-if-error=0, no-cache='Set-Cookie'"

  if (isPublicPage) {
    const newCacheValues = await loadFeatureFlag(
      locale,
      FeatureFlag.CACHING_NEW_VALUES
    )

    return `public, no-cache='Set-Cookie', s-maxage=${DEFAULT_S_MAX_AGE}${
      newCacheValues ? `, max-age=${DEFAULT_MAX_AGE}, must-revalidate` : ''
    }`
  }

  return 'no-cache, no-store, must-revalidate'
}
