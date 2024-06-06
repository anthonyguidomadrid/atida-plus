import { render, screen } from '@testing-library/react'
import { SearchWithNoResults, SearchWithNoResultsProps } from './index'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'

const store = createStore(rootReducer, {})

describe(SearchWithNoResults, () => {
  const setup = (props: Partial<SearchWithNoResultsProps> = {}) =>
    render(
      <Provider store={store}>
        <SearchWithNoResults query={'testQuery'} {...props} />
        <input data-testid="inputTest" className="aa-Input" />
      </Provider>
    )
  beforeEach(() => setup())

  it('renders No products found title', () => {
    expect(screen.getByTestId('searchWithNoResultsTitle')).toHaveTextContent(
      'search.no-products-found'
    )
  })

  it('renders query', () => {
    expect(screen.getByTestId('searchWithNoResultsQuery')).toBeInTheDocument()
  })

  it('renders the image', () => {
    expect(screen.getByTestId('searchWithNoResultsImg')).toBeInTheDocument()
  })

  it('renders Search again button', () => {
    expect(screen.getByTestId('searchWithNoResultsButton')).toBeInTheDocument()
    expect(screen.getByTestId('searchWithNoResultsButton')).toHaveTextContent(
      'search.search-again'
    )
  })

  it('focus searchbar input when button clicked', () => {
    userEvent.click(screen.getByTestId('searchWithNoResultsButton'))
    expect(screen.getByTestId('inputTest')).toHaveFocus()
  })
})
