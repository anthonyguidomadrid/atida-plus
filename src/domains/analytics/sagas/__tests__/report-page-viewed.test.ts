import SagaTester from 'redux-saga-tester'
import Analytics from 'analytics-node'
import {
  triggerEmitIsSegmentInitialised,
  triggerReportPageViewed
} from '~domains/analytics/actions'
import { reportPageViewedSaga } from '../report-page-viewed'
import { RootState } from '~domains/redux'
import { pageCategoryPayload } from '~domains/analytics/__mocks__/analytics'
import type { DeepPartial } from '@reduxjs/toolkit'

jest.mock('analytics-node')
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>

describe('analytics/report page viewed saga', () => {
  const setup = (
    testCaseState = {
      client: { analytics: { data: { isInitialised: true } } }
    }
  ): SagaTester<DeepPartial<RootState>> => {
    global.analytics = (new Analytics(
      'segmentTestKey'
    ) as unknown) as SegmentAnalytics.AnalyticsJS
    const saga = new SagaTester({ initialState: testCaseState })

    saga.start(reportPageViewedSaga)
    return saga
  }

  describe('when reportPageViewed is triggered', () => {
    it('calls Segment analytics once with expected payload', async () => {
      const saga = setup()
      saga.dispatch(
        triggerReportPageViewed({
          page: 'page',
          pageType: 'pageType'
        })
      )

      expect(mockAnalytics).toBeCalledWith('segmentTestKey')
      expect(mockAnalytics.mock.instances[0].page).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].page).toBeCalledWith('page', {
        page_type: 'pageType'
      })
    })

    it('and Segment is not yet initialised, waits for the init trigger', async () => {
      const saga = setup({
        client: { analytics: { data: { isInitialised: false } } }
      })
      saga.dispatch(
        triggerReportPageViewed({
          page: 'page',
          pageType: 'pageType'
        })
      )
      saga.dispatch(triggerEmitIsSegmentInitialised())

      expect(mockAnalytics.mock.instances[0].page).toHaveBeenCalledTimes(1)
    })

    it('reports correct category path for category level 0', async () => {
      const saga = setup()
      saga.dispatch(
        triggerReportPageViewed({
          ...pageCategoryPayload,
          ...{
            category: {
              ...pageCategoryPayload.category,
              ...{
                path: {
                  id0: 'diet_exercise_weight_loss'
                }
              }
            }
          }
        })
      )

      expect(mockAnalytics.mock.instances[0].page).toBeCalledWith('page', {
        page_type: 'pageType',
        category: 'diet_exercise_weight_loss'
      })
    })

    it('reports correct category path for category level 1', async () => {
      const saga = setup()
      saga.dispatch(
        triggerReportPageViewed({
          ...pageCategoryPayload,
          ...{
            category: {
              ...pageCategoryPayload.category,
              ...{
                path: {
                  id0: 'diet_exercise_weight_loss',
                  id1: 'diet_exercise_weight_loss_nutrition'
                }
              }
            }
          }
        })
      )

      expect(mockAnalytics.mock.instances[0].page).toBeCalledWith('page', {
        page_type: 'pageType',
        category:
          'diet_exercise_weight_loss/diet_exercise_weight_loss_nutrition'
      })
    })

    it('reports correct category path for category level 2', async () => {
      const saga = setup()
      saga.dispatch(
        triggerReportPageViewed({
          ...pageCategoryPayload,
          ...{
            category: {
              ...pageCategoryPayload.category,
              ...{
                path: {
                  id0: 'diet_exercise_weight_loss',
                  id1: 'diet_exercise_weight_loss_nutrition',
                  id2: 'diet_exercise_weight_loss_nutrition_diet_milk'
                }
              }
            }
          }
        })
      )

      expect(mockAnalytics.mock.instances[0].page).toBeCalledWith('page', {
        page_type: 'pageType',
        category:
          'diet_exercise_weight_loss/diet_exercise_weight_loss_nutrition/diet_exercise_weight_loss_nutrition_diet_milk'
      })
    })
    it('does not send empty product IDs', async () => {
      const saga = setup()
      saga.dispatch(triggerReportPageViewed({ page: 'PDP', pageType: 'pdp' }))

      expect(mockAnalytics.mock.instances[0].page).toBeCalledWith('PDP', {
        page_type: 'pdp'
      })
    })

    it('does send product IDs when available', async () => {
      const saga = setup()
      saga.dispatch(
        triggerReportPageViewed({
          page: 'page',
          pageType: 'pageType',
          productId: 'potato'
        })
      )

      expect(mockAnalytics.mock.instances[0].page).toBeCalledWith('page', {
        page_type: 'pageType',
        product_id: 'potato'
      })
    })

    it('does send payment method when available', async () => {
      const saga = setup()
      saga.dispatch(
        triggerReportPageViewed({
          page: 'page',
          pageType: 'pageType',
          paymentMethod: 'Google Pay'
        })
      )

      expect(mockAnalytics.mock.instances[0].page).toBeCalledWith('page', {
        page_type: 'pageType',
        payment_method: 'Google Pay'
      })
    })
  })
})
