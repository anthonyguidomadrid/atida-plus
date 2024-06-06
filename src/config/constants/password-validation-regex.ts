// Please check with BE when changing the regex pattern as they should have the same pattern
export const PASSWORD_VALIDATION_REGEX = {
  GENERAL: /^(.){8,}$/,
  LOWERCASE_LETTERS: /[a-z]+/,
  UPPERCASE_LETTERS: /[A-Z]+/,
  DIGITS: /\d+/,
  SYMBOLS: /[^\w\s]/
}
