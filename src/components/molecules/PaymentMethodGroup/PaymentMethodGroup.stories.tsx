import { PaymentMethodGroup, PaymentMethodGroupProps } from '.'
import { PaymentMethod } from '~components/atoms/PaymentMethod'
import { ReactComponent as Multibanco } from '~assets/svg/payment-providers/Multibanco.svg'
import { Button } from '~components/atoms/Button'
import { Provider } from 'react-redux'
import { createStore } from '@reduxjs/toolkit'
import { rootReducer } from '~domains/redux'

export default {
  component: PaymentMethodGroup,
  title: 'molecules/PaymentMethodGroup',
  argTypes: {
    onPaymentMethodChange: { action: 'onPaymentMethodChange' }
  },
  args: {
    children: [
      <PaymentMethod
        key="multibanco"
        name="Multibanco"
        inputName="payment-method"
        inputValue="multibanco"
        disabled={false}
        icon={<Multibanco className="h-5" aria-label="icon" />}
      >
        <Button className="w-35">Pay now</Button>
      </PaymentMethod>,

      <PaymentMethod
        key="braintree"
        name="Paypal / Credit Card"
        inputName="payment-method"
        inputValue="braintree"
        disabled={false}
      />
    ]
  }
}

const store = createStore(rootReducer, {})

export const basic = (args: PaymentMethodGroupProps): JSX.Element => (
  <Provider store={store}>
    <PaymentMethodGroup {...args} />
  </Provider>
)
