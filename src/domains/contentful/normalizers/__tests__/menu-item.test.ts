import { normalizeMenuItem } from '../menu-item'
import { contentfulMenu, normalizedMenu } from '../../__mocks__/menu'

describe(normalizeMenuItem, () => {
  it('normalizes the data', () => {
    // @ts-ignore
    const normalizedData = normalizeMenuItem(contentfulMenu.fields.items[0])
    expect(normalizedData).toEqual(normalizedMenu.items?.[0])
  })

  it('does not error if passed undefined', () => {
    // @ts-ignore
    const normalizedData = normalizeMenuItem(undefined)
    expect(normalizedData).toEqual({ id: undefined })
  })

  it('does not error if passed empty object', () => {
    // @ts-ignore
    const normalizedData = normalizeMenuItem({})
    expect(normalizedData).toEqual({})
  })

  it('does not error if passed fields with empty objet', () => {
    // @ts-ignore
    const normalizedData = normalizeMenuItem({ fields: {} })
    expect(normalizedData).toEqual({ title: undefined, items: undefined })
  })

  it('returns an empty object if passed submenu field is an empty object', () => {
    // @ts-ignore
    const normalizedData = normalizeMenuItem({ fields: { submenu: {} } })
    expect(normalizedData).toEqual({ submenu: {} })
  })
})
