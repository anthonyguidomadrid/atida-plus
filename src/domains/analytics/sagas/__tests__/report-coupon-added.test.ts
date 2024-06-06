import SagaTester from 'redux-saga-tester'
import Analytics from 'analytics-node'
import { triggerReportCouponAdded } from '~domains/analytics/actions'
import { RootState } from '~domains/redux'
import { cartState, coupon } from '../../__mocks__/analytics'
import type { DeepPartial } from '@reduxjs/toolkit'
import { reportCouponAddedSaga } from '~domains/analytics/sagas/report-coupon-added'

jest.mock('analytics-node')
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>

describe('analytics/report coupon added', () => {
  const setup = (): SagaTester<DeepPartial<RootState>> => {
    global.analytics = (new Analytics(
      'segmentTestKey'
    ) as unknown) as SegmentAnalytics.AnalyticsJS
    const saga = new SagaTester({ initialState: { ...cartState } })

    saga.start(reportCouponAddedSaga)
    return saga
  }

  describe('when reportCouponAdded is triggered', () => {
    it('calls Segment analytics once with expected payload', async () => {
      const saga = setup()
      saga.dispatch(
        triggerReportCouponAdded({
          code: 'test_coupon',
          displayName: 'test coupon',
          amount: 630
        })
      )
      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Coupon Added',
        coupon
      )
    })
  })
})
