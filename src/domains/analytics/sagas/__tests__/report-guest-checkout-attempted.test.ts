import SagaTester from 'redux-saga-tester'
import Analytics from 'analytics-node'
import { triggerReportGuestCheckoutAttempted } from '~domains/analytics/actions'
import { RootState } from '~domains/redux'
import { cartState, reportedCheckoutStarted } from '../../__mocks__/analytics'
import type { DeepPartial } from '@reduxjs/toolkit'
import { reportGuestCheckoutAttemptedSaga } from '../report-guest-checkout-attempted'

jest.mock('analytics-node')
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>

describe('analytics/report guest checkout attempted', () => {
  const setup = (testCaseState = {}): SagaTester<DeepPartial<RootState>> => {
    global.analytics = (new Analytics(
      'segmentTestKey'
    ) as unknown) as SegmentAnalytics.AnalyticsJS
    const saga = new SagaTester({
      initialState: { ...cartState, ...testCaseState }
    })

    saga.start(reportGuestCheckoutAttemptedSaga)
    return saga
  }

  describe('when Guest Checkout Attempted is triggered', () => {
    it('calls Segment analytics once with expected payload', async () => {
      const {
        is_social,
        ...reportedGuestCheckoutStarted
      } = reportedCheckoutStarted
      const saga = setup()
      saga.dispatch(triggerReportGuestCheckoutAttempted())

      expect(mockAnalytics).toBeCalledWith('segmentTestKey')
      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Guest Checkout Attempted',
        reportedGuestCheckoutStarted
      )
    })
  })
})
