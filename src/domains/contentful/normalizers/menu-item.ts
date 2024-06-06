import { ContentfulMenu, normalizeMenu, Menu } from './menu'
import type { Entry } from 'contentful'
import { ContentfulPage } from '~domains/page/types'
import { hasOwnProperty, removeUndefinedPropertiesFromObject } from '~helpers'
import { ContentfulLink, Link, normalizeLink } from './link'
import { normalizePageLink } from './page-link'
import { MenuItemFragment } from '~generated-graphql'
import { checkIfGraphQLResponse } from '~domains/contentful'

export type MenuItem = {
  id?: string
  link?: Link
  submenu?: Menu
  title?: string
}

export type ContentfulMenuItem = Entry<{
  id: string
  link: ContentfulLink | Entry<ContentfulPage>
  submenu?: ContentfulMenu
  title?: string
}>

const checkIfLink = (
  link: ContentfulLink | Entry<ContentfulPage>
): link is ContentfulLink => !!hasOwnProperty(link.fields ?? {}, 'label')

const normalizeMenuItemRest = (item?: ContentfulMenuItem): MenuItem => {
  const link = item?.fields?.link
  return removeUndefinedPropertiesFromObject({
    id: item?.fields?.id ?? undefined,
    link: link
      ? checkIfLink(link)
        ? normalizeLink(link)
        : normalizePageLink(link)
      : undefined,
    submenu: item?.fields?.submenu
      ? normalizeMenu(item?.fields?.submenu)
      : undefined,
    title: item?.fields?.title ?? undefined
  })
}

const normalizeMenuItemGraphql = (menuItem?: MenuItemFragment): MenuItem => {
  const link = menuItem?.link as
    | ContentfulLink
    | Entry<ContentfulPage>
    | undefined
  return removeUndefinedPropertiesFromObject({
    id: menuItem?.id ?? undefined,
    title: menuItem?.title ?? undefined,
    link: link
      ? checkIfLink(link as ContentfulLink | Entry<ContentfulPage>)
        ? normalizeLink(link as ContentfulLink)
        : normalizePageLink(link as Entry<ContentfulPage>)
      : undefined
  })
}

export const normalizeMenuItem = (
  menuItem?: MenuItemFragment | ContentfulMenuItem
): MenuItem =>
  checkIfGraphQLResponse(menuItem)
    ? normalizeMenuItemGraphql(menuItem)
    : normalizeMenuItemRest(menuItem)
