import { createSlice } from '@reduxjs/toolkit'

export enum ProductViews {
  GRID = 'grid',
  LIST = 'list'
}

type ViewToggleState = {
  productView: ProductViews
}

const initialState: ViewToggleState = {
  productView: ProductViews.GRID
}

export const viewToggleSlice = createSlice({
  name: 'product/viewToggle',
  initialState,
  reducers: {
    toggleView(state) {
      state.productView =
        state.productView === ProductViews.GRID
          ? ProductViews.LIST
          : ProductViews.GRID
    }
  }
})
