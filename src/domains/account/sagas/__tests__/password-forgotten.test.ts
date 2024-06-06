import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  passwordForgottenFailure,
  passwordForgottenFulfill,
  passwordForgottenSuccess,
  passwordForgottenTrigger
} from '~domains/account/slices'
import { RootState } from '~domains/redux'
import { passwordForgottenSaga } from '../password-forgotten'

describe('account/password-forgotten saga', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester({
      initialState,
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    saga.start(passwordForgottenSaga)

    return saga
  }

  describe('when password forgotten is triggered', () => {
    const creds = {
      email: 'some@email.com'
    }

    it('successfully calls the api and dispatches success and fulfill actions', async () => {
      const saga = setup()
      saga.dispatch(passwordForgottenTrigger(creds))
      await saga.waitFor(passwordForgottenFulfill().type)

      expect(axios.post).toHaveBeenCalledWith(
        '/api/account/password-forgotten',
        creds
      )
      expect(saga.getCalledActions()).toContainEqual(
        passwordForgottenSuccess({
          email: 'some@email.com'
        })
      )
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
        saga.dispatch(passwordForgottenTrigger(creds))
        await saga.waitFor(passwordForgottenFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          passwordForgottenFailure({
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
        saga.dispatch(passwordForgottenTrigger(creds))
        await saga.waitFor(passwordForgottenFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          passwordForgottenFailure({
            message: 'Some unknown error'
          })
        )
      })
    })
  })
})
