import { screen, fireEvent, waitFor } from '@testing-library/react'
import { UpdateAccountDetailsForm } from '../UpdateAccountDetailsForm'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'
import { FeatureFlag } from '~config/constants/feature-flags'
import { customerAddress } from '~domains/account/__mocks__/update-customer-personal-details'

describe(UpdateAccountDetailsForm, () => {
  const onSubmit = jest.fn()
  ;(useRouter as jest.Mock).mockImplementation(() => ({
    asPath: undefined,
    locale: 'pt-pt'
  }))

  describe('When both the address book and account salutation feature flags are enabled', () => {
    beforeEach(() => {
      renderWithStoreAndFeatureFlags(
        <UpdateAccountDetailsForm
          customerSalutation="Mr"
          addressLocale="pt-pt"
          shippingAddress={customerAddress}
          billingAddress={customerAddress}
          onSubmit={onSubmit}
        />,
        {
          featureFlags: {
            [FeatureFlag.ACCOUNT_SALUTATION_FIELD]: true
          }
        }
      )
    })

    it('renders the salutation input field', () => {
      expect(
        screen.getByTestId('UpdateAccountFormSalutation')
      ).toBeInTheDocument()
      expect(
        screen.queryByText('form.field.salutation.label')
      ).toBeInTheDocument()
    })

    it('renders a first name input field', () => {
      expect(
        screen.getByRole('textbox', { name: 'form.field.first-name.label' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('textbox', { name: 'form.field.first-name.label' })
      ).toHaveAttribute('type', 'text')
    })

    it('renders a last name input field', () => {
      expect(
        screen.getByRole('textbox', { name: 'form.field.last-name.label' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('textbox', { name: 'form.field.last-name.label' })
      ).toHaveAttribute('type', 'text')
    })

    it('renders a phone number input field', () => {
      expect(
        screen.getByRole('textbox', { name: 'form.field.phone-number.label' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('textbox', { name: 'form.field.phone-number.label' })
      ).toHaveAttribute('type', 'tel')
    })

    it('the onSubmit function is not called if the form is not completed correctly', async () => {
      const submitButton = screen.getByTestId('UpdateAccountDetailsFormButton')
      fireEvent.click(submitButton)
      await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(0))
    })

    it('the onSubmit function is called if the form is completed correctly', async () => {
      const submitButton = screen.getByTestId('UpdateAccountDetailsFormButton')

      userEvent.type(
        screen.getByTestId('UpdateAccountDetailsFormFirstNameField'),
        'Test'
      )
      userEvent.type(
        screen.getByTestId('UpdateAccountDetailsFormLastNameField'),
        'McTest'
      )
      userEvent.type(
        screen.getByTestId('UpdateAccountDetailsFormPhoneNumberField'),
        '123123123'
      )

      fireEvent.click(document.getElementById('Mr') as HTMLInputElement)

      fireEvent.click(submitButton)
      await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1))
    })
  })

  describe('When the address book feature flag is enabled and there are no addresses', () => {
    beforeEach(() => {
      renderWithStoreAndFeatureFlags(
        <UpdateAccountDetailsForm
          customerSalutation="Mr"
          addressLocale="pt-pt"
          shippingAddress={undefined}
          billingAddress={undefined}
          onSubmit={onSubmit}
        />,
        {
          featureFlags: {
            [FeatureFlag.ACCOUNT_SALUTATION_FIELD]: true
          }
        }
      )
    })

    it('renders the salutation input field', () => {
      expect(
        screen.getByTestId('UpdateAccountFormSalutation')
      ).toBeInTheDocument()
      expect(
        screen.queryByText('form.field.salutation.label')
      ).toBeInTheDocument()
    })

    it('renders a first name input field', () => {
      expect(
        screen.getByRole('textbox', { name: 'form.field.first-name.label' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('textbox', { name: 'form.field.first-name.label' })
      ).toHaveAttribute('type', 'text')
    })

    it('renders a last name input field', () => {
      expect(
        screen.getByRole('textbox', { name: 'form.field.last-name.label' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('textbox', { name: 'form.field.last-name.label' })
      ).toHaveAttribute('type', 'text')
    })

    it('the onSubmit function is not called if the form is not completed correctly', async () => {
      const submitButton = screen.getByTestId('UpdateAccountDetailsFormButton')
      fireEvent.click(submitButton)
      await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(0))
    })

    it('the onSubmit function is called if the form is completed correctly', async () => {
      const submitButton = screen.getByTestId('UpdateAccountDetailsFormButton')

      userEvent.type(
        screen.getByTestId('UpdateAccountDetailsFormFirstNameField'),
        'Test'
      )
      userEvent.type(
        screen.getByTestId('UpdateAccountDetailsFormLastNameField'),
        'McTest'
      )

      fireEvent.click(document.getElementById('Mr') as HTMLInputElement)

      fireEvent.click(submitButton)
      await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1))
    })
  })

  describe('When the optional phone number feature flag is not enabled', () => {
    beforeEach(() => {
      renderWithStoreAndFeatureFlags(
        <UpdateAccountDetailsForm
          customerSalutation="Mr"
          addressLocale="pt-pt"
          shippingAddress={customerAddress}
          billingAddress={customerAddress}
          onSubmit={onSubmit}
        />,
        {
          featureFlags: {
            [FeatureFlag.ACCOUNT_SALUTATION_FIELD]: true,
            [FeatureFlag.ACCOUNT_MAKE_PHONE_NUMBER_FIELD_OPTIONAL]: false
          }
        }
      )
    })

    it('does not submit the form when phone is missing', async () => {
      const submitButton = screen.getByTestId('UpdateAccountDetailsFormButton')
      userEvent.click(document.getElementById('Mr') as HTMLInputElement)
      userEvent.type(
        screen.getByTestId('UpdateAccountDetailsFormFirstNameField'),
        'Test'
      )
      userEvent.type(
        screen.getByTestId('UpdateAccountDetailsFormLastNameField'),
        'McTest'
      )
      userEvent.clear(
        screen.getByTestId('UpdateAccountDetailsFormPhoneNumberField')
      )
      fireEvent.click(submitButton)
      await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(0))
    })

    it('does NOT submit the form when phone exceeded the maximum length', async () => {
      const submitButton = screen.getByTestId('UpdateAccountDetailsFormButton')
      const firstName = screen.getByTestId(
        'UpdateAccountDetailsFormFirstNameField'
      )
      const lastName = screen.getByTestId(
        'UpdateAccountDetailsFormLastNameField'
      )
      const phoneNumber = screen.getByTestId(
        'UpdateAccountDetailsFormPhoneNumberField'
      )

      userEvent.click(document.getElementById('Mr') as HTMLInputElement)
      userEvent.type(
        firstName,
        'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem'
      )
      userEvent.type(
        lastName,
        'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem'
      )
      userEvent.type(
        phoneNumber,
        '1234566789234237864782367486237864786237846237864762384623646237864623648723784672364786782364786237412345667892342378647823674862378647862378462378647623846236462378646236487237846723647867823647862374123456678923423786478236748623786478623784623786476238'
      )
      fireEvent.click(submitButton)
      await waitFor(() => {
        expect(firstName).toHaveClass('text-feedback-error')
        expect(lastName).toHaveClass('text-feedback-error')
        expect(phoneNumber).toHaveClass('text-feedback-error')
        expect(onSubmit).toHaveBeenCalledTimes(0)
      })
    })
  })

  describe('When the optional phone number feature flag is enabled', () => {
    beforeEach(() => {
      renderWithStoreAndFeatureFlags(
        <UpdateAccountDetailsForm
          customerSalutation="Mr"
          addressLocale="pt-pt"
          shippingAddress={customerAddress}
          billingAddress={customerAddress}
          onSubmit={onSubmit}
        />,
        {
          featureFlags: {
            [FeatureFlag.ACCOUNT_SALUTATION_FIELD]: true,
            [FeatureFlag.ACCOUNT_MAKE_PHONE_NUMBER_FIELD_OPTIONAL]: true
          }
        }
      )
    })

    it('does submit the form when phone is missing', async () => {
      const submitButton = screen.getByTestId('UpdateAccountDetailsFormButton')

      userEvent.click(document.getElementById('Mr') as HTMLInputElement)
      userEvent.type(
        screen.getByTestId('UpdateAccountDetailsFormFirstNameField'),
        'Test'
      )
      userEvent.type(
        screen.getByTestId('UpdateAccountDetailsFormLastNameField'),
        'McTest'
      )
      userEvent.clear(
        screen.getByTestId('UpdateAccountDetailsFormPhoneNumberField')
      )
      fireEvent.click(submitButton)
      await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1))
    })
  })

  describe('When the account type is personal and logged in and the store is ES', () => {
    beforeEach(() => {
      ;(useRouter as jest.Mock).mockImplementation(() => ({
        asPath: undefined,
        locale: 'es-es'
      }))

      renderWithStoreAndFeatureFlags(
        <UpdateAccountDetailsForm
          customerSalutation="Mr"
          addressLocale="es-es"
          shippingAddress={customerAddress}
          billingAddress={customerAddress}
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
                    hasPreviousSuccessfulOrder: false,
                    accountType: 'Personal',
                    taxReference: '12345678A'
                  }
                }
              }
            }
          }
        }
      )
    })

    it('sets the tax reference and clears the error assigned to this field', async () => {
      const submitButton = screen.getByTestId('UpdateAccountDetailsFormButton')
      const taxReferenceField = screen.getByTestId(
        'UpdateAccountDetailsFormTaxReferenceField'
      )
      userEvent.type(taxReferenceField, '444A')
      fireEvent.click(submitButton)
      await waitFor(() =>
        expect(taxReferenceField).toHaveClass('text-feedback-error')
      )

      userEvent.type(taxReferenceField, '44444444A')
      await waitFor(() =>
        expect(taxReferenceField).not.toHaveClass('text-feedback-error')
      )
    })
  })
})
