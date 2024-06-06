import { isExternalLink } from '../isExternalLink'

describe(isExternalLink, () => {
  it('returns true when an external link is passed with protocol http', () => {
    expect(isExternalLink('http://google.com')).toBe(true)
  })
  it('returns true when an external link is passed with protocol https', () => {
    expect(isExternalLink('https://google.com')).toBe(true)
  })
  it('returns true when an external link is passed with protocol ftp', () => {
    expect(isExternalLink('ftp://google.com')).toBe(true)
  })
  it('returns true when an external link is passed with protocol mailto:', () => {
    expect(isExternalLink('mailto:mail@atida.com')).toBe(true)
  })
  it('returns false when an internal link is passed', () => {
    expect(isExternalLink('/blog')).toBe(false)
  })
  it('returns false when an external link is passed without protocol', () => {
    expect(isExternalLink('www.atida.com/blog')).toBe(false)
  })
})
