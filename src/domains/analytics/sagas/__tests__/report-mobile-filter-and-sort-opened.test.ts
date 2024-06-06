import SagaTester from 'redux-saga-tester'
import Analytics from 'analytics-node'
import {
  triggerReportMobileFilterAndSortOpened,
  triggerEmitIsSegmentInitialised
} from '~domains/analytics/actions'
import { RootState } from '~domains/redux'
import type { DeepPartial } from '@reduxjs/toolkit'
import { waitFor } from '@testing-library/react'
import { reportMobileFilterAndSortOpened } from '../report-mobile-filter-and-sort-opened'

jest.mock('analytics-node')
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>

describe('analytics/report Mobile filter and sort opened', () => {
  const setup = (
    testCaseState = { client: { analytics: { data: { isInitialised: true } } } }
  ): SagaTester<DeepPartial<RootState>> => {
    global.analytics = (new Analytics(
      'segmentTestKey'
    ) as unknown) as SegmentAnalytics.AnalyticsJS
    const saga = new SagaTester({ initialState: testCaseState })

    saga.start(reportMobileFilterAndSortOpened)
    return saga
  }

  describe('when reportMobileFilterAndSortOpened is triggered', () => {
    it('calls Segment analytics once with expected payload', async () => {
      const saga = setup()
      saga.dispatch(triggerReportMobileFilterAndSortOpened())
      await waitFor(() => {
        expect(mockAnalytics).toBeCalledWith('segmentTestKey')
        expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
        expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
          'Mobile Filter and Sort Opened',
          {}
        )
      })
    })
    it('waits for the init trigger if Segment is not yet initialised', async () => {
      const saga = setup({
        client: { analytics: { data: { isInitialised: false } } }
      })
      saga.dispatch(triggerReportMobileFilterAndSortOpened())
      saga.dispatch(triggerEmitIsSegmentInitialised())
      await waitFor(() =>
        expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      )
    })
  })
})
