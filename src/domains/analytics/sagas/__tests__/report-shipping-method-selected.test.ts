import SagaTester from 'redux-saga-tester'
import Analytics from 'analytics-node'
import { triggerReportShippingMethodSelected } from '~domains/analytics/actions'
import { RootState } from '~domains/redux'
import { reportedShippingMethodSelected } from '../../__mocks__/analytics'
import type { DeepPartial } from '@reduxjs/toolkit'
import { reportShippingMethodSelectedSaga } from '../report-shipping-method-selected'

jest.mock('analytics-node')
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>

describe('analytics/report shipment method selected', () => {
  const setup = (
    testCaseState = {},
    selectedPaymentMethod = ''
  ): SagaTester<DeepPartial<RootState>> => {
    global.analytics = (new Analytics(
      'segmentTestKey'
    ) as unknown) as SegmentAnalytics.AnalyticsJS
    const saga = new SagaTester({
      initialState: {
        client: {
          checkout: {
            data: {
              details: {
                cartId: '24c2f9c7-0905-55e6-970a-e1f196b343e9',
                shipmentMethods: [
                  {
                    type: 'shipment-methods',
                    id: '3',
                    attributes: {
                      name: 'delivery-method.standard-delivery',
                      carrierName: 'Correo Express',
                      deliveryTime: null,
                      price: 399,
                      currencyIsoCode: 'EUR'
                    }
                  }
                ]
              }
            },
            selectedPaymentMethod: {
              selectedPaymentMethod
            }
          }
        }
      },
      ...testCaseState
    })

    saga.start(reportShippingMethodSelectedSaga)
    return saga
  }

  describe('when reportShippingMethodSelected is triggered', () => {
    it('calls Segment analytics once with expected payload', async () => {
      const saga = setup({})
      saga.dispatch(
        triggerReportShippingMethodSelected({
          shipping_method: '3'
        })
      )

      expect(mockAnalytics).toBeCalledWith('segmentTestKey')
      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Shipping Method Selected',
        reportedShippingMethodSelected
      )
    })

    it('calls Segment analytics once with expected payload', async () => {
      const saga = setup({}, 'multibanco')
      saga.dispatch(
        triggerReportShippingMethodSelected({
          shipping_method: '3'
        })
      )

      expect(mockAnalytics).toBeCalledWith('segmentTestKey')
      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Shipping Method Selected',
        {
          ...reportedShippingMethodSelected,
          payment_method: 'multibanco'
        }
      )
    })
  })
})
