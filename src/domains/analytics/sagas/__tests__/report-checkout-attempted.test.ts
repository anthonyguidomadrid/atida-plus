import SagaTester from 'redux-saga-tester'
import Analytics from 'analytics-node'
import { triggerReportCheckoutAttempted } from '~domains/analytics/actions'
import { RootState } from '~domains/redux'
import { cartState, reportedCheckoutStarted } from '../../__mocks__/analytics'
import type { DeepPartial } from '@reduxjs/toolkit'
import { reportCheckoutAttemptedSaga } from '~domains/analytics/sagas/report-checkout-attempted'
import { BasketButtonPosition } from '~config/constants/basket-button-position'
import { customerCookie } from '~domains/account/__mocks__/token'
// @ts-ignore
import { get } from '~helpers'

jest.mock('analytics-node')
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>

describe('analytics/report checkout attempted', () => {
  const setup = (testCaseState = {}): SagaTester<DeepPartial<RootState>> => {
    global.analytics = (new Analytics(
      'segmentTestKey'
    ) as unknown) as SegmentAnalytics.AnalyticsJS
    const saga = new SagaTester({
      initialState: { ...cartState, ...testCaseState }
    })

    saga.start(reportCheckoutAttemptedSaga)
    return saga
  }

  describe('when CheckoutAttempted is triggered', () => {
    it('calls Segment analytics once with expected payload when there is an atida-plus-customer cookie', async () => {
      get.mockReturnValueOnce(JSON.stringify(customerCookie))
      const saga = setup()
      saga.dispatch(
        triggerReportCheckoutAttempted({ position: BasketButtonPosition.TOP })
      )

      expect(mockAnalytics).toBeCalledWith('segmentTestKey')
      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Checkout Attempted',
        {
          ...reportedCheckoutStarted,
          position: BasketButtonPosition.TOP
        }
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
      const saga = setup()
      saga.dispatch(
        triggerReportCheckoutAttempted({ position: BasketButtonPosition.TOP })
      )

      expect(mockAnalytics).toBeCalledWith('segmentTestKey')
      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Checkout Attempted',
        {
          ...reportedCheckoutStarted,
          is_social: true,
          social_platform: 'Google',
          position: BasketButtonPosition.TOP
        }
      )
    })

    it('calls Segment analytics once with expected payload when there is no atida-plus-customer cookie', async () => {
      get.mockReturnValueOnce(JSON.stringify(undefined))
      const saga = setup()
      saga.dispatch(
        triggerReportCheckoutAttempted({ position: BasketButtonPosition.TOP })
      )

      expect(mockAnalytics).toBeCalledWith('segmentTestKey')
      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Checkout Attempted',
        {
          ...reportedCheckoutStarted,
          position: BasketButtonPosition.TOP
        }
      )
    })
  })
})
