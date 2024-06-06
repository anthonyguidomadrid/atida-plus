import { FeatureFlag } from '~config/constants/feature-flags'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import { screen } from '@testing-library/react'
import { ImagePreload } from './ImagePreload'

const url =
  'https://sandbox-atida.bynder.com/m/670ac55d14e994b2/Product_High-Gel-Hidroalcoholico-Higienizante-de-Manos-Mifarma-Daily-60ml.png'
const invalidUrl = '/images/no-image-Product%20Medium.png'

describe(ImagePreload, () => {
  it('shows a preload link when flag is ON', () => {
    const { container } = renderWithStoreAndFeatureFlags(
      <ImagePreload src={url} />,
      {
        featureFlags: {
          [FeatureFlag.PRELOAD_LCP]: true
        }
      }
    )

    expect(container.querySelectorAll('link')).toHaveLength(1)
  })

  it('does not show a preload link when flag is OFF', () => {
    const { container } = renderWithStoreAndFeatureFlags(
      <ImagePreload src={url} />,
      {
        featureFlags: {
          [FeatureFlag.PRELOAD_LCP]: false
        }
      }
    )

    expect(container.querySelectorAll('link')).toHaveLength(0)
  })

  it('shows the preload and preconnect links when flags are ON', () => {
    const { container } = renderWithStoreAndFeatureFlags(
      <ImagePreload src={url} />,
      {
        featureFlags: {
          [FeatureFlag.PRELOAD_LCP]: true,
          [FeatureFlag.PRECONNECT_TO_ASSETS]: true
        }
      }
    )

    expect(container.querySelectorAll('link')).toHaveLength(3)
  })

  it('does not try to preconnect to an invalid source url', () => {
    const { container } = renderWithStoreAndFeatureFlags(
      <ImagePreload src={invalidUrl} />,
      {
        featureFlags: {
          [FeatureFlag.PRECONNECT_TO_ASSETS]: true
        }
      }
    )

    expect(container.querySelectorAll('link')).toHaveLength(0)
  })

  it('LCP preload link has auto priority when priority hints is OFF', () => {
    renderWithStoreAndFeatureFlags(<ImagePreload src={url} />, {
      featureFlags: {
        [FeatureFlag.PRELOAD_LCP]: true
      }
    })

    expect(screen.getByTestId('lcpPreload')).toHaveAttribute(
      'fetchpriority',
      'auto'
    )
  })

  it('LCP preload link has high priority when priority hints is ON', () => {
    renderWithStoreAndFeatureFlags(<ImagePreload src={url} />, {
      featureFlags: {
        [FeatureFlag.PRELOAD_LCP]: true,
        [FeatureFlag.FETCH_PRIORITY]: true
      }
    })

    expect(screen.getByTestId('lcpPreload')).toHaveAttribute(
      'fetchpriority',
      'high'
    )
  })

  it('Respects the sizes property', () => {
    renderWithStoreAndFeatureFlags(
      <ImagePreload src={url} sizes="(max-height: 500px) 1000px" />,
      {
        featureFlags: {
          [FeatureFlag.PRELOAD_LCP]: true
        }
      }
    )

    expect(screen.getByTestId('lcpPreload')).toHaveAttribute(
      'imagesizes',
      '(max-height: 500px) 1000px'
    )
  })
})
