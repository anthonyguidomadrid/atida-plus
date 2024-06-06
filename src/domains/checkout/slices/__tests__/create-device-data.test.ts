import { sentDeviceData } from '~domains/checkout/__mocks__/create-device-data'
import { clearStateErrors } from '~domains/redux/actions'
import { deviceDataSlice } from '../create-device-data'

describe(deviceDataSlice.name, () => {
  describe(deviceDataSlice.actions.trigger.toString(), () => {
    it('does nothing on trigger', () => {
      expect(
        deviceDataSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          deviceDataSlice.actions.trigger(sentDeviceData)
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(deviceDataSlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        deviceDataSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          deviceDataSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(deviceDataSlice.actions.success.toString(), () => {
    it('sets wasSuccess to true and discards the payload when undefined', () => {
      expect(
        deviceDataSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          deviceDataSlice.actions.success()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false
      })
    })

    it('sets wasSuccess to true and stores the payload', () => {
      expect(
        deviceDataSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          deviceDataSlice.actions.success()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false
      })
    })
  })

  describe(deviceDataSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        deviceDataSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          deviceDataSlice.actions.failure({
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

  describe(deviceDataSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        deviceDataSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false
          },
          deviceDataSlice.actions.fulfill()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false
      })
    })
  })

  describe(clearStateErrors.toString(), () => {
    it('clears the errors in the state', async () => {
      expect(
        deviceDataSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: true,
            error: 'Some error'
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
