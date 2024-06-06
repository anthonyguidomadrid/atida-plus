import type { Entry } from 'contentful'
import { removeUndefinedPropertiesFromObject } from '~helpers'
import { ContentfulMenuItem, normalizeMenuItem, MenuItem } from './menu-item'
import { checkIfGraphQLResponse } from '~domains/contentful'
import { MenuFragment, MenuItemFragment } from '~generated-graphql'

export type Menu = {
  title?: string
  items?: MenuItem[]
  id?: string
}

export type ContentfulMenu = Entry<{
  title: string
  items?: ContentfulMenuItem[]
  id?: string
}>

const normalizeMenuRest = (menu?: ContentfulMenu): Menu =>
  removeUndefinedPropertiesFromObject({
    title: menu?.fields?.title,
    items: menu?.fields?.items
      ?.filter(item => filterLoopedEntries(menu?.fields?.id, item))
      .map(item => normalizeMenuItem(item)),
    id: menu?.fields?.id
  })

const normalizeMenuGraphql = (menuCollection?: MenuFragment): Menu => {
  const menu = menuCollection?.items?.[0]

  return removeUndefinedPropertiesFromObject({
    title: menu?.title ?? undefined,
    id: menu?.id ?? undefined,
    items: menu?.itemsCollection?.items?.map(item =>
      normalizeMenuItem(item as MenuItemFragment)
    )
  })
}

export const normalizeMenu = (menu?: ContentfulMenu | MenuFragment): Menu =>
  checkIfGraphQLResponse(menu)
    ? normalizeMenuGraphql(menu)
    : normalizeMenuRest(menu)

export const filterLoopedEntries = (
  currentMenuId?: string | undefined,
  subMenuItem?: ContentfulMenuItem
): boolean =>
  currentMenuId === undefined ||
  currentMenuId !== subMenuItem?.fields?.submenu?.fields?.id
