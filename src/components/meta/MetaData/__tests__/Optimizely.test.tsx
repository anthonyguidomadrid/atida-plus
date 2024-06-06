import { FeatureFlag } from '~config/constants/feature-flags'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import { Optimizely } from '../Optimizely'

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    optimizelyProjectId: 'someProjectId'
  }
}))

describe(Optimizely, () => {
  it('renders scripts', () => {
    const { container } = renderWithStoreAndFeatureFlags(<Optimizely />, {
      featureFlags: {
        [FeatureFlag.THIRD_PARTY_SCRIPT_OPTIMIZELY]: true
      }
    })

    container.addEventListener('DOMContentLoaded', () => {
      expect(container.querySelectorAll('script')).toHaveLength(1)
      expect(container.querySelectorAll('link')).toBeTruthy()
    })
  })
})
