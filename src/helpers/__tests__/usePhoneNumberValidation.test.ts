import { usePhoneNumberValidation } from '~helpers/usePhoneNumberValidation'

describe(usePhoneNumberValidation, () => {
  const { phoneNumberValidation } = usePhoneNumberValidation()
  it('returns an object with PT number', () => {
    expect(typeof phoneNumberValidation('351')).toBe('object')
  })
  it('returns an object with ES number', () => {
    expect(typeof phoneNumberValidation('34')).toBe('object')
  })
  it('returns an object when incorrect country code passed', () => {
    expect(typeof phoneNumberValidation('')).toBe('object')
  })
})
