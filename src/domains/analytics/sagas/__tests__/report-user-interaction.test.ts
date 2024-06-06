import SagaTester from 'redux-saga-tester'
import Analytics from 'analytics-node'
import { triggerReportUserInteraction } from '~domains/analytics/actions'
import { RootState } from '~domains/redux'
import { reportedSocialLoginUserInteraction } from '../../__mocks__/analytics'
import type { DeepPartial } from '@reduxjs/toolkit'
import { reportUserInteractionSaga } from '~domains/analytics/sagas/report-user-interaction'
import { analyticsIdentifyCompletedChannel } from '../channels'

jest.mock('analytics-node')
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>

describe('analytics/report user interaction', () => {
  const setup = (): SagaTester<DeepPartial<RootState>> => {
    global.analytics = (new Analytics(
      'segmentTestKey'
    ) as unknown) as SegmentAnalytics.AnalyticsJS
    const saga = new SagaTester({})

    saga.start(reportUserInteractionSaga)
    return saga
  }

  describe('when reportUserInteraction is triggered', () => {
    it('calls Segment analytics once with expected payload', async () => {
      const saga = setup()
      saga.dispatch(
        triggerReportUserInteraction({
          event: 'Signed In'
        })
      )

      analyticsIdentifyCompletedChannel.put({})
      expect(mockAnalytics).toBeCalledWith('segmentTestKey')
      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Signed In',
        { is_social: false, social_platform: '' },
        {},
        expect.anything()
      )
    })
    it('calls Segment analytics once with expected payload - Social login', async () => {
      const saga = setup()
      saga.dispatch(
        triggerReportUserInteraction({
          event: 'Signed In',
          is_social: true,
          social_platform: 'google'
        })
      )

      analyticsIdentifyCompletedChannel.put({})
      expect(mockAnalytics).toBeCalledWith('segmentTestKey')
      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Signed In',
        reportedSocialLoginUserInteraction,
        {},
        expect.anything()
      )
    })
  })
})
