import { Reviews, ReviewsProps } from './index'

export default {
  component: Reviews,
  title: 'atoms/Reviews',
  args: {
    numberOfReviews: 10,
    rating: 3.5
  }
}

export const Basic = (args: ReviewsProps): JSX.Element => <Reviews {...args} />
