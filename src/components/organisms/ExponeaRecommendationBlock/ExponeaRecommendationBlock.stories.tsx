import { ExponeaRecommendationBlock } from '.'
import { ExponeaRecommendationBlockProps } from './ExponeaRecommendationBlock'
import { Provider } from 'react-redux'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'

export default {
  component: ExponeaRecommendationBlock,
  title: 'organisms/ExponeaRecommendationBlock',
  args: {
    title: 'Trendding',
    recommendationId: 'someRecommendationId'
  }
}

const store = createStore(rootReducer, {})

export const basic = (args: ExponeaRecommendationBlockProps): JSX.Element => (
  <Provider store={store}>
    <ExponeaRecommendationBlock {...args} />
  </Provider>
)
