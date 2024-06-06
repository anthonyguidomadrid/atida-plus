import { Product } from '~domains/product'
import { hydrate } from '~domains/redux'
import { contentSlice } from '../content'

describe(contentSlice.name, () => {
  describe(contentSlice.actions.trigger.toString(), () => {
    it('does nothing', () => {
      expect(
        contentSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          contentSlice.actions.trigger({})
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(contentSlice.actions.request.toString(), () => {
    it('sets isLoading to true and other states to false', () => {
      expect(
        contentSlice.reducer(
          {
            isLoading: false,
            wasSuccess: true,
            wasError: true,
            error: 'An error happened'
          },
          contentSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(contentSlice.actions.success.toString(), () => {
    it('sets wasSuccess to true and adds data to the state', () => {
      expect(
        contentSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          contentSlice.actions.success({
            name: 'Something'
          } as Product)
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false,
        data: { name: 'Something' }
      })
    })
  })

  describe(contentSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        contentSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          contentSlice.actions.failure({
            message: 'An error happened'
          })
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: true,
        error: 'An error happened'
      })
    })
  })

  describe(contentSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        contentSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: true,
            error: 'An error happened'
          },
          contentSlice.actions.fulfill()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: true,
        error: 'An error happened'
      })
    })
  })
  describe(contentSlice.actions.setShowLabels.toString(), () => {
    it('sets setShowLabels to false', () => {
      expect(
        contentSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: true,
            showLabels: false
          },
          contentSlice.actions.setShowLabels(false)
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: true,
        showLabels: false
      })
    })
  })

  describe(hydrate.toString(), () => {
    it('replaces state with hydrated state', () => {
      expect(
        contentSlice.reducer(
          {
            isLoading: false,
            wasError: false,
            wasSuccess: false
          },
          hydrate({
            translations: {
              namespaces: {
                de: {
                  something: {
                    isLoading: false,
                    wasError: true,
                    wasSuccess: true,
                    error: 'Something'
                  }
                }
              }
            },
            product: {
              content: {
                isLoading: true,
                wasSuccess: true,
                wasError: false,
                data: { name: 'Something' } as Product
              }
            }
          })
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false,
        data: { name: 'Something' }
      })
    })
  })
})
