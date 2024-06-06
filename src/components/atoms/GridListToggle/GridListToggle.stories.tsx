import { Provider } from 'react-redux'
import { createStore } from '@reduxjs/toolkit'

import { rootReducer } from '~domains/redux'

import { GridListToggle } from '.'

export default {
  component: GridListToggle,
  title: 'atoms/GridListToggle'
}

const store = createStore(rootReducer, {})

export const basic = (): JSX.Element => (
  <Provider store={store}>
    <GridListToggle />
  </Provider>
)
