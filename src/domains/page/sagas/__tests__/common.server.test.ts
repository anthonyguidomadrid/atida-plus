/**
 * @jest-environment node
 */
// @ts-ignore
import { getEntries } from 'contentful'
import type { DeepPartial } from '@reduxjs/toolkit'
import SagaTester from 'redux-saga-tester'
import {
  commonFailure,
  commonFulfill,
  commonSuccess,
  commonTrigger
} from '~domains/page/slices'
import {
  contentfulHeaderNavigation,
  contentfulHeaderNavigationNormalized
} from '~domains/page/__mocks__/contentfulHeaderNavigation'
import { RootState } from '~domains/redux'
import {
  contentfulFooter,
  contentfulFooterNormalized
} from '../../__mocks__/contentfulFooter'
import { commonSaga } from '../common'
import {
  contentfulTranslationLabels,
  contentfulTranslationLabelsNormalized
} from '~domains/page/__mocks__/contentfulTranslationInfoLabels'
import {
  contentfulOrganization,
  organizationNormalized
} from '~domains/page/__mocks__/contentfulOrganization'

describe('page/common saga - server', () => {
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
    saga.start(commonSaga)

    return saga
  }

  describe('when common is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions', async () => {
        ;(getEntries as jest.Mock)
          .mockResolvedValueOnce(contentfulFooter)
          .mockResolvedValueOnce(contentfulHeaderNavigation)
          .mockResolvedValueOnce(contentfulTranslationLabels)
          .mockResolvedValueOnce(contentfulOrganization)
          .mockResolvedValueOnce(contentfulHeaderNavigation)

        const saga = setup()
        saga.dispatch(commonTrigger())
        await saga.waitFor(commonFulfill().type)

        expect(getEntries).toHaveBeenCalledWith({
          content_type: expect.any(String),
          'fields.id': expect.any(String),
          include: expect.any(Number),
          limit: expect.any(Number),
          locale: 'pt-PT',
          'metadata.tags.sys.id[in]': 'country-pt',
          skip: expect.any(Number)
        })

        expect(saga.getCalledActions()).toContainEqual(
          commonSuccess({
            footer: contentfulFooterNormalized.footer,
            headerNavigationLeft: contentfulHeaderNavigationNormalized,
            headerNavigationRight: contentfulHeaderNavigationNormalized,
            campaignLabels: contentfulTranslationLabelsNormalized,
            organization: organizationNormalized
          })
        )
        expect(saga.getCalledActions()).toContainEqual(commonFulfill())
      })
    })

    describe('and request fails', () => {
      it('calls the api then dispatches failure action', async () => {
        getEntries.mockRejectedValue({
          message: 'Some unknown error'
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
