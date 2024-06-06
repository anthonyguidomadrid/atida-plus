import SagaTester from 'redux-saga-tester'
import Analytics from 'analytics-node'
import {
  triggerEmitIsSegmentInitialised,
  triggerReportNavigationItemButtonClicked
} from '~domains/analytics/actions'
import { RootState } from '~domains/redux'
import { reportedNavigationItemButtonClicked } from '../../__mocks__/analytics'
import type { DeepPartial } from '@reduxjs/toolkit'
import { reportNavigationItemButtonClickedSaga } from '~domains/analytics/sagas/report-navigation-item-button-clicked'
import { waitFor } from '@testing-library/react'

jest.mock('analytics-node')
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>

describe('analytics/report navigation item button clicked', () => {
  const setup = (
    testCaseState = { client: { analytics: { data: { isInitialised: true } } } }
  ): SagaTester<DeepPartial<RootState>> => {
    global.analytics = (new Analytics(
      'segmentTestKey'
    ) as unknown) as SegmentAnalytics.AnalyticsJS
    const saga = new SagaTester({ initialState: testCaseState })

    saga.start(reportNavigationItemButtonClickedSaga)
    return saga
  }

  describe('when reportNavigationItemButtonClicked is triggered', () => {
    it('calls Segment analytics once with expected payload - Custom button name', async () => {
      const saga = setup()
      saga.dispatch(
        triggerReportNavigationItemButtonClicked({
          buttonName: 'Custom button name',
          buttonClickedFrom: 'account_menu_list'
        })
      )

      await waitFor(() => {
        expect(mockAnalytics).toBeCalledWith('segmentTestKey')
        expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
        expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
          'Button Clicked',
          reportedNavigationItemButtonClicked
        )
      })
    })
    it('waits for the init trigger if Segment is not yet initialised', async () => {
      const saga = setup({
        client: { analytics: { data: { isInitialised: false } } }
      })
      saga.dispatch(
        triggerReportNavigationItemButtonClicked({
          buttonName: 'Custom button name',
          buttonClickedFrom: 'account_menu_list'
        })
      )
      saga.dispatch(triggerEmitIsSegmentInitialised())

      await waitFor(() =>
        expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      )
    })
  })
})
