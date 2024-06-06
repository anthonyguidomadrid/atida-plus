import { FilterProps, Filter } from '.'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'
import { Provider } from 'react-redux'
import { categoryItems } from './Filter.mock'

export default {
  component: Filter,
  title: 'molecules/Filter',
  args: {
    title: 'Filter by categories',
    items: categoryItems,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    handleFiltersSelection: (): void => {},
    activeFilters: []
  }
}

const store = createStore(rootReducer, {})

export const basic = (args: FilterProps): JSX.Element => (
  <Provider store={store}>
    <Filter {...args} />
  </Provider>
)
