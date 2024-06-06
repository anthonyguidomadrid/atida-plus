import SagaTester from 'redux-saga-tester'
import Analytics from 'analytics-node'
import {
  triggerEmitIsSegmentInitialised,
  triggerReportSocialVerificationPageViewed
} from '~domains/analytics/actions'
import { RootState } from '~domains/redux'
import type { DeepPartial } from '@reduxjs/toolkit'
import { waitFor } from '@testing-library/react'
import { reportSocialVerificationPageViewedSaga } from '../report-social-verification-page-viewed'

jest.mock('analytics-node')
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>

describe('analytics/report social verification page viewed', () => {
  const setup = (
    testCaseState = { client: { analytics: { data: { isInitialised: true } } } }
  ): SagaTester<DeepPartial<RootState>> => {
    global.analytics = (new Analytics(
      'segmentTestKey'
    ) as unknown) as SegmentAnalytics.AnalyticsJS
    const saga = new SagaTester({ initialState: testCaseState })

    saga.start(reportSocialVerificationPageViewedSaga)
    return saga
  }

  describe('when reportSocialVerificationPageViewedSaga is triggered', () => {
    it('calls Segment analytics once with expected payload - google', async () => {
      const saga = setup()
      saga.dispatch(
        triggerReportSocialVerificationPageViewed({
          social_platform: 'Google'
        })
      )
      await waitFor(() => {
        expect(mockAnalytics).toBeCalledWith('segmentTestKey')
        expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
        expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
          'Social Verification Page Viewed',
          {
            social_platform: 'google',
            is_existing_customer: true
          }
        )
      })
    })
    it('calls Segment analytics once with expected payload - facebook', async () => {
      const saga = setup()
      saga.dispatch(
        triggerReportSocialVerificationPageViewed({
          social_platform: 'Facebook'
        })
      )
      await waitFor(() => {
        expect(mockAnalytics).toBeCalledWith('segmentTestKey')
        expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
        expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
          'Social Verification Page Viewed',
          {
            social_platform: 'facebook',
            is_existing_customer: true
          }
        )
      })
    })
    it('calls Segment analytics once with expected payload - apple', async () => {
      const saga = setup()
      saga.dispatch(
        triggerReportSocialVerificationPageViewed({
          social_platform: 'Apple'
        })
      )
      await waitFor(() => {
        expect(mockAnalytics).toBeCalledWith('segmentTestKey')
        expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
        expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
          'Social Verification Page Viewed',
          {
            social_platform: 'apple',
            is_existing_customer: true
          }
        )
      })
    })
    it('waits for the init trigger if Segment is not yet initialised', async () => {
      const saga = setup({
        client: { analytics: { data: { isInitialised: false } } }
      })
      saga.dispatch(
        triggerReportSocialVerificationPageViewed({
          social_platform: 'Google'
        })
      )
      saga.dispatch(triggerEmitIsSegmentInitialised())
      await waitFor(() =>
        expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      )
    })
  })
})
