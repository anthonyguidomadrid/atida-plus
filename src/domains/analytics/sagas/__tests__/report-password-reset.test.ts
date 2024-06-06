import SagaTester from 'redux-saga-tester'
import Analytics from 'analytics-node'
import { triggerReportPasswordReset } from '~domains/analytics/actions'
import { RootState } from '~domains/redux'
import type { DeepPartial } from '@reduxjs/toolkit'
import { reportPasswordResetSaga } from '../report-password-reset'

jest.mock('analytics-node')
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>

describe('analytics/report password reset ', () => {
  const setup = (testCaseState = {}): SagaTester<DeepPartial<RootState>> => {
    global.analytics = (new Analytics(
      'segmentTestKey'
    ) as unknown) as SegmentAnalytics.AnalyticsJS
    const saga = new SagaTester(testCaseState)

    saga.start(reportPasswordResetSaga)
    return saga
  }

  describe('when reportPasswordReset is triggered', () => {
    it('calls Segment analytics once with expected payload', async () => {
      const saga = setup({})
      saga.dispatch(triggerReportPasswordReset())

      expect(mockAnalytics).toBeCalledWith('segmentTestKey')
      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Password Reset',
        {}
      )
    })
  })
})
