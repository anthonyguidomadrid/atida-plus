import {
  AdyenPaymentMethod,
  AdyenPaymentMethodProps
} from './AdyenPaymentMethod'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'

const store = createStore(rootReducer, {})

describe(AdyenPaymentMethod, () => {
  const setup = (props: AdyenPaymentMethodProps) => {
    render(
      <Provider store={store}>
        <AdyenPaymentMethod {...props} />
      </Provider>
    )
  }

  xit('renders the queried div', () => {
    setup({
      amount: { value: 1000, currency: 'EUR' },
      locale: 'en-en',
      paymentMethod: 'googlepay',
      customerReference: 'PT-1234',
      guestReference: 'ES-5678',
      isLoggedIn: true
    })
    expect(
      screen.queryByTestId('adyen-googlepay-container')
    ).toBeInTheDocument()
  })
})
