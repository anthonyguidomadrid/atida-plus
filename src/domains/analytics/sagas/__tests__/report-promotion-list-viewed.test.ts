import SagaTester from 'redux-saga-tester'
import Analytics from 'analytics-node'
import {
  triggerEmitIsSegmentInitialised,
  triggerReportPromotionListViewed
} from '~domains/analytics/actions'
import { RootState } from '~domains/redux'
import {
  promotionListViewedPayload,
  reportedPromotionList
} from '../../__mocks__/analytics'
import type { DeepPartial } from '@reduxjs/toolkit'
import { reportPromotionListViewedSaga } from '~domains/analytics/sagas/report-promotion-list-viewed'

jest.mock('analytics-node')
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>

describe('analytics/report promotion list viewed', () => {
  const setup = (
    testCaseState = {
      client: { analytics: { data: { isInitialised: true } } }
    }
  ): SagaTester<DeepPartial<RootState>> => {
    global.analytics = (new Analytics(
      'segmentTestKey'
    ) as unknown) as SegmentAnalytics.AnalyticsJS
    const saga = new SagaTester({ initialState: testCaseState })

    saga.start(reportPromotionListViewedSaga)
    return saga
  }

  describe('when PromotionListViewed is triggered', () => {
    it('calls Segment analytics once with expected payload', async () => {
      const saga = setup()
      saga.dispatch(
        triggerReportPromotionListViewed({ ...promotionListViewedPayload })
      )

      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Promotion List Viewed',
        reportedPromotionList
      )
    })
    it('and Segment is not yet initialised, waits for the init trigger', async () => {
      const saga = setup({
        client: { analytics: { data: { isInitialised: false } } }
      })
      saga.dispatch(
        triggerReportPromotionListViewed({ ...promotionListViewedPayload })
      )
      saga.dispatch(triggerEmitIsSegmentInitialised())

      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
    })
  })
})
