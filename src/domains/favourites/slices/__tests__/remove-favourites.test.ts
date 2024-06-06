import { removeFavouritesSlice } from '../remove-favourites'

describe(removeFavouritesSlice.name, () => {
  describe(removeFavouritesSlice.actions.save.toString(), () => {
    it('saves the first instance of the item only for logged out customers', () => {
      expect(
        removeFavouritesSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false,
            items: []
          },
          removeFavouritesSlice.actions.save({ sku: 'some-sku' })
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false,
        items: [
          {
            sku: 'some-sku',
            isLoading: true,
            isSaved: false,
            wasSuccess: false,
            wasError: false
          }
        ]
      })
    })
  })

  describe(removeFavouritesSlice.actions.itemIsSaved.toString(), () => {
    it('sets isSaved true', () => {
      expect(
        removeFavouritesSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false,
            items: [
              {
                sku: 'some-sku',
                isLoading: false,
                isSaved: false,
                wasSuccess: false,
                wasError: false
              }
            ]
          },
          removeFavouritesSlice.actions.itemIsSaved({
            sku: 'some-sku',
            isSaved: true
          })
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false,
        items: [
          {
            sku: 'some-sku',
            isLoading: false,
            isSaved: true,
            wasSuccess: false,
            wasError: false
          }
        ]
      })
    })
  })

  describe(removeFavouritesSlice.actions.trigger.toString(), () => {
    it('creates the first instance of the item if it does not exists', () => {
      expect(
        removeFavouritesSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false,
            items: []
          },
          removeFavouritesSlice.actions.trigger({ sku: 'some-sku' })
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false,
        items: [
          {
            sku: 'some-sku',
            isLoading: false,
            isSaved: true,
            wasSuccess: false,
            wasError: false
          }
        ]
      })
    })
  })

  describe(removeFavouritesSlice.actions.trigger.toString(), () => {
    it('does not duplicate the item if it already exists', () => {
      expect(
        removeFavouritesSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false,
            items: [
              {
                sku: 'some-sku',
                isLoading: false,
                isSaved: false,
                wasSuccess: false,
                wasError: false
              }
            ]
          },
          removeFavouritesSlice.actions.trigger({ sku: 'some-sku' })
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false,
        items: [
          {
            sku: 'some-sku',
            isLoading: false,
            isSaved: false,
            wasSuccess: false,
            wasError: false
          }
        ]
      })
    })
  })

  describe(removeFavouritesSlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        removeFavouritesSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false,
            items: [
              {
                sku: 'some-sku',
                isLoading: false,
                isSaved: false,
                wasSuccess: true,
                wasError: false
              }
            ]
          },
          removeFavouritesSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false,
        items: [
          {
            sku: 'some-sku',
            isLoading: false,
            isSaved: false,
            wasSuccess: true,
            wasError: false
          }
        ]
      })
    })
  })

  describe(removeFavouritesSlice.actions.success.toString(), () => {
    it('sets wasSuccess to true', () => {
      expect(
        removeFavouritesSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false,
            items: [
              {
                sku: 'some-sku',
                isLoading: false,
                isSaved: false,
                wasSuccess: true,
                wasError: false
              }
            ]
          },
          removeFavouritesSlice.actions.success()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false,
        items: [
          {
            sku: 'some-sku',
            isLoading: false,
            isSaved: false,
            wasSuccess: true,
            wasError: false
          }
        ]
      })
    })
  })

  describe(removeFavouritesSlice.actions.failure.toString(), () => {
    it('sets wasError to true and removes error message', () => {
      expect(
        removeFavouritesSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false,
            items: [
              {
                sku: 'some-sku',
                isLoading: false,
                isSaved: false,
                wasSuccess: true,
                wasError: false
              }
            ]
          },
          removeFavouritesSlice.actions.failure({
            message: 'An error happened'
          })
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: true,
        items: [
          {
            sku: 'some-sku',
            isLoading: false,
            isSaved: false,
            wasSuccess: true,
            wasError: false
          }
        ],
        error: 'An error happened'
      })
    })
  })

  describe(removeFavouritesSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        removeFavouritesSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false,
            items: [
              {
                sku: 'some-sku',
                isLoading: false,
                isSaved: false,
                wasSuccess: true,
                wasError: false
              }
            ]
          },
          removeFavouritesSlice.actions.fulfill()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false,
        items: [
          {
            sku: 'some-sku',
            isLoading: false,
            isSaved: false,
            wasSuccess: true,
            wasError: false
          }
        ]
      })
    })
  })

  describe(removeFavouritesSlice.actions.itemIsLoading.toString(), () => {
    it('updates the item isLoading state', async () => {
      expect(
        removeFavouritesSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false,
            items: [
              {
                sku: 'some-sku',
                isLoading: false,
                isSaved: false,
                wasSuccess: false,
                wasError: false
              }
            ]
          },
          removeFavouritesSlice.actions.itemIsLoading({
            sku: 'some-sku',
            isLoading: true
          })
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false,
        items: [
          {
            sku: 'some-sku',
            isLoading: true,
            isSaved: false,
            wasSuccess: false,
            wasError: false
          }
        ]
      })
    })
  })

  describe(removeFavouritesSlice.actions.itemWasSuccess.toString(), () => {
    it('updates the item wasSuccess state', async () => {
      expect(
        removeFavouritesSlice.reducer(
          {
            isLoading: false,
            wasSuccess: true,
            wasError: false,
            items: [
              {
                sku: 'some-sku',
                isLoading: false,
                isSaved: false,
                wasSuccess: false,
                wasError: false
              }
            ]
          },
          removeFavouritesSlice.actions.itemWasSuccess({
            sku: 'some-sku',
            wasSuccess: true
          })
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false,
        items: [
          {
            sku: 'some-sku',
            isLoading: false,
            isSaved: false,
            wasSuccess: true,
            wasError: false
          }
        ]
      })
    })
  })

  describe(removeFavouritesSlice.actions.itemWasError.toString(), () => {
    it('updates the item wasError state', async () => {
      expect(
        removeFavouritesSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false,
            items: [
              {
                sku: 'some-sku',
                isLoading: false,
                isSaved: false,
                wasSuccess: false,
                wasError: false
              }
            ]
          },
          removeFavouritesSlice.actions.itemWasError({
            sku: 'some-sku',
            wasError: true
          })
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false,
        items: [
          {
            sku: 'some-sku',
            isLoading: false,
            isSaved: false,
            wasSuccess: false,
            wasError: true
          }
        ]
      })
    })
  })
})
