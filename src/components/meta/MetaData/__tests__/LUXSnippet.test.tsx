import { ScriptProps } from 'next/script'
import { LUXSnippet } from '~components/meta/MetaData/LUXSnippet'
import { FeatureFlag } from '~config/constants/feature-flags'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'

jest.mock('next/script', () => (props: ScriptProps) => <script {...props} />)
jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    luxId: 'luxId'
  }
}))

describe(LUXSnippet, () => {
  it('renders scripts', () => {
    const { container } = renderWithStoreAndFeatureFlags(<LUXSnippet />, {
      featureFlags: {
        [FeatureFlag.THIRD_PARTY_SCRIPT_SPEEDCURVE]: true
      }
    })
    expect(container.querySelectorAll('script')).toHaveLength(2)
    expect(container.querySelectorAll('link')).toBeTruthy()
  })

  it('renders scripts with next/script flag ON', () => {
    const { container } = renderWithStoreAndFeatureFlags(<LUXSnippet />, {
      featureFlags: {
        [FeatureFlag.THIRD_PARTY_SCRIPT_SPEEDCURVE]: true,
        [FeatureFlag.THIRD_PARTY_SCRIPT_USE_NEXT_SCRIPT]: true
      }
    })
    expect(container.querySelectorAll('script')).toHaveLength(2)
    expect(container.querySelectorAll('link')).toBeTruthy()
  })
})
