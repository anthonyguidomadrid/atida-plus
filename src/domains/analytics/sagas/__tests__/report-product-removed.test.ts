import SagaTester from 'redux-saga-tester'
import Analytics from 'analytics-node'
import { triggerReportProductRemoved } from '~domains/analytics/actions'
import { reportProductRemovedSaga } from '../report-product-removed'
import { basketWithProducts } from '~domains/basket/__mocks__/basket'
import { RootState } from '~domains/redux'
import { reportedProductRemoved } from '../../__mocks__/analytics'
import type { DeepPartial } from '@reduxjs/toolkit'
import { BasketWithProducts } from '~domains/basket/types'

jest.mock('analytics-node')
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>

describe('analytics/report product removed saga', () => {
  const setup = (
    basketData: BasketWithProducts
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
                ...basketData
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

    saga.start(reportProductRemovedSaga)
    return saga
  }

  describe('when reportProductRemoved is triggered', () => {
    it('calls Segment analytics once with expected payload', async () => {
      const saga = setup(basketWithProducts)
      saga.dispatch(
        triggerReportProductRemoved({
          sku: '100000001'
        })
      )

      expect(mockAnalytics).toBeCalledWith('segmentTestKey')
      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Product Removed',
        reportedProductRemoved()
      )
    })
    it('calls Segment analytics once with expected payload when price is undefined', async () => {
      const saga = setup({
        ...basketWithProducts,
        items: [
          { ...basketWithProducts.items[0], unitPrice: 9999 },
          { ...basketWithProducts.items[1], unitPrice: 9999 },
          { ...basketWithProducts.items[2], unitPrice: 9999 }
        ]
      })
      saga.dispatch(
        triggerReportProductRemoved({
          sku: '100000001'
        })
      )

      expect(mockAnalytics).toBeCalledWith('segmentTestKey')
      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Product Removed',
        reportedProductRemoved()
      )
    })
  })
})
