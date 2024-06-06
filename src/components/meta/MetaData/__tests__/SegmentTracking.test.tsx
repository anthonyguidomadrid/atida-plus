import { FeatureFlag } from '~config/constants/feature-flags'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import { SegmentTracking } from '../SegmentTracking'
import { rootReducer } from '~domains/redux'
import { createStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { ScriptProps } from 'next/script'

jest.mock('next/script', () => (props: ScriptProps) => <script {...props} />)
jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    cookieProScriptIds: {
      'pt-pt': 'cookieProIdPT',
      'es-es': 'cookieProIdES',
      'en-gb': 'cookieProIdPT'
    },
    segmentWriteKey: 'segmentWriteKey',
    segmentStore: 'es-es|ES,pt-pt|PT'
  }
}))

describe(SegmentTracking, () => {
  const store = createStore(rootReducer, {})

  it('renders scripts', () => {
    const { container } = renderWithStoreAndFeatureFlags(
      <Provider store={store}>
        <SegmentTracking />
      </Provider>,
      {
        featureFlags: {
          [FeatureFlag.THIRD_PARTY_SCRIPT_COOKIEPRO]: true,
          [FeatureFlag.THIRD_PARTY_SCRIPT_SEGMENT]: true
        }
      }
    )

    expect(container.querySelectorAll('script')).toHaveLength(1)
    expect(container.querySelectorAll('link')).toBeTruthy()
  })

  it('renders scripts with next/script flag ON', () => {
    const { container } = renderWithStoreAndFeatureFlags(
      <Provider store={store}>
        <SegmentTracking />
      </Provider>,
      {
        featureFlags: {
          [FeatureFlag.THIRD_PARTY_SCRIPT_COOKIEPRO]: true,
          [FeatureFlag.THIRD_PARTY_SCRIPT_SEGMENT]: true,
          [FeatureFlag.THIRD_PARTY_SCRIPT_USE_NEXT_SCRIPT]: true
        }
      }
    )

    expect(container.querySelectorAll('script')).toHaveLength(1)
    expect(container.querySelectorAll('link')).toBeTruthy()
  })
})
