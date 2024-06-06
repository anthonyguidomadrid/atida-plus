import SagaTester from 'redux-saga-tester'
import Analytics from 'analytics-node'
import { triggerReportPasswordResetFailed } from '~domains/analytics/actions'
import { RootState } from '~domains/redux'
import { reportedPasswordResetFailed } from '../../__mocks__/analytics'
import type { DeepPartial } from '@reduxjs/toolkit'
import { reportPasswordResetFailedSaga } from '../report-password-reset-failed'

jest.mock('analytics-node')
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>

describe('analytics/report password reset failed', () => {
  const setup = (testCaseState = {}): SagaTester<DeepPartial<RootState>> => {
    global.analytics = (new Analytics(
      'segmentTestKey'
    ) as unknown) as SegmentAnalytics.AnalyticsJS
    const saga = new SagaTester(testCaseState)

    saga.start(reportPasswordResetFailedSaga)
    return saga
  }

  describe('when reportPasswordResetFailed is triggered', () => {
    it('calls Segment analytics once with expected payload', async () => {
      const saga = setup({})
      saga.dispatch(
        triggerReportPasswordResetFailed({
          error_message: 'account.password-reset.unexpected-error',
          error_key: 'account.password-reset.unexpected-error'
        })
      )

      expect(mockAnalytics).toBeCalledWith('segmentTestKey')
      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Password Reset Failed',
        reportedPasswordResetFailed
      )
    })
  })
})
