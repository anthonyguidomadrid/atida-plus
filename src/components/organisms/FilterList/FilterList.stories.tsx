import { FilterListProps, FilterList } from '.'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'
import { Provider } from 'react-redux'
import { items } from './FilterList.mock'

export default {
  component: FilterList,
  title: 'organisms/Filter',
  args: {
    items,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    handleFiltersSelection: (): void => {},
    activeFilters: []
  }
}

const store = createStore(rootReducer, {})

export const basic = (args: FilterListProps): JSX.Element => (
  <Provider store={store}>
    <FilterList {...args} />
  </Provider>
)
