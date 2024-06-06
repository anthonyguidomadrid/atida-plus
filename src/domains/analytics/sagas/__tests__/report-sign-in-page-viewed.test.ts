import SagaTester from 'redux-saga-tester'
import Analytics from 'analytics-node'
import {
  triggerEmitIsSegmentInitialised,
  triggerReportSignInPageViewed
} from '~domains/analytics/actions'
import { RootState } from '~domains/redux'
import type { DeepPartial } from '@reduxjs/toolkit'
import { reportSignInPageViewedSaga } from '../report-sign-in-page-viewed'
import { waitFor } from '@testing-library/react'

jest.mock('analytics-node')
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>

describe('analytics/report sign in page viewed', () => {
  const setup = (
    testCaseState = { client: { analytics: { data: { isInitialised: true } } } }
  ): SagaTester<DeepPartial<RootState>> => {
    global.analytics = (new Analytics(
      'segmentTestKey'
    ) as unknown) as SegmentAnalytics.AnalyticsJS
    const saga = new SagaTester({ initialState: testCaseState })

    saga.start(reportSignInPageViewedSaga)
    return saga
  }

  describe('when reportSignInPageViewed is triggered', () => {
    it('calls Segment analytics once with expected payload', async () => {
      const saga = setup()
      saga.dispatch(triggerReportSignInPageViewed())

      await waitFor(() => {
        expect(mockAnalytics).toBeCalledWith('segmentTestKey')
        expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
        expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
          'Sign In Page Viewed',
          {}
        )
      })
    })

    it('waits for the init trigger if Segment is not yet initialised', async () => {
      const saga = setup({
        client: { analytics: { data: { isInitialised: false } } }
      })
      saga.dispatch(triggerReportSignInPageViewed())
      saga.dispatch(triggerEmitIsSegmentInitialised())

      await waitFor(() =>
        expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      )
    })
  })
})
