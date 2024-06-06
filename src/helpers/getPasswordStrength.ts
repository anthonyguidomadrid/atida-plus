import { useTranslation } from 'react-i18next'
import { PASSWORD_VALIDATION_REGEX } from '~config/constants/password-validation-regex'

export type PasswordStrengthIndicatorType = {
  passedPolicies: passwordPolicyTypes[]
  strengthIndicator: string
  securityLevel: number
}

const REQUIRED_LENGTH = 8

export const SECURITY_LEVEL_NONE = 0
export const SECURITY_LEVEL_WEAK = 1
export const SECURITY_LEVEL_MEDIUM = 2
export const SECURITY_LEVEL_STRONG = 3

export const MINIMUM_LENGTH_POLICY = 'minimum-length'

export type passwordPolicyTypes = typeof MINIMUM_LENGTH_POLICY

export const GetPasswordStrength = (
  password = ''
): PasswordStrengthIndicatorType => {
  const { t } = useTranslation()

  let strengthIndicator = t('password-strength.weak')
  let securityLevel = SECURITY_LEVEL_NONE
  const passedPolicies: passwordPolicyTypes[] = []

  if (!password) {
    return {
      passedPolicies,
      strengthIndicator,
      securityLevel
    }
  }

  password.length >= REQUIRED_LENGTH &&
    passedPolicies.push(MINIMUM_LENGTH_POLICY)

  if (password.length >= REQUIRED_LENGTH) {
    securityLevel = SECURITY_LEVEL_WEAK
    if (
      password.match(PASSWORD_VALIDATION_REGEX.LOWERCASE_LETTERS) &&
      password.match(PASSWORD_VALIDATION_REGEX.UPPERCASE_LETTERS) &&
      password.match(PASSWORD_VALIDATION_REGEX.DIGITS)
    ) {
      strengthIndicator = t('password-strength.so-so')
      securityLevel = SECURITY_LEVEL_MEDIUM

      if (password.match(PASSWORD_VALIDATION_REGEX.SYMBOLS)) {
        strengthIndicator = t('password-strength.strong')
        securityLevel = SECURITY_LEVEL_STRONG
      }
    }
  }

  return {
    passedPolicies,
    strengthIndicator,
    securityLevel
  }
}
