import { ScriptProps } from 'next/script'
import { FeatureFlag } from '~config/constants/feature-flags'

import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import { YotpoRatings } from '../YotpoRatings'

jest.mock('next/script', () => (props: ScriptProps) => <script {...props} />)

describe(YotpoRatings, () => {
  it('renders script', () => {
    const { container } = renderWithStoreAndFeatureFlags(<YotpoRatings />, {
      featureFlags: {
        [FeatureFlag.THIRD_PARTY_SCRIPT_COOKIEPRO]: true,
        [FeatureFlag.THIRD_PARTY_SCRIPT_YOTPO]: true
      }
    })
    expect(container.querySelectorAll('script')).toHaveLength(2)
  })

  it('renders script when next/script flag is on', () => {
    const { container } = renderWithStoreAndFeatureFlags(<YotpoRatings />, {
      featureFlags: {
        [FeatureFlag.THIRD_PARTY_SCRIPT_COOKIEPRO]: true,
        [FeatureFlag.THIRD_PARTY_SCRIPT_YOTPO]: true,
        [FeatureFlag.THIRD_PARTY_SCRIPT_USE_NEXT_SCRIPT]: true
      }
    })
    expect(container.querySelectorAll('script')).toHaveLength(2)
  })
})
