import SagaTester from 'redux-saga-tester'
import Analytics from 'analytics-node'
import { triggerReportEmailUnsubscription } from '~domains/analytics/actions'
import { RootState } from '~domains/redux'
import type { DeepPartial } from '@reduxjs/toolkit'
import { reportEmailUnsubscriptionSaga } from '~domains/analytics/sagas/report-email-unsubscription'
import { reportedEmailUnsubscription } from '~domains/analytics/__mocks__/analytics'

jest.mock('analytics-node')
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>

describe('analytics/report email unsubscription', () => {
  const setup = (): SagaTester<DeepPartial<RootState>> => {
    global.analytics = (new Analytics(
      'segmentTestKey'
    ) as unknown) as SegmentAnalytics.AnalyticsJS
    const saga = new SagaTester({})

    saga.start(reportEmailUnsubscriptionSaga)
    return saga
  }

  describe('when reportEmailUnSubscription is triggered', () => {
    it('calls Segment analytics once with expected payload', async () => {
      const saga = setup()
      saga.dispatch(
        triggerReportEmailUnsubscription({
          email: 'testemail@atida.com',
          unsubscribed_from: 'account_update',
          email_list: ''
        })
      )

      expect(mockAnalytics).toBeCalledWith('segmentTestKey')
      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Email Unsubscribed',
        reportedEmailUnsubscription
      )
    })
  })
})
