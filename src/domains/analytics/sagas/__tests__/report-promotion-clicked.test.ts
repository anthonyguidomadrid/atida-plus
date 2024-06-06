import SagaTester from 'redux-saga-tester'
import Analytics from 'analytics-node'
import { triggerReportPromotionClicked } from '~domains/analytics/actions'
import { RootState } from '~domains/redux'
import {
  promotionClickedPayload,
  reportedPromotionClicked
} from '../../__mocks__/analytics'
import type { DeepPartial } from '@reduxjs/toolkit'
import { reportPromotionClickedSaga } from '~domains/analytics/sagas/report-promotion-clicked'

jest.mock('analytics-node')
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>

describe('analytics/report promotion clicked', () => {
  const setup = (): SagaTester<DeepPartial<RootState>> => {
    global.analytics = (new Analytics(
      'segmentTestKey'
    ) as unknown) as SegmentAnalytics.AnalyticsJS
    const saga = new SagaTester()

    saga.start(reportPromotionClickedSaga)
    return saga
  }

  describe('when PromotionClicked is triggered', () => {
    it('calls Segment analytics once with expected payload', async () => {
      const saga = setup()
      saga.dispatch(
        triggerReportPromotionClicked({ ...promotionClickedPayload })
      )

      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Promotion Clicked',
        reportedPromotionClicked
      )
    })
  })
})
