import { render, screen } from '@testing-library/react'
import { FilterList, FilterListProps } from '.'
import { Provider } from 'react-redux'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'
import { items } from './FilterList.mock'

const store = createStore(rootReducer, {})

describe('FilterList', () => {
  const defaultProps = {
    items,
    handleFiltersSelection: () => jest.fn(),
    activeFilters: []
  }
  const setup = (props: Partial<FilterListProps> = {}) =>
    render(
      <Provider store={store}>
        <FilterList {...defaultProps} {...props} />
      </Provider>
    )

  it('renders component', () => {
    setup()
    expect(screen.getByTestId('filterList')).toBeInTheDocument()
  })

  it('renders Filter components', () => {
    setup()
    expect(screen.getAllByTestId('filter')[0]).toBeInTheDocument()
    expect(screen.getAllByTestId('filter')[1]).toBeInTheDocument()
  })

  it('renders Filter components title', () => {
    setup()
    expect(screen.getAllByTestId('filter')[0].firstChild).toHaveTextContent(
      defaultProps.items[0].title
    )
    expect(screen.getAllByTestId('filter')[1].firstChild).toHaveTextContent(
      defaultProps.items[1].title
    )
  })

  it('renders Filter components items', () => {
    setup()
    expect(
      screen.getByText(defaultProps.items[0].items[0].label)
    ).toBeInTheDocument()
  })
})
