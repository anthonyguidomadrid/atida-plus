import { screen } from '@testing-library/react'
import { FeatureFlag } from '~config/constants/feature-flags'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import {
  ProductAvailabilityProps,
  ProductAvailability
} from '../ProductAvailability'

const defaultProps: ProductAvailabilityProps = {
  availability: 'AVAILABLE',
  quantityLeft: 60
}
describe(ProductAvailability, () => {
  const setup = (
    props: Partial<ProductAvailabilityProps> = {},
    ff = true,
    threshold = 50
  ) =>
    renderWithStoreAndFeatureFlags(
      <ProductAvailability {...defaultProps} {...props} />,
      {
        featureFlags: {
          [FeatureFlag.PRODUCT_PDP_SHOW_SCARCITY_MESSAGE]: ff,
          [FeatureFlag.PRODUCT_PDP_PRODUCT_SCARCITY_THRESHOLD]: threshold
        }
      }
    )

  it('Does not show the scarcity message when the feature flag is OFF', () => {
    setup(defaultProps, false)
    expect(screen.queryByTestId('scarcity')).toBeNull()
  })

  it('Does not show the scarcity message when the available quantity is above the threshold', () => {
    setup()
    expect(screen.queryByTestId('scarcity')).toBeNull()
  })

  it('Does not show the scarcity message when the product is unavailable', () => {
    setup({ quantityLeft: 3, availability: 'NOT_AVAILABLE' })
    expect(screen.queryByTestId('scarcity')).toBeNull()
  })

  it('Does not show the scarcity message when the available quantity is invalid', () => {
    //@ts-ignore
    setup({ quantityLeft: 'potato', availability: 'AVAILABLE' })
    expect(screen.queryByTestId('scarcity')).toBeNull()
  })

  it('Does not show the scarcity message when the feature flag threshold value is invalid', () => {
    //@ts-ignore
    setup(defaultProps, true, 'potato')
    expect(screen.queryByTestId('scarcity')).toBeNull()
  })

  it('Shows the scarcity message when the flag is ON and the amount left is below the threshold', () => {
    setup({ quantityLeft: 2, availability: 'AVAILABLE' })
    expect(screen.getByTestId('scarcity')).toHaveTextContent(
      'product.availability.low-stock'
    )
  })
})
