import { deleteAddressSlice } from '../delete-address'

describe(deleteAddressSlice.name, () => {
  describe(deleteAddressSlice.actions.trigger.toString(), () => {
    it('creates the first instance of the item if it does not exists', () => {
      expect(
        deleteAddressSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false,
            items: []
          },
          deleteAddressSlice.actions.trigger({
            reference: 'some-reference',
            addressId: 'some-address-id'
          })
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false,
        items: [
          {
            id: 'some-address-id',
            isLoading: false,
            wasSuccess: false,
            wasError: false
          }
        ]
      })
    })

    it('does not create the first instance of the item if it exists', () => {
      expect(
        deleteAddressSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false,
            items: [
              {
                id: 'some-address-id',
                isLoading: false,
                wasSuccess: false,
                wasError: false
              }
            ]
          },
          deleteAddressSlice.actions.trigger({
            reference: 'some-reference',
            addressId: 'some-address-id'
          })
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false,
        items: [
          {
            id: 'some-address-id',
            isLoading: false,
            wasSuccess: false,
            wasError: false
          }
        ]
      })
    })
  })

  describe(deleteAddressSlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        deleteAddressSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false,
            items: [
              {
                id: 'some-address-id',
                isLoading: false,
                wasSuccess: false,
                wasError: false
              }
            ]
          },
          deleteAddressSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false,
        items: [
          {
            id: 'some-address-id',
            isLoading: false,
            wasSuccess: false,
            wasError: false
          }
        ]
      })
    })
  })

  describe(deleteAddressSlice.actions.success.toString(), () => {
    it('sets wasSuccess to true', () => {
      expect(
        deleteAddressSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false,
            items: [
              {
                id: 'some-address-id',
                isLoading: false,
                wasSuccess: true,
                wasError: false
              }
            ]
          },
          deleteAddressSlice.actions.success()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false,
        items: [
          {
            id: 'some-address-id',
            isLoading: false,
            wasSuccess: true,
            wasError: false
          }
        ]
      })
    })
  })

  describe(deleteAddressSlice.actions.failure.toString(), () => {
    it('sets wasError to true and removes error message', () => {
      expect(
        deleteAddressSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false,
            items: [
              {
                id: 'some-address-id',
                isLoading: false,
                wasSuccess: true,
                wasError: false
              }
            ]
          },
          deleteAddressSlice.actions.failure({
            message: 'An error happened'
          })
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: true,
        items: [
          {
            id: 'some-address-id',
            isLoading: false,
            wasSuccess: true,
            wasError: false
          }
        ],
        error: 'An error happened'
      })
    })
  })

  describe(deleteAddressSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        deleteAddressSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false,
            items: [
              {
                id: 'some-address-id',
                isLoading: false,
                wasSuccess: true,
                wasError: false
              }
            ]
          },
          deleteAddressSlice.actions.fulfill()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false,
        items: [
          {
            id: 'some-address-id',
            isLoading: false,
            wasSuccess: true,
            wasError: false
          }
        ]
      })
    })
  })

  describe(deleteAddressSlice.actions.itemIsLoading.toString(), () => {
    it('updates the item isLoading state', async () => {
      expect(
        deleteAddressSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false,
            items: [
              {
                id: 'some-address-id',
                isLoading: false,
                wasSuccess: false,
                wasError: false
              }
            ]
          },
          deleteAddressSlice.actions.itemIsLoading({
            id: 'some-address-id',
            isLoading: true
          })
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false,
        items: [
          {
            id: 'some-address-id',
            isLoading: true,
            wasSuccess: false,
            wasError: false
          }
        ]
      })
    })
  })

  describe(deleteAddressSlice.actions.itemWasSuccess.toString(), () => {
    it('updates the item wasSuccess state', async () => {
      expect(
        deleteAddressSlice.reducer(
          {
            isLoading: false,
            wasSuccess: true,
            wasError: false,
            items: [
              {
                id: 'some-address-id',
                isLoading: false,
                wasSuccess: false,
                wasError: false
              }
            ]
          },
          deleteAddressSlice.actions.itemWasSuccess({
            id: 'some-address-id',
            wasSuccess: true
          })
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false,
        items: [
          {
            id: 'some-address-id',
            isLoading: false,
            wasSuccess: true,
            wasError: false
          }
        ]
      })
    })
  })

  describe(deleteAddressSlice.actions.itemWasError.toString(), () => {
    it('updates the item wasError state', async () => {
      expect(
        deleteAddressSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false,
            items: [
              {
                id: 'some-address-id',
                isLoading: false,
                wasSuccess: false,
                wasError: false
              }
            ]
          },
          deleteAddressSlice.actions.itemWasError({
            id: 'some-address-id',
            wasError: true
          })
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false,
        items: [
          {
            id: 'some-address-id',
            isLoading: false,
            wasSuccess: false,
            wasError: true
          }
        ]
      })
    })
  })

  describe(deleteAddressSlice.actions.clearSuccess.toString(), () => {
    it('clears the success state', async () => {
      expect(
        deleteAddressSlice.reducer(
          {
            isLoading: false,
            wasSuccess: true,
            wasError: false
          },
          deleteAddressSlice.actions.clearSuccess()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })
})
