import { fetchMenuItemCollectionSlice } from '~domains/menu/slices/fetch-menu-item-collection'
import { menuMock } from '~domains/page/__mocks__/contentfulCategoryContent'

describe(fetchMenuItemCollectionSlice.name, () => {
  describe(fetchMenuItemCollectionSlice.actions.trigger.toString(), () => {
    it('does nothing on trigger', () => {
      expect(
        fetchMenuItemCollectionSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          fetchMenuItemCollectionSlice.actions.trigger({
            menuTitle: 'testTitle'
          })
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(fetchMenuItemCollectionSlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        fetchMenuItemCollectionSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          fetchMenuItemCollectionSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(fetchMenuItemCollectionSlice.actions.success.toString(), () => {
    it('sets wasSuccess to true', async () => {
      expect(
        fetchMenuItemCollectionSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false,
            menu: null
          },
          await fetchMenuItemCollectionSlice.actions.success(menuMock)
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false,
        menu: menuMock
      })
    })
  })

  describe(fetchMenuItemCollectionSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        fetchMenuItemCollectionSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          fetchMenuItemCollectionSlice.actions.failure({
            message: 'Something went horribly wrong'
          })
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: true,
        error: 'Something went horribly wrong'
      })
    })
  })

  describe(fetchMenuItemCollectionSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        fetchMenuItemCollectionSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false
          },
          fetchMenuItemCollectionSlice.actions.fulfill()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false
      })
    })
  })
})
