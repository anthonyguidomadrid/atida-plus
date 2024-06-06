import SagaTester from 'redux-saga-tester'
import Analytics from 'analytics-node'
import {
  triggerEmitIsSegmentInitialised,
  triggerReportAccountCreatedAttempted
} from '~domains/analytics/actions'
import { RootState } from '~domains/redux'
import type { DeepPartial } from '@reduxjs/toolkit'
import { reportAccountCreatedAttemptedSaga } from '../report-account-created-attempted'
import { waitFor } from '@testing-library/react'

jest.mock('analytics-node')
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>

describe('analytics/report account created attempted', () => {
  const setup = (
    testCaseState = { client: { analytics: { data: { isInitialised: true } } } }
  ): SagaTester<DeepPartial<RootState>> => {
    global.analytics = (new Analytics(
      'segmentTestKey'
    ) as unknown) as SegmentAnalytics.AnalyticsJS
    const saga = new SagaTester({ initialState: testCaseState })

    saga.start(reportAccountCreatedAttemptedSaga)
    return saga
  }

  describe('when reportAccountCreatedAttempted is triggered', () => {
    it('calls Segment analytics once with expected payload', async () => {
      const saga = setup()
      saga.dispatch(
        triggerReportAccountCreatedAttempted({
          is_social: false,
          social_platform: ''
        })
      )

      await waitFor(() => {
        expect(mockAnalytics).toBeCalledWith('segmentTestKey')
        expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
        expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
          'Account Created Attempted',
          {
            is_social: false,
            social_platform: ''
          }
        )
      })
    })

    it('waits for the init trigger if Segment is not yet initialised', async () => {
      const saga = setup({
        client: { analytics: { data: { isInitialised: false } } }
      })
      saga.dispatch(
        triggerReportAccountCreatedAttempted({
          is_social: false,
          social_platform: ''
        })
      )
      saga.dispatch(triggerEmitIsSegmentInitialised())

      await waitFor(() =>
        expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      )
    })
  })
})
