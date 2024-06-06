import {
  GetPasswordStrength,
  MINIMUM_LENGTH_POLICY,
  SECURITY_LEVEL_MEDIUM,
  SECURITY_LEVEL_NONE,
  SECURITY_LEVEL_STRONG,
  SECURITY_LEVEL_WEAK
} from '../getPasswordStrength'

describe(GetPasswordStrength, () => {
  it('returns weak if password is less than 8 characters', () => {
    expect(GetPasswordStrength('asd')).toEqual({
      passedPolicies: [],
      strengthIndicator: 'password-strength.weak',
      securityLevel: SECURITY_LEVEL_NONE
    })
  })

  it('returns weak if password is lowercase and is at least 8 characters', () => {
    expect(GetPasswordStrength('password')).toEqual({
      passedPolicies: [MINIMUM_LENGTH_POLICY],
      strengthIndicator: 'password-strength.weak',
      securityLevel: SECURITY_LEVEL_WEAK
    })
  })

  it('returns weak if password is lowercase and has a symbol and is over 8 characters', () => {
    expect(GetPasswordStrength('password@')).toEqual({
      passedPolicies: [MINIMUM_LENGTH_POLICY],
      strengthIndicator: 'password-strength.weak',
      securityLevel: SECURITY_LEVEL_WEAK
    })
  })

  it('returns weak if password is lowercase and has a number and is over 8 characters', () => {
    expect(GetPasswordStrength('password1')).toEqual({
      passedPolicies: [MINIMUM_LENGTH_POLICY],
      strengthIndicator: 'password-strength.weak',
      securityLevel: SECURITY_LEVEL_WEAK
    })
  })

  it('returns weak if password is lowercase and has an uppercase and is over 8 characters', () => {
    expect(GetPasswordStrength('Password')).toEqual({
      passedPolicies: [MINIMUM_LENGTH_POLICY],
      strengthIndicator: 'password-strength.weak',
      securityLevel: SECURITY_LEVEL_WEAK
    })
  })

  it('returns medium if password has a lowercase, uppercase, number and is over 8 characters', () => {
    expect(GetPasswordStrength('Password1')).toEqual({
      passedPolicies: [MINIMUM_LENGTH_POLICY],
      strengthIndicator: 'password-strength.so-so',
      securityLevel: SECURITY_LEVEL_MEDIUM
    })
  })

  it('returns weak if password is uppercase and has a symbol and is over 8 characters', () => {
    expect(GetPasswordStrength('PASSWORD@')).toEqual({
      passedPolicies: [MINIMUM_LENGTH_POLICY],
      strengthIndicator: 'password-strength.weak',
      securityLevel: SECURITY_LEVEL_WEAK
    })
  })

  it('returns weak if password is uppercase and has a number and is over 8 characters', () => {
    expect(GetPasswordStrength('PASSWORD1')).toEqual({
      passedPolicies: [MINIMUM_LENGTH_POLICY],
      strengthIndicator: 'password-strength.weak',
      securityLevel: SECURITY_LEVEL_WEAK
    })
  })

  it('returns weak if password is uppercase and has a lowercase and is over 8 characters', () => {
    expect(GetPasswordStrength('PASSWORd')).toEqual({
      passedPolicies: [MINIMUM_LENGTH_POLICY],
      strengthIndicator: 'password-strength.weak',
      securityLevel: SECURITY_LEVEL_WEAK
    })
  })

  it('returns weak if password is lowercase and has a symbol and is under 8 characters', () => {
    expect(GetPasswordStrength('passwd@')).toEqual({
      passedPolicies: [],
      strengthIndicator: 'password-strength.weak',
      securityLevel: SECURITY_LEVEL_NONE
    })
  })

  it('returns weak if password is lowercase and has a number and is under 8 characters', () => {
    expect(GetPasswordStrength('passwd1')).toEqual({
      passedPolicies: [],
      strengthIndicator: 'password-strength.weak',
      securityLevel: SECURITY_LEVEL_NONE
    })
  })

  it('returns weak if password is lowercase and has an uppercase and is under 8 characters', () => {
    expect(GetPasswordStrength('Passwd')).toEqual({
      passedPolicies: [],
      strengthIndicator: 'password-strength.weak',
      securityLevel: SECURITY_LEVEL_NONE
    })
  })

  it('returns weak if password has a symbol, number, lower and uppercase and is under 8 characters', () => {
    expect(GetPasswordStrength('Pwd1@')).toEqual({
      passedPolicies: [],
      strengthIndicator: 'password-strength.weak',
      securityLevel: SECURITY_LEVEL_NONE
    })
  })

  it('returns strong if password has a symbol, number, lower and uppercase and is over 8 characters', () => {
    expect(GetPasswordStrength('Password@123')).toEqual({
      passedPolicies: [MINIMUM_LENGTH_POLICY],
      strengthIndicator: 'password-strength.strong',
      securityLevel: SECURITY_LEVEL_STRONG
    })
  })

  it('returns medium if password has a space instead of a symbol, number, lower and uppercase and is over 8 characters', () => {
    expect(GetPasswordStrength('Password 123')).toEqual({
      passedPolicies: [MINIMUM_LENGTH_POLICY],
      strengthIndicator: 'password-strength.so-so',
      securityLevel: SECURITY_LEVEL_MEDIUM
    })
  })

  it('returns nothing if no PW has been entered', () => {
    expect(GetPasswordStrength()).toEqual({
      passedPolicies: [],
      strengthIndicator: 'password-strength.weak',
      securityLevel: SECURITY_LEVEL_NONE
    })
  })
})
