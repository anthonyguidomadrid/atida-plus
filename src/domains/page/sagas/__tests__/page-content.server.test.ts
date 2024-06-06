/**
 * @jest-environment node
 */
import SagaTester from 'redux-saga-tester'
import { PageNotFoundError } from '~domains/page/helpers'
import {
  pageContentFailure,
  pageContentFulfill,
  pageContentSuccess,
  pageContentTrigger
} from '~domains/page/slices'
import { contentfulPageContentNormalized } from '~domains/page/__mocks__/contentfulPageContent'
import { RootState } from '~domains/redux'
import { pageContentSaga } from '../page-content'
import { fetchPageContent } from '../../services/fetch-page-content'
import type { DeepPartial } from '@reduxjs/toolkit'

jest.mock('../../services/fetch-page-content')

describe('page/page-content saga - server', () => {
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
        ;(fetchPageContent as jest.Mock).mockResolvedValue(
          contentfulPageContentNormalized
        )

        const saga = setup()
        saga.dispatch(pageContentTrigger({ slug: '' }))
        await saga.waitFor(pageContentFulfill().type)

        expect(fetchPageContent).toHaveBeenCalledWith('cimode', '', false)

        expect(saga.getCalledActions()).toContainEqual(
          // @ts-ignore
          pageContentSuccess(contentfulPageContentNormalized)
        )
        expect(saga.getCalledActions()).toContainEqual(pageContentFulfill())
      })
    })

    describe('and request fails', () => {
      it('calls the api then dispatches failure action', async () => {
        ;(fetchPageContent as jest.Mock).mockRejectedValue({
          message: 'Some unknown error'
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
        ;(fetchPageContent as jest.Mock).mockRejectedValue(
          new PageNotFoundError('Page not found')
        )

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
