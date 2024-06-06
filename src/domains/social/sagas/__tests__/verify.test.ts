import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  socialLoginResetDetails,
  socialVerifyFailure,
  socialVerifyFulfill,
  socialVerifySuccess,
  socialVerifyTrigger
} from '~domains/social'
import { RootState } from '~domains/redux'
import { createClient } from '~helpers'
import { socialVerifySaga } from '~domains/social/sagas/verify'
import { socialVerifyGooglePayload } from '~domains/social/__mocks__/social-verify'
import { triggerReadCustomer } from '~domains/account'
import { token } from '~domains/account/__mocks__/token'
import { resetBasket } from '~domains/basket'

describe(socialVerifySaga, () => {
  const setup = (initialState = {}): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester({
      initialState: {
        ...initialState,
        client: {
          account: { customer: { details: { email: 'test@email.com' } } }
        }
      },
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    saga.start(socialVerifySaga)

    return saga
  }

  describe('when socialVerify is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions', async () => {
        ;(axios.post as jest.Mock).mockResolvedValue({
          data: token
        })
        const saga = setup()
        saga.dispatch(socialVerifyTrigger(socialVerifyGooglePayload))
        await saga.waitFor(socialVerifyFulfill().type)

        expect(createClient).toHaveBeenCalledWith({
          addAnonymousCustomerUniqueId: true,
          locale: 'cimode'
        })
        expect(axios.post).toHaveBeenCalledWith(
          '/api/social/verify',
          socialVerifyGooglePayload
        )

        expect(saga.getCalledActions()).toContainEqual(socialVerifySuccess())
        expect(saga.getCalledActions()).toContainEqual(
          socialLoginResetDetails()
        )
        expect(saga.getCalledActions()).toContainEqual(resetBasket())
        expect(saga.getCalledActions()).toContainEqual(triggerReadCustomer())
        expect(saga.getCalledActions()).toContainEqual(socialVerifyFulfill())
      })
    })

    describe('and request fails', () => {
      it('calls the api then dispatches failure action', async () => {
        ;(axios.post as jest.Mock).mockRejectedValue({
          response: {
            status: 500,
            data: {
              name: 'UnknownError',
              message: 'Some unknown error'
            }
          }
        })

        const saga = setup()
        saga.dispatch(socialVerifyTrigger(socialVerifyGooglePayload))
        await saga.waitFor(socialVerifyFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          socialVerifyFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(socialVerifyFulfill())
      })
    })
  })
})
