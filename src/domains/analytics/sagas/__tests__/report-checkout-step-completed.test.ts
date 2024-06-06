import SagaTester from 'redux-saga-tester'
import Analytics from 'analytics-node'
import { triggerReportCheckoutStepCompleted } from '~domains/analytics/actions'
import { RootState } from '~domains/redux'
import {
  reportedCheckoutStepCompleted,
  reportedCheckoutStepDelivery
} from '../../__mocks__/analytics'
import type { DeepPartial } from '@reduxjs/toolkit'
import { reportCheckoutStepCompletedSaga } from '~domains/analytics/sagas/report-checkout-step-completed'
import { customerCookie } from '~domains/account/__mocks__/token'
// @ts-ignore
import { get } from '~helpers'

jest.mock('analytics-node')
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>

describe('analytics/report checkout step completed', () => {
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
                cartId: '24c2f9c7-0905-55e6-970a-e1f196b343e8',
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
              activeStep: 2
            }
          }
        }
      },
      ...testCaseState
    })

    saga.start(reportCheckoutStepCompletedSaga)
    return saga
  }

  describe('when reportCheckoutStepCompleted is triggered', () => {
    it('calls Segment analytics once with expected payload', async () => {
      get.mockReturnValueOnce(JSON.stringify(customerCookie))
      const saga = setup({})
      saga.dispatch(
        triggerReportCheckoutStepCompleted({
          payment_method: 'multibanco'
        })
      )

      expect(mockAnalytics).toBeCalledWith('segmentTestKey')
      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Checkout Step Completed',
        reportedCheckoutStepCompleted
      )
    })
  })

  describe('when reportCheckoutStepCompleted is triggered', () => {
    it('calls Segment analytics once when there is no payload when there is an atida-plus-customer cookie', async () => {
      get.mockReturnValueOnce(JSON.stringify(customerCookie))
      const saga = setup({})
      saga.dispatch(triggerReportCheckoutStepCompleted({}))

      expect(mockAnalytics).toBeCalledWith('segmentTestKey')
      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Checkout Step Completed',
        reportedCheckoutStepDelivery
      )
    })

    it('calls Segment analytics once when there is no payload when user logged through social login', async () => {
      get.mockReturnValueOnce(
        JSON.stringify({
          ...customerCookie,
          is_social: true,
          social_platform: 'Google'
        })
      )
      const saga = setup({})
      saga.dispatch(triggerReportCheckoutStepCompleted({}))

      expect(mockAnalytics).toBeCalledWith('segmentTestKey')
      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Checkout Step Completed',
        {
          ...reportedCheckoutStepDelivery,
          is_social: true,
          social_platform: 'Google'
        }
      )
    })

    it('calls Segment analytics once when there is no payload when there is no atida-plus-customer cookie', async () => {
      get.mockReturnValueOnce(JSON.stringify(undefined))
      const saga = setup({})
      saga.dispatch(triggerReportCheckoutStepCompleted({}))

      expect(mockAnalytics).toBeCalledWith('segmentTestKey')
      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Checkout Step Completed',
        reportedCheckoutStepDelivery
      )
    })
  })
})
