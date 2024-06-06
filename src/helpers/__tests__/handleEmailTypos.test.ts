import { removeEmailTypos } from '~helpers'

describe(removeEmailTypos, () => {
  it('returns undefined when the mail has the correct format', () => {
    expect(removeEmailTypos('test@test.com')).toEqual(undefined)
  })
  it('returns the suggested email when the email has any typo on the top level domain', () => {
    expect(removeEmailTypos('test@test.con')).toEqual('test@test.com')
  })
  it('returns the suggested email when the email has any typo on the domain', () => {
    expect(removeEmailTypos('test@gmaill.com')).toEqual('test@gmail.com')
  })
  it('returns the suggested email when the email has different typos', () => {
    expect(removeEmailTypos('test@gmaill.customSubdomain.con')).toEqual(
      'test@gmail.customSubdomain.com'
    )
  })
  it('returns undefined when the mail is undefined', () => {
    expect(removeEmailTypos(undefined)).toEqual(undefined)
  })
})
