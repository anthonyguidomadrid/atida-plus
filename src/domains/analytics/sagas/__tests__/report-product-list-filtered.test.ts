import SagaTester from 'redux-saga-tester'
import Analytics from 'analytics-node'
import {
  triggerEmitIsSegmentInitialised,
  triggerReportProductListFiltered
} from '~domains/analytics/actions'
import { reportProductListFilteredSaga } from '../report-product-list-filtered'
import { RootState } from '~domains/redux'
import {
  productListFilteredPayload,
  reportedProductListFiltered
} from '../../__mocks__/analytics'
import type { DeepPartial } from '@reduxjs/toolkit'
import { categoryPagePOP } from '~domains/page/__mocks__/contentfulCategoryContent'

jest.mock('analytics-node')
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>

describe('analytics/report product list filtered', () => {
  const setup = (
    testCaseState = {
      client: { analytics: { data: { isInitialised: true } } },
      server: {
        page: { 'page-content': { content: categoryPagePOP } }
      }
    }
  ): SagaTester<DeepPartial<RootState>> => {
    global.analytics = (new Analytics(
      'segmentTestKey'
    ) as unknown) as SegmentAnalytics.AnalyticsJS
    const saga = new SagaTester({ initialState: testCaseState })

    saga.start(reportProductListFilteredSaga)
    return saga
  }

  describe('when ProductListFiltered is triggered', () => {
    it('calls Segment analytics once with expected payload', async () => {
      const saga = setup({
        client: { analytics: { data: { isInitialised: true } } },
        server: {
          page: { 'page-content': { content: categoryPagePOP } }
        }
      })
      saga.dispatch(
        triggerReportProductListFiltered({ ...productListFilteredPayload })
      )

      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Product List Filtered',
        reportedProductListFiltered
      )
    })

    it('and Segment is not yet initialised, waits for the init trigger', async () => {
      const saga = setup({
        client: { analytics: { data: { isInitialised: false } } },
        server: {
          page: { 'page-content': { content: categoryPagePOP } }
        }
      })
      saga.dispatch(
        triggerReportProductListFiltered({ ...productListFilteredPayload })
      )
      saga.dispatch(triggerEmitIsSegmentInitialised())
      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
    })
  })
})
