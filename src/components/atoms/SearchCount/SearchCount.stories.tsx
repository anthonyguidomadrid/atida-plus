import { SearchCount, SearchCountProps } from '.'

export default {
  component: SearchCount,
  title: 'atoms/SearchCount'
}

export const Zero = (args: SearchCountProps): JSX.Element => (
  <SearchCount {...args} />
)
Zero.args = {
  count: 0
}

export const One = (args: SearchCountProps): JSX.Element => (
  <SearchCount {...args} />
)
One.args = {
  count: 1
}

export const Many = (args: SearchCountProps): JSX.Element => (
  <SearchCount {...args} />
)
Many.args = {
  count: 4234
}
