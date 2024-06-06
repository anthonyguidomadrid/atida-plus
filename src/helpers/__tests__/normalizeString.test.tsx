import {
  normalizeNonPrintableCharacters,
  stripSlashAndBackslashFromAddress
} from '../normalizeString'

describe(normalizeNonPrintableCharacters, () => {
  it('returns a string without the ASCII characters', () => {
    expect(normalizeNonPrintableCharacters('Crème Brulée عالي Андрей')).toEqual(
      'Creme Brulee  '
    )
  })
  it('returns an empty string if an empty string or undefined is sent', () => {
    expect(normalizeNonPrintableCharacters('')).toEqual('')
    expect(normalizeNonPrintableCharacters(undefined)).toEqual('')
  })
})

describe(stripSlashAndBackslashFromAddress, () => {
  it('returns a string without the slash characters', () => {
    expect(stripSlashAndBackslashFromAddress('c / \\  del lobo ?? ~')).toEqual(
      'c    del lobo ?? ~'
    )
  })
  it('truncates a string when number of characters is more than 50', () => {
    expect(
      stripSlashAndBackslashFromAddress(
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commo'
      )
    ).toEqual('Lorem ipsum dolor sit amet, consectetuer adipiscin')
  })
  it('returns an empty string when undefined is passed', () => {
    expect(stripSlashAndBackslashFromAddress(undefined)).toEqual('')
  })
})
