import { normalizedMenu } from '../../__mocks__/menu'
import { normalizeProductsMenuSubmenu } from '../products-menu-submenu'

describe(normalizeProductsMenuSubmenu, () => {
  it('normalizes the data', () => {
    // @ts-ignore
    const normalizedData = normalizeProductsMenuSubmenu(normalizedMenu)
    expect(normalizedData.categories).toHaveLength(3)
    expect(normalizedData.categories[0].id).toBe('medicine')
    expect(normalizedData.categories[0].url).toBe('/medicines')
    expect(normalizedData.categories[0].level).toBe(0)
    expect(normalizedData.categories[0].subcategories).toHaveLength(3)
    expect(normalizedData.categories[0].subcategories?.[1].url).toBe(
      '/medicines/allergy'
    )
  })

  it('does not error if passed undefined', () => {
    // @ts-ignore
    const normalizedData = normalizeProductsMenuSubmenu(undefined)
    expect(normalizedData).toEqual({ categories: [] })
  })

  it('does not error if passed empty object', () => {
    // @ts-ignore
    const normalizedData = normalizeProductsMenuSubmenu({})
    expect(normalizedData).toEqual({ categories: [] })
  })

  it('does not error if passed fields with empty object', () => {
    // @ts-ignore
    const normalizedData = normalizeProductsMenuSubmenu({ fields: {} })
    expect(normalizedData).toEqual({ categories: [] })
  })
})
