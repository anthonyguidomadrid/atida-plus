import SagaTester from 'redux-saga-tester'
import Analytics from 'analytics-node'
import { triggerReportProductFavourites } from '~domains/analytics/actions'
import { reportProductFavouritesSaga } from '../report-product-favourites'
import { RootState } from '~domains/redux'
import { reportedProductFavourites } from '../../__mocks__/analytics'
import type { DeepPartial } from '@reduxjs/toolkit'

jest.mock('analytics-node')
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>

describe('analytics/report product favourites saga', () => {
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

    saga.start(reportProductFavouritesSaga)
    return saga
  }

  describe('when Product Added to Favourites is triggered', () => {
    it('calls Segment analytics once with expected payload', async () => {
      const saga = setup()

      saga.dispatch(
        triggerReportProductFavourites({
          event: 'Product Added to Favourites',
          product: reportedProductFavourites()
        })
      )

      expect(mockAnalytics).toBeCalledWith('segmentTestKey')
      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
    })
  })

  describe('when Product Removed from Favourites is triggered', () => {
    it('calls Segment analytics once with expected payload', async () => {
      const saga = setup()

      saga.dispatch(
        triggerReportProductFavourites({
          event: 'Product Removed from Favourites',
          product: reportedProductFavourites()
        })
      )

      expect(mockAnalytics).toBeCalledWith('segmentTestKey')
      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
    })
  })
})
