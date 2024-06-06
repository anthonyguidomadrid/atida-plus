import {
  importantLinks,
  serviceContactLinks,
  providerBlocks,
  newsletterBlockTitle,
  newsletterSellingPoints,
  countries,
  languages,
  termsConditionsLinks,
  copyright
} from './Footer.mock'
import { Footer, FooterProps } from '.'
import { Provider } from 'react-redux'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'

export default {
  component: Footer,
  title: 'organisms/Footer',
  parameters: { layout: 'fullscreen' },
  args: {
    importantLinks,
    serviceContactLinks,
    providerBlocks,
    newsletterBlockTitle,
    newsletterSellingPoints,
    countries,
    languages,
    termsConditionsLinks,
    copyright,
    hasAdditionalBottomPadding: false
  }
}
const store = createStore(rootReducer, {})

export const withContentFromDesign = (args: FooterProps): JSX.Element => (
  <Provider store={store}>
    <Footer {...args} />
  </Provider>
)
