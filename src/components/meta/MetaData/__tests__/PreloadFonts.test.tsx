import { FeatureFlag } from '~config/constants/feature-flags'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import { PreloadFonts, Fonts } from '../PreloadFonts'

describe(PreloadFonts, () => {
  it('preloads fonts when flag is ON', () => {
    const { container } = renderWithStoreAndFeatureFlags(
      <PreloadFonts fonts={[Fonts.body]} />,
      {
        featureFlags: {
          [FeatureFlag.PRELOAD_FONTS]: true
        }
      }
    )

    expect(container.querySelectorAll('link')).toHaveLength(1)
  })

  it('renders does not preconnect when flag is OFF', () => {
    const { container } = renderWithStoreAndFeatureFlags(
      <PreloadFonts fonts={[Fonts.body]} />,
      {
        featureFlags: {
          [FeatureFlag.PRELOAD_FONTS]: false
        }
      }
    )

    expect(container.querySelectorAll('link')).toHaveLength(0)
  })

  it('renders does the right amount of preconnect link items', () => {
    const { container } = renderWithStoreAndFeatureFlags(
      <PreloadFonts fonts={[Fonts.body, Fonts.bodyBold]} />,
      {
        featureFlags: {
          [FeatureFlag.PRELOAD_FONTS]: true
        }
      }
    )

    expect(container.querySelectorAll('link')).toHaveLength(2)
  })
})
