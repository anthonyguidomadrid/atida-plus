import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  seoBlockTrigger,
  seoBlockFailure,
  seoBlockFulfill,
  seoBlockSuccess
} from '~domains/seo/slices'
import { contentfulSeoBlockNormalized } from '~domains/seo/__mocks__/contentfulSEO'
import { RootState } from '~domains/redux'
import { fetchSeoBlockSaga } from '../fetch-seo'

describe('seo-block saga - client', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester({
      initialState: {
        ...initialState
      },
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    saga.start(fetchSeoBlockSaga)

    return saga
  }
  const seoBlockTriggerPayload = { slug: 'brands' }

  describe('when common is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions', async () => {
        ;(axios.get as jest.Mock).mockResolvedValue({
          status: 200,
          data: contentfulSeoBlockNormalized
        })

        const saga = setup()
        saga.dispatch(seoBlockTrigger(seoBlockTriggerPayload))
        await saga.waitFor(seoBlockFulfill().type)

        expect(axios.get).toHaveBeenCalledWith(
          `/api/seo/fetch?slug=${seoBlockTriggerPayload.slug}`
        )

        expect(saga.getCalledActions()).toContainEqual(
          // @ts-ignore
          seoBlockSuccess(contentfulSeoBlockNormalized)
        )
        expect(saga.getCalledActions()).toContainEqual(seoBlockFulfill())
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
        saga.dispatch(seoBlockTrigger(seoBlockTriggerPayload))
        await saga.waitFor(seoBlockFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          seoBlockFailure({ message: 'Some unknown error', code: 500 })
        )
        expect(saga.getCalledActions()).toContainEqual(seoBlockFulfill())
      })
    })

    describe('and request fails with a 404', () => {
      it('calls the api then dispatches failure action', async () => {
        ;(axios.get as jest.Mock).mockRejectedValue({
          response: {
            status: 404,
            data: {
              name: 'seo-block.not-found-error',
              message: 'SEO Block not found'
            }
          }
        })

        const saga = setup()
        saga.dispatch(seoBlockTrigger(seoBlockTriggerPayload))
        await saga.waitFor(seoBlockFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          seoBlockFailure({ message: 'SEO Block not found', code: 404 })
        )
        expect(saga.getCalledActions()).toContainEqual(seoBlockFulfill())
      })
    })
  })
})
