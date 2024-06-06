import { SearchWithNoResults, SearchWithNoResultsProps } from './index'

export default {
  component: SearchWithNoResults,
  title: 'molecules/SearchWithNoResults'
}

export const Basic = (args: SearchWithNoResultsProps): JSX.Element => (
  <SearchWithNoResults query={'testQuery'} {...args} />
)
