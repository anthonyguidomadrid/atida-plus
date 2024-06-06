import { Provider } from 'react-redux'
import { createStore } from '@reduxjs/toolkit'

import { ContentBlocksLayout, ContentBlocksLayoutProps } from '.'
import Documentation from './ContentBlocksLayoutDocumentation.mdx'
import { rootReducer } from '~domains/redux'

const store = createStore(rootReducer, {})

const mockBlocks = [
  {
    height: 15,
    backgroundColor: 'category-homeopathy-and-natural-products'
  },
  {
    height: 20,
    backgroundColor: 'category-private-label'
  },
  {
    height: 17,
    backgroundColor: 'primary-caribbean-green-light'
  },
  {
    height: 20,
    backgroundColor: 'category-pets'
  }
]

export default {
  component: ContentBlocksLayout,
  title: 'templates/ContentBlocksLayout',
  args: {
    mockBlocks
  },
  parameters: { docs: { page: Documentation } }
}

export const basic = (args: ContentBlocksLayoutProps): JSX.Element => (
  <Provider store={store}>
    <ContentBlocksLayout {...args} />
  </Provider>
)
