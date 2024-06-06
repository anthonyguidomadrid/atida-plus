import { act, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import { GuestCheckoutForm } from '.'
import { useRouter } from 'next/router'
import { checkoutData } from '~domains/checkout/__mocks__/checkout-data'
import { Address } from '~domains/checkout/types'
import { FeatureFlag } from '~config/constants/feature-flags'
import { select } from 'react-select-event'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
})

// eslint-disable-next-line @typescript-eslint/no-empty-function
window.HTMLElement.prototype.scrollIntoView = function () {}

window.scrollTo = jest.fn()

describe(GuestCheckoutForm, () => {
  describe('Guest Checkout Form - No Billing Address - No special tax province', () => {
    const onSubmit = jest.fn()
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      asPath: '/checkout',
      locale: 'es-es'
    }))

    beforeEach(() => {
      renderWithStoreAndFeatureFlags(
        <GuestCheckoutForm isGuest onSubmit={onSubmit} />,
        {
          featureFlags: {
            [FeatureFlag.CHECKOUT_ADDRESS_SUGGESTION]: true
          }
        }
      )
    })
    it('renders the first name input field', () => {
      expect(
        screen.getByRole('textbox', { name: 'form.field.first-name.label' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('textbox', { name: 'form.field.first-name.label' })
      ).toHaveAttribute('type', 'text')
    })
    it('renders the last name input field', () => {
      expect(
        screen.getByRole('textbox', { name: 'form.field.last-name.label' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('textbox', { name: 'form.field.last-name.label' })
      ).toHaveAttribute('type', 'text')
    })
    it('renders the email input field', () => {
      expect(
        screen.getByRole('textbox', { name: 'form.field.email.label' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('textbox', { name: 'form.field.email.label' })
      ).toHaveAttribute('type', 'email')
    })
    it('renders the address input field', () => {
      expect(
        screen.getByRole('textbox', { name: 'form.field.address1.label' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('textbox', { name: 'form.field.address1.label' })
      ).toHaveAttribute('type', 'text')
    })
    it('renders the house number input field', () => {
      expect(
        screen.getByRole('textbox', { name: 'form.field.zip-code.label' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('textbox', { name: 'form.field.zip-code.label' })
      ).toHaveAttribute('type', 'text')
    })
    it('renders the adition input field', () => {
      expect(
        screen.getByRole('textbox', { name: 'form.field.addition.label' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('textbox', { name: 'form.field.addition.label' })
      ).toHaveAttribute('type', 'text')
    })
    it('renders the zip code input field', () => {
      expect(
        screen.getByRole('textbox', { name: 'form.field.zip-code.label' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('textbox', { name: 'form.field.zip-code.label' })
      ).toHaveAttribute('type', 'text')
    })

    it('renders the city input field', () => {
      expect(
        screen.getByRole('textbox', { name: 'form.field.city.label' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('textbox', { name: 'form.field.city.label' })
      ).toHaveAttribute('type', 'text')
    })

    it('renders the subdivision selector', () => {
      expect(
        document.querySelector('input[name="shipping.subdivision"]')
      ).toBeInTheDocument()
    })
    it('renders the country input field', () => {
      expect(
        screen.getByRole('textbox', { name: 'form.field.country.label' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('textbox', { name: 'form.field.country.label' })
      ).toHaveAttribute('type', 'text')
      expect(
        screen.getByRole('textbox', { name: 'form.field.country.label' })
      ).toHaveClass(
        'disabled:bg-primary-white disabled:text-ui-grey-default-alt disabled:pointer-events-none'
      )
    })
    it('renders the phone number input field', () => {
      expect(
        screen.getByRole('textbox', { name: 'form.field.phone-number.label' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('textbox', { name: 'form.field.phone-number.label' })
      ).toHaveAttribute('type', 'tel')
    })

    it('the onSubmit function is not called if the form is empty', async () => {
      const submitButton = screen.getByTestId('guestCheckoutFormButton')
      await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(0))
      userEvent.click(submitButton)
      await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(0))
    })

    it('the onSubmit function is not called if the form is not completed correctly', async () => {
      const submitButton = screen.getByTestId('guestCheckoutFormButton')
      const firstName = screen.getByTestId('guestCheckoutFormFirstNameField')
      const lastName = screen.getByTestId('guestCheckoutFormLastNameField')
      const email = screen.getByTestId('guestCheckoutFormEmailField')
      const address = screen.getByTestId('ShippingAddressFormAddress1Field')
      const houseNumber = screen.getByTestId(
        'ShippingAddressFormHouseNumberField'
      )
      const zipCode = screen.getByTestId('ShippingAddressFormZipCodeField')
      const city = screen.getByTestId('ShippingAddressFormCityField')
      const subdivision = document.querySelector(
        'input[name="shipping.subdivision"]'
      )
      const phoneNumber = screen.getByTestId(
        'guestCheckoutFormPhoneNumberField'
      )

      userEvent.type(firstName, 'First Name')
      userEvent.type(lastName, 'Last Name')
      userEvent.type(email, 'wrongEmail')
      userEvent.type(address, 'Address')
      userEvent.type(houseNumber, 'Some number')
      userEvent.type(zipCode, 'wrongZipCode')
      userEvent.type(city, 'Some City')
      await select(subdivision as HTMLElement, 'Albacete')
      userEvent.type(phoneNumber, 'wrongPhoneNumber')
      userEvent.click(submitButton)

      await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(0))
      userEvent.click(submitButton)
      expect(email).toHaveClass('text-feedback-error')
      expect(zipCode).toHaveClass('text-feedback-error')
      expect(phoneNumber).toHaveClass('text-feedback-error')
      await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(0))
    })

    it('the onSubmit function is called if the form is completed correctly', async () => {
      const submitButton = screen.getByTestId('guestCheckoutFormButton')
      const firstName = screen.getByTestId('guestCheckoutFormFirstNameField')
      const lastName = screen.getByTestId('guestCheckoutFormLastNameField')
      const email = screen.getByTestId('guestCheckoutFormEmailField')
      const address = screen.getByTestId('ShippingAddressFormAddress1Field')
      const houseNumber = screen.getByTestId(
        'ShippingAddressFormHouseNumberField'
      )
      const zipCode = screen.getByTestId('ShippingAddressFormZipCodeField')
      const city = screen.getByTestId('ShippingAddressFormCityField')
      const subdivision = document.querySelector(
        'input[name="shipping.subdivision"]'
      )
      const phoneNumber = screen.getByTestId(
        'guestCheckoutFormPhoneNumberField'
      )

      userEvent.type(firstName, 'First Name')
      userEvent.type(lastName, 'Last Name')
      userEvent.type(email, 'someEmail@email.com')
      userEvent.type(address, 'Address')
      userEvent.type(houseNumber, 'Some number')
      userEvent.type(zipCode, '12345')
      userEvent.type(city, 'Some City')
      await select(subdivision as HTMLElement, 'Albacete')
      userEvent.type(phoneNumber, '654654654')
      userEvent.click(submitButton)

      await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(0))
      userEvent.click(submitButton)
      await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1))
    })
  })

  describe('Guest Checkout Form - Billing Address - No special tax province', () => {
    const onSubmit = jest.fn()
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      asPath: '/checkout',
      locale: 'es-es'
    }))

    beforeEach(() => {
      renderWithStoreAndFeatureFlags(
        <GuestCheckoutForm
          isGuest
          billingSameAsShipping={false}
          onSubmit={onSubmit}
        />,
        {
          featureFlags: {
            [FeatureFlag.CHECKOUT_ADDRESS_SUGGESTION]: true
          }
        }
      )
    })
    it('renders the billing address input fields', async () => {
      expect(
        screen.getByTestId('BillingAddressFormAddress1')
      ).toBeInTheDocument()
      expect(
        screen.getByTestId('BillingAddressFormHouseNumber')
      ).toBeInTheDocument()
      expect(
        screen.getByTestId('BillingAddressFormAddition')
      ).toBeInTheDocument()
      expect(
        screen.getByTestId('BillingAddressFormZipCode')
      ).toBeInTheDocument()
      expect(screen.getByTestId('BillingAddressFormCity')).toBeInTheDocument()
      expect(
        document.querySelector('input[name="billing.subdivision"]')
      ).toBeInTheDocument()
      expect(
        screen.getByTestId('BillingAddressFormCountry')
      ).toBeInTheDocument()
    })

    it('the onSubmit function is called if the form is completed correctly', async () => {
      const submitButton = screen.getByTestId('guestCheckoutFormButton')
      const firstName = screen.getByTestId('guestCheckoutFormFirstNameField')
      const lastName = screen.getByTestId('guestCheckoutFormLastNameField')
      const email = screen.getByTestId('guestCheckoutFormEmailField')
      const shippingAddress = screen.getByTestId(
        'ShippingAddressFormAddress1Field'
      )
      const shippingHouseNumber = screen.getByTestId(
        'ShippingAddressFormHouseNumberField'
      )
      const shippingZipCode = screen.getByTestId(
        'ShippingAddressFormZipCodeField'
      )
      const shippingCity = screen.getByTestId('ShippingAddressFormCityField')
      const shippingSubdivision = document.querySelector(
        'input[name="shipping.subdivision"]'
      )
      const phoneNumber = screen.getByTestId(
        'guestCheckoutFormPhoneNumberField'
      )
      const billingAddress = screen.getByTestId(
        'BillingAddressFormAddress1Field'
      )
      const billingHouseNumber = screen.getByTestId(
        'BillingAddressFormHouseNumberField'
      )
      const billingZipCode = screen.getByTestId(
        'BillingAddressFormZipCodeField'
      )
      const billingCity = screen.getByTestId('BillingAddressFormCityField')
      const billingSubdivision = document.querySelector(
        'input[name="billing.subdivision"]'
      )

      userEvent.type(firstName, 'First Name')
      userEvent.type(lastName, 'Last Name')
      userEvent.type(email, 'someEmail@email.com')
      userEvent.type(shippingAddress, 'Address')
      userEvent.type(shippingHouseNumber, 'Some number')
      userEvent.type(shippingZipCode, '12345')
      userEvent.type(shippingCity, 'Some City')
      await select(shippingSubdivision as HTMLElement, 'Albacete')
      userEvent.type(phoneNumber, '654654654')
      userEvent.type(billingAddress, 'Address')
      userEvent.type(billingHouseNumber, 'Some number')
      userEvent.type(billingZipCode, '12345')
      userEvent.type(billingCity, 'Some City')
      await select(billingSubdivision as HTMLElement, 'Albacete')
      userEvent.click(submitButton)

      await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(0))
      userEvent.click(submitButton)
      await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1))
    })
  })

  describe('Guest Checkout Form - Special tax province', () => {
    const onSubmit = jest.fn()
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      asPath: '/checkout',
      locale: 'es-es'
    }))

    beforeEach(() => {
      renderWithStoreAndFeatureFlags(
        <GuestCheckoutForm
          isGuest
          billingSameAsShipping={false}
          onSubmit={onSubmit}
        />,
        {
          featureFlags: {
            [FeatureFlag.CHECKOUT_ADDRESS_SUGGESTION]: true
          }
        }
      )
    })
    it('shows the tax reference field when needed', async () => {
      const shippingSubdivision = document.querySelector(
        'input[name="shipping.subdivision"]'
      )
      const billingSubdivision = document.querySelector(
        'input[name="billing.subdivision"]'
      )
      await select(billingSubdivision as HTMLElement, 'Ceuta')
      expect(
        screen.getByTestId('BillingAddressFormTaxReference')
      ).toBeInTheDocument()
      await select(shippingSubdivision as HTMLElement, 'Melilla')
      expect(
        screen.getByTestId('ShippingAddressFormTaxReference')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('BillingAddressFormTaxReference')
      ).not.toBeInTheDocument()
    })
    it('validates the tax reference field correctly', async () => {
      const submitButton = screen.getByTestId('guestCheckoutFormButton')
      const shippingSubdivision = document.querySelector(
        'input[name="shipping.subdivision"]'
      )
      await select(shippingSubdivision as HTMLElement, 'Melilla')
      const shippingTaxReference = screen.getByTestId(
        'ShippingAddressFormTaxReferenceField'
      )
      userEvent.type(shippingTaxReference, 'wrongRef')
      userEvent.click(submitButton)
      await waitFor(() =>
        expect(shippingTaxReference).toHaveClass('text-feedback-error')
      )
      userEvent.clear(shippingTaxReference)
      userEvent.type(shippingTaxReference, '44444444A')
      userEvent.click(submitButton)
      await waitFor(() =>
        expect(shippingTaxReference).not.toHaveClass('text-feedback-error')
      )
    })
  })

  describe('Guest Checkout Form - Initial values', () => {
    const onSubmit = jest.fn()
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      asPath: '/checkout',
      locale: 'es-es'
    }))

    const baseAddress = {
      salutation: 'Ms',
      email: 'test@email.com',
      address1: 'test address',
      houseNumber: '3',
      addition: 'some addition',
      zipCode: '12345',
      city: 'some city',
      province: 'Albacete',
      country: 'España'
    }

    beforeEach(() => {
      renderWithStoreAndFeatureFlags(
        <GuestCheckoutForm
          isGuest
          initialBilling={
            {
              ...checkoutData.billingAddress,
              ...baseAddress
            } as Address
          }
          initialShipping={
            {
              ...checkoutData.deliveryAddress,
              ...baseAddress
            } as Address
          }
          billingSameAsShipping={false}
          onSubmit={onSubmit}
        />,
        {
          featureFlags: {
            [FeatureFlag.CHECKOUT_ADDRESS_SUGGESTION]: true
          }
        }
      )
    })
    it('autofills the shipping form with the initial values', () => {
      expect(screen.getByTestId('guestCheckoutFormFirstNameField')).toHaveValue(
        'Test'
      )
      expect(screen.getByTestId('guestCheckoutFormLastNameField')).toHaveValue(
        'Last Name'
      )
      expect(screen.getByTestId('guestCheckoutFormEmailField')).toHaveValue(
        'test@email.com'
      )
      expect(
        screen.getByTestId('ShippingAddressFormAddress1Field')
      ).toHaveValue('test address')
      expect(
        screen.getByTestId('ShippingAddressFormHouseNumberField')
      ).toHaveValue('3')
      expect(
        screen.getByTestId('ShippingAddressFormAdditionField')
      ).toHaveValue('some addition')
      expect(screen.getByTestId('ShippingAddressFormZipCodeField')).toHaveValue(
        '12345'
      )
      expect(screen.getByTestId('ShippingAddressFormCityField')).toHaveValue(
        'some city'
      )
      expect(
        document.querySelector('input[name="shipping.subdivision"]')
      ).toHaveValue('Albacete')
    })

    it('autofills the billing form with the initial values', () => {
      expect(screen.getByTestId('BillingAddressFormAddress1Field')).toHaveValue(
        'test address'
      )
      expect(
        screen.getByTestId('BillingAddressFormHouseNumberField')
      ).toHaveValue('3')
      expect(screen.getByTestId('BillingAddressFormAdditionField')).toHaveValue(
        'some addition'
      )
      expect(screen.getByTestId('BillingAddressFormZipCodeField')).toHaveValue(
        '12345'
      )
      expect(screen.getByTestId('BillingAddressFormCityField')).toHaveValue(
        'some city'
      )
      expect(
        document.querySelector('input[name="billing.subdivision"]')
      ).toHaveValue('Albacete')
    })
  })

  describe('Guest Checkout Form - Clean errors on change', () => {
    const onSubmit = jest.fn()
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      asPath: '/checkout',
      locale: 'es-es'
    }))

    beforeEach(() => {
      renderWithStoreAndFeatureFlags(
        <GuestCheckoutForm
          isGuest
          billingSameAsShipping={false}
          onSubmit={onSubmit}
        />,
        {
          featureFlags: {
            [FeatureFlag.CHECKOUT_ADDRESS_SUGGESTION]: true
          }
        }
      )
    })
    it('removes errors when fields are updated', async () => {
      const submitButton = screen.getByTestId('guestCheckoutFormButton')
      const firstName = screen.getByTestId('guestCheckoutFormFirstNameField')
      const lastName = screen.getByTestId('guestCheckoutFormLastNameField')
      const email = screen.getByTestId('guestCheckoutFormEmailField')
      const shippingAddress = screen.getByTestId(
        'ShippingAddressFormAddress1Field'
      )
      const shippingHouseNumber = screen.getByTestId(
        'ShippingAddressFormHouseNumberField'
      )
      const shippingZipCode = screen.getByTestId(
        'ShippingAddressFormZipCodeField'
      )
      const shippingCity = screen.getByTestId('ShippingAddressFormCityField')
      const shippingSubdivision = document.querySelector(
        'input[name="shipping.subdivision"]'
      )
      const phoneNumber = screen.getByTestId(
        'guestCheckoutFormPhoneNumberField'
      )
      const billingAddress = screen.getByTestId(
        'BillingAddressFormAddress1Field'
      )
      const billingHouseNumber = screen.getByTestId(
        'BillingAddressFormHouseNumberField'
      )
      const billingZipCode = screen.getByTestId(
        'BillingAddressFormZipCodeField'
      )
      const billingCity = screen.getByTestId('BillingAddressFormCityField')
      const billingubdivision = document.querySelector(
        'input[name="billing.subdivision"]'
      )

      userEvent.click(submitButton)

      await waitFor(() => {
        expect(firstName).toHaveClass('text-feedback-error')
        expect(lastName).toHaveClass('text-feedback-error')
        expect(email).toHaveClass('text-feedback-error')
        expect(shippingAddress).toHaveClass('text-feedback-error')
        expect(shippingHouseNumber).toHaveClass('text-feedback-error')
        expect(shippingZipCode).toHaveClass('text-feedback-error')
        expect(shippingCity).toHaveClass('text-feedback-error')
        expect(document.getElementById('shippingSubdivision')).toHaveClass(
          'react-select-error'
        )
        expect(billingAddress).toHaveClass('text-feedback-error')
        expect(billingHouseNumber).toHaveClass('text-feedback-error')
        expect(billingZipCode).toHaveClass('text-feedback-error')
        expect(billingCity).toHaveClass('text-feedback-error')
        expect(document.getElementById('billingSubdivision')).toHaveClass(
          'react-select-error'
        )
      })

      userEvent.type(firstName, 'First Name')
      userEvent.type(lastName, 'Last Name')
      userEvent.type(email, 'someEmail@email.com')
      userEvent.type(shippingAddress, 'Address')
      userEvent.type(shippingHouseNumber, 'Some number')
      userEvent.type(shippingZipCode, '12345')
      userEvent.type(shippingCity, 'Some City')
      await select(shippingSubdivision as HTMLElement, 'Madrid')
      userEvent.type(phoneNumber, '654654654')
      userEvent.type(billingAddress, 'Address')
      userEvent.type(billingHouseNumber, 'Some number')
      userEvent.type(billingZipCode, '12345')
      userEvent.type(billingCity, 'Some City')
      await select(billingubdivision as HTMLElement, 'Albacete')

      userEvent.click(submitButton)

      await waitFor(() => {
        expect(firstName).not.toHaveClass('text-feedback-error')
        expect(lastName).not.toHaveClass('text-feedback-error')
        expect(email).not.toHaveClass('text-feedback-error')
        expect(shippingAddress).not.toHaveClass('text-feedback-error')
        expect(shippingHouseNumber).not.toHaveClass('text-feedback-error')
        expect(shippingZipCode).not.toHaveClass('text-feedback-error')
        expect(shippingCity).not.toHaveClass('text-feedback-error')
        expect(document.getElementById('shippingSubdivision')).not.toHaveClass(
          'react-select-error'
        )
        expect(billingAddress).not.toHaveClass('text-feedback-error')
        expect(billingHouseNumber).not.toHaveClass('text-feedback-error')
        expect(billingZipCode).not.toHaveClass('text-feedback-error')
        expect(billingCity).not.toHaveClass('text-feedback-error')
        expect(document.getElementById('billingSubdivision')).not.toHaveClass(
          'react-select-error'
        )

        expect(onSubmit).toHaveBeenCalledTimes(1)
      })
    }, 10000)
  })

  describe('Guest Checkout Form - Validation length', () => {
    const onSubmit = jest.fn()
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      asPath: '/checkout',
      locale: 'es-es'
    }))

    beforeEach(() => {
      renderWithStoreAndFeatureFlags(
        <GuestCheckoutForm
          isGuest
          billingSameAsShipping={false}
          onSubmit={onSubmit}
        />,
        {
          featureFlags: {
            [FeatureFlag.CHECKOUT_ADDRESS_SUGGESTION]: true
          }
        }
      )
    })

    it('does NOT submit the form when the length validations fail', async () => {
      const submitButton = screen.getByTestId('guestCheckoutFormButton')
      const firstName = screen.getByTestId('guestCheckoutFormFirstNameField')
      const lastName = screen.getByTestId('guestCheckoutFormLastNameField')
      const email = screen.getByTestId('guestCheckoutFormEmailField')
      const shippingAddress = screen.getByTestId(
        'ShippingAddressFormAddress1Field'
      )
      const shippingHouseNumber = screen.getByTestId(
        'ShippingAddressFormHouseNumberField'
      )
      const shippingZipCode = screen.getByTestId(
        'ShippingAddressFormZipCodeField'
      )
      const shippingCity = screen.getByTestId('ShippingAddressFormCityField')
      const shippingSubdivision = document.querySelector(
        'input[name="shipping.subdivision"]'
      )
      const phoneNumber = screen.getByTestId(
        'guestCheckoutFormPhoneNumberField'
      )
      const billingAddress = screen.getByTestId(
        'BillingAddressFormAddress1Field'
      )
      const billingHouseNumber = screen.getByTestId(
        'BillingAddressFormHouseNumberField'
      )
      const billingZipCode = screen.getByTestId(
        'BillingAddressFormZipCodeField'
      )
      const billingCity = screen.getByTestId('BillingAddressFormCityField')

      userEvent.type(
        firstName,
        'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem'
      )
      userEvent.type(
        lastName,
        'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem'
      )
      userEvent.type(email, 'email@email.com')
      userEvent.type(
        shippingAddress,
        'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem'
      )
      userEvent.type(
        shippingHouseNumber,
        '12345667892342378647823674862378647862378462378647623846236462378646236487237846723647867823647862374'
      )
      userEvent.type(shippingZipCode, 'HUN')
      userEvent.type(
        shippingCity,
        'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem'
      )
      await select(shippingSubdivision as HTMLElement, 'Las Palmas')
      userEvent.type(
        phoneNumber,
        '1234566789234237864782367486237864786237846237864762384623646237864623648723784672364786782364786237412345667892342378647823674862378647862378462378647623846236462378646236487237846723647867823647862374123456678923423786478236748623786478623784623786476238'
      )
      userEvent.type(
        billingAddress,
        'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem'
      )
      userEvent.type(
        billingHouseNumber,
        '12345667892342378647823674862378647862378462378647623846236462378646236487237846723647867823647862374'
      )
      userEvent.type(billingZipCode, 'HUN')
      userEvent.type(
        billingCity,
        'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem'
      )
      userEvent.type(billingZipCode, 'HUN')

      userEvent.click(submitButton)

      await waitFor(() => {
        expect(firstName).toHaveClass('text-feedback-error')
        expect(lastName).toHaveClass('text-feedback-error')
        expect(shippingAddress).toHaveClass('text-feedback-error')
        expect(shippingHouseNumber).toHaveClass('text-feedback-error')
        expect(shippingZipCode).toHaveClass('text-feedback-error')
        expect(shippingCity).toHaveClass('text-feedback-error')
        expect(billingAddress).toHaveClass('text-feedback-error')
        expect(billingHouseNumber).toHaveClass('text-feedback-error')
        expect(billingZipCode).toHaveClass('text-feedback-error')
        expect(billingCity).toHaveClass('text-feedback-error')
      })

      expect(onSubmit).toHaveBeenCalledTimes(0)
    }, 20000)
  })

  describe('Guest Checkout Form - Social account creation', () => {
    const onSubmit = jest.fn()
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      asPath: '/checkout',
      locale: 'es-es'
    }))

    beforeEach(() => {
      renderWithStoreAndFeatureFlags(
        <GuestCheckoutForm
          isGuest={false}
          billingSameAsShipping={false}
          onSubmit={onSubmit}
        />,
        {
          initialState: {
            client: {
              account: {
                customer: {
                  isLoading: false,
                  wasSuccess: false,
                  wasError: false,
                  showNotification: false,
                  reference: 'ES--125863',
                  details: {
                    firstName: 'FirstName',
                    lastName: 'LastName',
                    hasPreviousSuccessfulOrder: false
                  }
                }
              }
            }
          },
          featureFlags: {
            [FeatureFlag.CHECKOUT_ADDRESS_SUGGESTION]: true
          }
        }
      )
    })

    it('does NOT render the email field if customer is logged', () => {
      expect(
        screen.queryByTestId('guestCheckoutFormEmail')
      ).not.toBeInTheDocument()
    })

    it('autofills firstname and lastname fields if customer is logged', () => {
      expect(screen.getByTestId('guestCheckoutFormFirstNameField')).toHaveValue(
        'FirstName'
      )
      expect(screen.getByTestId('guestCheckoutFormLastNameField')).toHaveValue(
        'LastName'
      )
    })
  })

  describe('Guest Checkout Form - Email typos warning', () => {
    const onSubmit = jest.fn()
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      asPath: '/checkout',
      locale: 'es-es'
    }))

    beforeEach(() => {
      renderWithStoreAndFeatureFlags(
        <GuestCheckoutForm
          isGuest={true}
          billingSameAsShipping={true}
          onSubmit={onSubmit}
        />,
        {
          featureFlags: {
            [FeatureFlag.CHECKOUT_ADDRESS_SUGGESTION]: true
          }
        }
      )
    })

    it('shows the email warming notification when there is a typo on the email', () => {
      const email = screen.getByTestId('guestCheckoutFormEmailField')
      const submitButton = screen.getByTestId('guestCheckoutFormButton')
      userEvent.type(email, 'someEmailWithTypos@gamil.con')
      userEvent.click(submitButton)
      expect(email).not.toHaveClass('text-feedback-error')
      expect(
        screen.getByText(
          'checkout.guest-checkout.email-suggestion someEmailWithTypos@gmail.com'
        )
      ).toBeInTheDocument()
    })
  })

  describe('Guest Checkout Form - Tax regions validation', () => {
    const onSubmit = jest.fn()
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      asPath: '/checkout',
      locale: 'es-es'
    }))

    const baseAddress = {
      salutation: 'Ms',
      email: 'test@email.com',
      address1: 'test address',
      houseNumber: '3',
      addition: 'some addition',
      zipCode: '12345',
      city: 'some city',
      province: 'Albacete',
      country: 'España'
    }

    const setup = (
      shippingZipCode?: string,
      shippingProvince?: string,
      billingZipCode?: string,
      billingProvince?: string
    ) => {
      renderWithStoreAndFeatureFlags(
        <GuestCheckoutForm
          isGuest={true}
          billingSameAsShipping={false}
          onSubmit={onSubmit}
          initialShipping={
            {
              ...baseAddress,
              zipCode: shippingZipCode,
              province: shippingProvince
            } as Address
          }
          initialBilling={
            {
              ...baseAddress,
              zipCode: billingZipCode,
              province: billingProvince
            } as Address
          }
        />,
        {
          featureFlags: {
            [FeatureFlag.CHECKOUT_ADDRESS_SUGGESTION]: true,
            [FeatureFlag.ACCOUNT_MULTIPLE_TAX_REGIONS_VALIDATION]: true
          }
        }
      )
    }

    it('validates the zipcode and province fields', async () => {
      setup('24000', 'Madrid', '35000', 'Las Palmas')
      const billingZipCode = screen.getByTestId(
        'BillingAddressFormZipCodeField'
      )
      const shippingZipCode = screen.getByTestId(
        'ShippingAddressFormZipCodeField'
      )
      const submitButton = screen.getByTestId('guestCheckoutFormButton')
      act(() => {
        userEvent.click(submitButton)
      })
      await waitFor(() => {
        expect(shippingZipCode).not.toHaveClass('text-feedback-error')
        expect(document.getElementById('shippingSubdivision')).not.toHaveClass(
          'react-select-error'
        )
        expect(billingZipCode).toHaveClass('text-feedback-error')
        expect(document.getElementById('billingSubdivision')).toHaveClass(
          'react-select-error'
        )
      })
    })
  })
})
