import SagaTester from 'redux-saga-tester'
import Analytics from 'analytics-node'
import { triggerReportCheckoutStepViewed } from '~domains/analytics/actions'
import { RootState } from '~domains/redux'
import {
  reportedCheckoutStepViewed,
  reportedCheckoutStepViewedGuest
} from '../../__mocks__/analytics'
import type { DeepPartial } from '@reduxjs/toolkit'
import { reportCheckoutStepViewedSaga } from '~domains/analytics/sagas/report-checkout-step-viewed'
import { customerCookie } from '~domains/account/__mocks__/token'
// @ts-ignore
import { get } from '~helpers'

jest.mock('analytics-node')
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>
describe('analytics/report checkout step viewed', () => {
  const setup = (
    testCaseState = {},
    isLoggedIn = true
  ): SagaTester<DeepPartial<RootState>> => {
    global.analytics = (new Analytics(
      'segmentTestKey'
    ) as unknown) as SegmentAnalytics.AnalyticsJS
    const saga = new SagaTester({
      initialState: {
        client: {
          account: {
            customer: {
              isLoading: false,
              wasSuccess: true,
              wasError: false,
              reference: isLoggedIn ? 'PT-1234' : '',
              showNotification: false
            }
          },
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
              activeStep: 2,
              guestStep: 2
            }
          }
        }
      },
      ...testCaseState
    })

    saga.start(reportCheckoutStepViewedSaga)
    return saga
  }

  describe('when CartViewed is triggered', () => {
    it('calls Segment analytics once with expected payload when there is an atida-plus-customer cookie', async () => {
      get.mockReturnValueOnce(JSON.stringify(customerCookie))
      const saga = setup({})
      saga.dispatch(triggerReportCheckoutStepViewed())

      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Checkout Step Viewed',
        reportedCheckoutStepViewed
      )
    })

    it('calls Segment analytics once with expected payload when user logged through social login', async () => {
      get.mockReturnValueOnce(
        JSON.stringify({
          ...customerCookie,
          is_social: true,
          social_platform: 'Google'
        })
      )
      const saga = setup({})
      saga.dispatch(triggerReportCheckoutStepViewed())

      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Checkout Step Viewed',
        {
          ...reportedCheckoutStepViewed,
          is_social: true,
          social_platform: 'Google'
        }
      )
    })
  })

  describe('when CartViewed is triggered for guests', () => {
    it('calls Segment analytics once with expected guest payload', async () => {
      get.mockReturnValueOnce(JSON.stringify(undefined))
      const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>
      const saga = setup({}, false)
      saga.dispatch(triggerReportCheckoutStepViewed())

      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Checkout Step Viewed',
        reportedCheckoutStepViewedGuest
      )
    })
  })
})
