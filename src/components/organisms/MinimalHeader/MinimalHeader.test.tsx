import { screen } from '@testing-library/react'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import { MinimalHeader, MinimalHeaderProps } from '.'
import { FeatureFlag } from '~config/constants/feature-flags'

describe(MinimalHeader, () => {
  const setup = (
    props: Partial<MinimalHeaderProps> = {},
    isCheckoutHeaderNavigationUpdateStyleEnabled = false
  ) =>
    renderWithStoreAndFeatureFlags(
      <MinimalHeader stepper={<>Stepper</>} {...props} />,
      {
        featureFlags: {
          [FeatureFlag.CHECKOUT_HEADER_NAVIGATION_UPDATE_STYLE]: isCheckoutHeaderNavigationUpdateStyleEnabled
        }
      }
    )

  it('renders as an accessible element', () => {
    setup()
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('renders the header', () => {
    setup()
    expect(screen.getByTestId('MinimalHeader')).toBeInTheDocument()
  })

  it("doesn't error if no stepper component is passed", () => {
    const { container } = setup({ stepper: undefined })
    expect(container).toBeInTheDocument()
  })

  it('adds correct attributes when reducedVerticalMargin is true', () => {
    setup({ reducedVerticalMargin: true }, true)
    expect(screen.getByTestId('MinimalHeader')).toHaveClass(
      'mb-7 sm:mb-10 md:mb-13'
    )
  })
})
