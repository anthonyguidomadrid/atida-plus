import { CountrySelectorHeader } from '.'
import { Provider } from 'react-redux'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'

export default {
  component: CountrySelectorHeader,
  title: 'molecules/CountrySelectorHeader'
}

const store = createStore(rootReducer, {})

export const withContentFromDesign = (): JSX.Element => (
  <Provider store={store}>
    <CountrySelectorHeader />
  </Provider>
)
