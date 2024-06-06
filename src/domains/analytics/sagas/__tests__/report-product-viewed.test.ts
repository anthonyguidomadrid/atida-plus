import SagaTester from 'redux-saga-tester'
import Analytics from 'analytics-node'
import {
  triggerEmitIsSegmentInitialised,
  triggerReportProductViewed
} from '~domains/analytics/actions'
import { RootState } from '~domains/redux'
import { reportProductViewedSaga } from '../report-product-viewed'
import {
  productViewedPayload,
  reportedProductViewed
} from '../../__mocks__/analytics'
import type { DeepPartial } from '@reduxjs/toolkit'
import { basketWithProducts } from '~domains/basket/__mocks__/basket'
import { BasketCoupon } from '~domains/basket/types'

jest.mock('analytics-node')
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>

describe('analytics/report product viewed', () => {
  const defaultCoupons = [
    {
      displayName: 'BasketCode01',
      code: 'BasketCode01',
      amount: 1
    },
    {
      displayName: 'BasketCode02',
      code: 'BasketCode02',
      amount: 1
    }
  ]
  const setup = (
    coupons: BasketCoupon[] | undefined = defaultCoupons,
    analytics = { data: { isInitialised: true } }
  ): SagaTester<DeepPartial<RootState>> => {
    global.analytics = (new Analytics(
      'segmentTestKey'
    ) as unknown) as SegmentAnalytics.AnalyticsJS
    const saga = new SagaTester({
      initialState: {
        client: {
          basket: {
            content: {
              data: {
                ...basketWithProducts,
                ...{
                  coupons
                }
              }
            }
          },
          coupon: {
            coupon: 'total-20-percent'
          },
          analytics
        }
      }
    })

    saga.start(reportProductViewedSaga)
    return saga
  }

  describe('when ProductViewed is triggered', () => {
    it('calls Segment analytics once with expected payload', async () => {
      const saga = setup([
        { displayName: 'CouponCode01', code: 'CouponCode01', amount: 1 },
        { displayName: 'CouponCode02', code: 'CouponCode02', amount: 1 }
      ])

      saga.dispatch(triggerReportProductViewed(productViewedPayload))

      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Product Viewed',
        reportedProductViewed()
      )
    })
    it('and Segment is not yet initialised, waits for the init trigger', async () => {
      const saga = setup(
        [
          { code: 'CouponCode01', amount: 1 },
          { code: 'CouponCode02', amount: 1 }
        ],
        { data: { isInitialised: false } }
      )
      saga.dispatch(triggerReportProductViewed(productViewedPayload))
      saga.dispatch(triggerEmitIsSegmentInitialised())

      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
    })
    it('uses the Basket coupon code when no coupon available', async () => {
      const saga = setup(undefined)
      saga.dispatch(triggerReportProductViewed(productViewedPayload))

      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Product Viewed',
        reportedProductViewed('BasketCode01')
      )
    })
  })
})
