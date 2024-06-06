import { FeatureFlag } from '~config/constants/feature-flags'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import { GoogleAnalyticsTracking } from '../GoogleAnalyticsTracking'
import { rootReducer } from '~domains/redux'
import { createStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { ScriptProps } from 'next/script'

jest.mock('next/script', () => (props: ScriptProps) => <script {...props} />)
jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    googleAnalyticsId: 'UA-194232877-15'
  }
}))
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    locale: 'es-es',
    beforePopState: jest.requireActual('next/router')
  }))
}))

describe(GoogleAnalyticsTracking, () => {
  const store = createStore(rootReducer, {})

  it('renders scripts', () => {
    const { container } = renderWithStoreAndFeatureFlags(
      <Provider store={store}>
        <GoogleAnalyticsTracking />
      </Provider>,
      {
        featureFlags: {
          [FeatureFlag.THIRD_PARTY_SCRIPT_GA_TRACKING_SCRIPT]: true
        }
      }
    )
    expect(container.querySelectorAll('script')).toHaveLength(1)
  })

  it('renders scripts with next/script flag ON', () => {
    const { container } = renderWithStoreAndFeatureFlags(
      <Provider store={store}>
        <GoogleAnalyticsTracking />
      </Provider>,
      {
        featureFlags: {
          [FeatureFlag.THIRD_PARTY_SCRIPT_GA_TRACKING_SCRIPT]: true,
          [FeatureFlag.THIRD_PARTY_SCRIPT_USE_NEXT_SCRIPT]: true
        }
      }
    )
    expect(container.querySelectorAll('script')).toHaveLength(1)
  })
})
