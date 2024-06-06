import { getFavouritesSlice } from '../get-favourites'

describe(getFavouritesSlice.name, () => {
  describe(getFavouritesSlice.actions.trigger.toString(), () => {
    it('does nothing', () => {
      expect(
        getFavouritesSlice.reducer(
          {
            isLoading: false,
            isProductsLoading: false,
            wasSuccess: false,
            wasError: false,
            wasProductsSuccess: false,
            wasProductsError: false,
            forceRefresh: false,
            favouritesList: {
              id: 'some-id',
              items: []
            }
          },
          getFavouritesSlice.actions.trigger()
        )
      ).toEqual({
        isLoading: false,
        isProductsLoading: false,
        wasSuccess: false,
        wasError: false,
        wasProductsSuccess: false,
        wasProductsError: false,
        forceRefresh: false,
        favouritesList: {
          id: 'some-id',
          items: []
        }
      })
    })
  })

  describe(getFavouritesSlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        getFavouritesSlice.reducer(
          {
            isLoading: false,
            isProductsLoading: false,
            wasSuccess: false,
            wasError: false,
            wasProductsSuccess: false,
            wasProductsError: false,
            forceRefresh: false,
            favouritesList: {
              id: 'some-id',
              items: ['some-sku']
            }
          },
          getFavouritesSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        isProductsLoading: false,
        wasSuccess: false,
        wasError: false,
        wasProductsSuccess: false,
        wasProductsError: false,
        forceRefresh: false,
        favouritesList: {
          id: 'some-id',
          items: ['some-sku']
        }
      })
    })
  })

  describe(getFavouritesSlice.actions.success.toString(), () => {
    it('sets wasSuccess to true', () => {
      expect(
        getFavouritesSlice.reducer(
          {
            isLoading: true,
            isProductsLoading: false,
            wasSuccess: false,
            wasError: false,
            wasProductsSuccess: false,
            wasProductsError: false,
            forceRefresh: false,
            favouritesList: {
              id: 'some-id',
              items: ['some-sku']
            }
          },
          getFavouritesSlice.actions.success({
            id: 'some-id',
            items: ['some-sku', 'some-sku-2']
          })
        )
      ).toEqual({
        isLoading: true,
        isProductsLoading: false,
        wasSuccess: true,
        wasError: false,
        wasProductsSuccess: false,
        wasProductsError: false,
        forceRefresh: false,
        favouritesList: {
          id: 'some-id',
          items: ['some-sku', 'some-sku-2']
        }
      })
    })
  })

  describe(getFavouritesSlice.actions.failure.toString(), () => {
    it('sets wasError to true and gets error message', () => {
      expect(
        getFavouritesSlice.reducer(
          {
            isLoading: true,
            isProductsLoading: false,
            wasSuccess: false,
            wasError: false,
            wasProductsSuccess: false,
            wasProductsError: false,
            forceRefresh: false,
            favouritesList: { id: 'some-id', items: ['some-sku'] }
          },
          getFavouritesSlice.actions.failure({
            message: 'An error happened'
          })
        )
      ).toEqual({
        isLoading: true,
        isProductsLoading: false,
        wasSuccess: false,
        wasError: true,
        wasProductsSuccess: false,
        wasProductsError: false,
        forceRefresh: false,
        favouritesList: { id: 'some-id', items: ['some-sku'] },
        error: 'An error happened'
      })
    })
  })

  describe(getFavouritesSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        getFavouritesSlice.reducer(
          {
            isLoading: true,
            isProductsLoading: true,
            wasSuccess: true,
            wasError: false,
            wasProductsSuccess: false,
            wasProductsError: false,
            forceRefresh: false,
            favouritesList: { id: 'some-id', items: ['some-sku'] }
          },
          getFavouritesSlice.actions.fulfill()
        )
      ).toEqual({
        isLoading: false,
        isProductsLoading: false,
        wasSuccess: true,
        wasError: false,
        wasProductsSuccess: false,
        wasProductsError: false,
        forceRefresh: false,
        favouritesList: { id: 'some-id', items: ['some-sku'] }
      })
    })
  })

  describe(getFavouritesSlice.actions.addItem.toString(), () => {
    it('adds item to state', () => {
      expect(
        getFavouritesSlice.reducer(
          {
            isLoading: false,
            isProductsLoading: false,
            wasSuccess: false,
            wasError: false,
            wasProductsSuccess: false,
            wasProductsError: false,
            forceRefresh: false,
            favouritesList: { id: 'some-id', items: ['some-sku'] }
          },
          getFavouritesSlice.actions.addItem({ sku: 'some-sku-2' })
        )
      ).toEqual({
        isLoading: false,
        isProductsLoading: false,
        wasSuccess: false,
        wasError: false,
        wasProductsSuccess: false,
        wasProductsError: false,
        forceRefresh: false,
        favouritesList: { id: 'some-id', items: ['some-sku', 'some-sku-2'] }
      })
    })
  })

  describe(getFavouritesSlice.actions.getProductsTrigger.toString(), () => {
    it('triggers get products', () => {
      expect(
        getFavouritesSlice.reducer(
          {
            isLoading: false,
            isProductsLoading: false,
            wasSuccess: false,
            wasError: false,
            wasProductsSuccess: false,
            wasProductsError: false,
            forceRefresh: false
          },
          getFavouritesSlice.actions.getProductsTrigger({
            skus: ['some-sku', 'some-sku-2']
          })
        )
      ).toEqual({
        isLoading: false,
        isProductsLoading: true,
        wasSuccess: false,
        wasError: false,
        wasProductsSuccess: false,
        wasProductsError: false,
        forceRefresh: false
      })
    })
  })

  describe(getFavouritesSlice.actions.getProductsSuccess.toString(), () => {
    it('adds products to the state', () => {
      expect(
        getFavouritesSlice.reducer(
          {
            isLoading: true,
            isProductsLoading: true,
            wasSuccess: false,
            wasError: false,
            wasProductsSuccess: false,
            wasProductsError: false,
            forceRefresh: false,
            favouritesList: {
              items: ['some-sku', 'some-sku-2'],
              products: [{ sku: 'some-sku' }, { sku: 'some-sku-2' }]
            }
          },
          getFavouritesSlice.actions.getProductsSuccess([
            { sku: 'some-sku' },
            { sku: 'some-sku-2' }
          ])
        )
      ).toEqual({
        isLoading: true,
        isProductsLoading: true,
        wasSuccess: false,
        wasError: false,
        wasProductsSuccess: true,
        wasProductsError: false,
        forceRefresh: false,
        favouritesList: {
          items: ['some-sku', 'some-sku-2'],
          products: [{ sku: 'some-sku' }, { sku: 'some-sku-2' }]
        }
      })
    })
  })

  describe(getFavouritesSlice.actions.getProductsSuccess.toString(), () => {
    it('removes products', () => {
      expect(
        getFavouritesSlice.reducer(
          {
            isLoading: true,
            isProductsLoading: false,
            wasSuccess: false,
            wasError: false,
            wasProductsSuccess: true,
            wasProductsError: true,
            forceRefresh: false,
            favouritesList: {
              items: ['some-sku', 'some-sku-2'],
              products: [{ sku: 'some-sku' }, { sku: 'some-sku-2' }]
            }
          },
          getFavouritesSlice.actions.resetProducts()
        )
      ).toEqual({
        isLoading: true,
        isProductsLoading: false,
        wasSuccess: false,
        wasError: false,
        wasProductsSuccess: false,
        wasProductsError: false,
        forceRefresh: false,
        favouritesList: {
          items: ['some-sku', 'some-sku-2']
        }
      })
    })
  })

  describe(getFavouritesSlice.actions.getProductsSuccess.toString(), () => {
    it('sets wasProductsError to true and gets error message', () => {
      expect(
        getFavouritesSlice.reducer(
          {
            isLoading: true,
            isProductsLoading: false,
            wasSuccess: false,
            wasError: false,
            wasProductsSuccess: false,
            wasProductsError: true,
            forceRefresh: false,
            favouritesList: {
              items: ['some-sku', 'some-sku-2'],
              products: []
            }
          },
          getFavouritesSlice.actions.getProductsFailure({
            message: 'Some error'
          })
        )
      ).toEqual({
        error: 'Some error',
        isLoading: true,
        isProductsLoading: false,
        wasSuccess: false,
        wasError: false,
        wasProductsSuccess: false,
        wasProductsError: true,
        forceRefresh: false,
        favouritesList: {
          items: ['some-sku', 'some-sku-2'],
          products: []
        }
      })
    })
  })

  describe(getFavouritesSlice.actions.removeItem.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        getFavouritesSlice.reducer(
          {
            isLoading: false,
            isProductsLoading: false,
            wasSuccess: false,
            wasError: false,
            wasProductsSuccess: false,
            wasProductsError: false,
            forceRefresh: false,
            favouritesList: { id: 'some-id', items: ['some-sku'] }
          },
          getFavouritesSlice.actions.removeItem({ sku: 'some-sku' })
        )
      ).toEqual({
        isLoading: false,
        isProductsLoading: false,
        wasSuccess: false,
        wasError: false,
        wasProductsSuccess: false,
        wasProductsError: false,
        forceRefresh: false,
        favouritesList: { id: 'some-id', items: [] }
      })
    })
  })

  describe(getFavouritesSlice.actions.forceRefresh.toString(), () => {
    it('forces refresh', () => {
      expect(
        getFavouritesSlice.reducer(
          {
            isLoading: false,
            isProductsLoading: false,
            wasSuccess: false,
            wasError: false,
            wasProductsSuccess: false,
            wasProductsError: false,
            forceRefresh: false,
            favouritesList: { id: 'some-id', items: [] }
          },
          getFavouritesSlice.actions.forceRefresh()
        )
      ).toEqual({
        isLoading: false,
        isProductsLoading: false,
        wasSuccess: false,
        wasError: false,
        wasProductsSuccess: false,
        wasProductsError: false,
        forceRefresh: true,
        favouritesList: { id: 'some-id', items: [] }
      })
    })
  })
})
