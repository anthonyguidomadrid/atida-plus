import { render, screen } from '@testing-library/react'
import { Filter, FilterProps } from '.'
import { Provider } from 'react-redux'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'
import { categoryItems } from './Filter.mock'

const store = createStore(rootReducer, {})

describe(Filter, () => {
  const defaultProps = {
    title: 'Filter by category',
    items: categoryItems,
    handleFiltersSelection: () => jest.fn(),
    activeFilters: []
  }
  const setup = (props: Partial<FilterProps> = {}) =>
    render(
      <Provider store={store}>
        <Filter {...defaultProps} {...props} />
      </Provider>
    )

  it('renders component', () => {
    setup()
    expect(screen.getByTestId('filter')).toBeInTheDocument()
  })

  it('renders title', () => {
    setup()
    expect(screen.getByTestId('filterTitle')).toHaveTextContent(
      defaultProps.title
    )
  })

  it('renders filter label', () => {
    setup()
    expect(screen.getByText(defaultProps.items[0].label)).toBeInTheDocument()
  })

  it('renders a checked checkbox if a filter is applied', () => {
    setup({ activeFilters: [defaultProps.items[0].id] })
    expect(screen.getAllByTestId('checkboxContainer')[0]).not.toHaveClass(
      'checkbox--not-checked'
    )
    expect(screen.getAllByTestId('checkboxContainer')[0]).toHaveClass(
      'flex grow-0 shrink-0 checkbox w-3 h-3 checkbox--primary checkbox_checkmark--primary'
    )
    expect(
      screen.getAllByTestId('checkboxContainer')[0].parentElement?.lastChild
    ).toHaveTextContent(defaultProps.items[0].label)
  })
})
