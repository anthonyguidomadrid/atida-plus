import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  customerCheckFailure,
  customerCheckFulfill,
  customerCheckSuccess,
  customerCheckTrigger
} from '../../slices'
import { RootState } from '../../../redux'
import { customerCheckSaga } from '../customer-check'
import type { DeepPartial } from '@reduxjs/toolkit'

describe('account/customer-check saga', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester({
      initialState,
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    saga.start(customerCheckSaga)

    return saga
  }

  describe('when customer-check is triggered', () => {
    it('successfully retrieves the email and dispatches success and fulfill actions', async () => {
      ;(axios.get as jest.Mock).mockResolvedValue({
        data: { email: 'someEmail@test.com', exists: false }
      })

      const saga = setup()
      saga.dispatch(customerCheckTrigger({ email: 'someEmail@test.com' }))
      await saga.waitFor(customerCheckFulfill().type)

      expect(axios.get).toHaveBeenCalledWith('/api/account/customer-check', {
        params: { email: 'someEmail@test.com' }
      })

      expect(saga.getCalledActions()).toContainEqual(
        customerCheckSuccess({ email: 'someEmail@test.com', exists: false })
      )
    })

    describe('and the request fails', () => {
      it('dispatches the failure action', async () => {
        ;(axios.get as jest.Mock).mockRejectedValue({
          response: {
            status: 401,
            data: {
              name: 'UnknownError',
              message: 'Some unknown error'
            }
          }
        })

        const saga = setup()
        saga.dispatch(customerCheckTrigger({ email: 'someEmail@test.com' }))
        await saga.waitFor(customerCheckFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          customerCheckFailure({
            message: 'Some unknown error'
          })
        )
      })

      it('dispatches the failure action with multiple errors', async () => {
        ;(axios.get as jest.Mock).mockRejectedValue({
          response: {
            status: 401,
            data: {
              name: 'UnknownError',
              message: ['Some error', 'Another error', 'Third error']
            }
          }
        })

        const saga = setup()
        saga.dispatch(customerCheckTrigger({ email: 'someEmail@test.com' }))
        await saga.waitFor(customerCheckFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          customerCheckFailure({
            message: 'Some error'
          })
        )
      })
    })
  })
})
