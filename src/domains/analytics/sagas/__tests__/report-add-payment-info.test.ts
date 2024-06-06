import SagaTester from 'redux-saga-tester'
import Analytics from 'analytics-node'
import { triggerReportAddPaymentInfo } from '~domains/analytics/actions'
import { RootState } from '~domains/redux'
import { reportedAddPaymentInfo } from '../../__mocks__/analytics'
import type { DeepPartial } from '@reduxjs/toolkit'
import { reportAddPaymentInfoSaga } from '../report-add-payment-info'

jest.mock('analytics-node')
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>

describe('analytics/report payment info entered', () => {
  const setup = (testCaseState = {}): SagaTester<DeepPartial<RootState>> => {
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
            stepper: {
              activeStep: 3
            }
          }
        }
      },
      ...testCaseState
    })

    saga.start(reportAddPaymentInfoSaga)
    return saga
  }

  describe('when reportAddPaymentInfo is triggered', () => {
    it('calls Segment analytics once with expected payload', async () => {
      const saga = setup({})
      saga.dispatch(
        triggerReportAddPaymentInfo({
          payment_method: 'multibanco',
          success: true
        })
      )

      expect(mockAnalytics).toBeCalledWith('segmentTestKey')
      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Payment Info Entered',
        reportedAddPaymentInfo
      )
    })
  })
})
