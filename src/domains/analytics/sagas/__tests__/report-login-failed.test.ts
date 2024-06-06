import SagaTester from 'redux-saga-tester'
import Analytics from 'analytics-node'
import { triggerReportLoginFailed } from '~domains/analytics/actions'
import { RootState } from '~domains/redux'
import {
  reportedAccountBlocked,
  reportedLoginFailed,
  reportedSocialLoginFailed
} from '../../__mocks__/analytics'
import type { DeepPartial } from '@reduxjs/toolkit'
import { reportLoginFailedSaga } from '../report-login-failed'

jest.mock('analytics-node')
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>

describe('analytics/report login failed', () => {
  const setup = (testCaseState = {}): SagaTester<DeepPartial<RootState>> => {
    global.analytics = (new Analytics(
      'segmentTestKey'
    ) as unknown) as SegmentAnalytics.AnalyticsJS
    const saga = new SagaTester(testCaseState)

    saga.start(reportLoginFailedSaga)
    return saga
  }

  describe('when reportLoginFailed is triggered', () => {
    it('calls Segment analytics once with expected payload', async () => {
      const saga = setup({})
      saga.dispatch(
        triggerReportLoginFailed({
          email: 'testemail@atida.com',
          error_message: 'login.error.content',
          error_key: 'login.error.content'
        })
      )

      expect(mockAnalytics).toBeCalledWith('segmentTestKey')
      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Login Failed',
        reportedLoginFailed
      )
    })
    it('calls Segment analytics once with expected payload - Social login', async () => {
      const saga = setup({})
      saga.dispatch(
        triggerReportLoginFailed({
          email: 'testemail@atida.com',
          error_message: 'login.error.content',
          error_key: 'login.error.content',
          is_social: true,
          social_platform: 'google'
        })
      )

      expect(mockAnalytics).toBeCalledWith('segmentTestKey')
      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Login Failed',
        reportedSocialLoginFailed
      )
    })
    it('calls Segment analytics once with expected payload - Account Blocked', async () => {
      const saga = setup({})
      saga.dispatch(
        triggerReportLoginFailed({
          event: 'Account Blocked',
          error_message: 'login.lockout-error.content',
          error_key: 'login.lockout-error.content'
        })
      )

      expect(mockAnalytics).toBeCalledWith('segmentTestKey')
      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Account Blocked',
        reportedAccountBlocked
      )
    })
  })
})
