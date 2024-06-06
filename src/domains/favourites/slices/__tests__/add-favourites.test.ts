import { addFavouritesSlice } from '../add-favourites'

describe(addFavouritesSlice.name, () => {
  describe(addFavouritesSlice.actions.save.toString(), () => {
    it('saves the first instance of the item', () => {
      expect(
        addFavouritesSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false,
            items: []
          },
          addFavouritesSlice.actions.save({ sku: 'some-sku' })
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

  describe(addFavouritesSlice.actions.itemIsSaved.toString(), () => {
    it('sets isSaved true', () => {
      expect(
        addFavouritesSlice.reducer(
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
          addFavouritesSlice.actions.itemIsSaved({
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

  describe(addFavouritesSlice.actions.trigger.toString(), () => {
    it('creates the first instance of the item if it does not exists', () => {
      expect(
        addFavouritesSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false,
            items: []
          },
          addFavouritesSlice.actions.trigger({ sku: 'some-sku' })
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

  describe(addFavouritesSlice.actions.trigger.toString(), () => {
    it('does not duplicate the item if it already exists', () => {
      expect(
        addFavouritesSlice.reducer(
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
          addFavouritesSlice.actions.trigger({ sku: 'some-sku' })
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

  describe(addFavouritesSlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        addFavouritesSlice.reducer(
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
          addFavouritesSlice.actions.request()
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

  describe(addFavouritesSlice.actions.success.toString(), () => {
    it('sets wasSuccess to true', () => {
      expect(
        addFavouritesSlice.reducer(
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
          addFavouritesSlice.actions.success()
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

  describe(addFavouritesSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        addFavouritesSlice.reducer(
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
          addFavouritesSlice.actions.failure({
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

  describe(addFavouritesSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        addFavouritesSlice.reducer(
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
          addFavouritesSlice.actions.fulfill()
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

  describe(addFavouritesSlice.actions.itemIsLoading.toString(), () => {
    it('updates the item isLoading state', async () => {
      expect(
        addFavouritesSlice.reducer(
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
          addFavouritesSlice.actions.itemIsLoading({
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

  describe(addFavouritesSlice.actions.itemWasSuccess.toString(), () => {
    it('updates the item wasSuccess state', async () => {
      expect(
        addFavouritesSlice.reducer(
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
          addFavouritesSlice.actions.itemWasSuccess({
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

  describe(addFavouritesSlice.actions.itemWasError.toString(), () => {
    it('updates the item wasError state', async () => {
      expect(
        addFavouritesSlice.reducer(
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
          addFavouritesSlice.actions.itemWasError({
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
