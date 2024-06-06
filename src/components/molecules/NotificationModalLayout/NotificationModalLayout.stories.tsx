import { NotificationModalLayout, NotificationModalLayoutProps } from '.'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'
import { Provider } from 'react-redux'

export default {
  component: NotificationModalLayout,
  title: 'molecules/NotificationModalLayout',
  args: {
    variant: 'center',
    buttonLabel: 'Some button label'
  },
  argTypes: {
    handleClose: { action: 'handleClose' }
  }
}
const store = createStore(rootReducer, {})

export const basic = (args: NotificationModalLayoutProps): JSX.Element => (
  <Provider store={store}>
    <NotificationModalLayout {...args}>
      <p>Some notification text</p>
    </NotificationModalLayout>
  </Provider>
)
