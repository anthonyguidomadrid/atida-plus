import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  contentFailure,
  contentFulfill,
  contentSuccess,
  contentTrigger
} from '~domains/product'
import { product } from '~domains/product/__mocks__/product'
import { RootState } from '~domains/redux'
import { getProductSaga } from '../get-product'

describe('product/getProductSaga - client', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester({
      initialState: {
        ...initialState
      },
      options: {
        context: {
          locale: 'en-gb'
        }
      }
    })
    saga.start(getProductSaga)

    return saga
  }

  describe('when content is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions', async () => {
        ;(axios.get as jest.Mock).mockResolvedValue({
          status: 200,
          data: product
        })

        const saga = setup()
        saga.dispatch(
          contentTrigger({
            sku: '123',
            sessionChannel: { channel: 'some-channel', sku: 'some-sku' }
          })
        )
        await saga.waitFor(contentFulfill().type)

        expect(axios.get).toHaveBeenCalledWith(
          '/api/product/get?sku=123&sessionChannel=some-channel,some-sku'
        )

        expect(saga.getCalledActions()).toContainEqual(contentSuccess(product))
        expect(saga.getCalledActions()).toContainEqual(contentFulfill())
      })
    })

    describe('and request fails', () => {
      it('calls the api then dispatches failure action', async () => {
        ;(axios.get as jest.Mock).mockRejectedValue({
          response: {
            status: 500,
            data: {
              name: 'UnknownError',
              message: 'Some unknown error'
            }
          }
        })

        const saga = setup()
        saga.dispatch(
          contentTrigger({
            sku: '200000004',
            sessionChannel: { channel: 'some-channel', sku: 'some-sku' }
          })
        )
        await saga.waitFor(contentFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          contentFailure({ message: 'Some unknown error' })
        )
        expect(saga.getCalledActions()).toContainEqual(contentFulfill())
      })
    })
  })
})
