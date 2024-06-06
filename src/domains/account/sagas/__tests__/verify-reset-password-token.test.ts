import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  verifyResetPasswordTokenFailure,
  verifyResetPasswordTokenFulfill,
  verifyResetPasswordTokenTrigger
} from '~domains/account/slices'
import { RootState } from '~domains/redux'
import { verifyResetPasswordTokenSaga } from '../verify-reset-password-token'
import { verifyToken } from '../../__mocks__/verify-reset-token'
import type { DeepPartial } from '@reduxjs/toolkit'

describe('api/account/verify-reset-password-token saga', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester({
      initialState,
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    saga.start(verifyResetPasswordTokenSaga)
    return saga
  }

  describe('when verify reset password token is triggered', () => {
    const creds = {
      resetPasswordToken: verifyToken.data.id
    }

    it('successfully calls the api and dispatches fulfill action', async () => {
      ;(axios.get as jest.Mock).mockResolvedValue(verifyToken)

      const saga = setup()
      saga.dispatch(verifyResetPasswordTokenTrigger(creds))
      await saga.waitFor(verifyResetPasswordTokenFulfill().type)

      expect(saga.getCalledActions()).toContainEqual(
        verifyResetPasswordTokenFulfill()
      )
    })

    describe('and request fails', () => {
      it('calls the api then dispatches failure action', async () => {
        ;(axios.get as jest.Mock).mockRejectedValue({
          response: {
            status: 500,
            data: {
              message: 'Unknown error'
            }
          }
        })

        const saga = setup()
        saga.dispatch(verifyResetPasswordTokenTrigger(creds))
        await saga.waitFor(verifyResetPasswordTokenFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          verifyResetPasswordTokenFailure({
            message: 'Unknown error',
            status: 500
          })
        )

        expect(saga.getCalledActions()).toContainEqual(
          verifyResetPasswordTokenFulfill()
        )
      })

      it('and request fails with multiple error messages', async () => {
        ;(axios.get as jest.Mock).mockRejectedValue({
          response: {
            status: 500,
            data: {
              message: ['Unknown error', 'Some other message']
            }
          }
        })

        const saga = setup()
        saga.dispatch(verifyResetPasswordTokenTrigger(creds))
        await saga.waitFor(verifyResetPasswordTokenFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          verifyResetPasswordTokenFailure({
            message: 'Unknown error',
            status: 500
          })
        )
        expect(saga.getCalledActions()).toContainEqual(
          verifyResetPasswordTokenFulfill()
        )
      })
    })
  })
})
