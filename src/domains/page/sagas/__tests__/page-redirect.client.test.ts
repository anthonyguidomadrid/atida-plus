import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  pageRedirectFailure,
  pageRedirectFulfill,
  pageRedirectTrigger
} from '~domains/page/slices'
import { contentfulPageRedirectNormalized } from '~domains/page/__mocks__/contentfulPageRedirect'
import { RootState } from '~domains/redux'
import { pageRedirectSaga } from '../page-redirect'

describe('page/page-redirect saga - client', () => {
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
    saga.start(pageRedirectSaga)

    return saga
  }

  describe('when pageRedirect is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions', async () => {
        ;(axios.get as jest.Mock).mockRejectedValue({
          status: 200,
          data: { ...contentfulPageRedirectNormalized }
        })

        const saga = setup()
        saga.dispatch(pageRedirectTrigger())
        await saga.waitFor(pageRedirectFulfill().type)

        expect(axios.get).toHaveBeenLastCalledWith('/api/page/page-redirect')

        expect(saga.getCalledActions()).toContainEqual(pageRedirectFulfill())
      })
    })

    describe('and request fails', () => {
      it('calls the api then dispatched failure action', async () => {
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
