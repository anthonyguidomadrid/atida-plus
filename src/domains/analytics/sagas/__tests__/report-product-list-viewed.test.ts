import SagaTester from 'redux-saga-tester'
import Analytics from 'analytics-node'
import {
  triggerEmitIsSegmentInitialised,
  triggerReportProductListViewed
} from '~domains/analytics/actions'
import { reportProductListViewedSaga } from '../report-product-list-viewed'
import { RootState } from '~domains/redux'
import {
  productListViewedPayload,
  reportedProductList
} from '../../__mocks__/analytics'
import type { DeepPartial } from '@reduxjs/toolkit'
import { ReportProductListViewedLoad } from '~domains/analytics/types'
import { categoryPagePOP } from '~domains/page/__mocks__/contentfulCategoryContent'

jest.mock('analytics-node')
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>

describe('analytics/report product list viewed', () => {
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

    saga.start(reportProductListViewedSaga)
    return saga
  }

  describe('when ProductListViewed is triggered', () => {
    it('calls Segment analytics once with expected payload', async () => {
      const saga = setup({
        client: { analytics: { data: { isInitialised: true } } },
        server: {
          page: { 'page-content': { content: categoryPagePOP } }
        }
      })
      saga.dispatch(
        triggerReportProductListViewed({ ...productListViewedPayload })
      )

      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Product List Viewed',
        reportedProductList
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
        triggerReportProductListViewed({ ...productListViewedPayload })
      )
      saga.dispatch(triggerEmitIsSegmentInitialised())
      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
    })

    it('and no page type is provided, nothing is reported 🤷‍♀️', async () => {
      const saga = setup()
      saga.dispatch(
        triggerReportProductListViewed(({
          ...productListViewedPayload,
          ...{ type: undefined }
        } as unknown) as ReportProductListViewedLoad)
      )

      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(0)
    })
  })
})
