import SagaTester from 'redux-saga-tester'
import Analytics from 'analytics-node'
import { triggerReportCouponRemoval } from '~domains/analytics/actions'
import { RootState } from '~domains/redux'
import { cartState, coupon } from '../../__mocks__/analytics'
import type { DeepPartial } from '@reduxjs/toolkit'
import { reportCouponRemovalSaga } from '~domains/analytics/sagas/report-coupon-removal'

jest.mock('analytics-node')
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>

describe('analytics/report coupon removal', () => {
  const setup = (): SagaTester<DeepPartial<RootState>> => {
    global.analytics = (new Analytics(
      'segmentTestKey'
    ) as unknown) as SegmentAnalytics.AnalyticsJS
    const saga = new SagaTester({ initialState: { ...cartState } })

    saga.start(reportCouponRemovalSaga)
    return saga
  }

  describe('when reportCouponRemoval is triggered', () => {
    it('calls Segment analytics once with expected payload', async () => {
      const saga = setup()
      saga.dispatch(
        triggerReportCouponRemoval({
          couponId: 'test_coupon',
          couponName: 'test coupon',
          discount: 630
        })
      )
      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Coupon Removed',
        coupon
      )
    })
  })
})
