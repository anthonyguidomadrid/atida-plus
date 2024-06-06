import SagaTester from 'redux-saga-tester'
import Analytics from 'analytics-node'
import {
  triggerEmitIsSegmentInitialised,
  triggerReportSocialLoginAttempted
} from '~domains/analytics/actions'
import { RootState } from '~domains/redux'
import type { DeepPartial } from '@reduxjs/toolkit'
import { waitFor } from '@testing-library/react'
import { reportSocialLoginAttempted } from '../report-social-login-attempted'

jest.mock('analytics-node')
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>

describe('analytics/report social login attempted', () => {
  const setup = (
    testCaseState = { client: { analytics: { data: { isInitialised: true } } } }
  ): SagaTester<DeepPartial<RootState>> => {
    global.analytics = (new Analytics(
      'segmentTestKey'
    ) as unknown) as SegmentAnalytics.AnalyticsJS
    const saga = new SagaTester({ initialState: testCaseState })

    saga.start(reportSocialLoginAttempted)
    return saga
  }

  describe('when reportSocialLoginAttempted is triggered', () => {
    it('calls Segment analytics once with expected payload - google', async () => {
      const saga = setup()
      saga.dispatch(
        triggerReportSocialLoginAttempted({
          social_platform: 'google',
          clickedFrom: 'account_menu_list'
        })
      )
      await waitFor(() => {
        expect(mockAnalytics).toBeCalledWith('segmentTestKey')
        expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
        expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
          'Social Login Attempted',
          {
            social_platform: 'google',
            button_clicked_from: 'account_menu_list'
          }
        )
      })
    })
    it('calls Segment analytics once with expected payload - facebook', async () => {
      const saga = setup()
      saga.dispatch(
        triggerReportSocialLoginAttempted({
          social_platform: 'facebook',
          clickedFrom: 'account_menu_list'
        })
      )
      await waitFor(() => {
        expect(mockAnalytics).toBeCalledWith('segmentTestKey')
        expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
        expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
          'Social Login Attempted',
          {
            social_platform: 'facebook',
            button_clicked_from: 'account_menu_list'
          }
        )
      })
    })
    it('calls Segment analytics once with expected payload - apple', async () => {
      const saga = setup()
      saga.dispatch(
        triggerReportSocialLoginAttempted({
          social_platform: 'apple',
          clickedFrom: 'account_menu_list'
        })
      )
      await waitFor(() => {
        expect(mockAnalytics).toBeCalledWith('segmentTestKey')
        expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
        expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
          'Social Login Attempted',
          {
            social_platform: 'apple',
            button_clicked_from: 'account_menu_list'
          }
        )
      })
    })
    it('waits for the init trigger if Segment is not yet initialised', async () => {
      const saga = setup({
        client: { analytics: { data: { isInitialised: false } } }
      })
      saga.dispatch(
        triggerReportSocialLoginAttempted({
          social_platform: 'google',
          clickedFrom: 'account_menu_list'
        })
      )
      saga.dispatch(triggerEmitIsSegmentInitialised())
      await waitFor(() =>
        expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      )
    })
  })
})
