import axios from 'axios'
import SagaTester from 'redux-saga-tester'
// @ts-ignore
import {
  clearDataCustomer,
  logoutFailure,
  logoutFulfill,
  logoutSuccess,
  logoutTrigger
} from '../../slices'
import { RootState } from '../../../redux'
import { logoutSaga } from '../logout'
import type { DeepPartial } from '@reduxjs/toolkit'
import { cookieStorageMechanism, defaultStorageMechanism } from '~helpers'
import { triggerReportUserInteraction } from '~domains/analytics'

describe('account/logout saga', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester({
      initialState,
      options: {
        context: {
          locale: 'cimode',
          storageMechanism: defaultStorageMechanism(),
          cookieMechanism: cookieStorageMechanism()
        }
      }
    })
    saga.start(logoutSaga)

    return saga
  }

  describe('when logout is triggered', () => {
    it('successfully calls the api and dispatches success and fulfill actions', async () => {
      const saga = setup()
      saga.dispatch(logoutTrigger())
      await saga.waitFor(logoutFulfill().type)

      expect(axios.post).toHaveBeenCalledWith('/api/account/logout')
      expect(saga.getCalledActions()).toContainEqual(logoutSuccess())
      expect(saga.getCalledActions()).toContainEqual(
        triggerReportUserInteraction({
          event: 'Signed Out'
        })
      )
      expect(cookieStorageMechanism().remove).toBeCalled()
      expect(defaultStorageMechanism()?.remove).toBeCalled()
      expect(saga.getCalledActions()).toContainEqual(clearDataCustomer())
    })

    describe('and the request fails', () => {
      it('dispatches the failure action', async () => {
        ;(axios.post as jest.Mock).mockRejectedValue({
          response: {
            status: 401,
            data: {
              name: 'UnknownError',
              message: 'Some unknown error'
            }
          }
        })

        const saga = setup()
        saga.dispatch(logoutTrigger())
        await saga.waitFor(logoutFulfill().type)

        expect(cookieStorageMechanism().remove).not.toBeCalled()
        expect(defaultStorageMechanism()?.remove).not.toBeCalled()

        expect(saga.getCalledActions()).toContainEqual(
          logoutFailure({
            message: 'Some unknown error'
          })
        )
      })

      it('dispatch the failure action with multiple errors', async () => {
        ;(axios.post as jest.Mock).mockRejectedValue({
          response: {
            status: 401,
            data: {
              name: 'UnknownError',
              message: [
                'Some unknown error',
                'Another unknown error',
                'Third unknown error'
              ]
            }
          }
        })

        const saga = setup()
        saga.dispatch(logoutTrigger())
        await saga.waitFor(logoutFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          logoutFailure({
            message: 'Some unknown error'
          })
        )
      })
    })
  })
})
