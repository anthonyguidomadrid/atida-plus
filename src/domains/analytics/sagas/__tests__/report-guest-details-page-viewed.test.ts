import SagaTester from 'redux-saga-tester'
import Analytics from 'analytics-node'
import { triggerReportGuestDetailsPageViewed } from '~domains/analytics/actions'
import { reportGuestDetailsPageViewed } from '../report-guest-details-page-viewed'

jest.mock('analytics-node')
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>

describe('analytics/report guest details entered', () => {
  const setup = () => {
    global.analytics = (new Analytics(
      'segmentTestKey'
    ) as unknown) as SegmentAnalytics.AnalyticsJS
    const saga = new SagaTester()

    saga.start(reportGuestDetailsPageViewed)
    return saga
  }

  describe('when reportGuestDetailsPageViewed is triggered', () => {
    it('calls Segment analytics once with expected payload', async () => {
      const saga = setup()
      saga.dispatch(triggerReportGuestDetailsPageViewed())

      expect(mockAnalytics).toBeCalledWith('segmentTestKey')
      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Guest Details Page Viewed'
      )
    })
  })
})
