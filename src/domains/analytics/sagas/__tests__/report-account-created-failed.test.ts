import SagaTester from 'redux-saga-tester'
import Analytics from 'analytics-node'
import { triggerReportAccountCreatedFailed } from '~domains/analytics/actions'
import { RootState } from '~domains/redux'
import { reportedAccountCreatedFailed } from '../../__mocks__/analytics'
import type { DeepPartial } from '@reduxjs/toolkit'
import { reportAccountCreatedFailedSaga } from '../report-account-created-failed'

jest.mock('analytics-node')
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>

describe('analytics/report account created failed', () => {
  const setup = (testCaseState = {}): SagaTester<DeepPartial<RootState>> => {
    global.analytics = (new Analytics(
      'segmentTestKey'
    ) as unknown) as SegmentAnalytics.AnalyticsJS
    const saga = new SagaTester(testCaseState)

    saga.start(reportAccountCreatedFailedSaga)
    return saga
  }

  describe('when reportAccountCreatedFailed is triggered', () => {
    it('calls Segment analytics once with expected payload', async () => {
      const saga = setup({})
      saga.dispatch(
        triggerReportAccountCreatedFailed({
          error_message: 'create-account.unexpected-error',
          error_key: 'create-account.unexpected-error'
        })
      )

      expect(mockAnalytics).toBeCalledWith('segmentTestKey')
      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Account Created Failed',
        reportedAccountCreatedFailed
      )
    })
  })
})
