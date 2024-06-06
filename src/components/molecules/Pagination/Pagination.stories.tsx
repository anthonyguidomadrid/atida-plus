import { PaginationProps, Pagination } from './Pagination'

export default {
  component: Pagination,
  title: 'molecules/Pagination',
  args: {
    pages: 50,
    maxShownPages: 3
  }
}

export const Basic = (args: PaginationProps): JSX.Element => (
  <Pagination {...args} />
)
