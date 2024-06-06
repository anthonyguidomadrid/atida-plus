import { parseDateOfBirthFormat } from '../parse-date-of-birth'

describe(parseDateOfBirthFormat, () => {
  it('returns date to dd-mm-yyyy format', () => {
    expect(parseDateOfBirthFormat('1984-12-12', true)).toEqual('12-12-1984')
  })

  it('returns date to yyyy-mm-dd format', () => {
    expect(parseDateOfBirthFormat('12-12-1984')).toEqual('1984-12-12')
  })

  it('returns null if date of birth is falsy', () => {
    expect(parseDateOfBirthFormat()).toEqual(null)
  })
})
