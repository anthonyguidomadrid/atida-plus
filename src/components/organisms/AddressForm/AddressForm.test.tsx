import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'
import { select } from 'react-select-event'

import { renderWithStore } from '~test-helpers'
import {
  PROVINCES_ES,
  DISTRICTS_PT
} from '~config/constants/subdivisions-per-locale'
import {
  BACKEND_DISTRICTS_PT,
  BACKEND_PROVINCES_ES
} from './__mocks__/subdivisions-backend'
import { AddressForm, AddressFormProps } from '.'

describe(AddressForm, () => {
  const onSubmit = jest.fn()
  const setIsModalOpen = jest.fn()

  describe('when there is no address selected', () => {
    const setup = (props?: Partial<AddressFormProps>) =>
      renderWithStore(
        <AddressForm
          isOpen={true}
          anyValidBillingAddress={true}
          anyValidShippingAddress={true}
          setIsAddressModalOpen={setIsModalOpen}
          onSubmit={onSubmit}
          taxReference="some-tax-reference"
          {...props}
        />
      )

    beforeEach(() => {
      ;(useRouter as jest.Mock).mockImplementation(() => ({
        asPath: undefined,
        locale: 'pt-pt'
      }))
    })

    it('renders a first name input field', () => {
      setup()
      expect(
        screen.getByRole('textbox', { name: 'form.field.first-name.label' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('textbox', { name: 'form.field.first-name.label' })
      ).toHaveAttribute('type', 'text')
    })

    it('renders a last name input field', () => {
      setup()
      expect(
        screen.getByRole('textbox', { name: 'form.field.last-name.label' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('textbox', { name: 'form.field.last-name.label' })
      ).toHaveAttribute('type', 'text')
    })

    it('renders an address input field', () => {
      setup()
      expect(
        screen.getByRole('textbox', { name: 'form.field.address1.label' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('textbox', { name: 'form.field.address1.label' })
      ).toHaveAttribute('type', 'text')
    })

    it('renders a house number input field', () => {
      setup()
      expect(
        screen.getByRole('textbox', { name: 'form.field.house-number.label' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('textbox', { name: 'form.field.house-number.label' })
      ).toHaveAttribute('type', 'text')
    })

    it('renders an appendix input field', () => {
      setup()
      expect(
        screen.getByRole('textbox', { name: 'form.field.addition.label' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('textbox', { name: 'form.field.addition.label' })
      ).toHaveAttribute('type', 'text')
    })

    it('renders a zip code input field', () => {
      setup()
      expect(
        screen.getByRole('textbox', { name: 'form.field.zip-code.label' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('textbox', { name: 'form.field.zip-code.label' })
      ).toHaveAttribute('type', 'text')
    })

    it('renders a city input field', () => {
      setup()
      expect(
        screen.getByRole('textbox', { name: 'form.field.city.label' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('textbox', { name: 'form.field.city.label' })
      ).toHaveAttribute('type', 'text')
    })

    it('renders a subdivision input field', () => {
      setup()
      const subdivisionWrapper = screen.getByTestId('AddressFormSubdivision')
      expect(
        subdivisionWrapper.querySelector('#subdivision')
      ).toBeInTheDocument()
    })

    it('renders a disabled and prefilled country input field', () => {
      setup()
      expect(
        screen.getByRole('textbox', { name: 'form.field.country.label' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('textbox', { name: 'form.field.country.label' })
      ).toHaveAttribute('type', 'text')
      expect(screen.getByTestId('AddressFormCountry')).toHaveClass(
        'pointer-events-none'
      )
      expect(screen.getByTestId('AddressFormCountryField')).toHaveValue(
        'create-account.prefilled-country'
      )
    })

    it('renders the isDefaultShippingCheckbox checkbox', () => {
      setup()
      expect(
        screen.getByTestId('isDefaultShippingCheckbox')
      ).toBeInTheDocument()
    })

    it('renders the isDefaultBillingCheckbox checkbox', () => {
      setup()
      expect(screen.getByTestId('isDefaultBillingCheckbox')).toBeInTheDocument()
    })

    it('the onSubmit function is not called if the form is not completed correctly', async () => {
      setup()
      userEvent.click(screen.getByTestId('AddressFormSubmitButton'))
      await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(0))
    })

    it('the onSubmit function is called if the form is completed correctly', async () => {
      const { container } = setup()
      const input = container.querySelector('input[name="subdivision"]')
      userEvent.type(screen.getByTestId('AddressFormFirstNameField'), 'Test')
      userEvent.type(screen.getByTestId('AddressFormLastNameField'), 'McTest')
      userEvent.type(screen.getByTestId('AddressFormHouseNumberField'), '1')
      userEvent.type(screen.getByTestId('AddressFormAdditionField'), 'Test')
      userEvent.type(
        screen.getByTestId('AddressFormAddress1Field'),
        'TestAddress'
      )
      userEvent.type(screen.getByTestId('AddressFormZipCodeField'), '1234-123')
      userEvent.type(screen.getByTestId('AddressFormCityField'), 'TestCity')

      await select(input as HTMLElement, 'Aveiro')

      userEvent.type(
        screen.getByTestId('AddressFormCountryField'),
        'TestCountry'
      )

      userEvent.click(screen.getByTestId('AddressFormSubmitButton'))
      await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1))
    })
  })

  describe('when there is an address selected', () => {
    const initialValues = {
      firstName: 'TEST',
      lastName: 'TEST',
      address1: 'TEST',
      houseNumber: '3',
      addition: 'TEST',
      zipCode: '1234-123',
      city: 'TEST',
      subdivision: 'Aveiro',
      country: 'Portugal',
      isDefaultShipping: true,
      isDefaultBilling: true
    }
    const setup = (props?: Partial<AddressFormProps>) =>
      renderWithStore(
        <AddressForm
          anyValidBillingAddress={true}
          anyValidShippingAddress={true}
          isOpen={true}
          setIsAddressModalOpen={setIsModalOpen}
          selectedAddress={initialValues}
          onSubmit={onSubmit}
          taxReference="some-tax-reference"
          {...props}
        />
      )

    beforeEach(() => {
      ;(useRouter as jest.Mock).mockImplementation(() => ({
        asPath: undefined,
        locale: 'pt-pt'
      }))
    })

    it('renders a first name input field with the prefilled value', () => {
      setup()
      expect(
        screen.getByRole('textbox', { name: 'form.field.first-name.label' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('textbox', { name: 'form.field.first-name.label' })
      ).toHaveValue(initialValues.firstName)
    })

    it('renders a last name input field with the prefilled value', () => {
      setup()
      expect(
        screen.getByRole('textbox', { name: 'form.field.last-name.label' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('textbox', { name: 'form.field.last-name.label' })
      ).toHaveValue(initialValues.lastName)
    })

    it('renders an address input field with the prefilled value', () => {
      setup()
      expect(
        screen.getByRole('textbox', { name: 'form.field.address1.label' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('textbox', { name: 'form.field.address1.label' })
      ).toHaveValue(initialValues.address1)
    })

    it('renders a house number input field with the prefilled value', () => {
      setup()
      expect(
        screen.getByRole('textbox', { name: 'form.field.house-number.label' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('textbox', { name: 'form.field.house-number.label' })
      ).toHaveValue(initialValues.houseNumber)
    })

    it('renders an appendix input field with the prefilled value', () => {
      setup()
      expect(
        screen.getByRole('textbox', { name: 'form.field.addition.label' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('textbox', { name: 'form.field.addition.label' })
      ).toHaveValue(initialValues.addition)
    })

    it('renders a zip code input field with the prefilled value', () => {
      setup()
      expect(
        screen.getByRole('textbox', { name: 'form.field.zip-code.label' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('textbox', { name: 'form.field.zip-code.label' })
      ).toHaveValue(initialValues.zipCode)
    })

    it('renders a city input field with the prefilled value', () => {
      setup()
      expect(
        screen.getByRole('textbox', { name: 'form.field.city.label' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('textbox', { name: 'form.field.city.label' })
      ).toHaveValue(initialValues.city)
    })

    it('renders a subdivision input field with the prefilled value', () => {
      const { container } = setup()
      const input = container.querySelector('input[name="subdivision"]')

      expect(input).toBeInTheDocument()
      expect(input).toHaveValue(initialValues.subdivision)
    })

    it('renders a disabled isDefaultShipping checkbox when the current one is the default one', () => {
      setup()
      expect(screen.getByTestId('AddressFormIsDefaultShipping')).toHaveClass(
        'opacity-50 pointer-events-none'
      )
    })

    it('renders a disabled isDefaultBilling checkbox when the current one is the default one', () => {
      setup()
      expect(screen.getByTestId('AddressFormIsDefaultBilling')).toHaveClass(
        'opacity-50 pointer-events-none'
      )
    })

    it('renders a checked isDefaultShipping checkbox when the current is the default one', () => {
      setup()
      expect(document.getElementById('isDefaultShipping')).toHaveAttribute(
        'checked'
      )
    })

    it('renders a checked isDefaultBilling checkbox when the current the default one', () => {
      setup()
      expect(document.getElementById('isDefaultBilling')).toHaveAttribute(
        'checked'
      )
    })

    it('does not reset the value of the first name field after changing subdivision', async () => {
      const { container } = setup()
      const input = container.querySelector('input[name="subdivision"]')

      userEvent.clear(screen.getByTestId('AddressFormFirstNameField'))

      userEvent.type(
        screen.getByTestId('AddressFormFirstNameField'),
        'Test Name'
      )

      await select(input as HTMLElement, 'Aveiro')

      expect(screen.getByTestId('AddressFormFirstNameField')).toHaveValue(
        'Test Name'
      )
    })
  })

  describe('when there is an address selected, and the surcharge has been requested', () => {
    beforeEach(() => {
      ;(useRouter as jest.Mock).mockImplementation(() => ({
        asPath: undefined,
        locale: 'es-es'
      }))
    })

    const initialValues = {
      firstName: 'TEST',
      lastName: 'TEST',
      address1: 'TEST',
      houseNumber: '3',
      addition: 'TEST',
      zipCode: '1234-123',
      city: 'TEST',
      subdivision: 'Madrid',
      country: 'Spain',
      isDefaultShipping: true,
      isDefaultBilling: true
    }

    const setup = (props: Partial<AddressFormProps> = {}) =>
      renderWithStore(
        <AddressForm
          isOpen={true}
          anyValidBillingAddress={true}
          anyValidShippingAddress={true}
          setIsAddressModalOpen={setIsModalOpen}
          selectedAddress={initialValues}
          onSubmit={onSubmit}
          surcharge={true}
          taxReference="some-tax-reference"
          {...props}
        />
      )

    it('does not display the surcharge-region conflict notification if the region is not a special tax region and the account type is personal', async () => {
      const { container } = setup()
      const input = container.querySelector('input[name="subdivision"]')

      await select(input as HTMLElement, 'Madrid')
      await waitFor(() =>
        expect(
          screen.queryByTestId('equivalenceSurchargeNotification')
        ).not.toBeInTheDocument()
      )
    })

    it('does not display the surcharge-region conflict notification if the region is a special tax region and the account type is personal', async () => {
      const { container } = setup()
      const input = container.querySelector('input[name="subdivision"]')

      await select(input as HTMLElement, 'Ceuta')
      await waitFor(() =>
        expect(
          screen.queryByTestId('equivalenceSurchargeNotification')
        ).not.toBeInTheDocument()
      )
    })

    it('does not display the surcharge-region conflict notification if the region is not a special tax region and the account type is business', async () => {
      const { container } = setup({ isBusinessAccount: true })
      const input = container.querySelector('input[name="subdivision"]')

      await select(input as HTMLElement, 'Madrid')
      await waitFor(() =>
        expect(
          screen.queryByTestId('equivalenceSurchargeNotification')
        ).not.toBeInTheDocument()
      )
    })

    it('does display the surcharge-region conflict notification if the region is a special tax region and the account type is business', async () => {
      const { container } = setup({ isBusinessAccount: true })
      const input = container.querySelector('input[name="subdivision"]')

      await select(input as HTMLElement, 'Ceuta')
      await waitFor(() =>
        expect(
          screen.queryByTestId('equivalenceSurchargeNotification')
        ).toBeInTheDocument()
      )
    })
  })

  describe('when address format notification is displayed', () => {
    const initialValues = {
      firstName: 'TEST',
      lastName: 'TEST',
      address1: 'TEST',
      houseNumber: undefined,
      appendix: undefined,
      zipCode: '1234-123',
      city: 'TEST',
      subdivision: undefined,
      country: 'Portugal',
      isDefaultShipping: true,
      isDefaultBilling: true
    }

    const setup = (props?: Partial<AddressFormProps>) => {
      renderWithStore(
        <AddressForm
          isOpen={true}
          anyValidBillingAddress={true}
          anyValidShippingAddress={true}
          setIsAddressModalOpen={setIsModalOpen}
          selectedAddress={initialValues}
          onSubmit={onSubmit}
          taxReference="some-tax-reference"
          {...props}
        />
      )
    }

    beforeEach(() => {
      ;(useRouter as jest.Mock).mockImplementation(() => ({
        asPath: undefined,
        locale: 'pt-pt'
      }))
    })

    it('renders the format notification warning when address is in old format', () => {
      setup()
      expect(
        screen.getByTestId('addressFormatNotification')
      ).toBeInTheDocument()
    })

    it('renders the format notification warning when address is missing', () => {
      const addressData = {
        ...initialValues,
        address1: undefined,
        houseNumber: '15',
        city: 'TEST',
        zipCode: '1234-123',
        subdivision: 'TEST'
      }

      setup({ selectedAddress: addressData })
      expect(
        screen.getByTestId('addressFormatNotification')
      ).toBeInTheDocument()
    })

    it('renders the format notification warning when house number is missing', () => {
      const addressData = {
        ...initialValues,
        houseNumber: undefined,
        city: 'TEST',
        zipCode: '1234-123',
        subdivision: 'TEST'
      }

      setup({ selectedAddress: addressData })
      expect(
        screen.getByTestId('addressFormatNotification')
      ).toBeInTheDocument()
    })

    it('renders the format notification warning when zip code is missing', () => {
      const addressData = {
        ...initialValues,
        houseNumber: '15',
        city: 'TEST',
        zipCode: undefined,
        subdivision: 'TEST'
      }

      setup({ selectedAddress: addressData })
      expect(
        screen.getByTestId('addressFormatNotification')
      ).toBeInTheDocument()
    })

    it('renders the format notification warning when city is missing', () => {
      const addressData = {
        ...initialValues,
        houseNumber: '15',
        city: undefined,
        zipCode: '1234-123',
        subdivision: 'TEST'
      }

      setup({ selectedAddress: addressData })
      expect(
        screen.getByTestId('addressFormatNotification')
      ).toBeInTheDocument()
    })

    it('renders the format notification warning when province/region is missing', () => {
      const addressData = {
        ...initialValues,
        houseNumber: '15',
        city: 'TEST',
        zipCode: '1234-123',
        subdivision: undefined
      }

      setup({ selectedAddress: addressData })
      expect(
        screen.getByTestId('addressFormatNotification')
      ).toBeInTheDocument()
    })

    it('does not render the format notification if all values are empty - new form', () => {
      setup({ selectedAddress: undefined })
      expect(
        screen.queryByText(
          'account.address-form.edit-address.format-warning.content'
        )
      ).not.toBeInTheDocument()
    })
  })

  describe('when customer does not have a tax reference', () => {
    const setup = (props?: Partial<AddressFormProps>) =>
      renderWithStore(
        <AddressForm
          anyValidBillingAddress={true}
          anyValidShippingAddress={true}
          isOpen={true}
          setIsAddressModalOpen={setIsModalOpen}
          onSubmit={onSubmit}
          taxReference={undefined}
          {...props}
        />
      )

    beforeEach(() => {
      ;(useRouter as jest.Mock).mockImplementation(() => ({
        asPath: undefined,
        locale: 'es-es'
      }))
    })

    it('renders the dni field', async () => {
      const { container } = setup()
      const input = container.querySelector('input[name="subdivision"]')

      await select(input as HTMLElement, 'Ceuta')

      expect(
        screen.getByRole('textbox', { name: 'form.field.tax-reference.label' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('textbox', { name: 'form.field.tax-reference.label' })
      ).toHaveAttribute('type', 'text')
    })

    it('the onSubmit function is called if the form is completed correctly', async () => {
      const { container } = setup()
      const input = container.querySelector('input[name="subdivision"]')

      userEvent.type(screen.getByTestId('AddressFormFirstNameField'), 'Test')
      userEvent.type(screen.getByTestId('AddressFormLastNameField'), 'McTest')
      userEvent.type(screen.getByTestId('AddressFormHouseNumberField'), '1')
      userEvent.type(screen.getByTestId('AddressFormAdditionField'), 'Test')
      userEvent.type(
        screen.getByTestId('AddressFormAddress1Field'),
        'TestAddress'
      )
      userEvent.type(screen.getByTestId('AddressFormZipCodeField'), '12345')
      userEvent.type(screen.getByTestId('AddressFormCityField'), 'TestCity')

      await select(input as HTMLElement, 'Melilla')

      userEvent.type(
        screen.getByTestId('AddressFormCountryField'),
        'TestCountry'
      )
      userEvent.type(
        screen.getByRole('textbox', { name: 'form.field.tax-reference.label' }),
        '12345678A'
      )

      userEvent.click(screen.getByTestId('AddressFormSubmitButton'))
      await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1))
    })
  })

  describe('when customer has a business account with no surcharge requested', () => {
    beforeEach(() => {
      ;(useRouter as jest.Mock).mockImplementation(() => ({
        asPath: undefined,
        locale: 'es-es'
      }))
    })
    it('does not render tax recalculation notification when a special region is not selected', () => {
      const initialValues = {
        firstName: 'TEST',
        lastName: 'TEST',
        address1: 'TEST',
        houseNumber: '3',
        addition: 'TEST',
        zipCode: '1234-123',
        city: 'TEST',
        subdivision: '',
        country: 'Spain',
        isDefaultShipping: true,
        isDefaultBilling: true
      }
      renderWithStore(
        <AddressForm
          isOpen={true}
          anyValidBillingAddress={true}
          anyValidShippingAddress={true}
          setIsAddressModalOpen={setIsModalOpen}
          onSubmit={onSubmit}
          isBusinessAccount={true}
          selectedAddress={initialValues}
          taxReference={undefined}
          surcharge={false}
        />
      )
      expect(
        screen.queryByTestId('taxRecalculationNotification')
      ).not.toBeInTheDocument()
    })

    it('renders tax recalculation notification when a special region is selected and equivalent surcharge is not requested', () => {
      const initialValues = {
        firstName: 'TEST',
        lastName: 'TEST',
        address1: 'TEST',
        houseNumber: '3',
        addition: 'TEST',
        zipCode: '1234-123',
        city: 'TEST',
        subdivision: 'Melilla',
        country: 'Spain',
        isDefaultShipping: true,
        isDefaultBilling: true
      }
      renderWithStore(
        <AddressForm
          isOpen={true}
          anyValidBillingAddress={true}
          anyValidShippingAddress={true}
          setIsAddressModalOpen={setIsModalOpen}
          onSubmit={onSubmit}
          isBusinessAccount={true}
          selectedAddress={initialValues}
          taxReference={undefined}
          surcharge={false}
        />
      )
      expect(
        screen.queryByTestId('taxRecalculationNotification')
      ).toBeInTheDocument()
    })
  })

  describe('when editing an address with banned districts - PT', () => {
    beforeEach(() => {
      ;(useRouter as jest.Mock).mockImplementation(() => ({
        asPath: undefined,
        locale: 'pt-pt'
      }))
    })

    const initialValues = {
      firstName: 'TEST',
      lastName: 'TEST',
      address1: 'TEST',
      houseNumber: '3',
      addition: 'TEST',
      zipCode: '1234-123',
      city: 'TEST',
      subdivision: 'Madeira',
      country: 'Portugal',
      isDefaultShipping: true,
      isDefaultBilling: true
    }

    const setup = (props: Partial<AddressFormProps> = {}) =>
      renderWithStore(
        <AddressForm
          isOpen={true}
          anyValidBillingAddress={true}
          anyValidShippingAddress={true}
          setIsAddressModalOpen={setIsModalOpen}
          selectedAddress={initialValues}
          onSubmit={onSubmit}
          surcharge={true}
          taxReference="some-tax-reference"
          {...props}
        />
      )

    it('shows an error and does not submit the form ', async () => {
      setup()
      expect(onSubmit).toHaveBeenCalledTimes(0)
      userEvent.click(screen.getByTestId('AddressFormSubmitButton'))
      await waitFor(() => {
        expect(document.getElementById('subdivision_error')).toBeInTheDocument()
        expect(onSubmit).toHaveBeenCalledTimes(0)
      })
    })
  })

  describe('when there is a district stored and I open the edit address form - PT', () => {
    beforeEach(() => {
      ;(useRouter as jest.Mock).mockImplementation(() => ({
        asPath: undefined,
        locale: 'pt-pt'
      }))
    })

    const initialValues = {
      firstName: 'TEST',
      lastName: 'TEST',
      address1: 'TEST',
      houseNumber: '3',
      addition: 'TEST',
      zipCode: '1234-123',
      city: 'TEST',
      subdivision: '',
      country: 'Portugal',
      isDefaultShipping: true,
      isDefaultBilling: true
    }

    const setup = (props: Partial<AddressFormProps> = {}) =>
      renderWithStore(
        <AddressForm
          isOpen={true}
          anyValidBillingAddress={true}
          anyValidShippingAddress={true}
          setIsAddressModalOpen={setIsModalOpen}
          selectedAddress={initialValues}
          onSubmit={onSubmit}
          surcharge={true}
          taxReference="some-tax-reference"
          {...props}
        />
      )

    test.each(BACKEND_DISTRICTS_PT)(
      'should match the stored district (BE) %p with the displayed district (FE)',
      district => {
        initialValues.subdivision = district

        const key = BACKEND_DISTRICTS_PT.indexOf(district)

        const { container } = setup({ selectedAddress: initialValues })
        const input = container.querySelector('input[name="subdivision"]')

        expect(input).toHaveValue(DISTRICTS_PT[key].label)
      }
    )
  })

  describe('when there is a district stored and I open the edit address form - ES', () => {
    beforeEach(() => {
      ;(useRouter as jest.Mock).mockImplementation(() => ({
        asPath: undefined,
        locale: 'es-es'
      }))
    })

    const initialValues = {
      firstName: 'TEST',
      lastName: 'TEST',
      address1: 'TEST',
      houseNumber: '3',
      addition: 'TEST',
      zipCode: '1234-123',
      city: 'TEST',
      subdivision: '',
      country: 'Spain',
      isDefaultShipping: true,
      isDefaultBilling: true
    }

    const setup = (props: Partial<AddressFormProps> = {}) =>
      renderWithStore(
        <AddressForm
          isOpen={true}
          anyValidBillingAddress={true}
          anyValidShippingAddress={true}
          setIsAddressModalOpen={setIsModalOpen}
          selectedAddress={initialValues}
          onSubmit={onSubmit}
          surcharge={true}
          taxReference="some-tax-reference"
          {...props}
        />
      )

    test.each(BACKEND_PROVINCES_ES)(
      'should match the stored province (BE) %p with the displayed province (FE)',
      province => {
        initialValues.subdivision = province

        const key = BACKEND_PROVINCES_ES.indexOf(province)

        const { container } = setup({ selectedAddress: initialValues })
        const input = container.querySelector('input[name="subdivision"]')
        expect(input).toHaveValue(PROVINCES_ES[key].label)
      }
    )
  })

  describe('when there is no valid addresses for that country', () => {
    const setup = (
      anyValidBillingAddress: boolean,
      anyValidShippingAddress: boolean
    ) =>
      renderWithStore(
        <AddressForm
          isOpen={true}
          anyValidBillingAddress={anyValidBillingAddress}
          anyValidShippingAddress={anyValidShippingAddress}
          setIsAddressModalOpen={setIsModalOpen}
          onSubmit={onSubmit}
          surcharge={true}
          taxReference="some-tax-reference"
        />
      )

    describe('when both are missing', () => {
      beforeEach(() => {
        ;(useRouter as jest.Mock).mockImplementation(() => ({
          asPath: undefined,
          locale: 'pt-pt'
        }))
        setup(false, false)
      })
      it('renders a quick-help notification with the corect content', () => {
        expect(
          screen.getByTestId('notValidAddressesNotification')
        ).toBeInTheDocument()

        expect(screen.getByTestId('notValidAddressesNotification')).toHaveClass(
          'bg-primary-oxford-blue-100'
        )

        expect(
          screen.getByText(
            'account.address-form.default-address-warning.content'
          )
        ).toBeInTheDocument()
      })

      it('renders a disabled isDefaultShipping checkbox', () => {
        expect(screen.getByTestId('AddressFormIsDefaultShipping')).toHaveClass(
          'opacity-50 pointer-events-none'
        )
      })
      it('renders a disabled isDefaultBilling checkbox', () => {
        expect(screen.getByTestId('AddressFormIsDefaultBilling')).toHaveClass(
          'opacity-50 pointer-events-none'
        )
      })
      it('renders a checked isDefaultShipping checkbox', () => {
        expect(document.getElementById('isDefaultShipping')).toHaveAttribute(
          'checked'
        )
      })

      it('renders a checked isDefaultBilling checkbox', () => {
        expect(document.getElementById('isDefaultBilling')).toHaveAttribute(
          'checked'
        )
      })
    })
    describe('when shipping address is missing', () => {
      beforeEach(() => {
        ;(useRouter as jest.Mock).mockImplementation(() => ({
          asPath: undefined,
          locale: 'pt-pt'
        }))
        setup(true, false)
      })
      it('renders a quick-help notification with the corect content', () => {
        expect(
          screen.getByTestId('notValidAddressesNotification')
        ).toBeInTheDocument()

        expect(screen.getByTestId('notValidAddressesNotification')).toHaveClass(
          'bg-primary-oxford-blue-100'
        )

        expect(
          screen.getByText(
            'account.address-form.default-shipping-address-warning.content'
          )
        ).toBeInTheDocument()
      })

      it('renders a disabled isDefaultShipping checkbox', () => {
        expect(screen.getByTestId('AddressFormIsDefaultShipping')).toHaveClass(
          'opacity-50 pointer-events-none'
        )
      })
      it('renders a checked isDefaultShipping checkbox', () => {
        expect(document.getElementById('isDefaultShipping')).toHaveAttribute(
          'checked'
        )
      })
    })
    describe('when billing address is missing', () => {
      beforeEach(() => {
        ;(useRouter as jest.Mock).mockImplementation(() => ({
          asPath: undefined,
          locale: 'pt-pt'
        }))
        setup(false, true)
      })
      it('renders a quick-help notification with the corect content', () => {
        expect(
          screen.getByTestId('notValidAddressesNotification')
        ).toBeInTheDocument()

        expect(screen.getByTestId('notValidAddressesNotification')).toHaveClass(
          'bg-primary-oxford-blue-100'
        )

        expect(
          screen.getByText(
            'account.address-form.default-billing-address-warning.content'
          )
        ).toBeInTheDocument()
      })

      it('renders a disabled isDefaultBilling checkbox', () => {
        expect(screen.getByTestId('AddressFormIsDefaultBilling')).toHaveClass(
          'opacity-50 pointer-events-none'
        )
      })
      it('renders a checked isDefaultBilling checkbox', () => {
        expect(document.getElementById('isDefaultBilling')).toHaveAttribute(
          'checked'
        )
      })
    })
  })

  describe('when opening new address form', () => {
    describe('when opening new address form for PT', () => {
      const initialValues = undefined

      const setup = (props?: Partial<AddressFormProps>) =>
        renderWithStore(
          <AddressForm
            isOpen={true}
            anyValidBillingAddress={true}
            anyValidShippingAddress={true}
            setIsAddressModalOpen={setIsModalOpen}
            selectedAddress={initialValues}
            onSubmit={onSubmit}
            taxReference="some-tax-reference"
            {...props}
          />
        )

      beforeEach(() => {
        ;(useRouter as jest.Mock).mockImplementation(() => ({
          asPath: undefined,
          locale: 'pt-pt'
        }))
      })

      it('renders the first name field as an empty field', () => {
        setup()
        expect(screen.getByTestId('AddressFormFirstNameField')).toHaveValue('')
      })

      it('prefills the first name field when possible', () => {
        setup({ firstName: 'first name' })
        expect(screen.getByTestId('AddressFormFirstNameField')).toHaveValue(
          'first name'
        )
      })

      it('renders the last name field as an empty field', () => {
        setup()
        expect(screen.getByTestId('AddressFormLastNameField')).toHaveValue('')
      })

      it('prefills the last name field when possible', () => {
        setup({ lastName: 'last name' })
        expect(screen.getByTestId('AddressFormLastNameField')).toHaveValue(
          'last name'
        )
      })

      it('renders the address field as an empty field', () => {
        setup()
        expect(screen.getByTestId('AddressFormAddress1Field')).toHaveValue('')
      })

      it('renders the house number field as an empty field', () => {
        setup()
        expect(screen.getByTestId('AddressFormHouseNumberField')).toHaveValue(
          ''
        )
      })

      it('renders the additional address field as an empty field', () => {
        setup()
        expect(screen.getByTestId('AddressFormAdditionField')).toHaveValue('')
      })

      it('renders the zip code field as an empty field', () => {
        setup()
        expect(screen.getByTestId('AddressFormZipCodeField')).toHaveValue('')
      })

      it('renders the city field as an empty field', () => {
        setup()
        expect(screen.getByTestId('AddressFormCityField')).toHaveValue('')
      })

      it('renders the subdivision field as an empty field', () => {
        const { container } = setup()
        const input = container.querySelector('input[name="subdivision"]')

        expect(input).toHaveValue('')
      })

      it('does not empty the value of the first name field after setting subdivision', async () => {
        const { container } = setup()
        const input = container.querySelector('input[name="subdivision"]')

        userEvent.type(
          screen.getByTestId('AddressFormFirstNameField'),
          'Test Name'
        )

        await select(input as HTMLElement, 'Aveiro')

        expect(screen.getByTestId('AddressFormFirstNameField')).toHaveValue(
          'Test Name'
        )
      })
    })

    describe('when opening new address form for ES', () => {
      const initialValues = undefined

      const setup = (props?: Partial<AddressFormProps>) =>
        renderWithStore(
          <AddressForm
            isOpen={true}
            anyValidBillingAddress={true}
            anyValidShippingAddress={true}
            setIsAddressModalOpen={setIsModalOpen}
            selectedAddress={initialValues}
            onSubmit={onSubmit}
            taxReference="some-tax-reference"
            {...props}
          />
        )

      beforeEach(() => {
        ;(useRouter as jest.Mock).mockImplementation(() => ({
          asPath: undefined,
          locale: 'es-es'
        }))
      })

      it('renders the first name field as an empty field', () => {
        setup()
        expect(screen.getByTestId('AddressFormFirstNameField')).toHaveValue('')
      })

      it('prefills the first name field when possible', () => {
        setup({ firstName: 'first name' })
        expect(screen.getByTestId('AddressFormFirstNameField')).toHaveValue(
          'first name'
        )
      })

      it('renders the last name field as an empty field', () => {
        setup()
        expect(screen.getByTestId('AddressFormLastNameField')).toHaveValue('')
      })

      it('prefills the last name field when possible', () => {
        setup({ lastName: 'last name' })
        expect(screen.getByTestId('AddressFormLastNameField')).toHaveValue(
          'last name'
        )
      })

      it('renders the address field as an empty field', () => {
        setup()
        expect(screen.getByTestId('AddressFormAddress1Field')).toHaveValue('')
      })

      it('renders the house number field as an empty field', () => {
        setup()
        expect(screen.getByTestId('AddressFormHouseNumberField')).toHaveValue(
          ''
        )
      })

      it('renders the additional address field as an empty field', () => {
        setup()
        expect(screen.getByTestId('AddressFormAdditionField')).toHaveValue('')
      })

      it('renders the zip code field as an empty field', () => {
        setup()
        expect(screen.getByTestId('AddressFormZipCodeField')).toHaveValue('')
      })

      it('renders the city field as an empty field', () => {
        setup()
        expect(screen.getByTestId('AddressFormCityField')).toHaveValue('')
      })

      it('renders the subdivision field as an empty field', () => {
        const { container } = setup()
        const input = container.querySelector('input[name="subdivision"]')

        expect(input).toHaveValue('')
      })

      it('does not empty the value of the first name field after setting subdivision', async () => {
        const { container } = setup()
        const input = container.querySelector('input[name="subdivision"]')

        userEvent.type(
          screen.getByTestId('AddressFormFirstNameField'),
          'Test Name'
        )

        await select(input as HTMLElement, 'Malaga')

        expect(screen.getByTestId('AddressFormFirstNameField')).toHaveValue(
          'Test Name'
        )
      })
    })
  })
})
