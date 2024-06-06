import { screen, render } from '@testing-library/react'
import { FilterAndSort, FilterAndSortProps } from './index'
import { setupMatchMediaMock } from '~domains/breakpoints'
import { createAlgoliaFrontendClient } from '~domains/algolia'
import { InstantSearch } from 'react-instantsearch-dom'

describe(FilterAndSort, () => {
  const defaultProps = {
    onClose: jest.fn()
  }

  const setup = (props: Partial<FilterAndSortProps> = {}) => {
    const { reset } = setupMatchMediaMock(true)
    render(
      <InstantSearch
        searchClient={createAlgoliaFrontendClient()}
        indexName="product-ecommerce-pt-pt_pt"
      >
        <FilterAndSort {...defaultProps} {...props} />
      </InstantSearch>
    )
    reset()
  }

  xit('renders the title', () => {
    setup()
    expect(screen.getByText('shared.filter.title')).toBeInTheDocument()
  })

  xit('renders FilterAndSortMenu component', () => {
    setup()
    expect(screen.getByTestId('filterAndSortMenu')).toBeInTheDocument()
  })

  // TO DO: PLUS-7770 [FE] Fix failing tests for the Algolia Dynamic widget
  xit('renders accordion with navigation items', () => {
    setup()
    expect(screen.getByTestId('filterAndSortMenuAccordion')).toBeInTheDocument()
  })
})
