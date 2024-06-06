import SagaTester from 'redux-saga-tester'
import Analytics from 'analytics-node'
import { triggerReportProductsSearched } from '~domains/analytics/actions'
import { RootState } from '~domains/redux'
import { reportProductsSearchedSaga } from '../report-products-searched'
import type { DeepPartial } from '@reduxjs/toolkit'

jest.mock('analytics-node')
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>

describe('analytics/report product searched', () => {
  const setup = (): SagaTester<DeepPartial<RootState>> => {
    global.analytics = (new Analytics(
      'segmentTestKey'
    ) as unknown) as SegmentAnalytics.AnalyticsJS
    const saga = new SagaTester({
      initialState: {}
    })

    saga.start(reportProductsSearchedSaga)
    return saga
  }

  describe('when ProductsSearched is triggered', () => {
    it('calls Segment analytics once with expected payload', async () => {
      const saga = setup()
      saga.dispatch(
        triggerReportProductsSearched({ query: 'You can call me Mickey!' })
      )

      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Products Searched',
        {
          query: 'You can call me Mickey!'
        }
      )
    })
    it('calls Segment analytics with is_search_as_you_type prop', async () => {
      const saga = setup()
      saga.dispatch(
        triggerReportProductsSearched({
          query: 'You can call me Mickey!',
          isSearchAsYouType: true
        })
      )

      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Products Searched',
        {
          query: 'You can call me Mickey!',
          is_search_as_you_type: true
        }
      )
    })
  })
})
