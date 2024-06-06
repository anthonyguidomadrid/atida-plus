import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import Router from 'next/router'
import SagaTester from 'redux-saga-tester'
import {
  setNewPasswordFailure,
  setNewPasswordFulfill,
  setNewPasswordSuccess,
  setNewPasswordTrigger
} from '~domains/account/slices'
import { RootState } from '~domains/redux'
import { setNewPasswordSaga } from '../set-new-password'

describe('account/set-new-password saga', () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester({
      initialState,
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    saga.start(setNewPasswordSaga)
    return saga
  }

  describe('when set new password is triggered', () => {
    const creds = {
      restorePasswordKey: 'someKey',
      password: 'somePassword',
      confirmPassword: 'somePassword'
    }

    it('successfully calls the api and dispatches success and fulfill actions', async () => {
      const saga = setup()
      saga.dispatch(setNewPasswordTrigger(creds))
      await saga.waitFor(setNewPasswordFulfill().type)

      expect(axios.patch).toHaveBeenCalledWith(
        '/api/account/set-new-password',
        creds
      )
      expect(saga.getCalledActions()).toContainEqual(setNewPasswordSuccess())
    })

    describe('and request succeeds', () => {
      it('performs redirect if necessary', async () => {
        const saga = setup()
        saga.dispatch(
          setNewPasswordTrigger({ ...creds, redirect: '/some-page' })
        )
        await saga.waitFor(setNewPasswordFulfill().type)

        expect(axios.patch).toHaveBeenCalledWith(
          '/api/account/set-new-password',
          creds
        )
        expect(saga.getCalledActions()).toContainEqual(setNewPasswordSuccess())
        expect(Router.push).toHaveBeenCalledWith('/some-page')
      })
    })

    describe('the request fails', () => {
      it('calls the api and dispatches the failure action', async () => {
        ;(axios.patch as jest.Mock).mockRejectedValue({
          response: {
            status: 401,
            data: {
              name: 'UnknownError',
              message: 'Some unknown error'
            }
          }
        })

        const saga = setup()
        saga.dispatch(setNewPasswordTrigger(creds))
        await saga.waitFor(setNewPasswordFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          setNewPasswordFailure({
            message: 'Some unknown error'
          })
        )
      })

      it('calls the api and dispatches the failure action with multiple errors', async () => {
        ;(axios.patch as jest.Mock).mockRejectedValue({
          response: {
            status: 401,
            data: {
              name: 'UnknownError',
              message: [
                'Some unknown error',
                'Some other unknown error',
                'Third unknown error'
              ]
            }
          }
        })

        const saga = setup()
        saga.dispatch(setNewPasswordTrigger(creds))
        await saga.waitFor(setNewPasswordFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          setNewPasswordFailure({
            message: 'Some unknown error'
          })
        )
      })
    })
  })
})
