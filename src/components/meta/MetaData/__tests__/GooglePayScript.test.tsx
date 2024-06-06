import { ScriptProps } from 'next/script'
import { FeatureFlag } from '~config/constants/feature-flags'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import { GooglePayScript } from '../GooglePayScript'

jest.mock('next/script', () => (props: ScriptProps) => <script {...props} />)

describe(GooglePayScript, () => {
  it('renders the Google Pay script', () => {
    const { container } = renderWithStoreAndFeatureFlags(<GooglePayScript />, {
      featureFlags: {
        [FeatureFlag.CHECKOUT_PAYMENT_ADYEN_GOOGLE_PAY]: true
      }
    })
    expect(container.querySelectorAll('script')).toHaveLength(1)
  })
})
