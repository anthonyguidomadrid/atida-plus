import { screen, fireEvent, waitFor } from '@testing-library/react'
import {
  UpdateBusinessDetailsForm,
  UpdateBusinessDetailsFormProps
} from '../UpdateBusinessDetailsForm'
import { renderWithStore } from '~test-helpers'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'

describe(UpdateBusinessDetailsForm, () => {
  const onSubmit = jest.fn()
  ;(useRouter as jest.Mock).mockImplementation(() => ({
    asPath: undefined,
    locale: 'es-es'
  }))
  const initialValues = {
    companyName: '',
    taxReference: '',
    hasEquivalenceSurcharge: true
  }

  beforeEach(() => {
    renderWithStore(
      <UpdateBusinessDetailsForm
        locale="es-es"
        onSubmit={onSubmit}
        {...initialValues}
        isSpecialTaxRegion={false}
        accountType="Business"
      />
    )
  })

  it('renders the company name input field', () => {
    expect(
      screen.getByRole('textbox', { name: 'form.field.company-name.label' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', { name: 'form.field.company-name.label' })
    ).toHaveAttribute('type', 'text')
  })

  it('renders the tax reference input field', () => {
    expect(
      screen.getByRole('textbox', {
        name: 'form.field.tax-reference-business.label'
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', {
        name: 'form.field.tax-reference-business.label'
      })
    ).toHaveAttribute('type', 'text')
  })

  it('renders an equivalence surcharge checkbox', () => {
    expect(
      screen.getByTestId('UpdateBusinessDetailsFormEquivalenceSurcharge')
    ).toBeInTheDocument()
  })

  it('the onSubmit function is not called if the form is not completed correctly', async () => {
    const submitButton = screen.getByTestId('UpdateBusinessDetailsFormButton')
    fireEvent.click(submitButton)
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(0))
  })

  it('the onSubmit function is called if the form is completed correctly', async () => {
    const submitButton = screen.getByTestId('UpdateBusinessDetailsFormButton')

    userEvent.type(
      screen.getByTestId('UpdateBusinessDetailsFormCompanyNameField'),
      'Company Name'
    )
    userEvent.type(
      screen.getByTestId('UpdateBusinessDetailsFormTaxReferenceField'),
      '12345678A'
    )

    fireEvent.click(submitButton)
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1))
  })
})
describe(UpdateBusinessDetailsForm, () => {
  const onSubmit = jest.fn()
  ;(useRouter as jest.Mock).mockImplementation(() => ({
    asPath: undefined,
    locale: 'pt-pt'
  }))
  const initialValues = {
    companyName: 'Company name',
    taxReference: '123456789',
    hasEquivalenceSurcharge: false
  }

  beforeEach(() => {
    renderWithStore(
      <UpdateBusinessDetailsForm
        locale="pt-pt"
        onSubmit={onSubmit}
        {...initialValues}
        isSpecialTaxRegion={false}
        accountType="Personal"
      />
    )
  })

  it('des not render equivalence surcharge checkbox for PT', () => {
    expect(
      screen.getByRole('textbox', {
        name: 'form.field.tax-reference-business.label'
      })
    ).toHaveValue('')
    expect(
      screen.getByTestId('UpdateBusinessDetailsFormTaxReference')
    ).toHaveClass('opacity-50 pointer-events-none')
  })
})

describe(UpdateBusinessDetailsForm, () => {
  const onSubmit = jest.fn()
  ;(useRouter as jest.Mock).mockImplementation(() => ({
    asPath: undefined,
    locale: 'es-es'
  }))

  const initialValues = {
    companyName: '',
    taxReference: '12345678A',
    hasEquivalenceSurcharge: true,
    isSpecialTaxRegion: false
  }

  const setup = (props?: UpdateBusinessDetailsFormProps) =>
    renderWithStore(
      <UpdateBusinessDetailsForm
        locale="es-es"
        onSubmit={onSubmit}
        {...initialValues}
        accountType="Personal"
        {...props}
      />
    )

  it('renders an empty and disabled tax reference input field', () => {
    setup()

    expect(
      screen.getByRole('textbox', {
        name: 'form.field.tax-reference-business.label'
      })
    ).toHaveValue('')
    expect(
      screen.getByTestId('UpdateBusinessDetailsFormTaxReference')
    ).toHaveClass('opacity-50 pointer-events-none')
  })

  it('renders an unchecked and disabled equivalence surcharge checkbox', () => {
    setup()

    expect(
      screen.getByTestId('UpdateBusinessDetailsFormEquivalenceSurcharge')
    ).toHaveClass('opacity-50 pointer-events-none')
    expect(
      (document.querySelectorAll('input[type=checkbox]')[0] as HTMLInputElement)
        .checked
    ).toBeFalsy
  })

  it('checked and unchecks the equivalence surcharge checkbox', () => {
    setup({ ...initialValues, accountType: 'Business' })

    const equivalenceSurcharge = screen.getByTestId(
      'UpdateBusinessDetailsFormEquivalenceSurcharge'
    )
    const inputElement = document.querySelectorAll(
      'input[type=checkbox]'
    )[0] as HTMLInputElement
    expect(equivalenceSurcharge).not.toHaveClass(
      'opacity-50 pointer-events-none'
    )
    userEvent.click(inputElement)
    expect(inputElement.checked).toBeFalsy()
    userEvent.click(inputElement)
    expect(inputElement.checked).toBeTruthy()
  })

  it('renders a disabled button', () => {
    setup()

    expect(
      screen.getByTestId('UpdateBusinessDetailsFormButton')
    ).toHaveAttribute('disabled')
  })

  it('the onSubmit function is not called', async () => {
    setup()

    const submitButton = screen.getByTestId('UpdateBusinessDetailsFormButton')
    fireEvent.click(submitButton)
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(0))
  })
})
