import { Header, HeaderProps } from '.'
import { Provider } from 'react-redux'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'

export default {
  component: Header,
  title: 'organisms/Header',
  parameters: { layout: 'fullscreen' },
  args: {
    isLoggedIn: false,
    firstName: 'Julia'
  }
}

const store = createStore(rootReducer, {})

export const withContentFromDesign = (args: HeaderProps): JSX.Element => (
  <Provider store={store}>
    <Header {...args} />
  </Provider>
)
