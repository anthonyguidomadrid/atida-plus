import { normalizePageLink } from './../page-link'
import { contentfulPage } from '../../__mocks__/page'

describe(normalizePageLink, () => {
  it('normalizes the data', () => {
    // @ts-ignore
    const normalizedData = normalizePageLink(contentfulPage)
    expect(normalizedData?.label).toBe('some title')
    expect(normalizedData?.url).toBe('/some-slug')
    expect(normalizedData?.category?.id).toBe('medicines')
    expect(normalizedData?.category?.level).toBe(0)
    expect(normalizedData?.category?.color).toBe('category-beauty')
    expect(normalizedData?.category?.image?.url).toBe(
      '//images.ctfassets.net/7g2w796onies/2eBa8I8ATi8KEN5Sf4Ubu6/991b2273ce2b8b5159e8147a08751371/category-header-sample.png'
    )
  })

  it('does not error if passed undefined', () => {
    // @ts-ignore
    const normalizedData = normalizePageLink(undefined)
    expect(normalizedData).toEqual({})
  })

  it('does not error if passed empty object', () => {
    // @ts-ignore
    const normalizedData = normalizePageLink({})
    expect(normalizedData).toEqual({})
  })

  it('does not error if passed fields with empty object', () => {
    // @ts-ignore
    const normalizedData = normalizePageLink({ fields: {} })
    expect(normalizedData).toEqual({})
  })
})
