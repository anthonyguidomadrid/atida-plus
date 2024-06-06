import { FeatureFlag } from '~config/constants/feature-flags'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import { RTBHouse } from '../RTBHouse'

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    rtbHouseProjectId: 'somProjectId'
  }
}))

describe(RTBHouse, () => {
  it('renders script', () => {
    const { container } = renderWithStoreAndFeatureFlags(<RTBHouse />, {
      featureFlags: {
        [FeatureFlag.THIRD_PARTY_SCRIPT_RTB_HOUSE]: true,
        [FeatureFlag.THIRD_PARTY_SCRIPT_COOKIEPRO]: true
      }
    })

    container.addEventListener('DOMContentLoaded', () => {
      expect(container.querySelectorAll('script')).toHaveLength(1)
    })
  })
})
