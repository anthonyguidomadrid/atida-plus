import { PromotionTeaser, PromotionTeaserProps } from '.'
import { promotionTeaser, category } from './PromotionTeaser.mock'
import { Provider } from 'react-redux'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'

export default {
  component: PromotionTeaser,
  title: 'molecules/PromotionTeaser',
  parameters: { layout: 'fullscreen' },
  category: {
    category
  },
  args: {
    ...promotionTeaser
  }
}

const store = createStore(rootReducer, {})

export const withContentFromDesign = (
  args: PromotionTeaserProps
): JSX.Element => (
  <Provider store={store}>
    <PromotionTeaser {...args} />
  </Provider>
)

export const withImageBackground = (
  args: PromotionTeaserProps
): JSX.Element => (
  <Provider store={store}>
    <PromotionTeaser {...args} />
  </Provider>
)

withImageBackground.args = {
  teaserType: false
}
