import SagaTester from 'redux-saga-tester'
import Analytics from 'analytics-node'
import { triggerReportIdentifyUser } from '~domains/analytics/actions'
import { reportIdentifyUserSaga } from '../report-identify-user'
import { RootState } from '~domains/redux'
import { getCustomerFulfill } from '~domains/account'
import type { DeepPartial } from '@reduxjs/toolkit'

jest.mock('analytics-node')
const mockAnalytics = Analytics as jest.MockedClass<typeof Analytics>

describe('analytics/report identify user saga', () => {
  const setup = (testCaseState = {}): SagaTester<DeepPartial<RootState>> => {
    global.analytics = (new Analytics(
      'segmentTestKey'
    ) as unknown) as SegmentAnalytics.AnalyticsJS
    const saga = new SagaTester({
      initialState: {
        client: {
          account: {
            customer: {
              reference: 'PT--8888',
              details: {
                email: ' pt@Atida.pt'
              }
            }
          }
        }
      },
      ...testCaseState
    })

    saga.start(reportIdentifyUserSaga)
    return saga
  }

  describe('when reportIdentifyUser is triggered', () => {
    it('calls Segment analytics once with expected payload', async () => {
      const saga = setup({})
      saga.dispatch(triggerReportIdentifyUser({ email: ' test@atida.com' }))
      saga.dispatch(getCustomerFulfill())

      expect(mockAnalytics).toBeCalledWith('segmentTestKey')
      expect(mockAnalytics.mock.instances[0].identify).toHaveBeenCalledTimes(1)
      expect(mockAnalytics.mock.instances[0].identify).toBeCalledWith(
        'PT--8888',
        {
          email: ' test@atida.com',
          email_hash:
            '0fcf66d502baa32467e3410094d916e528b446a515f5b7f652e46f31ad905ed8'
        },
        expect.any(Function)
      )
    })
  })
})
