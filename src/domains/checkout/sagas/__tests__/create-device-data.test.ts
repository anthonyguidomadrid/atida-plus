import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  createDeviceDataFulfill,
  createDeviceDataSuccess,
  createDeviceDataTrigger
} from '~domains/checkout'
import { sentDeviceData } from '~domains/checkout/__mocks__/create-device-data'
import { RootState } from '~domains/redux'
import { createDeviceDataSaga } from '../create-device-data'

describe('checkout/create-device-data saga', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester({
      initialState: { ...initialState },
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    saga.start(createDeviceDataSaga)

    return saga
  }

  describe('when createDeviceData is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions', async () => {
        ;(axios.post as jest.Mock).mockResolvedValue({})

        const saga = setup()
        saga.dispatch(createDeviceDataTrigger(sentDeviceData))
        await saga.waitFor(createDeviceDataFulfill().type)

        expect(axios.post).toHaveBeenCalledWith(
          '/api/checkout/create-device-data',
          sentDeviceData
        )

        expect(saga.getCalledActions()).toContainEqual(
          createDeviceDataSuccess()
        )
        expect(saga.getCalledActions()).toContainEqual(
          createDeviceDataFulfill()
        )
      })
    })

    describe('and request fails', () => {
      it('calls the api then dispatches failure action', async () => {
        ;(axios.post as jest.Mock).mockRejectedValue({
          response: {
            status: 500,
            data: {
              name: 'UnknownError',
              message: 'Some unknown error'
            }
          }
        })

        const saga = setup()
        saga.dispatch(createDeviceDataTrigger(sentDeviceData))
        await saga.waitFor(createDeviceDataFulfill().type)
        expect(saga.getCalledActions()).toContainEqual(
          createDeviceDataFulfill()
        )
      })
    })

    describe('and request fails with multpile error messages', () => {
      it('calls the api then dispatches failure action', async () => {
        ;(axios.post as jest.Mock).mockRejectedValue({
          response: {
            status: 500,
            data: {
              name: 'UnknownError',
              message: [
                'Some unknown error',
                'Some other unknown error',
                'And some unknown error'
              ]
            }
          }
        })

        const saga = setup()
        saga.dispatch(createDeviceDataTrigger(sentDeviceData))
        await saga.waitFor(createDeviceDataFulfill().type)
        expect(saga.getCalledActions()).toContainEqual(
          createDeviceDataFulfill()
        )
      })
    })
  })
})
