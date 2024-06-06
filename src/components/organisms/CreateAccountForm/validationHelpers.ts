import { FormikErrors } from 'formik/dist/types'
import { ACCOUNT_CREATION_REGEX } from '~config/constants/accout-creation-regex'
import { scrollToElement } from '~helpers'
import { CreateAccountFormAddressValues } from './CreateAccountForm'

type ErrorFields = {
  billing?: CreateAccountFormAddressValues
  shipping?: CreateAccountFormAddressValues
  taxReferenceBusiness?: string
  company?: string
}

export const trimWhitespaces = (data: string) => {
  return data.replace(/\s*/g, '')
}

export const customPhoneValidation = (data: string | undefined): boolean => {
  if (!data) {
    return true
  }

  const value = trimWhitespaces(data)
  const matches = value.match(ACCOUNT_CREATION_REGEX.phoneRegex)

  return matches ? matches.length > 0 : false
}

export const scrollToError = (errors: FormikErrors<unknown>): void => {
  const {
    shipping,
    billing,
    company,
    taxReferenceBusiness,
    ...errorFields
  } = errors as ErrorFields

  if (company) {
    scrollToElement(document.getElementById(`label-company`))
    return
  }

  if (taxReferenceBusiness) {
    scrollToElement(document.getElementById(`label-taxReferenceBusiness`))
    return
  }

  if (shipping) {
    scrollToElement(
      document.getElementById(`label-shipping.${Object.keys(shipping)[0]}`)
    )
    return
  }

  if (errorFields) {
    scrollToElement(document.getElementById(`label-.${Object.keys(errors)[0]}`))
    return
  }

  if (billing) {
    scrollToElement(
      document.getElementById(`label-billing.${Object.keys(billing)[0]}`)
    )
    return
  }
}

export const dateOfBirthInputMask = () => {
  const input = document.querySelectorAll(
    '.de-date-of-birth'
  )[0] as HTMLInputElement

  if (!input) return

  input.addEventListener('keypress', (e: KeyboardEvent) => {
    const len = input.value.length
    if (isNaN(+e.key)) {
      e.preventDefault()
      return
    }

    if (len === 10 && input.selectionStart && input.selectionStart === 10) {
      e.preventDefault()
      return
    }

    if (len === 2) {
      input.value += '-'
    }

    if (len === 5) {
      input.value += '-'
    }
  })
}
