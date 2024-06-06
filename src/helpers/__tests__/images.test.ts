import { sanitiseUrl } from '../images'
describe(sanitiseUrl, () => {
  it('returns the url as is if it does not contain a space', () => {
    expect(sanitiseUrl('https://www.example.com')).toEqual(
      'https://www.example.com'
    )
  })

  it('returns the url encoded if it contains a space', () => {
    expect(sanitiseUrl('https://www.example.com with spaces')).toEqual(
      'https://www.example.com%20with%20spaces'
    )
  })
})
