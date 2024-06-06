import { CategoryListProps } from '~components/molecules/CategoryList/CategoryList'
import {
  removeUndefinedPropertiesFromObject,
  prependURLWithSlash
} from '~helpers'
import { Menu } from './menu'

export type Subcategory = {
  id?: string
  title?: string
  url?: string
  level?: number
  subCategories?: Subcategory[]
}

const normalizeSubcategories = (menu: Menu): Subcategory[] => {
  const subcategories: Subcategory[] = []
  menu.items?.map(item => {
    subcategories.push(
      removeUndefinedPropertiesFromObject({
        id: item?.id?.toLowerCase(),
        title: (item?.title || item?.link?.label) ?? undefined,
        url: prependURLWithSlash(item?.link?.url),
        level: item?.link?.category?.level,
        subcategories: normalizeProductsMenuSubmenu(item?.submenu).categories
      })
    )
  })
  return subcategories
}

export const normalizeProductsMenuSubmenu = (
  menu?: Menu
): Omit<
  CategoryListProps,
  'currentMenuStack' | 'addToMenuStack' | 'removeFromMenuStack'
> => {
  const categoriesArray: CategoryListProps['categories'] = []
  menu &&
    menu.items?.map(menuItem => {
      const category = menuItem?.link?.category
      categoriesArray.push(
        removeUndefinedPropertiesFromObject({
          id: menuItem?.id?.toLowerCase(),
          title: (menuItem?.title || menuItem?.link?.label) ?? undefined,
          color: category ? category.color : undefined,
          level: category ? category.level : undefined,
          url: prependURLWithSlash(menuItem?.link?.url),
          image: category ? category.image : undefined,
          subcategories: menuItem?.submenu
            ? normalizeSubcategories(menuItem?.submenu)
            : undefined
        })
      )
    })
  return {
    categories: categoriesArray
  }
}
