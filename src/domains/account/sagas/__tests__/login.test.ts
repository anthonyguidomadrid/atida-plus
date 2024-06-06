import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import Router from 'next/router'
// @ts-ignore
import { defaultStorageMechanism } from '~helpers'
import {
  loginClearError,
  loginClearNotification,
  loginFailure,
  loginFulfill,
  loginSetEmail,
  loginSuccess,
  loginTrigger,
  orderDetailsResetState,
  triggerReadCustomer
} from '~domains/account/slices'
import { token } from '~domains/account/__mocks__/token'
import { RootState } from '~domains/redux'
import { loginSaga } from '../login'
import { resetBasket } from '~domains/basket'
import { DEFAULT_LOGIN_REDIRECT } from '~config/constants/default-redirects'
import type { DeepPartial } from '@reduxjs/toolkit'
import { addFavouritesFulfill } from '~domains/favourites'
import {
  createMultiplePaymentsResetState,
  createOrderResetState,
  createPaymentMethodClearDetails,
  getOrderResetState,
  mbWayPaymentClearDetails,
  sibsMultibancoPaymentClearDetails
} from '~domains/checkout'
import { socialLoginResetErrors } from '~domains/social'
import { triggerReportUserInteraction } from '~domains/analytics'

jest.mock('../../helpers/is-token-expired')

describe('account/login saga', () => {
  const setup = (
    initialState = {},
    isLoading: boolean
  ): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester<DeepPartial<RootState>>({
      initialState: {
        ...initialState,
        client: {
          favourites: {
            add: {
              isLoading: isLoading,
              wasSuccess: false,
              wasError: false,
              items: []
            }
          }
        }
      },
      options: {
        context: {
          locale: 'cimode',
          storageMechanism: defaultStorageMechanism()
        }
      }
    })
    saga.start(loginSaga)

    return saga
  }

  describe('when login is triggered', () => {
    const creds = {
      email: 'harry.potter@hogwarts.ac.uk',
      password: 'i-love-magic'
    }

    describe('and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions', async () => {
        ;(axios.post as jest.Mock).mockResolvedValue({ data: token })
        const saga = setup({}, false)
        saga.dispatch(loginTrigger({ ...creds, redirect: '/confirmation/' }))
        await saga.waitFor(loginFulfill().type)

        expect(axios.post).toHaveBeenCalledWith('/api/account/login', creds)
        expect(saga.getCalledActions()).toContainEqual(
          loginSetEmail({ email: creds.email })
        )
        expect(saga.getCalledActions()).toContainEqual(loginSuccess([{}]))
        expect(saga.getCalledActions()).toContainEqual(socialLoginResetErrors())
        expect(saga.getCalledActions()).toContainEqual(loginClearNotification())
        expect(saga.getCalledActions()).toContainEqual(loginClearError())
        expect(saga.getCalledActions()).toContainEqual(resetBasket())
        expect(saga.getCalledActions()).toContainEqual(triggerReadCustomer())
        expect(saga.getCalledActions()).toContainEqual(
          createPaymentMethodClearDetails()
        )
        expect(saga.getCalledActions()).toContainEqual(
          mbWayPaymentClearDetails()
        )
        expect(saga.getCalledActions()).toContainEqual(
          sibsMultibancoPaymentClearDetails()
        )
        expect(saga.getCalledActions()).toContainEqual(
          createMultiplePaymentsResetState()
        )
        expect(saga.getCalledActions()).toContainEqual(createOrderResetState())
        expect(saga.getCalledActions()).toContainEqual(getOrderResetState())
        expect(saga.getCalledActions()).toContainEqual(orderDetailsResetState())
        expect(saga.getCalledActions()).toContainEqual(
          triggerReportUserInteraction({ event: 'Signed In' })
        )
      })

      it('performs a redirect if a redirect present', async () => {
        ;(axios.post as jest.Mock).mockResolvedValue({
          data: token
        })
        const saga = setup({}, false)
        saga.dispatch(loginTrigger({ ...creds, redirect: '/some-page' }))
        await saga.waitFor(loginFulfill().type)

        expect(axios.post).toHaveBeenCalledWith('/api/account/login', creds)

        expect(saga.getCalledActions()).toContainEqual(loginSuccess([{}]))
        expect(Router.push).toHaveBeenCalledWith({
          pathname: '/some-page',
          query: {}
        })
      })

      it('performs a redirect if a redirect present with query string', async () => {
        ;(axios.post as jest.Mock).mockResolvedValue({
          data: token
        })
        const saga = setup({}, false)
        saga.dispatch(
          loginTrigger({ ...creds, redirect: '/some-page?key=val' })
        )
        await saga.waitFor(loginFulfill().type)

        expect(axios.post).toHaveBeenCalledWith('/api/account/login', creds)

        expect(saga.getCalledActions()).toContainEqual(loginSuccess([{}]))
        expect(Router.push).toHaveBeenCalledWith({
          pathname: '/some-page',
          query: {
            key: 'val'
          }
        })
      })

      it('performs a default redirect if no redirect present', async () => {
        ;(axios.post as jest.Mock).mockResolvedValue({
          data: token
        })
        const saga = setup({}, false)
        saga.dispatch(loginTrigger({ ...creds, redirect: undefined }))
        await saga.waitFor(loginFulfill().type)

        expect(axios.post).toHaveBeenCalledWith('/api/account/login', creds)

        expect(saga.getCalledActions()).toContainEqual(loginSuccess([{}]))
        expect(Router.push).toHaveBeenCalledWith(DEFAULT_LOGIN_REDIRECT)
      })
      it('sets to false the addfavourites isLoading state if its true', async () => {
        ;(axios.post as jest.Mock).mockResolvedValue({
          data: token
        })
        const saga = setup({}, true)
        saga.dispatch(loginTrigger({ ...creds, redirect: '/some-page' }))
        await saga.waitFor(loginFulfill().type)

        expect(axios.post).toHaveBeenCalledWith('/api/account/login', creds)

        expect(saga.getCalledActions()).toContainEqual(loginSuccess([{}]))
        expect(saga.getCalledActions()).toContainEqual(addFavouritesFulfill())
        expect(Router.push).toHaveBeenCalledWith({
          pathname: '/some-page',
          query: {}
        })
      })
    })

    describe('and request fails', () => {
      it('calls the api then dispatches failure action', async () => {
        ;(axios.post as jest.Mock).mockRejectedValue({
          response: {
            status: 401,
            data: {
              name: 'UnknownError',
              message: 'Some unknown error'
            }
          }
        })

        const saga = setup({}, false)
        saga.dispatch(loginTrigger(creds))
        await saga.waitFor(loginFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          loginFailure({
            message: 'Some unknown error'
          })
        )
      })
    })

    describe('and request fails with multiple error messages', () => {
      it('calls the api then dispatches failure action', async () => {
        ;(axios.post as jest.Mock).mockRejectedValue({
          response: {
            status: 401,
            data: {
              name: 'UnknownError',
              message: [
                'Some unknown error',
                'Some other unknown error',
                'And some unknown error'
              ]
            }
          }
        })

        const saga = setup({}, false)
        saga.dispatch(loginTrigger(creds))
        await saga.waitFor(loginFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          loginFailure({
            message: 'Some unknown error'
          })
        )
      })
    })
  })
})
