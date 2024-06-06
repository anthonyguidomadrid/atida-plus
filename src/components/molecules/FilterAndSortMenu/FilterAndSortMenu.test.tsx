import { screen, render } from '@testing-library/react'
import { FilterAndSortMenu, FilterAndSortMenuProps } from './index'
import { setupMatchMediaMock } from '~domains/breakpoints'
import { createAlgoliaFrontendClient } from '~domains/algolia'
import { InstantSearch, RefinementList } from 'react-instantsearch-dom'
import { RangeInputConnected } from '../RangeInputConnected'

describe('FilterAndSortMenu', () => {
  const facets = [
    {
      title: 'brand facet title',
      facet: (
        <RefinementList
          attribute="attributes.brand.label"
          searchable
          limit={6}
          showMore
          showMoreLimit={30}
        />
      ),
      testId: 'filterBrandPanel'
    },
    {
      title: 'price facet title',
      facet: <RangeInputConnected attribute="price.sale" precision={2} />,
      testId: 'filterPricePanel'
    }
  ]
  const defaultProps = {
    onClose: jest.fn(),
    isSortMenu: false,
    facets
  }
  const setup = (props: Partial<FilterAndSortMenuProps> = {}) => {
    const { reset } = setupMatchMediaMock(true)
    render(
      <InstantSearch
        searchClient={createAlgoliaFrontendClient()}
        indexName="product-ecommerce-pt-pt_pt"
      >
        <FilterAndSortMenu {...defaultProps} {...props} />
      </InstantSearch>
    )
    reset()
  }

  it('renders the accordion component', () => {
    setup()
    expect(screen.getByTestId('filterAndSortMenuAccordion')).toBeInTheDocument()
  })

  // TO DO: PLUS-7770 [FE] Fix failing tests for the Algolia Dynamic widget

  xit('renders the brand panel', () => {
    setup()
    expect(screen.getByTestId('filterBrandPanel')).toBeInTheDocument()
  })
  xit('renders the price panel', () => {
    setup()
    expect(screen.getByTestId('filterPricePanel')).toBeInTheDocument()
  })
  it('the price panel is not in the accordion', () => {
    setup()
    expect(
      screen.getByTestId('filterAndSortMenuAccordion').children
    ).toHaveLength(1)
  })

  it('renders the promotion checkbox', () => {
    setup()
    expect(screen.getByTestId('filterPromotionPanel')).toBeInTheDocument()
  })

  it('renders the sort panel', () => {
    setup({ isSortMenu: true })
    expect(screen.getByTestId('sortPanel')).toBeInTheDocument()
  })
})
