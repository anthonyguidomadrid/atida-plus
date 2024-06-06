/**
 * @jest-environment node
 */
import SagaTester from 'redux-saga-tester'
import { PageNotFoundError } from '~domains/page/helpers'
import {
  seoBlockFailure,
  seoBlockFulfill,
  seoBlockSuccess,
  seoBlockTrigger
} from '~domains/seo/slices'
import { contentfulSeoBlockNormalized } from '~domains/seo/__mocks__/contentfulSEO'
import { RootState } from '~domains/redux'
import { fetchSeoBlockSaga } from '../fetch-seo'
import { fetchSeoBlock } from '../../services/fetch-seo'
import type { DeepPartial } from '@reduxjs/toolkit'

jest.mock('../../services/fetch-seo')

describe('seo-block saga - server', () => {
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
        ;(fetchSeoBlock as jest.Mock).mockResolvedValue(
          contentfulSeoBlockNormalized
        )

        const saga = setup()
        saga.dispatch(seoBlockTrigger(seoBlockTriggerPayload))
        await saga.waitFor(seoBlockFulfill().type)

        expect(fetchSeoBlock).toHaveBeenCalledWith(
          'cimode',
          seoBlockTriggerPayload.slug
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
        ;(fetchSeoBlock as jest.Mock).mockRejectedValue({
          message: 'Some unknown error'
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
        ;(fetchSeoBlock as jest.Mock).mockRejectedValue(
          new PageNotFoundError('SEO Block not found')
        )

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
