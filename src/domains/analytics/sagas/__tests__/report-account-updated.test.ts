import SagaTester from 'redux-saga-tester'
import Analytics from 'analytics-node'
import { triggerReportAccountUpdated } from '~domains/analytics/actions'
import { RootState } from '~domains/redux'
import { reportedAccountUpdated } from '../../__mocks__/analytics'
import type { DeepPartial } from '@reduxjs/toolkit'
import { analyticsIdentifyCompletedChannel } from '../channels'
import { reportAccountUpdatedSaga } from '~domains/analytics/sagas/report-account-updated'

jest.mock('analytics-node')
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>

describe('analytics/report account updated', () => {
  const setup = (): SagaTester<DeepPartial<RootState>> => {
    global.analytics = (new Analytics(
      'segmentTestKey'
    ) as unknown) as SegmentAnalytics.AnalyticsJS
    const saga = new SagaTester({})

    saga.start(reportAccountUpdatedSaga)
    return saga
  }

  describe('when reportAccountUpdated is triggered', () => {
    it('calls Segment analytics once with expected payload', async () => {
      const saga = setup()
      saga.dispatch(
        triggerReportAccountUpdated({
          information_updated: ['first_name']
        })
      )
      analyticsIdentifyCompletedChannel.put({})

      expect(mockAnalytics).toBeCalledWith('segmentTestKey')
      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Account Updated',
        reportedAccountUpdated
      )
    })
  })
})
