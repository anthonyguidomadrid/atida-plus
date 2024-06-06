import { getIPAddressString } from '../getIPAddressString'

describe(getIPAddressString, () => {
  it('returns the correct ip address when the passed value is a string', () => {
    expect(getIPAddressString('111.222.333:321')).toEqual('111.222.333')
  })

  it('returns the correct ip address when the passed value is an array of strings', () => {
    expect(getIPAddressString(['111.222.333:321', '123.456.789.333'])).toEqual(
      '111.222.333'
    )
  })

  it('returns undefined when the passed value is undefined', () => {
    expect(getIPAddressString(undefined)).toEqual(undefined)
  })
})
