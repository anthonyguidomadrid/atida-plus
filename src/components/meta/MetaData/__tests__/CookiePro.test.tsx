import { FeatureFlag } from '~config/constants/feature-flags'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import { CookiePro } from '../CookiePro'

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    cookieProScriptIds: {
      'pt-pt': 'cookieProIdPT',
      'es-es': 'cookieProIdES',
      'en-gb': 'cookieProIdPT'
    }
  }
}))

describe(CookiePro, () => {
  it('renders scripts', () => {
    const { container } = renderWithStoreAndFeatureFlags(<CookiePro />, {
      featureFlags: {
        [FeatureFlag.THIRD_PARTY_SCRIPT_COOKIEPRO]: true
      }
    })

    container.addEventListener('DOMContentLoaded', () => {
      expect(container.querySelectorAll('script')).toHaveLength(1)
      expect(container.querySelectorAll('link')).toBeTruthy()
    })
  })
})
