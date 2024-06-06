import { NewsletterForm } from '.'
import { Provider } from 'react-redux'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'

export default {
  component: NewsletterForm,
  title: 'organisms/NewsletterForm'
}

const store = createStore(rootReducer, {})

export const basic = (): JSX.Element => (
  <Provider store={store}>
    <NewsletterForm />
  </Provider>
)
