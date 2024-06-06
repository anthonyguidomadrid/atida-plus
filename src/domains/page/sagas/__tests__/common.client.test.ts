import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  commonFailure,
  commonFulfill,
  commonSuccess,
  commonTrigger
} from '~domains/page/slices'
import { contentfulFooterNormalized } from '~domains/page/__mocks__/contentfulFooter'
import { contentfulHeaderNavigationNormalized } from '~domains/page/__mocks__/contentfulHeaderNavigation'
import { contentfulTranslationLabelsNormalized } from '~domains/page/__mocks__/contentfulTranslationInfoLabels'
import { RootState } from '~domains/redux'
import { commonSaga } from '../common'

describe('page/common saga - client', () => {
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
    saga.start(commonSaga)

    return saga
  }

  describe('when common is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions', async () => {
        ;(axios.get as jest.Mock).mockResolvedValue({
          status: 200,
          data: {
            ...contentfulFooterNormalized,
            headerNavigationLeft: contentfulHeaderNavigationNormalized,
            headerNavigationRight: contentfulHeaderNavigationNormalized,
            campaignLabels: contentfulTranslationLabelsNormalized
          }
        })

        const saga = setup()
        saga.dispatch(commonTrigger())
        await saga.waitFor(commonFulfill().type)

        expect(axios.get).toHaveBeenCalledWith('/api/page/common')

        expect(saga.getCalledActions()).toContainEqual(
          commonSuccess({
            ...contentfulFooterNormalized,
            headerNavigationLeft: contentfulHeaderNavigationNormalized,
            headerNavigationRight: contentfulHeaderNavigationNormalized,
            campaignLabels: contentfulTranslationLabelsNormalized
          })
        )
        expect(saga.getCalledActions()).toContainEqual(commonFulfill())
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
        saga.dispatch(commonTrigger())
        await saga.waitFor(commonFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          commonFailure({ message: 'Some unknown error' })
        )
        expect(saga.getCalledActions()).toContainEqual(commonFulfill())
      })
    })
  })
})
