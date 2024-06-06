import { createSelector } from '@reduxjs/toolkit'
import { normalizeProductsMenuSubmenu } from '~domains/contentful/normalizers/products-menu-submenu'
import { RootState } from '~domains/redux'

const selectPage = (state: RootState) => state.server.page

const selectCommon = createSelector(selectPage, page => page.common)

export const selectCommonSuccess = createSelector(
  selectCommon,
  common => common.wasSuccess
)

export const selectFooter = createSelector(
  selectCommon,
  common => common.footer
)

export const selectHeaderNavigationLeft = createSelector(
  selectCommon,
  common => common.headerNavigationLeft
)

export const selectHeaderNavigationRight = createSelector(
  selectCommon,
  common => common.headerNavigationRight
)

export const selectHeaderNavigationCategories = createSelector(
  selectHeaderNavigationLeft,
  headerNavigationLeft => {
    const productsMenu = headerNavigationLeft?.items?.filter(
      item => item?.id === 'Products'
    )
    return productsMenu?.length && productsMenu[0]?.submenu
      ? normalizeProductsMenuSubmenu(productsMenu[0].submenu).categories
      : undefined
  }
)

export const selectOrganization = createSelector(
  selectCommon,
  common => common.organization
)

export const selectCampaignLabels = createSelector(
  selectCommon,
  common => common.campaignLabels
)
