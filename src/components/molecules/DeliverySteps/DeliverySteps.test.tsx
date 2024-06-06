import { screen, render } from '@testing-library/react'
import { DeliverySteps } from '../DeliverySteps'
import { DeliveryStepsProps } from './DeliverySteps'

describe(DeliverySteps, () => {
  const defaultProps = [
    {
      title: '',
      text: 'You will receive a confirmation by email',
      subText:
        'Haven’t received anything after 24 hours? Check your spam folder or contact us.',
      icon: 'Checkmark'
    },
    {
      title: '',
      text: 'We collect your products',
      subText: 'Our team will process your order as soon as possible.',
      icon: 'Parcel24'
    },
    {
      title: '',
      text: 'Track your order',
      subText:
        'You will receive an e-mail with the Track & Trace code as soon as your package has been sent.'
    }
  ]

  const setup = (props: Partial<DeliveryStepsProps> = {}) =>
    render(<DeliverySteps steps={defaultProps} {...props} paymentMethod={''} />)

  it('renders icons', () => {
    setup()
    expect(screen.getAllByTestId('dynamic component')).toHaveLength(2) // this test id is from the mocked dynamic import, won't appear on the actual site
  })

  it('renders content', () => {
    setup()
    expect(
      screen.getByText('You will receive a confirmation by email')
    ).toBeInTheDocument()
  })

  it('renders an empty list if there are no steps', () => {
    setup({ steps: undefined })
    expect(screen.getByRole('list')).toBeEmptyDOMElement()
  })

  it('renders the button if there is a customer', () => {
    setup({ isLoggedIn: true })
    expect(screen.getByTestId('confirmationViewOrder')).toBeInTheDocument()
  })

  it('renders the button if there is a customer', () => {
    setup({ isLoggedIn: true })
    expect(screen.getByTestId('confirmationViewOrder')).toBeInTheDocument()
  })

  it('renders delivery steps title', () => {
    setup({ isLoggedIn: true })
    expect(screen.getByTestId('deliveryStepsTitle')).toBeInTheDocument()
  })

  it('renders atida cash steps title', () => {
    setup({ isLoggedIn: true, isAtidaCashSteps: true })
    expect(screen.getByTestId('atidaCashStepsTitle')).toBeInTheDocument()
  })
})
