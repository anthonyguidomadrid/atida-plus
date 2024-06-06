import SagaTester from 'redux-saga-tester'
import Analytics from 'analytics-node'
import { triggerReportProductAdded } from '~domains/analytics/actions'
import { reportProductAddedSaga } from '../report-product-added'
import { basketWithProducts } from '~domains/basket/__mocks__/basket'
import { RootState } from '~domains/redux'
import { reportedProductAdded } from '../../__mocks__/analytics'
import type { DeepPartial } from '@reduxjs/toolkit'
import { BasketCoupon } from '~domains/basket/types'

jest.mock('analytics-node')
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>

describe('analytics/report add product to basket saga', () => {
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
    coupons: BasketCoupon[] | undefined = defaultCoupons
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
          }
        }
      },
      options: {
        context: {
          locale: 'pt-pt'
        }
      }
    })

    saga.start(reportProductAddedSaga)
    return saga
  }

  describe('when reportProductAdded is triggered', () => {
    it('calls Segment analytics once with expected payload', async () => {
      const saga = setup([
        { displayName: 'CouponCode01', code: 'CouponCode01', amount: 1 },
        { displayName: 'CouponCode02', code: 'CouponCode02', amount: 1 }
      ])

      saga.dispatch(
        triggerReportProductAdded({
          sku: '100000001',
          data: {
            ...basketWithProducts,
            items: [
              { ...basketWithProducts.items[0] },
              { ...basketWithProducts.items[1] },
              { ...basketWithProducts.items[2] }
            ]
          },
          quantity: 1,
          quantity_difference: 1
        })
      )

      expect(mockAnalytics).toBeCalledWith('segmentTestKey')
      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Product Added',
        reportedProductAdded()
      )
    })

    it('calls Segment analytics once with expected payload when price is undefined', async () => {
      const saga = setup([
        { displayName: 'CouponCode01', code: 'CouponCode01', amount: 1 },
        { displayName: 'CouponCode02', code: 'CouponCode02', amount: 1 }
      ])
      saga.dispatch(
        triggerReportProductAdded({
          sku: '100000001',
          data: {
            ...basketWithProducts,
            items: [
              {
                ...basketWithProducts.items[0],
                unitPrice: 9999
              },
              {
                ...basketWithProducts.items[1],
                unitPrice: 9999
              },
              {
                ...basketWithProducts.items[2],
                unitPrice: 9999
              }
            ]
          },
          quantity: 1,
          quantity_difference: 1
        })
      )

      expect(mockAnalytics).toBeCalledWith('segmentTestKey')
      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Product Added',
        reportedProductAdded('CouponCode01', 98.49)
      )
    })

    it('reports correct coupon code', async () => {
      const saga = setup([
        { displayName: 'BasketCode01', code: 'BasketCode01', amount: 1 }
      ])
      saga.dispatch(
        triggerReportProductAdded({
          sku: '100000001',
          data: {
            ...basketWithProducts,
            items: [
              {
                ...basketWithProducts.items[0]
              },
              {
                ...basketWithProducts.items[1]
              },
              {
                ...basketWithProducts.items[2]
              }
            ]
          },
          quantity: 1,
          quantity_difference: 1
        })
      )
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Product Added',
        reportedProductAdded('BasketCode01')
      )
    })
  })
})
