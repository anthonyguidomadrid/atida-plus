import { isFeatureEnabled } from '~helpers/is-feature-enabled'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    algolia: 'true',
    FEATURE_FAVOURITES: 'false'
  }
}))

describe(isFeatureEnabled, () => {
  it('if feature flag is not enabled', () => {
    const featureFlag = 'FEATURE_FAVOURITES'
    expect(isFeatureEnabled(featureFlag)).toBeFalsy()
  })

  it('if feature flag is enabled', () => {
    const featureFlag = 'algolia'
    isFeatureEnabled(featureFlag)
    expect(publicRuntimeConfig[featureFlag]).toBeTruthy()
  })
})
