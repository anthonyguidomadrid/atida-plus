import SagaTester from 'redux-saga-tester'
import Analytics from 'analytics-node'
import { triggerReportProductOrdered } from '~domains/analytics/actions'
import { reportProductOrderedSaga } from '../report-product-ordered'
import { RootState } from '~domains/redux'
import { getOrderInitialState, orderedProduct } from '../../__mocks__/analytics'
import type { DeepPartial } from '@reduxjs/toolkit'
import { BasketDiscounts, BasketWithProducts } from '~domains/basket/types'
import { basketWithProducts } from '~domains/basket/__mocks__/basket'
import { PAYMENT_OPTIONS } from '~config/constants/payments'

jest.mock('analytics-node')
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>
jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    algolia: {
      productIndexes: {
        'pt-pt': 'product-ecommerce-pt-pt_pt',
        'es-es': 'product-ecommerce-es-es_es',
        'en-gb': 'product-ecommerce-pt-pt_pt'
      }
    }
  }
}))

describe('analytics/report product ordered saga', () => {
  const defaultCoupons = [
    {
      displayName: 'BasketCode01',
      code: 'BasketCode01',
      amount: 1
    }
  ]
  const setup = (
    basketData: BasketWithProducts,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    order: any,
    coupons: BasketDiscounts[] | undefined = defaultCoupons
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
                ...basketData,
                coupons
              }
            }
          },
          checkout: {
            createOrder: {
              details: { orderId: 'PT--2888' }
            },
            getOrder: {
              ...order,
              details: {
                ...order.details,
                coupons
              }
            }
          }
        }
      },
      options: {
        context: {
          locale: 'pt-pt'
        }
      }
    })
    saga.start(reportProductOrderedSaga)
    return saga
  }

  describe('when reportProductOrdered is triggered', () => {
    it('calls Segment analytics once with expected payload', async () => {
      const saga = setup(
        basketWithProducts,
        {
          ...getOrderInitialState,
          details: {
            ...getOrderInitialState.details,
            items: [getOrderInitialState.details.items[0]]
          }
        },
        [{ displayName: 'CouponCode01', code: 'CouponCode01', amount: 1 }]
      )
      saga.dispatch(
        triggerReportProductOrdered({
          payment_method: PAYMENT_OPTIONS.BRAINTREE_CREDIT_CARD,
          is_redirected: true
        })
      )

      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Product Ordered',
        orderedProduct()
      )
    })

    it('calls Segment analytics once with expected payload when price is undefined', async () => {
      const saga = setup(
        {
          ...basketWithProducts,
          items: [{ ...basketWithProducts.items[0], unitPrice: undefined }]
        },
        {
          ...getOrderInitialState,
          details: {
            ...getOrderInitialState.details,
            grandTotal: 0,
            taxTotal: 0,
            items: [getOrderInitialState.details.items[0]]
          }
        },
        [{ displayName: 'CouponCode01', code: 'CouponCode01', amount: 1 }]
      )
      saga.dispatch(
        triggerReportProductOrdered({
          payment_method: PAYMENT_OPTIONS.BRAINTREE_CREDIT_CARD,
          is_redirected: true
        })
      )

      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Product Ordered',
        orderedProduct()
      )
    })
  })
})
