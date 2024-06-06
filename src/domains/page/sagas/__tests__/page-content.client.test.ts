import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  pageContentFailure,
  pageContentFulfill,
  pageContentSuccess,
  pageContentTrigger
} from '~domains/page/slices'
import { contentfulPageContentNormalized } from '~domains/page/__mocks__/contentfulPageContent'
import { RootState } from '~domains/redux'
import { pageContentSaga } from '../page-content'

describe('page/page-content saga - client', () => {
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
    saga.start(pageContentSaga)

    return saga
  }

  describe('when common is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions', async () => {
        ;(axios.get as jest.Mock).mockResolvedValue({
          status: 200,
          data: contentfulPageContentNormalized
        })

        const saga = setup()
        saga.dispatch(pageContentTrigger({ slug: '' }))
        await saga.waitFor(pageContentFulfill().type)

        expect(axios.get).toHaveBeenCalledWith('/api/page/page-content?slug=')

        expect(saga.getCalledActions()).toContainEqual(
          // @ts-ignore
          pageContentSuccess(contentfulPageContentNormalized)
        )
        expect(saga.getCalledActions()).toContainEqual(pageContentFulfill())
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
        saga.dispatch(pageContentTrigger({ slug: '' }))
        await saga.waitFor(pageContentFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          pageContentFailure({ message: 'Some unknown error', code: 500 })
        )
        expect(saga.getCalledActions()).toContainEqual(pageContentFulfill())
      })
    })

    describe('and request fails with a 404', () => {
      it('calls the api then dispatches failure action', async () => {
        ;(axios.get as jest.Mock).mockRejectedValue({
          response: {
            status: 404,
            data: {
              name: 'page.not-found-error',
              message: 'Page not found'
            }
          }
        })

        const saga = setup()
        saga.dispatch(pageContentTrigger({ slug: '' }))
        await saga.waitFor(pageContentFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          pageContentFailure({ message: 'Page not found', code: 404 })
        )
        expect(saga.getCalledActions()).toContainEqual(pageContentFulfill())
      })
    })
  })
})
