import SagaTester from 'redux-saga-tester'
import Analytics from 'analytics-node'
import { triggerReportCheckoutStarted } from '~domains/analytics/actions'
import { RootState } from '~domains/redux'
import { cartState, reportedCheckoutStarted } from '../../__mocks__/analytics'
import type { DeepPartial } from '@reduxjs/toolkit'
import { reportCheckoutStartedSaga } from '~domains/analytics/sagas/report-checkout-started'
import { customerCookie } from '~domains/account/__mocks__/token'
// @ts-ignore
import { get } from '~helpers'

jest.mock('analytics-node')
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>

describe('analytics/report checkout started', () => {
  const setup = (testCaseState = {}): SagaTester<DeepPartial<RootState>> => {
    global.analytics = (new Analytics(
      'segmentTestKey'
    ) as unknown) as SegmentAnalytics.AnalyticsJS
    const saga = new SagaTester({
      initialState: { ...cartState, ...testCaseState }
    })

    saga.start(reportCheckoutStartedSaga)
    return saga
  }

  describe('when CheckoutStarted is triggered', () => {
    it('calls Segment analytics once with expected payload when there is an atida-plus-customer cookie', async () => {
      get.mockReturnValueOnce(JSON.stringify(customerCookie))
      const saga = setup()
      saga.dispatch(triggerReportCheckoutStarted())

      expect(mockAnalytics).toBeCalledWith('segmentTestKey')
      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Checkout Started',
        reportedCheckoutStarted
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
      saga.dispatch(triggerReportCheckoutStarted())

      expect(mockAnalytics).toBeCalledWith('segmentTestKey')
      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Checkout Started',
        {
          ...reportedCheckoutStarted,
          is_social: true,
          social_platform: 'Google'
        }
      )
    })

    it('calls Segment analytics once with expected payload when there is no atida-plus-customer cookie', async () => {
      get.mockReturnValueOnce(JSON.stringify(undefined))
      const saga = setup()
      saga.dispatch(triggerReportCheckoutStarted())

      expect(mockAnalytics).toBeCalledWith('segmentTestKey')
      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Checkout Started',
        reportedCheckoutStarted
      )
    })
  })
})
