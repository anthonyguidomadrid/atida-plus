import { screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithStoreAndFeatureFlags } from '~test-helpers'
import { FeatureFlag } from '~config/constants/feature-flags'
import { CreateAccountForm, CreateAccountFormProps } from '.'
import { useRouter } from 'next/router'
import { ACCOUNT_TYPE_BUSINESS } from '~config/constants/account-types'
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

describe('Create Account Form - Multiple Steps - Personal Account - Salutation disabled - Portugal', () => {
  ;(useRouter as jest.Mock).mockImplementation(() => ({
    asPath: '/create-account'
  }))
  const onSubmit = jest.fn()

  const setup = (props: Partial<CreateAccountFormProps> = {}) =>
    renderWithStoreAndFeatureFlags(
      <CreateAccountForm onSubmit={onSubmit} {...props} />,
      {
        featureFlags: {
          [FeatureFlag.ACCOUNT_CUSTOMER_CHECK]: true
        }
      }
    )

  beforeEach(() => setup())

  it('shows the personal data step', () => {
    expect(
      screen.queryByText('form.field.salutation.label')
    ).not.toBeInTheDocument()
    expect(screen.getByTestId('createAccountFormFirstName')).toBeInTheDocument()
    expect(screen.getByTestId('createAccountFormLastName')).toBeInTheDocument()
    expect(screen.getByTestId('createAccountFormEmail')).toBeInTheDocument()
    expect(screen.getByTestId('createAccountFormPassword')).toBeInTheDocument()
  })
})

describe('Create Account Form - Multiple Steps - Business Account - Salutation enabled - Portugal', () => {
  const onSubmit = jest.fn()

  const setup = (props: Partial<CreateAccountFormProps> = {}) => {
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      asPath: '/create-account',
      locale: 'pt-pt'
    }))
    return renderWithStoreAndFeatureFlags(
      <CreateAccountForm
        onSubmit={onSubmit}
        accountType="Business"
        {...props}
      />,
      {
        initialState: {
          client: {
            account: {
              ['create-account-progress']: { currentStep: props?.formStep ?? 0 }
            }
          }
        },
        featureFlags: {
          [FeatureFlag.ACCOUNT_SALUTATION_FIELD]: true,
          [FeatureFlag.ACCOUNT_CUSTOMER_CHECK]: true
        }
      }
    )
  }

  beforeEach(() => setup())

  it('shows the personal data step', () => {
    userEvent.click(
      screen.getByTestId('createAccountFormChangeAccountTypeButton')
    )

    expect(
      screen.getByTestId('createAccountFormSalutation')
    ).toBeInTheDocument()
    expect(
      screen.queryByText('form.field.salutation.label')
    ).toBeInTheDocument()
    expect(screen.getByTestId('createAccountFormFirstName')).toBeInTheDocument()
    expect(screen.getByTestId('createAccountFormLastName')).toBeInTheDocument()
    expect(screen.getByTestId('createAccountFormEmail')).toBeInTheDocument()
    expect(screen.getByTestId('createAccountFormPassword')).toBeInTheDocument()
  })

  it('shows the address data step', () => {
    setup({ formStep: 1 })

    expect(screen.getByTestId('AddressFormCompany')).toBeInTheDocument()
    expect(
      screen.getByTestId('AddressFormTaxReferenceBusiness')
    ).toBeInTheDocument()
    expect(
      screen.queryByText('form.field.equivalence-surcharge')
    ).not.toBeInTheDocument()
    expect(
      screen.getByTestId('ShippingAddressFormAddress1')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('ShipppingAddressFormZipCode')
    ).toBeInTheDocument()
    expect(screen.getByTestId('ShippingAddressFormCity')).toBeInTheDocument()
    expect(
      screen.getByTestId('ShippingAddressFormCountryField')
    ).toBeInTheDocument()
    expect(
      document.querySelector('input[name="shipping.subdivision"]')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('ShippingAddressFormHouseNumber')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('ShippingAddressFormAddition')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('createAccountFormPhoneNumber')
    ).toBeInTheDocument()

    userEvent.click(
      screen.getByRole('checkbox', {
        name: 'account.billing-same-as-delivery.label'
      })
    )

    expect(screen.getByTestId('BillingAddressFormAddress1')).toBeInTheDocument()
    expect(
      screen.getByTestId('BillingAddressFormZipCodeField')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('BillingAddressFormCityField')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('BillingAddressFormCountryField')
    ).toBeInTheDocument()
    expect(
      document.querySelector('input[name="billing.subdivision"]')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('BillingAddressFormHouseNumber')
    ).toBeInTheDocument()
    expect(screen.getByTestId('BillingAddressFormAddition')).toBeInTheDocument()
  })

  it('does not validate the corresponding field on blur at Personal Data Step', async () => {
    const firstName = screen.getByTestId('createAccountFormFirstNameField')

    userEvent.click(firstName)
    userEvent.click(screen.getByTestId('createAccountFormLastNameField'))
    await waitFor(() =>
      expect(firstName).not.toHaveClass('text-feedback-error')
    )
  })

  it('validates the corresponding fields on submit and hides the error when focused again at Personal Data Step', async () => {
    const submitButton = screen.getByTestId('createAccountFormContinueButton')
    const salutation = document.getElementById('Ms')
    const firstName = screen.getByTestId('createAccountFormFirstNameField')
    const lastName = screen.getByTestId('createAccountFormLastNameField')
    const email = screen.getByTestId('createAccountFormEmailField')
    const password = screen.getByTestId('passwordField')

    userEvent.click(submitButton)

    await waitFor(() => {
      expect(document.getElementById('salutation_error')).toBeInTheDocument()
      expect(firstName).toHaveClass('text-feedback-error')
      expect(lastName).toHaveClass('text-feedback-error')
      expect(email).toHaveClass('text-feedback-error')
      expect(password).toHaveClass('text-feedback-error')
    })

    userEvent.click(salutation as HTMLInputElement)
    userEvent.click(firstName)
    userEvent.click(lastName)
    userEvent.click(email)
    userEvent.click(password)

    userEvent.click(submitButton)

    await waitFor(() => {
      expect(
        document.getElementById('salutation_error')
      ).not.toBeInTheDocument()
      expect(firstName).not.toHaveClass('text-feedback-error')
      expect(lastName).not.toHaveClass('text-feedback-error')
      expect(email).not.toHaveClass('text-feedback-error')
      expect(password).not.toHaveClass('text-feedback-error')
    })
  })

  it('it continues to Address Data Step when all fields are valid on Personal Data Step', async () => {
    const submitButton = screen.getByTestId('createAccountFormContinueButton')
    const salutation = document.getElementById('Ms')
    const firstName = screen.getByTestId('createAccountFormFirstNameField')
    const lastName = screen.getByTestId('createAccountFormLastNameField')
    const email = screen.getByTestId('createAccountFormEmailField')
    const password = screen.getByTestId('passwordField')

    userEvent.click(salutation as HTMLInputElement)
    userEvent.type(firstName, 'First Name')
    userEvent.type(lastName, 'Last Name')
    userEvent.type(email, 'email@email.com')
    userEvent.type(password, '123qweQWE.')
    userEvent.click(submitButton)

    await waitFor(() => {
      expect(salutation).not.toHaveClass('text-feedback-error')
    })
  })

  it('does not validate the corresponding field on blur at Address Data Step', async () => {
    setup({ formStep: 1 })

    const company = screen.getByTestId('AddressFormCompanyField')

    userEvent.click(company)
    userEvent.click(screen.getByTestId('AddressFormTaxReferenceBusinessField'))
    await waitFor(() => expect(company).not.toHaveClass('text-feedback-error'))
  })

  it('validates the corresponding fields on submit and hides the error when focused again at Address Data Step', async () => {
    setup({ formStep: 1 })
    const submitButton = screen.getByTestId('createAccountFormButton')
    const companyName = screen.getByTestId('AddressFormCompanyField')
    const taxReference = screen.getByTestId(
      'AddressFormTaxReferenceBusinessField'
    )
    const address = screen.getByTestId('ShippingAddressFormAddress1Field')
    const houseNumber = screen.getByTestId(
      'ShippingAddressFormHouseNumberField'
    )
    const zipCode = screen.getByTestId('ShippingAddressFormZipCodeField')
    const city = screen.getByTestId('ShippingAddressFormCityField')
    const subdivision = document.querySelector(
      'input[name="shipping.subdivision"]'
    )
    const phoneNumber = screen.getByTestId('createAccountFormPhoneNumberField')

    userEvent.click(submitButton)

    await waitFor(() => {
      expect(companyName).toHaveClass('text-feedback-error')
      expect(taxReference).toHaveClass('text-feedback-error')
      expect(address).toHaveClass('text-feedback-error')
      expect(houseNumber).toHaveClass('text-feedback-error')
      expect(zipCode).toHaveClass('text-feedback-error')
      expect(city).toHaveClass('text-feedback-error')
      expect(phoneNumber).toHaveClass('text-feedback-error')
      expect(document.getElementById('shippingSubdivision')).toHaveClass(
        'react-select-error'
      )
    })

    userEvent.click(companyName)
    userEvent.click(taxReference)
    userEvent.click(address)
    await select(subdivision as HTMLElement, 'Lisboa')
    userEvent.click(houseNumber)
    userEvent.click(zipCode)
    userEvent.click(city)
    userEvent.click(phoneNumber)

    await waitFor(() => {
      expect(companyName).not.toHaveClass('text-feedback-error')
      expect(taxReference).not.toHaveClass('text-feedback-error')
      expect(address).not.toHaveClass('text-feedback-error')
      expect(houseNumber).not.toHaveClass('text-feedback-error')
      expect(zipCode).not.toHaveClass('text-feedback-error')
      expect(city).not.toHaveClass('text-feedback-error')
      expect(phoneNumber).not.toHaveClass('text-feedback-error')
      expect(document.getElementById('shippingSubdivision')).not.toHaveClass(
        'react-select-error'
      )
    })
  })

  it('shows password', () => {
    const passwordField = screen.getByTestId('passwordField')
    expect(passwordField).toHaveAttribute('type', 'password')
    const showButton = screen.getByTestId('togglePassword')
    fireEvent.change(passwordField, { target: { value: 'test' } })
    userEvent.click(showButton)
    expect(passwordField).toHaveAttribute('type', 'text')
  })

  it('the onSubmit function is not called on the first step', async () => {
    const submitButton = screen.getByTestId('createAccountFormContinueButton')
    userEvent.click(submitButton)
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(0))
  })
})

describe('Create Account Form - Multiple Steps - Business Account - Salutation disabled - Portugal', () => {
  ;(useRouter as jest.Mock).mockImplementation(() => ({
    asPath: '/create-account'
  }))
  const onSubmit = jest.fn()

  const setup = (props: Partial<CreateAccountFormProps> = {}) =>
    renderWithStoreAndFeatureFlags(
      <CreateAccountForm
        onSubmit={onSubmit}
        accountType="Business"
        {...props}
      />,
      {
        initialState: {
          client: {
            account: {
              ['create-account-progress']: { currentStep: props?.formStep ?? 0 }
            }
          }
        },
        featureFlags: {
          [FeatureFlag.ACCOUNT_CUSTOMER_CHECK]: true
        }
      }
    )

  beforeEach(() => setup())

  it('shows the personal data step', () => {
    userEvent.click(
      screen.getByTestId('createAccountFormChangeAccountTypeButton')
    )

    expect(
      screen.queryByText('form.field.salutation.label')
    ).not.toBeInTheDocument()
    expect(screen.getByTestId('createAccountFormFirstName')).toBeInTheDocument()
    expect(screen.getByTestId('createAccountFormLastName')).toBeInTheDocument()
    expect(screen.getByTestId('createAccountFormEmail')).toBeInTheDocument()
    expect(screen.getByTestId('createAccountFormPassword')).toBeInTheDocument()
  })
})

describe('Create Account Form - Multiple Steps - Business Account - Salutation enabled - Spain', () => {
  const onSubmit = jest.fn()

  const setup = (props: Partial<CreateAccountFormProps> = {}) => {
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      asPath: '/create-account',
      locale: 'es-es'
    }))

    renderWithStoreAndFeatureFlags(
      <CreateAccountForm
        onSubmit={onSubmit}
        accountType="Business"
        {...props}
      />,
      {
        initialState: {
          client: {
            account: {
              ['create-account-progress']: { currentStep: props?.formStep ?? 0 }
            }
          }
        },
        featureFlags: {
          [FeatureFlag.ACCOUNT_SALUTATION_FIELD]: true,
          [FeatureFlag.ACCOUNT_CUSTOMER_CHECK]: true
        }
      }
    )
  }

  beforeEach(() => setup())

  it('shows the personal data step', () => {
    userEvent.click(
      screen.getByTestId('createAccountFormChangeAccountTypeButton')
    )

    expect(
      screen.getByTestId('createAccountFormSalutation')
    ).toBeInTheDocument()
    expect(
      screen.queryByText('form.field.salutation.label')
    ).toBeInTheDocument()
    expect(screen.getByTestId('createAccountFormFirstName')).toBeInTheDocument()
    expect(screen.getByTestId('createAccountFormLastName')).toBeInTheDocument()
    expect(screen.getByTestId('createAccountFormEmail')).toBeInTheDocument()
    expect(screen.getByTestId('createAccountFormPassword')).toBeInTheDocument()
  })

  it('shows the address data step', () => {
    setup({ formStep: 1 })

    expect(screen.getByTestId('AddressFormCompany')).toBeInTheDocument()
    expect(
      screen.getByTestId('AddressFormTaxReferenceBusiness')
    ).toBeInTheDocument()
    expect(
      screen.queryByText('form.field.equivalence-surcharge')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('ShippingAddressFormAddress1')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('ShipppingAddressFormZipCode')
    ).toBeInTheDocument()
    expect(screen.getByTestId('ShippingAddressFormCity')).toBeInTheDocument()
    expect(
      screen.getByTestId('ShippingAddressFormCountryField')
    ).toBeInTheDocument()
    expect(
      document.querySelector('input[name="shipping.subdivision"]')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('ShippingAddressFormHouseNumber')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('ShippingAddressFormAddition')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('createAccountFormPhoneNumber')
    ).toBeInTheDocument()

    userEvent.click(
      screen.getByRole('checkbox', {
        name: 'account.billing-same-as-delivery.label'
      })
    )

    expect(screen.getByTestId('BillingAddressFormAddress1')).toBeInTheDocument()
    expect(
      screen.getByTestId('BillingAddressFormZipCodeField')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('BillingAddressFormCityField')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('BillingAddressFormCountryField')
    ).toBeInTheDocument()
    expect(
      document.querySelector('input[name="billing.subdivision"]')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('BillingAddressFormHouseNumber')
    ).toBeInTheDocument()
    expect(screen.getByTestId('BillingAddressFormAddition')).toBeInTheDocument()
  })

  it('does not validate the corresponding field on blur at Personal Data Step', async () => {
    const firstName = screen.getByTestId('createAccountFormFirstNameField')

    userEvent.click(firstName)
    userEvent.click(screen.getByTestId('createAccountFormLastNameField'))
    await waitFor(() =>
      expect(firstName).not.toHaveClass('text-feedback-error')
    )
  })

  it('validates the corresponding fields on submit and hides the error when focused again at Personal Data Step', async () => {
    const submitButton = screen.getByTestId('createAccountFormContinueButton')
    const salutation = document.getElementById('Ms')
    const firstName = screen.getByTestId('createAccountFormFirstNameField')
    const lastName = screen.getByTestId('createAccountFormLastNameField')
    const email = screen.getByTestId('createAccountFormEmailField')
    const password = screen.getByTestId('passwordField')

    userEvent.click(submitButton)

    await waitFor(() => {
      expect(document.getElementById('salutation_error')).toBeInTheDocument()
      expect(firstName).toHaveClass('text-feedback-error')
      expect(lastName).toHaveClass('text-feedback-error')
      expect(email).toHaveClass('text-feedback-error')
      expect(password).toHaveClass('text-feedback-error')
    })

    userEvent.click(salutation as HTMLInputElement)
    userEvent.click(firstName)
    userEvent.click(lastName)
    userEvent.click(email)
    userEvent.click(password)

    userEvent.click(submitButton)

    await waitFor(() => {
      expect(
        document.getElementById('salutation_error')
      ).not.toBeInTheDocument()
      expect(firstName).not.toHaveClass('text-feedback-error')
      expect(lastName).not.toHaveClass('text-feedback-error')
      expect(email).not.toHaveClass('text-feedback-error')
      expect(password).not.toHaveClass('text-feedback-error')
    })
  })

  it('it continues to Address Data Step when all fields are valid on Personal Data Step', async () => {
    const submitButton = screen.getByTestId('createAccountFormContinueButton')
    const salutation = document.getElementById('Ms')
    const firstName = screen.getByTestId('createAccountFormFirstNameField')
    const lastName = screen.getByTestId('createAccountFormLastNameField')
    const email = screen.getByTestId('createAccountFormEmailField')
    const password = screen.getByTestId('passwordField')

    userEvent.click(salutation as HTMLInputElement)
    userEvent.type(firstName, 'First Name')
    userEvent.type(lastName, 'Last Name')
    userEvent.type(email, 'email@email.com')
    userEvent.type(password, '123qweQWE.')
    userEvent.click(submitButton)

    await waitFor(() => {
      expect(salutation).not.toHaveClass('text-feedback-error')
    })
  })

  it('does not validate the corresponding field on blur at Address Data Step', async () => {
    setup({ formStep: 1 })

    const company = screen.getByTestId('AddressFormCompanyField')

    userEvent.click(company)
    userEvent.click(screen.getByTestId('AddressFormTaxReferenceBusinessField'))
    await waitFor(() => expect(company).not.toHaveClass('text-feedback-error'))
  })

  it('validates the corresponding fields on submit and hides the error when focused again at Address Data Step', async () => {
    setup({ formStep: 1 })
    const submitButton = screen.getByTestId('createAccountFormButton')
    const companyName = screen.getByTestId('AddressFormCompanyField')
    const taxReference = screen.getByTestId(
      'AddressFormTaxReferenceBusinessField'
    )
    const address = screen.getByTestId('ShippingAddressFormAddress1Field')
    const houseNumber = screen.getByTestId(
      'ShippingAddressFormHouseNumberField'
    )
    const zipCode = screen.getByTestId('ShippingAddressFormZipCodeField')
    const city = screen.getByTestId('ShippingAddressFormCityField')
    const phoneNumber = screen.getByTestId('createAccountFormPhoneNumberField')
    const subdivision = document.querySelector(
      'input[name="shipping.subdivision"]'
    )

    userEvent.click(submitButton)

    await waitFor(() => {
      expect(companyName).toHaveClass('text-feedback-error')
      expect(taxReference).toHaveClass('text-feedback-error')
      expect(address).toHaveClass('text-feedback-error')
      expect(houseNumber).toHaveClass('text-feedback-error')
      expect(zipCode).toHaveClass('text-feedback-error')
      expect(city).toHaveClass('text-feedback-error')
      expect(phoneNumber).toHaveClass('text-feedback-error')
      expect(document.getElementById('shippingSubdivision')).toHaveClass(
        'react-select-error'
      )
    })

    userEvent.click(companyName)
    userEvent.click(taxReference)
    userEvent.click(address)
    await select(subdivision as HTMLElement, 'Madrid')
    userEvent.click(houseNumber)
    userEvent.click(zipCode)
    userEvent.click(city)
    userEvent.click(phoneNumber)

    await waitFor(() => {
      expect(companyName).not.toHaveClass('text-feedback-error')
      expect(taxReference).not.toHaveClass('text-feedback-error')
      expect(address).not.toHaveClass('text-feedback-error')
      expect(houseNumber).not.toHaveClass('text-feedback-error')
      expect(zipCode).not.toHaveClass('text-feedback-error')
      expect(city).not.toHaveClass('text-feedback-error')
      expect(phoneNumber).not.toHaveClass('text-feedback-error')
      expect(document.getElementById('shippingSubdivision')).not.toHaveClass(
        'react-select-error'
      )
    })
  })

  it('shows the equivalence surcharge disabled if specific district selected', async () => {
    setup({ formStep: 1 })

    expect(
      screen.getByTestId('AddressFormEquivalenceSurcharge')
    ).toBeInTheDocument()
    expect(
      screen
        .getByTestId('equivalenceSurchargeCheckbox')
        .getElementsByTagName('input')[0]
    ).not.toHaveAttribute('disabled')
    expect(
      screen.queryByText(
        'account.address-form.equivalence-surcharge-disabled.content'
      )
    ).not.toBeInTheDocument()
    await select(
      document.querySelector(
        'input[name="shipping.subdivision"]'
      ) as HTMLElement,
      'Las Palmas'
    )
    const surchargeButton = screen.getByTestId('equivalenceSurchargeCheckbox')
    userEvent.click(surchargeButton)
    await waitFor(() => {
      expect(
        screen
          .getByTestId('equivalenceSurchargeCheckbox')
          .getElementsByTagName('input')[0]
      ).toHaveAttribute('disabled')
      expect(
        screen.queryByText(
          'account.address-form.equivalence-surcharge-disabled.content'
        )
      ).toBeInTheDocument()
    })
  })

  it('validates phone number format', async () => {
    setup({ formStep: 1 })

    const continueButton = screen.getByTestId('createAccountFormButton')
    const phoneNumber = screen.getByTestId('createAccountFormPhoneNumberField')

    /* Validates and fails - scenario 1 */
    userEvent.type(phoneNumber, '222')
    userEvent.click(continueButton)
    await waitFor(() => {
      expect(phoneNumber).toHaveValue('222')
      expect(phoneNumber).toHaveClass('text-feedback-error')
    })

    /* Validates and fails - scenario 2 */
    userEvent.clear(phoneNumber)
    userEvent.type(phoneNumber, '222 3')
    userEvent.click(continueButton)
    await waitFor(() => {
      expect(phoneNumber).toHaveValue('222 3')
      expect(phoneNumber).toHaveClass('text-feedback-error')
    })

    /* Validates and fails - scenario 3 */
    userEvent.clear(phoneNumber)
    userEvent.type(phoneNumber, ' 222 3')
    userEvent.click(continueButton)
    await waitFor(() => {
      expect(phoneNumber).toHaveValue(' 222 3')
      expect(phoneNumber).toHaveClass('text-feedback-error')
    })

    /* Validates and passes - scenario 1 */
    userEvent.clear(phoneNumber)
    userEvent.type(phoneNumber, ' 222123411234')
    userEvent.click(continueButton)
    await waitFor(() => {
      expect(phoneNumber).toHaveValue(' 222123411234')
      expect(phoneNumber).not.toHaveClass('text-feedback-error')
    })

    /* Validates and passes - scenario 2 */
    userEvent.clear(phoneNumber)
    userEvent.type(phoneNumber, ' 2 22123411234')
    userEvent.click(continueButton)
    await waitFor(() => {
      expect(phoneNumber).toHaveValue(' 2 22123411234')
      expect(phoneNumber).not.toHaveClass('text-feedback-error')
    })

    /* Validates and passes - scenario 3 */
    userEvent.clear(phoneNumber)
    userEvent.type(phoneNumber, ' 2 2212341123 4')
    userEvent.click(continueButton)
    await waitFor(() => {
      expect(phoneNumber).toHaveValue(' 2 2212341123 4')
      expect(phoneNumber).not.toHaveClass('text-feedback-error')
    })

    /* Validates and passes - scenario 4 */
    userEvent.clear(phoneNumber)
    userEvent.type(phoneNumber, ' 2 221234 1123 4')
    userEvent.click(continueButton)
    await waitFor(() => {
      expect(phoneNumber).toHaveValue(' 2 221234 1123 4')
      expect(phoneNumber).not.toHaveClass('text-feedback-error')
    })

    /* Validates and passes - scenario 5 */
    userEvent.clear(phoneNumber)
    userEvent.type(phoneNumber, ' 2 221234  1123 4')
    userEvent.click(continueButton)
    await waitFor(() => {
      expect(phoneNumber).toHaveValue(' 2 221234  1123 4')
      expect(phoneNumber).not.toHaveClass('text-feedback-error')
    })

    /* Validates and passes - scenario 6 */
    userEvent.clear(phoneNumber)
    userEvent.type(phoneNumber, ' 2 221234  1123 4 ')
    userEvent.click(continueButton)
    await waitFor(() => {
      expect(phoneNumber).toHaveValue(' 2 221234  1123 4 ')
      expect(phoneNumber).not.toHaveClass('text-feedback-error')
    })

    /* Validates and passes - scenario 7 */
    userEvent.clear(phoneNumber)
    userEvent.type(phoneNumber, ' 2 2 2 1 2 3 4  1 1 2 3 4 ')
    userEvent.click(continueButton)
    await waitFor(() => {
      expect(phoneNumber).toHaveValue(' 2 2 2 1 2 3 4  1 1 2 3 4 ')
      expect(phoneNumber).not.toHaveClass('text-feedback-error')
    })

    /* Validates and passes - scenario 8 */
    userEvent.clear(phoneNumber)
    userEvent.type(phoneNumber, '2221-2341234')
    userEvent.click(continueButton)
    await waitFor(() => {
      expect(phoneNumber).toHaveValue('2221-2341234')
      expect(phoneNumber).not.toHaveClass('text-feedback-error')
    })

    /* Validates and passes - scenario 9 */
    userEvent.clear(phoneNumber)
    userEvent.type(phoneNumber, '2221-234-1234')
    userEvent.click(continueButton)
    await waitFor(() => {
      expect(phoneNumber).toHaveValue('2221-234-1234')
      expect(phoneNumber).not.toHaveClass('text-feedback-error')
    })
  }, 10000)

  it('validates CIF/NIF/NIE', async () => {
    setup({ formStep: 1 })

    const submitButton = screen.getByTestId('createAccountFormButton')

    const companyName = screen.getByTestId('AddressFormCompanyField')
    const taxReference = screen.getByTestId(
      'AddressFormTaxReferenceBusinessField'
    )
    const address = screen.getByTestId('ShippingAddressFormAddress1Field')
    const houseNumber = screen.getByTestId(
      'ShippingAddressFormHouseNumberField'
    )
    const zipCode = screen.getByTestId('ShippingAddressFormZipCodeField')
    const city = screen.getByTestId('ShippingAddressFormCityField')
    const subdivision = document.querySelector(
      'input[name="shipping.subdivision"]'
    )

    userEvent.type(companyName, 'Company Name')
    userEvent.type(address, 'Address')
    userEvent.type(houseNumber, '55')
    userEvent.type(zipCode, '12345')
    userEvent.type(city, 'Alabcete')
    await select(subdivision as HTMLElement, 'Albacete')

    /* Validates NIF and fails - scenario 1 */
    userEvent.type(taxReference, '12345678')
    userEvent.click(submitButton)
    await waitFor(() => {
      expect(taxReference).toHaveValue('12345678')
      expect(taxReference).toHaveClass('text-feedback-error')
    })

    /* Validates NIF and fails - scenario 2 */
    userEvent.clear(taxReference)
    userEvent.type(taxReference, '12345678AAA')
    userEvent.click(submitButton)
    await waitFor(() => {
      expect(taxReference).toHaveValue('12345678AAA')
      expect(taxReference).toHaveClass('text-feedback-error')
    })

    /* Validates NIF and passes */
    userEvent.clear(taxReference)
    userEvent.type(taxReference, '12345678A')
    userEvent.click(submitButton)
    await waitFor(() => {
      expect(taxReference).toHaveValue('12345678A')
      expect(taxReference).not.toHaveClass('text-feedback-error')
    })

    /* Validates CIF and fails - scenario 1 */
    userEvent.clear(taxReference)
    userEvent.type(taxReference, 'B123456789')
    userEvent.click(submitButton)
    await waitFor(() => {
      expect(taxReference).toHaveValue('B123456789')
      expect(taxReference).toHaveClass('text-feedback-error')
    })

    /* Validates CIF and fails - scenario 2 */
    userEvent.clear(taxReference)
    userEvent.type(taxReference, 'B123456789AAA')
    userEvent.click(submitButton)
    await waitFor(() => {
      expect(taxReference).toHaveValue('B123456789AAA')
      expect(taxReference).toHaveClass('text-feedback-error')
    })

    /* Validates CIF and passes */
    userEvent.clear(taxReference)
    userEvent.type(taxReference, 'B12345678')
    userEvent.click(submitButton)
    await waitFor(() => {
      expect(taxReference).toHaveValue('B12345678')
      expect(taxReference).not.toHaveClass('text-feedback-error')
    })

    /* Validates NIE and fails - scenario 1 */
    userEvent.clear(taxReference)
    userEvent.type(taxReference, 'X123456789')
    userEvent.click(submitButton)
    await waitFor(() => {
      expect(taxReference).toHaveValue('X123456789')
      expect(taxReference).toHaveClass('text-feedback-error')
    })

    /* Validates NIE and fails - scenario 2 */
    userEvent.clear(taxReference)
    userEvent.type(taxReference, 'X123456789AAA')
    userEvent.click(submitButton)
    await waitFor(() => {
      expect(taxReference).toHaveValue('X123456789AAA')
      expect(taxReference).toHaveClass('text-feedback-error')
    })

    /* Validates NIE passes */
    userEvent.clear(taxReference)
    userEvent.type(taxReference, 'X123456789A')
    userEvent.click(submitButton)
    await waitFor(() => {
      expect(taxReference).toHaveValue('X123456789A')
      expect(taxReference).not.toHaveClass('text-feedback-error')
    })

    /* Validates NIF/CIF/NIE and fails*/
    userEvent.clear(taxReference)
    userEvent.type(taxReference, 'AASS12345678')
    userEvent.click(submitButton)
    await waitFor(() => {
      expect(taxReference).toHaveValue('AASS12345678')
      expect(taxReference).toHaveClass('text-feedback-error')
    })
  }, 10000)

  it('shows password', () => {
    const passwordField = screen.getByTestId('passwordField')
    expect(passwordField).toHaveAttribute('type', 'password')
    const showButton = screen.getByTestId('togglePassword')
    fireEvent.change(passwordField, { target: { value: 'test' } })
    userEvent.click(showButton)
    expect(passwordField).toHaveAttribute('type', 'text')
  })

  it('the onSubmit function is not called on the first step', async () => {
    const submitButton = screen.getByTestId('createAccountFormContinueButton')
    userEvent.click(submitButton)
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(0))
  })
})

describe('Create Account Form - Multiple Steps - Business Account - Salutation disabled - Spain', () => {
  const onSubmit = jest.fn()

  const setup = (props: Partial<CreateAccountFormProps> = {}) => {
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      asPath: '/create-account',
      locale: 'es-es'
    }))

    renderWithStoreAndFeatureFlags(
      <CreateAccountForm
        onSubmit={onSubmit}
        accountType="Business"
        {...props}
      />,
      {
        initialState: {
          client: {
            account: {
              ['create-account-progress']: { currentStep: props?.formStep ?? 0 }
            }
          }
        },
        featureFlags: {
          [FeatureFlag.ACCOUNT_CUSTOMER_CHECK]: true
        }
      }
    )
  }

  beforeEach(() => setup())

  it('shows the personal data step', () => {
    userEvent.click(
      screen.getByTestId('createAccountFormChangeAccountTypeButton')
    )

    expect(
      screen.queryByText('form.field.salutation.label')
    ).not.toBeInTheDocument()
    expect(screen.getByTestId('createAccountFormFirstName')).toBeInTheDocument()
    expect(screen.getByTestId('createAccountFormLastName')).toBeInTheDocument()
    expect(screen.getByTestId('createAccountFormEmail')).toBeInTheDocument()
    expect(screen.getByTestId('createAccountFormPassword')).toBeInTheDocument()
  })
})

describe('Create Account Form - Multiple Steps - Personal Account - Fields validation failure for length - Spain', () => {
  const onSubmit = jest.fn()

  const setup = (props: Partial<CreateAccountFormProps> = {}) => {
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      asPath: '/create-account',
      locale: 'es-es'
    }))

    renderWithStoreAndFeatureFlags(
      <CreateAccountForm onSubmit={onSubmit} {...props} />,
      {
        initialState: {
          client: {
            account: {
              ['create-account-progress']: { currentStep: props?.formStep ?? 0 }
            }
          }
        },
        featureFlags: {
          [FeatureFlag.ACCOUNT_SALUTATION_FIELD]: true,
          [FeatureFlag.ACCOUNT_CUSTOMER_CHECK]: true
        }
      }
    )
  }

  beforeEach(() => setup())

  it('should NOT submit the form if length validation fails at personal data step', async () => {
    const submitButton = screen.getByTestId('createAccountFormContinueButton')
    const salutation = document.getElementById('Ms')
    const firstName = screen.getByTestId('createAccountFormFirstNameField')
    const lastName = screen.getByTestId('createAccountFormLastNameField')
    const email = screen.getByTestId('createAccountFormEmailField')
    const password = screen.getByTestId('passwordField')

    userEvent.click(salutation as HTMLInputElement)
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
      password,
      '123qweQWEklsdfksdFSDFsdfjskdjfsdFSDFsdlkfjhsdFSDFsdlfjkskldjfklsdfsdFSDF.'
    )
    userEvent.click(submitButton)

    await waitFor(() => {
      expect(firstName).toHaveClass('text-feedback-error')
      expect(lastName).toHaveClass('text-feedback-error')
      expect(password).toHaveClass('text-feedback-error')
    })
  })

  it('should NOT submit the form if length validation fails at address data step', async () => {
    setup({ formStep: 1 })
    const submitButton = screen.getByTestId('createAccountFormButton')
    const address = screen.getByTestId('ShippingAddressFormAddress1Field')
    const houseNumber = screen.getByTestId(
      'ShippingAddressFormHouseNumberField'
    )
    const zipCode = screen.getByTestId('ShippingAddressFormZipCodeField')
    const city = screen.getByTestId('ShippingAddressFormCityField')
    const phoneNumber = screen.getByTestId('createAccountFormPhoneNumberField')
    const subdivision = document.querySelector(
      'input[name="shipping.subdivision"]'
    )

    userEvent.type(
      address,
      'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem'
    )
    userEvent.type(
      houseNumber,
      '12345667892342378647823674862378647862378462378647623846236462378646236487237846723647867823647862374'
    )
    userEvent.type(zipCode, 'HUN')
    userEvent.type(
      city,
      'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem'
    )
    userEvent.type(
      phoneNumber,
      '1234566789234237864782367486237864786237846237864762384623646237864623648723784672364786782364786237412345667892342378647823674862378647862378462378647623846236462378646236487237846723647867823647862374123456678923423786478236748623786478623784623786476238'
    )
    await select(subdivision as HTMLElement, 'Las Palmas')
    userEvent.click(submitButton)

    await waitFor(() => {
      expect(address).toHaveClass('text-feedback-error')
      expect(houseNumber).toHaveClass('text-feedback-error')
      expect(zipCode).toHaveClass('text-feedback-error')
      expect(city).toHaveClass('text-feedback-error')
      expect(phoneNumber).toHaveClass('text-feedback-error')
      expect(document.getElementById('shippingSubdivision')).not.toHaveClass(
        'react-select-error'
      )
    })
  })
})

describe('Create Account Form Multiple Steps - Personal Account - Clear error from fields on change', () => {
  const onSubmit = jest.fn()

  const setup = (props: Partial<CreateAccountFormProps> = {}) => {
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      asPath: '/create-account',
      locale: 'es-es'
    }))

    renderWithStoreAndFeatureFlags(
      <CreateAccountForm onSubmit={onSubmit} {...props} />,
      {
        initialState: {
          client: {
            account: {
              ['create-account-progress']: { currentStep: props?.formStep ?? 0 }
            }
          }
        },
        featureFlags: {
          [FeatureFlag.ACCOUNT_SALUTATION_FIELD]: true,
          [FeatureFlag.ACCOUNT_CUSTOMER_CHECK]: true
        }
      }
    )
  }

  beforeEach(() => setup())

  it('should clear the field error when field is filled up at personal data step', async () => {
    const submitButton = screen.getByTestId('createAccountFormContinueButton')
    const salutation = document.getElementById('Ms')
    const firstName = screen.getByTestId('createAccountFormFirstNameField')
    const lastName = screen.getByTestId('createAccountFormLastNameField')
    const email = screen.getByTestId('createAccountFormEmailField')
    const password = screen.getByTestId('passwordField')
    userEvent.click(salutation as HTMLInputElement)
    userEvent.click(submitButton)

    await waitFor(() => {
      expect(firstName).toHaveClass('text-feedback-error')
      expect(lastName).toHaveClass('text-feedback-error')
      expect(email).toHaveClass('text-feedback-error')
      expect(password).toHaveClass('text-feedback-error')
    })

    userEvent.type(firstName, 'firstName')
    userEvent.type(lastName, 'lastName.')
    userEvent.type(email, 'email@email.com')
    userEvent.type(password, '123qweQWE.')

    await waitFor(() => {
      expect(firstName).not.toHaveClass('text-feedback-error')
      expect(lastName).not.toHaveClass('text-feedback-error')
      expect(email).not.toHaveClass('text-feedback-error')
      expect(password).not.toHaveClass('text-feedback-error')
    })
  })

  it('should clear the field error when field is filled up at address data step', async () => {
    setup({ formStep: 1 })
    const submitButton = screen.getByTestId('createAccountFormButton')
    const address = screen.getByTestId('ShippingAddressFormAddress1Field')
    const houseNumber = screen.getByTestId(
      'ShippingAddressFormHouseNumberField'
    )
    const zipCode = screen.getByTestId('ShippingAddressFormZipCodeField')
    const city = screen.getByTestId('ShippingAddressFormCityField')
    const phoneNumber = screen.getByTestId('createAccountFormPhoneNumberField')

    userEvent.click(
      screen.getByRole('checkbox', {
        name: 'account.billing-same-as-delivery.label'
      })
    )

    const billingAddress = screen.getByTestId('BillingAddressFormAddress1Field')
    const billingZipCode = screen.getByTestId('BillingAddressFormZipCodeField')
    const billingHouseNumber = screen.getByTestId(
      'BillingAddressFormHouseNumberField'
    )

    userEvent.click(submitButton)

    await waitFor(() => {
      expect(address).toHaveClass('text-feedback-error')
      expect(houseNumber).toHaveClass('text-feedback-error')
      expect(zipCode).toHaveClass('text-feedback-error')
      expect(city).toHaveClass('text-feedback-error')
      expect(phoneNumber).toHaveClass('text-feedback-error')
      expect(billingAddress).toHaveClass('text-feedback-error')
      expect(billingHouseNumber).toHaveClass('text-feedback-error')
      expect(billingZipCode).toHaveClass('text-feedback-error')
    })

    userEvent.type(address, 'Address')
    userEvent.type(houseNumber, '74')
    userEvent.type(zipCode, 'HUN')
    userEvent.type(city, 'City')
    userEvent.type(phoneNumber, '1234567899')
    userEvent.type(billingAddress, 'Billing Address')
    userEvent.type(billingHouseNumber, '47')
    userEvent.type(billingZipCode, 'NUH')

    await waitFor(() => {
      expect(address).not.toHaveClass('text-feedback-error')
      expect(houseNumber).not.toHaveClass('text-feedback-error')
      expect(zipCode).not.toHaveClass('text-feedback-error')
      expect(city).not.toHaveClass('text-feedback-error')
      expect(phoneNumber).not.toHaveClass('text-feedback-error')
      expect(billingAddress).not.toHaveClass('text-feedback-error')
      expect(billingHouseNumber).not.toHaveClass('text-feedback-error')
      expect(billingZipCode).not.toHaveClass('text-feedback-error')
    })
  })
})

describe('Create Account Form Multiple Steps - Business Account - Clear error from fields on change', () => {
  const onSubmit = jest.fn()

  const setup = (props: Partial<CreateAccountFormProps> = {}) => {
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      asPath: '/create-account',
      locale: 'es-es'
    }))

    renderWithStoreAndFeatureFlags(
      <CreateAccountForm onSubmit={onSubmit} {...props} />,
      {
        initialState: {
          client: {
            account: {
              ['create-account-progress']: { currentStep: props?.formStep ?? 0 }
            }
          }
        },
        featureFlags: {
          [FeatureFlag.ACCOUNT_SALUTATION_FIELD]: true,
          [FeatureFlag.ACCOUNT_CUSTOMER_CHECK]: true
        }
      }
    )
  }

  beforeEach(() => setup())

  it('should clear the field error when field is filled up at address data step', async () => {
    setup({ accountType: ACCOUNT_TYPE_BUSINESS, formStep: 1 })
    const submitButton = screen.getByTestId('createAccountFormButton')
    const address = screen.getByTestId('AddressFormCompanyField')
    const taxReference = screen.getByTestId(
      'AddressFormTaxReferenceBusinessField'
    )
    userEvent.click(submitButton)

    await waitFor(() => {
      expect(address).toHaveClass('text-feedback-error')
      expect(taxReference).toHaveClass('text-feedback-error')
    })

    userEvent.type(address, 'address')
    userEvent.type(taxReference, 'taxReference')
    await waitFor(() => {
      expect(address).not.toHaveClass('text-feedback-error')
      expect(taxReference).not.toHaveClass('text-feedback-error')
    })
  })
})

describe('Create Account Form - Multiple Steps - Personal Account - Optional Phone number', () => {
  ;(useRouter as jest.Mock).mockImplementation(() => ({
    asPath: '/create-account'
  }))
  const onSubmit = jest.fn()

  const setup = (props: Partial<CreateAccountFormProps> = {}) =>
    renderWithStoreAndFeatureFlags(
      <CreateAccountForm onSubmit={onSubmit} {...props} />,
      {
        initialState: {
          client: {
            account: {
              ['create-account-progress']: { currentStep: 1 }
            }
          }
        },
        featureFlags: {
          [FeatureFlag.ACCOUNT_MAKE_PHONE_NUMBER_FIELD_OPTIONAL]: true
        }
      }
    )

  beforeEach(() => setup())

  it('should not set error to phone number when submiting empty field', () => {
    const phoneNumber = screen.getByTestId('createAccountFormPhoneNumberField')
    const submitButton = screen.getByTestId('createAccountFormButton')
    userEvent.click(submitButton)
    expect(phoneNumber).not.toHaveClass('text-feedback-error')
  })
})

describe('Create Account Form - Multiple Steps - Email typos warning', () => {
  ;(useRouter as jest.Mock).mockImplementation(() => ({
    asPath: '/create-account'
  }))
  const onSubmit = jest.fn()

  const setup = (props: Partial<CreateAccountFormProps> = {}) =>
    renderWithStoreAndFeatureFlags(
      <CreateAccountForm onSubmit={onSubmit} {...props} />,
      {
        featureFlags: {
          [FeatureFlag.ACCOUNT_CUSTOMER_CHECK]: true
        }
      }
    )

  beforeEach(() => setup())

  it('shows the email warming notification when there is a typo on the email', () => {
    const email = screen.getByTestId('createAccountFormEmailField')
    const submitButton = screen.getByTestId('createAccountFormContinueButton')
    userEvent.type(email, 'someEmailWithTypos@gamil.con')
    userEvent.click(submitButton)
    expect(email).toHaveClass('text-feedback-error')
    expect(screen.getByTestId('emailWarningNotification')).toBeInTheDocument()
  })
})

describe('Create Account Form - Atida DE', () => {
  ;(useRouter as jest.Mock).mockImplementation(() => ({
    asPath: '/create-account'
  }))
  const onSubmit = jest.fn()

  const setup = (props: Partial<CreateAccountFormProps> = {}) => {
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      asPath: '/create-account',
      locale: 'de-de'
    }))

    renderWithStoreAndFeatureFlags(
      <CreateAccountForm onSubmit={onSubmit} {...props} />,
      {
        initialState: {
          client: {
            account: {
              ['create-account-progress']: { currentStep: props?.formStep ?? 0 }
            }
          }
        },
        featureFlags: {
          [FeatureFlag.ACCOUNT_DATE_OF_BIRTH]: true
        }
      }
    )
  }

  beforeEach(() => setup())

  it('shows the birth date field for de', () => {
    const birthDate = screen.getByTestId('createAccountFormBirthDateField')
    expect(birthDate).toBeInTheDocument()
  })

  it('does not show error if birth date is correct', () => {
    const birthDate = screen.getByTestId('createAccountFormBirthDateField')
    userEvent.type(birthDate, '22-12-1984')
    const submitButton = screen.getByTestId('createAccountFormContinueButton')
    userEvent.click(submitButton)
    expect(birthDate).not.toHaveClass('text-feedback-error')
  })
})
