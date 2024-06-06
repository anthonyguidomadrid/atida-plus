import SagaTester from 'redux-saga-tester'
import Analytics from 'analytics-node'
import { triggerReportProductClicked } from '~domains/analytics/actions'
import { RootState } from '~domains/redux'
import {
  productClickedPayload,
  reportedProductClicked
} from '../../__mocks__/analytics'
import type { DeepPartial } from '@reduxjs/toolkit'
import { reportProductClickedSaga } from '../report-product-clicked'

jest.mock('analytics-node')
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>

describe('analytics/report product clicked', () => {
  const setup = (): SagaTester<DeepPartial<RootState>> => {
    global.analytics = (new Analytics(
      'segmentTestKey'
    ) as unknown) as SegmentAnalytics.AnalyticsJS
    const saga = new SagaTester()

    saga.start(reportProductClickedSaga)
    return saga
  }

  describe('when ProductClicked is triggered', () => {
    it('calls Segment analytics once with expected payload', async () => {
      const saga = setup()
      saga.dispatch(triggerReportProductClicked({ ...productClickedPayload }))

      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Product Clicked',
        reportedProductClicked
      )
    })
    it('calculates price if basket quantity is passed', async () => {
      const saga = setup()
      saga.dispatch(
        triggerReportProductClicked({
          ...productClickedPayload,
          basketQuantity: 2
        })
      )
      expect(mockAnalytics.mock.instances[0].track).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].track).toBeCalledWith(
        'Product Clicked',
        {
          ...reportedProductClicked,
          price: 44.44
        }
      )
    })
  })
})
