import SagaTester from 'redux-saga-tester'
import Analytics from 'analytics-node'
import { triggerReportEmailSubscription } from '~domains/analytics/actions'
import { RootState } from '~domains/redux'
import { reportedEmailSubscription } from '../../__mocks__/analytics'
import type { DeepPartial } from '@reduxjs/toolkit'
import { reportEmailSubscriptionSaga } from '~domains/analytics/sagas/report-email-subscription'
import { analyticsIdentifyCompletedChannel } from '../channels'

jest.mock('analytics-node')
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>

describe('analytics/report email subscription', () => {
  const setup = (): SagaTester<DeepPartial<RootState>> => {
    global.analytics = (new Analytics(
      'segmentTestKey'
    ) as unknown) as SegmentAnalytics.AnalyticsJS
    const saga = new SagaTester({})

    saga.start(reportEmailSubscriptionSaga)
    return saga
  }

  describe('when reportEmailSubscription is triggered', () => {
    it('calls Segment analytics once with expected payload', async () => {
      const saga = setup()
      saga.dispatch(
        triggerReportEmailSubscription({
          email: 'testemail@atida.com',
          subscribed_from: 'account_update',
          email_list: ''
        })
      )
      analyticsIdentifyCompletedChannel.put({})

      expect(mockAnalytics).toBeCalledWith('segmentTestKey')
      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Email Subscribed',
        reportedEmailSubscription
      )
    })
    it('calls Segment analytics once with case sensitive payload', async () => {
      const saga = setup()
      saga.dispatch(
        triggerReportEmailSubscription({
          email: 'testEMAIL@atida.com',
          subscribed_from: 'account_update',
          email_list: ''
        })
      )
      analyticsIdentifyCompletedChannel.put({})

      expect(mockAnalytics).toBeCalledWith('segmentTestKey')
      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Email Subscribed',
        reportedEmailSubscription
      )
    })
  })
})
