import { ReactComponent as Paypal } from '~assets/svg/payment-providers/PaypalNoPadding.svg'
import { ReactComponent as Visa } from '~assets/svg/payment-providers/Visa.svg'
import { ReactComponent as Mastercard } from '~assets/svg/payment-providers/Mastercard.svg'

export const braintreePaymentMethods = [
  {
    id: 'visa-master',
    name: 'Visa / Master',
    icon: (
      <>
        <Visa className="w-4 h-4 md:w-7 md:h-7 " />
        <Mastercard className="w-4 h-4 md:w-7 md:h-7 ml-0.5" />
      </>
    ),
    disabled: false
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: <Paypal className="w-3 h-3 md:w-5 md:h-5 mt-0.5 md:mt-1 mr-0.5" />,
    disabled: false
  }
]
