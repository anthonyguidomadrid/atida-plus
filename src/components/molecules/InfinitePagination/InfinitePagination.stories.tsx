import { InfinitePagination, InfinitePaginationProps } from '.'

export default {
  component: InfinitePagination,
  title: 'molecules/InfinitePagination',
  args: {
    current: 31,
    isLoading: false
  },
  argTypes: {
    loadMore: { action: 'loadMore' }
  }
}

export const NoMore = (args: InfinitePaginationProps): JSX.Element => (
  <InfinitePagination {...args} />
)
NoMore.args = {
  total: 31
}

export const SingleProduct = (args: InfinitePaginationProps): JSX.Element => (
  <InfinitePagination {...args} />
)
SingleProduct.args = {
  current: 1,
  total: 1
}

export const HasMore = (args: InfinitePaginationProps): JSX.Element => (
  <InfinitePagination {...args} />
)
HasMore.args = {
  total: 423,
  hasMore: true
}
