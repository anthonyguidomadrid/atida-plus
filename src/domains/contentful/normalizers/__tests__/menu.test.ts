import { normalizeMenu } from '../menu'
import { contentfulMenu, normalizedMenu } from '../../__mocks__/menu'

describe(normalizeMenu, () => {
  it('normalizes the data', () => {
    // @ts-ignore
    const normalizedData = normalizeMenu(contentfulMenu)
    expect(normalizedData?.id).toBe(normalizedMenu.id)
    expect(normalizedData?.items).toEqual(normalizedMenu.items)
  })

  it('does not error if passed undefined', () => {
    // @ts-ignore
    const normalizedData = normalizeMenu(undefined)
    expect(normalizedData).toEqual({ title: undefined, items: undefined })
  })

  it('does not error if passed empty objet', () => {
    // @ts-ignore
    const normalizedData = normalizeMenu({})
    expect(normalizedData).toEqual({ title: undefined, items: undefined })
  })

  it('does not error if passed fields with empty objet', () => {
    // @ts-ignore
    const normalizedData = normalizeMenu({ fields: {} })
    expect(normalizedData).toEqual({ title: undefined, items: undefined })
  })

  it('returns an empty array if items is empty array', () => {
    // @ts-ignore
    const normalizedData = normalizeMenu({ fields: { items: [] } })
    expect(normalizedData).toEqual({ title: undefined, items: [] })
  })
})
