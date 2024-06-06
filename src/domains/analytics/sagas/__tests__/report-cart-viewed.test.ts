import SagaTester from 'redux-saga-tester'
import Analytics from 'analytics-node'
import {
  triggerEmitIsSegmentInitialised,
  triggerReportCartViewed
} from '~domains/analytics/actions'
import { RootState } from '~domains/redux'
import { reportCartViewedSaga } from '../report-cart-viewed'
import { cartState, reportedCart } from '../../__mocks__/analytics'
import type { DeepPartial } from '@reduxjs/toolkit'

jest.mock('analytics-node')
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>

describe('analytics/report cart viewed', () => {
  const setup = (
    testCaseState = { client: {} }
  ): SagaTester<DeepPartial<RootState>> => {
    global.analytics = (new Analytics(
      'segmentTestKey'
    ) as unknown) as SegmentAnalytics.AnalyticsJS
    const saga = new SagaTester({
      initialState: {
        client: { ...cartState?.client, ...testCaseState?.client }
      }
    })
    saga.start(reportCartViewedSaga)
    return saga
  }

  describe('when CartViewed is triggered', () => {
    it('calls Segment analytics once with expected payload', async () => {
      const saga = setup({
        client: { analytics: { data: { isInitialised: true } } }
      })
      saga.dispatch(triggerReportCartViewed())

      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Cart Viewed',
        reportedCart
      )
    })
    it('waits for Segment to init if fired on page load', async () => {
      const saga = setup({
        client: { analytics: { data: { isInitialised: false } } }
      })
      saga.dispatch(triggerReportCartViewed())
      saga.dispatch(triggerEmitIsSegmentInitialised())

      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Cart Viewed',
        reportedCart
      )
    })
  })
})
