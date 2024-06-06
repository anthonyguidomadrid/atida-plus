import SagaTester from 'redux-saga-tester'
import Analytics from 'analytics-node'
import { triggerReportAccountCreationStepCompleted } from '~domains/analytics/actions'
import { RootState } from '~domains/redux'
import { reportedAccountCreationStepCompleted } from '../../__mocks__/analytics'
import type { DeepPartial } from '@reduxjs/toolkit'
import { reportAccountCreationStepCompletedSaga } from '../report-account-creation-step-completed'

jest.mock('analytics-node')
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>

describe('analytics/report account creation step completed', () => {
  const setup = (testCaseState = {}): SagaTester<DeepPartial<RootState>> => {
    global.analytics = (new Analytics(
      'segmentTestKey'
    ) as unknown) as SegmentAnalytics.AnalyticsJS
    const saga = new SagaTester(testCaseState)

    saga.start(reportAccountCreationStepCompletedSaga)
    return saga
  }

  describe('when reportAccountCreationStepCompleted is triggered', () => {
    it('calls Segment analytics once with expected payload', async () => {
      const saga = setup({})
      saga.dispatch(triggerReportAccountCreationStepCompleted())

      expect(mockAnalytics).toBeCalledWith('segmentTestKey')
      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Account Creation Step Completed',
        reportedAccountCreationStepCompleted
      )
    })
  })
})
