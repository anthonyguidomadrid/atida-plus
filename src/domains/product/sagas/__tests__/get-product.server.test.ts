/**
 * @jest-environment node
 */
// @ts-ignore
import { get } from '@elastic/elasticsearch'
import type { DeepPartial } from '@reduxjs/toolkit'
import SagaTester from 'redux-saga-tester'
import {
  contentFailure,
  contentFulfill,
  contentSuccess,
  contentTrigger
} from '~domains/product'
import {
  product,
  elasticsearchProduct
} from '~domains/product/__mocks__/product'
import { RootState } from '~domains/redux'
import { getProductSaga } from '../get-product'

describe('product/getProductSaga saga - server', () => {
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
        get.mockResolvedValue(elasticsearchProduct)

        const saga = setup()
        saga.dispatch(
          contentTrigger({
            sku: '123',
            sessionChannel: { channel: 'amazon', sku: 'some-sku' }
          })
        )
        await saga.waitFor(contentFulfill().type)

        expect(get).toHaveBeenCalledWith({
          id: '123',
          index: 'index-en-gb'
        })

        expect(saga.getCalledActions()).toContainEqual(contentSuccess(product))
        expect(saga.getCalledActions()).toContainEqual(contentFulfill())
      })
    })

    describe('and request fails', () => {
      it('calls the api then dispatches failure action', async () => {
        get.mockRejectedValue({
          message: 'Some unknown error'
        })

        const saga = setup()
        saga.dispatch(contentTrigger({}))
        await saga.waitFor(contentFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          contentFailure({ message: 'Some unknown error' })
        )
        expect(saga.getCalledActions()).toContainEqual(contentFulfill())
      })
    })
  })
})
