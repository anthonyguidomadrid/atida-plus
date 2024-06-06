/**
 * @jest-environment node
 */
// @ts-ignore
import { getEntries } from 'contentful'
import type { DeepPartial } from '@reduxjs/toolkit'
import SagaTester from 'redux-saga-tester'
import {
  pageRedirectFailure,
  pageRedirectFulfill,
  pageRedirectTrigger
} from '~domains/page/slices'
import { contentfulPageRedirect } from '~domains/page/__mocks__/contentfulPageRedirect'
import { RootState } from '~domains/redux'
import { pageRedirectSaga } from '../page-redirect'

describe('page/page-redirect saga - server', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester({
      initialState: {
        ...initialState
      },
      options: {
        context: {
          locale: 'pt-pt'
        }
      }
    })
    saga.start(pageRedirectSaga)

    return saga
  }

  describe('when pageRedirect is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions', async () => {
        ;(getEntries as jest.Mock).mockResolvedValueOnce(contentfulPageRedirect)

        const saga = setup()
        saga.dispatch(pageRedirectTrigger())
        await saga.waitFor(pageRedirectFulfill().type)

        expect(getEntries).toHaveBeenCalledWith({
          content_type: 'pageRedirect',
          include: 2,
          limit: 1000,
          locale: 'pt-PT',
          'metadata.tags.sys.id[in]': 'country-pt',
          skip: 0
        })

        expect(saga.getCalledActions()).toContainEqual(pageRedirectFulfill())
      })
    })

    describe('and request fails', () => {
      it('calls the api then dispatches failure action', async () => {
        getEntries.mockRejectedValue({
          message: 'Some unknown error'
        })

        const saga = setup()
        saga.dispatch(pageRedirectTrigger())
        await saga.waitFor(pageRedirectFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          pageRedirectFailure({ message: 'Some unknown error' })
        )
        expect(saga.getCalledActions()).toContainEqual(pageRedirectFulfill())
      })
    })
  })
})
