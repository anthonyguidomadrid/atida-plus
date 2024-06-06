import { screen } from '@testing-library/react'
import { PhoneNumberForm, PhoneNumberFormType } from './PhoneNumberForm'
import userEvent, { TargetElement } from '@testing-library/user-event'
import { renderWithStore } from '~test-helpers'

describe(PhoneNumberForm, () => {
  const setIsSubmitting = jest.fn()
  const setPhoneNumber = jest.fn()
  const handleSubmit = jest.fn()
  const defaultProps = {
    handleSubmit: handleSubmit,
    isSubmitting: false,
    setIsSubmitting: setIsSubmitting,
    phoneNumber: { country: '351', number: '' },
    setPhoneNumber: setPhoneNumber
  }
  const setup = (props: PhoneNumberFormType) =>
    renderWithStore(<PhoneNumberForm {...props} />)

  describe('when a correct number is entered', () => {
    it('renders the whole form button', async () => {
      setup(defaultProps)
      expect(screen.getByTestId('PhoneNumberForm')).toBeInTheDocument()
      expect(screen.getByTestId('PhoneNumberFormField')).toBeInTheDocument()
      expect(document.getElementById('rfs-btn')).toBeInTheDocument()
      expect(screen.getByTestId('NumberField')).toBeInTheDocument()
      expect(screen.getByTestId('MBWay-payment-button')).toBeInTheDocument()
    })

    it('disables button by default', async () => {
      setup(defaultProps)
      expect(screen.getByTestId('MBWay-payment-button')).toHaveProperty(
        'disabled',
        true
      )
    })

    it('enables the button when validation passes', async () => {
      setup(defaultProps)
      expect(screen.getByTestId('MBWay-payment-button')).toHaveProperty(
        'disabled',
        true
      )
      userEvent.type(screen.getByTestId('NumberField'), '919999999')
      expect(screen.getByTestId('MBWay-payment-button')).toHaveProperty(
        'disabled',
        false
      )
    })

    it('changes the validation when country is changed - ES', async () => {
      setup(defaultProps)
      userEvent.type(screen.getByTestId('NumberField'), '61111111')
      expect(screen.getByTestId('MBWay-payment-button')).toHaveProperty(
        'disabled',
        false
      )
      userEvent.click(document.getElementById('rfs-btn') as TargetElement)
      userEvent.click(document.getElementById('rfs-ES') as TargetElement)
      expect(setPhoneNumber).toBeCalled()
    })

    it('changes the validation when country is changed - PT', async () => {
      setup(defaultProps)
      userEvent.type(screen.getByTestId('NumberField'), '919999999')
      expect(screen.getByTestId('MBWay-payment-button')).toHaveProperty(
        'disabled',
        false
      )
      userEvent.click(document.getElementById('rfs-btn') as TargetElement)
      userEvent.click(document.getElementById('rfs-PT') as TargetElement)
      expect(setPhoneNumber).toBeCalled()
    })
  })

  describe('when the form is validated and submitted', () => {
    it('calls setPhoneNumber useState', async () => {
      setup(defaultProps)
      userEvent.type(screen.getByTestId('NumberField'), '919999999')
      userEvent.click(screen.getByTestId('MBWay-payment-button'))
      expect(setPhoneNumber).toBeCalled()
    })
  })
})
