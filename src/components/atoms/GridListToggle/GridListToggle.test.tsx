import { screen, render, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from '@reduxjs/toolkit'

import { rootReducer } from '~domains/redux'

import { GridListToggle } from '.'

describe(GridListToggle, () => {
  const store = createStore(rootReducer, {})

  const setup = () =>
    render(
      <Provider store={store}>
        <GridListToggle />
      </Provider>
    )

  it('Toggles between LIST and GRID', () => {
    setup()

    const span = screen.getByTestId('textElement')
    expect(span).toBeInTheDocument()
    expect(span.textContent).toEqual(
      'search.product-view search.product-view.list'
    )

    const button = screen.getByTestId('gridListButton')
    fireEvent.click(button)

    expect(span.textContent).toEqual(
      'search.product-view search.product-view.grid'
    )
  })
})
