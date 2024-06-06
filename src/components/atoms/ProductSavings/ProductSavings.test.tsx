import { screen } from '@testing-library/react'
import { FeatureFlag } from '~config/constants/feature-flags'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import { ProductSavings } from '.'
import { ProductSavingsProps } from './ProductSavings'

const defaultProps: ProductSavingsProps = {
  price: {
    value: 100,
    currency: 'GBP'
  },
  rrp: {
    value: 200,
    currency: 'GBP'
  }
}
describe(ProductSavings, () => {
  const setup = (props: Partial<ProductSavingsProps> = {}, ff = true) => {
    const renderedComponent = renderWithStoreAndFeatureFlags(
      <ProductSavings {...defaultProps} {...props} />,
      {
        featureFlags: {
          [FeatureFlag.PRODUCT_PDP_SHOW_SAVINGS]: ff
        }
      }
    )
    return renderedComponent
  }
  it('Does not show savings when there is no price', () => {
    setup({ price: undefined })
    expect(screen.queryByTestId('productSavings')).toBeNull()
  })

  it('Does not show savings when there is no RRP', () => {
    setup({ rrp: undefined })
    expect(screen.queryByTestId('productSavings')).toBeNull()
  })

  it('Does not show savings when the price and RRP are the same', () => {
    setup({ rrp: { value: 100, currency: 'GBP' } })
    expect(screen.queryByTestId('productSavings')).toBeNull()
  })

  it('Does not show savings when there is no price', () => {
    setup({}, false)
    expect(screen.queryByTestId('productSavings')).toBeNull()
  })

  it('Does show the savings when rrp and price are different and the feature flag is on', () => {
    setup()
    expect(screen.queryByTestId('productSavings')).not.toBeNull()
  })

  it('Does not show savings when the RRP is smaller than the current price', () => {
    setup({ price: { value: 300, currency: 'GBP' } }, false)
    expect(screen.queryByTestId('productSavings')).toBeNull()
  })

  it('Displays the right savings amount', () => {
    setup()
    expect(screen.getByTestId('productSavings')).toHaveTextContent('£1.00')
  })

  it('Includes the right savings % amount', () => {
    setup()
    expect(screen.getByTestId('productPercentageSavings')).toHaveTextContent(
      '-50%'
    )
  })
})
