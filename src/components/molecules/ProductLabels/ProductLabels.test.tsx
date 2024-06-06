import { screen } from '@testing-library/react'
import { ProductLabels, ProductLabelsProps } from './ProductLabels'
import type { ProductLabelWrapper } from '~domains/product'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import { FeatureFlag } from '~config/constants/feature-flags'

describe(ProductLabels, () => {
  const setup = (props: Partial<ProductLabelsProps> = {}) =>
    renderWithStoreAndFeatureFlags(
      <ProductLabels
        labels={[
          { label: 'promo.neo', type: 'promotion' } as ProductLabelWrapper,
          { label: '-16%', type: 'discount' } as ProductLabelWrapper
        ]}
        className={'ulClassName'}
        listItemClassName={'liClassName'}
        {...props}
      />,
      {
        featureFlags: { [FeatureFlag.PDP_TOOLTIP_PROMOTION_INFO]: false }
      }
    )

  describe('Render the correct number of nodes', () => {
    it('renders a parent list', () => {
      setup({
        labels: [
          { label: 'promo.neo', type: 'promotion' } as ProductLabelWrapper,
          { label: 'promo.nova', type: 'promotion' } as ProductLabelWrapper
        ]
      })
      expect(screen.getByTestId('labelsList')).toBeInTheDocument()
    })

    it('renders a items list', () => {
      setup({
        labels: [
          { label: 'promo.neo', type: 'promotion' } as ProductLabelWrapper,
          { label: 'promo.nova', type: 'promotion' } as ProductLabelWrapper
        ]
      })

      expect(screen.getAllByTestId('productLabelList')[0]).toBeInTheDocument()
      expect(screen.getAllByTestId('productLabelList')[1]).toBeInTheDocument()
    })

    it('renders a single item', () => {
      setup({
        labels: [
          { label: 'promo.neo', type: 'promotion' } as ProductLabelWrapper,
          { label: '-16%', type: 'discount' } as ProductLabelWrapper
        ]
      })
      expect(screen.getByTestId('productLabel')).toBeInTheDocument()
    })
  })

  it('renders a label with the promotion', () => {
    setup()
    expect(screen.getByTestId('productLabel')).toBeInTheDocument()
  })

  it('renders the label name if the type is promotion', () => {
    setup()
    expect(screen.getByText('promo.neo')).toBeInTheDocument()
  })

  it('returns null if no label is sent', () => {
    setup({ labels: [] })
    expect(screen.queryByTestId('productLabel')).not.toBeInTheDocument()
  })

  it('returns null if labels is undefined', () => {
    setup({ labels: undefined })
    expect(screen.queryByTestId('productLabel')).not.toBeInTheDocument()
  })

  it('only renders the label if its type is promotion', () => {
    setup({
      labels: [{ label: 'discount', type: 'discount' } as ProductLabelWrapper]
    })
    expect(screen.queryByText('discount')).not.toBeInTheDocument()
  })

  it('does not add any class if the classes sent are undefined', () => {
    setup({
      className: undefined,
      listItemClassName: undefined,
      labels: [
        { label: 'promo.neo', type: 'promotion' } as ProductLabelWrapper,
        { label: 'promo.nova', type: 'promotion' } as ProductLabelWrapper
      ]
    })
    expect(screen.getByTestId('labelsList')).not.toHaveClass()
    expect(screen.getAllByTestId('productLabelList')[0]).not.toHaveClass()
    expect(screen.getAllByTestId('productLabelList')[1]).not.toHaveClass()
  })
})
