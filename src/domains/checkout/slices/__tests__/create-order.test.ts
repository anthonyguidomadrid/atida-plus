import { createOrderData } from '~domains/checkout/__mocks__/create-order'
import { createOrderSlice } from '../create-order'
import { clearStateErrors } from '~domains/redux/actions'

describe(createOrderSlice.name, () => {
  describe(createOrderSlice.actions.trigger.toString(), () => {
    it('does nothing on trigger', () => {
      expect(
        createOrderSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          createOrderSlice.actions.trigger({ orderId: 'PT--0001' })
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(createOrderSlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        createOrderSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          createOrderSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(createOrderSlice.actions.success.toString(), () => {
    it('sets wasSuccess to true', () => {
      expect(
        createOrderSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          createOrderSlice.actions.success(createOrderData)
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false,
        details: createOrderData
      })
    })
  })

  describe(createOrderSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        createOrderSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          createOrderSlice.actions.failure({
            errorMessage: 'An error happened',
            details: {
              error: 'An error happened',
              not_available_items: [
                {
                  sku: 'some-sku',
                  available_qty: 1
                }
              ]
            }
          })
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: true,
        error: 'An error happened',
        errorInfo: {
          errorMessage: 'An error happened',
          details: {
            error: 'An error happened',
            not_available_items: [
              {
                sku: 'some-sku',
                available_qty: 1
              }
            ]
          }
        }
      })
    })
  })

  describe(createOrderSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        createOrderSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false
          },
          createOrderSlice.actions.fulfill()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false
      })
    })
  })

  describe(createOrderSlice.actions.clearError.toString(), () => {
    it('clears createOrder errors', async () => {
      expect(
        createOrderSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: true,
            error: 'Some error',
            errorInfo: {
              errorMessage: 'Some error',
              details: 'Some Error'
            }
          },
          createOrderSlice.actions.clearError()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(createOrderSlice.actions.resetState.toString(), () => {
    it('resets the initial state', async () => {
      expect(
        createOrderSlice.reducer(
          {
            isLoading: false,
            wasSuccess: true,
            wasError: false,
            details: createOrderData
          },
          createOrderSlice.actions.resetState()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(clearStateErrors.toString(), () => {
    it('clears the errors in the state', async () => {
      expect(
        createOrderSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: true,
            error: 'Some error',
            errorInfo: {
              errorMessage: 'Some error',
              details: 'Some details'
            }
          },
          clearStateErrors()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })
})
