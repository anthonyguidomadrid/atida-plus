import { PASSWORD_VALIDATION_REGEX } from './password-validation-regex'

export const ACCOUNT_CREATION_REGEX = {
  firstNameRegex: /^.{1,100}$/,
  lastNameRegex: /^.{1,100}$/,
  phoneRegex: /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
  address1Regex: /^.{1,100}$/,
  houseNumberRegex: /^.{1,100}$/,
  additionRegex: /^.{1,100}$/,
  cityRegex: /^.{2,100}$/,
  companyRegex: /^.{1,100}$/,
  passwordValidationRegex: PASSWORD_VALIDATION_REGEX.GENERAL
}
