import SagaTester from 'redux-saga-tester'
import Analytics from 'analytics-node'
import {
  triggerEmitIsSegmentInitialised,
  triggerReportBasketIconClicked
} from '~domains/analytics/actions'
import { RootState } from '~domains/redux'
import { reportBasketIconClicked } from '../../__mocks__/analytics'
import type { DeepPartial } from '@reduxjs/toolkit'
import { reportBasketIconClickedSaga } from '~domains/analytics/sagas/report-basket-icon-clicked'
import { waitFor } from '@testing-library/react'

jest.mock('analytics-node')
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>

describe('analytics/report basket icon clicked', () => {
  const setup = (
    testCaseState = { client: { analytics: { data: { isInitialised: true } } } }
  ): SagaTester<DeepPartial<RootState>> => {
    global.analytics = (new Analytics(
      'segmentTestKey'
    ) as unknown) as SegmentAnalytics.AnalyticsJS
    const saga = new SagaTester({ initialState: testCaseState })

    saga.start(reportBasketIconClickedSaga)
    return saga
  }

  describe('when reportBasketIconClickedSaga is triggered', () => {
    it('calls Segment analytics once with expected payload - Custom button name', async () => {
      const saga = setup()
      saga.dispatch(triggerReportBasketIconClicked(reportBasketIconClicked))

      await waitFor(() => {
        expect(mockAnalytics).toBeCalledWith('segmentTestKey')
        expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
        expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
          'Basket Icon Clicked',
          reportBasketIconClicked
        )
      })
    })
    it('waits for the init trigger if Segment is not yet initialised', async () => {
      const saga = setup({
        client: { analytics: { data: { isInitialised: false } } }
      })
      saga.dispatch(triggerReportBasketIconClicked(reportBasketIconClicked))
      saga.dispatch(triggerEmitIsSegmentInitialised())

      await waitFor(() =>
        expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      )
    })
  })
})
