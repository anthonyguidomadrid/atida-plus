import { ScriptProps } from 'next/script'
import { NewRelic } from '~components/meta/MetaData/NewRelic'
import { FeatureFlag } from '~config/constants/feature-flags'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'

jest.mock('next/script', () => (props: ScriptProps) => <script {...props} />)
jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    newRelicAppId: 'newRelicAppId',
    newRelicAgentId: 'newRelicAgentId'
  }
}))

describe(NewRelic, () => {
  it('renders scripts', () => {
    const { container } = renderWithStoreAndFeatureFlags(<NewRelic />, {
      featureFlags: {
        [FeatureFlag.THIRD_PARTY_SCRIPT_NEW_RELIC]: true,
        [FeatureFlag.THIRD_PARTY_SCRIPT_NEW_RELIC_RECOMMENDED_IMPLEMENTATION]: false
      }
    })
    expect(container.querySelectorAll('script')).toHaveLength(1)
  })

  it('renders scripts with next/script flag ON', () => {
    const { container } = renderWithStoreAndFeatureFlags(<NewRelic />, {
      featureFlags: {
        [FeatureFlag.THIRD_PARTY_SCRIPT_NEW_RELIC]: true,
        [FeatureFlag.THIRD_PARTY_SCRIPT_NEW_RELIC_RECOMMENDED_IMPLEMENTATION]: false,
        [FeatureFlag.THIRD_PARTY_SCRIPT_USE_NEXT_SCRIPT]: true
      }
    })
    expect(container.querySelectorAll('script')).toHaveLength(1)
  })

  it('does not render script when recommended implementation enabled', () => {
    const { container } = renderWithStoreAndFeatureFlags(<NewRelic />, {
      featureFlags: {
        [FeatureFlag.THIRD_PARTY_SCRIPT_NEW_RELIC]: true,
        [FeatureFlag.THIRD_PARTY_SCRIPT_NEW_RELIC_RECOMMENDED_IMPLEMENTATION]: true
      }
    })
    expect(container.querySelectorAll('script')).toHaveLength(0)
  })
})
