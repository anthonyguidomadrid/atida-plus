import SagaTester from 'redux-saga-tester'
import Analytics from 'analytics-node'
import { triggerReportPromotionViewed } from '~domains/analytics/actions'
import { RootState } from '~domains/redux'
import {
  promotionClickedPayload,
  reportedPromotionClicked
} from '../../__mocks__/analytics'
import type { DeepPartial } from '@reduxjs/toolkit'
import { reportPromotionViewedSaga } from '~domains/analytics/sagas/report-promotion-viewed'

jest.mock('analytics-node')
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>

describe('analytics/report promotion viewed', () => {
  const setup = (): SagaTester<DeepPartial<RootState>> => {
    global.analytics = (new Analytics(
      'segmentTestKey'
    ) as unknown) as SegmentAnalytics.AnalyticsJS
    const saga = new SagaTester()

    saga.start(reportPromotionViewedSaga)
    return saga
  }

  describe('when triggerReportPromotionViewed is triggered', () => {
    it('calls Segment analytics once with expected payload', async () => {
      const saga = setup()
      saga.dispatch(
        triggerReportPromotionViewed({ ...promotionClickedPayload })
      )

      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Promotion Viewed',
        reportedPromotionClicked
      )
    })
  })
})
