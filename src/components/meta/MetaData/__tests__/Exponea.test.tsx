import { screen } from '@testing-library/react'
import { useRouter } from 'next/router'
import { ScriptProps } from 'next/script'
import { FeatureFlag } from '~config/constants/feature-flags'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import { Exponea } from '../Exponea'

jest.mock('next/script', () => (props: ScriptProps) => <script {...props} />)

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    exponeaProjectToken: {
      'pt-pt': 'exponeaProjectTokenPT',
      'es-es': 'exponeaProjectTokenES',
      'en-gb': 'exponeaProjectTokenGB'
    }
  }
}))

describe(Exponea, () => {
  const setup = (locale?: string, useNextScript?: boolean) => {
    if (locale) {
      ;(useRouter as jest.Mock).mockImplementationOnce(() => ({
        locale
      }))
    }
    return renderWithStoreAndFeatureFlags(<Exponea />, {
      featureFlags: {
        [FeatureFlag.THIRD_PARTY_SCRIPT_EXPONEA]: true,
        [FeatureFlag.THIRD_PARTY_SCRIPT_USE_NEXT_SCRIPT]: !!useNextScript
      }
    })
  }

  it('renders scripts', () => {
    const { container } = setup()
    expect(screen.getByTestId('exponea-init-script')).toBeInTheDocument()
    expect(screen.getByTestId('exponea-tracking-script')).toBeInTheDocument()
    expect(container.querySelectorAll('link')).toBeTruthy()
  })

  it('uses correct project token for default locale', () => {
    // locale is mocked to be en-GB
    setup()
    expect(screen.getByTestId('exponea-tracking-script')).toContainHTML(
      'token: "exponeaProjectTokenGB"'
    )
  })

  it('uses correct project token for non-default locale', () => {
    setup('pt-pt')
    expect(screen.getByTestId('exponea-tracking-script')).toContainHTML(
      'token: "exponeaProjectTokenPT"'
    )
  })
  it('renders scripts with next/script flag ony', () => {
    const { container } = setup('pt-pt', true)
    expect(screen.getByTestId('exponea-init-script')).toBeInTheDocument()
    expect(screen.getByTestId('exponea-tracking-script')).toBeInTheDocument()
    expect(container.querySelectorAll('link')).toBeTruthy()
  })
})
