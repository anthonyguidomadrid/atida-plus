import SagaTester from 'redux-saga-tester'
import Analytics from 'analytics-node'
import { triggerReportGridListViewToggled } from '~domains/analytics/actions'
import { RootState } from '~domains/redux'
import type { DeepPartial } from '@reduxjs/toolkit'
import { reportGridListViewToggledSaga } from '../report-grid-list-view-toggled'
import { waitFor } from '@testing-library/react'
import { ProductViews } from '~domains/product/slices/view-toggle'

jest.mock('analytics-node')
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>

describe('analytics/report grid list view toggled', () => {
  const setup = (
    testCaseState = { client: { analytics: { data: { isInitialised: true } } } }
  ): SagaTester<DeepPartial<RootState>> => {
    global.analytics = (new Analytics(
      'segmentTestKey'
    ) as unknown) as SegmentAnalytics.AnalyticsJS
    const saga = new SagaTester({ initialState: testCaseState })

    saga.start(reportGridListViewToggledSaga)
    return saga
  }

  describe('when triggerReportGridListViewToggled is triggered', () => {
    it('calls Segment analytics once with expected payload', async () => {
      const saga = setup()
      saga.dispatch(
        triggerReportGridListViewToggled({ view: ProductViews.LIST })
      )

      await waitFor(() => {
        expect(mockAnalytics).toBeCalledWith('segmentTestKey')
        expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
        expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
          'Page View Toggled',
          {
            view: ProductViews.LIST
          }
        )
      })
    })
  })
})
