import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '~domains/redux'

const selectMenu = (state: RootState) => state.server.menu

export const selectMenuData = createSelector(
  selectMenu,
  menu => menu?.menu?.menu
)
