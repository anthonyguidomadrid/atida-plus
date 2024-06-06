import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import { RequiredStringSchema } from 'yup/lib/string'

export type PhoneNumberObjectSchema = Yup.ObjectSchema<{
  number: RequiredStringSchema<string | undefined, Record<string, unknown>>
}>

export const usePhoneNumberValidation = (): {
  phoneNumberValidation: (country: string) => PhoneNumberObjectSchema | null
} => {
  const { t } = useTranslation()
  const phoneRegexES = /^(6\d{2}|7[1-9]\d{1})\d{6}$/
  const phoneRegexPT = /^([9]{1})+(6|3|2|1{1})+([0-9]{7})$/
  const phoneRegexStandard = /^([0-9]{9})$/

  const phoneNumberValidationSchema = (
    phoneRegex: RegExp
  ): PhoneNumberObjectSchema => {
    return Yup.object({
      number: Yup.string()
        .matches(phoneRegex, t('create-account.phone-number-format'))
        .required(t('create-account.phone-number.required'))
    })
  }

  const phoneNumberValidation = (country: string) => {
    switch (country) {
      case '351':
        return phoneNumberValidationSchema(phoneRegexPT)
      case '34':
        return phoneNumberValidationSchema(phoneRegexES)
      default:
        return phoneNumberValidationSchema(phoneRegexStandard)
    }
  }

  return { phoneNumberValidation }
}
