import SagaTester from 'redux-saga-tester'
import Analytics from 'analytics-node'
import { triggerReportProductFavouritesFailed } from '~domains/analytics/actions'
import { reportProductFavouritesFailedSaga } from '../report-product-favourites-failed'
import { RootState } from '~domains/redux'
import type { DeepPartial } from '@reduxjs/toolkit'

jest.mock('analytics-node')
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>

describe('analytics/report product favourites failed saga', () => {
  const setup = (): SagaTester<DeepPartial<RootState>> => {
    global.analytics = (new Analytics(
      'segmentTestKey'
    ) as unknown) as SegmentAnalytics.AnalyticsJS
    const saga = new SagaTester({
      options: {
        context: {
          locale: 'pt-pt'
        }
      }
    })

    saga.start(reportProductFavouritesFailedSaga)
    return saga
  }

  describe('when Product Added to Favourites is failed', () => {
    it('calls Segment analytics once with expected payload', async () => {
      const saga = setup()

      saga.dispatch(
        triggerReportProductFavouritesFailed({
          event: 'Product Added to Favourites'
        })
      )

      expect(mockAnalytics).toBeCalledWith('segmentTestKey')
      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
    })
  })

  describe('when Product Removed from Favourites is failed', () => {
    it('calls Segment analytics once with expected payload', async () => {
      const saga = setup()

      saga.dispatch(
        triggerReportProductFavouritesFailed({
          event: 'Product Removed from Favourites'
        })
      )

      expect(mockAnalytics).toBeCalledWith('segmentTestKey')
      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
    })
  })
})
