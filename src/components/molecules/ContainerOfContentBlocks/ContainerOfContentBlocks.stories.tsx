import { ContainerOfContentBlocks, ContainerOfContentBlocksProps } from '.'
import { containerOfContentBlocks } from './ContainerOfContentBlocks.mock'
import { Provider } from 'react-redux'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'

export default {
  component: ContainerOfContentBlocks,
  title: 'molecules/ContainerOfContentBlocks',
  parameters: { layout: 'fullscreen' },
  args: {
    ...containerOfContentBlocks
  }
}

const store = createStore(rootReducer, {})

export const withContentFromDesign = (
  args: ContainerOfContentBlocksProps
): JSX.Element => (
  <Provider store={store}>
    <ContainerOfContentBlocks {...args} />
  </Provider>
)
