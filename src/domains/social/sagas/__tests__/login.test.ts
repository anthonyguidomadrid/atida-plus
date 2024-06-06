import { ACCOUNT_TYPE_PERSONAL } from './../../../../config/constants/account-types'
import type { DeepPartial } from '@reduxjs/toolkit'
import axios from 'axios'
import SagaTester from 'redux-saga-tester'
import {
  socialLoginFailure,
  socialLoginFulfill,
  socialLoginSuccess,
  socialLoginTrigger
} from '~domains/social'
import { RootState } from '~domains/redux'
import { createClient } from '~helpers'
import { socialLoginSaga } from '~domains/social/sagas/login'
import { socialLoginGooglePayload } from '~domains/social/__mocks__/social-login'
import {
  triggerReportAccountCreatedAttempted,
  triggerReportEmailSubscription,
  triggerReportIdentifyUser,
  triggerReportUserInteraction
} from '~domains/analytics'
import {
  getCustomerSuccess,
  getCustomerTrigger,
  readCustomer,
  triggerReadCustomer,
  triggerShowCustomerNotification
} from '~domains/account'
import {
  nonVerifiedToken,
  verifiedToken,
  token
} from '~domains/account/__mocks__/token'

describe(socialLoginSaga, () => {
  const setup = (
    initialState = {},
    email: string | undefined = undefined,
    reference: string | undefined = undefined
  ): SagaTester<DeepPartial<RootState>> => {
    const saga = new SagaTester({
      initialState: {
        ...initialState,
        client: {
          account: {
            customer: {
              reference,
              details: { email }
            }
          }
        }
      },
      options: {
        context: {
          locale: 'cimode'
        }
      }
    })
    saga.start(socialLoginSaga)

    return saga
  }

  describe('when socialLogin is triggered', () => {
    describe('and request succeeds', () => {
      it('calls the api then dispatches success and fulfill actions - Verified account - Without timeout', async () => {
        ;(axios.post as jest.Mock).mockResolvedValue({
          data: verifiedToken
        })
        const saga = setup({}, 'some@email.com', 'some-reference')
        saga.dispatch(
          socialLoginTrigger({
            ...socialLoginGooglePayload
          })
        )
        await saga.waitFor(triggerReadCustomer().type)
        saga.dispatch(
          readCustomer({
            hasPreviousSuccessfulOrder: false,
            reference: 'some-reference'
          })
        )
        await saga.waitFor(
          getCustomerTrigger({ customerReference: 'some-reference' }).type
        )
        saga.dispatch(
          getCustomerSuccess({
            salutation: null,
            firstName: 'Test',
            lastName: 'McTest',
            email: 'some@email.com',
            emailNotification: false,
            taxReference: null,
            company: null,
            accountType: 'Personal',
            surcharge: null,
            receivePersonalRecommendations: true,
            receivePinnedProductsNotifications: false,
            hasPreviousSuccessfulOrder: false
          })
        )
        await saga.waitFor(socialLoginFulfill().type)

        expect(createClient).toHaveBeenCalledWith({
          addAnonymousCustomerUniqueId: true,
          locale: 'cimode'
        })
        expect(axios.post).toHaveBeenCalledWith(
          '/api/social/login',
          socialLoginGooglePayload
        )

        expect(saga.getCalledActions()).toContainEqual(socialLoginSuccess())
        expect(saga.getCalledActions()).not.toContainEqual(
          triggerShowCustomerNotification()
        )
        expect(saga.getCalledActions()).toContainEqual(
          triggerReportIdentifyUser({ email: 'some@email.com' })
        )
        expect(saga.getCalledActions()).toContainEqual(
          triggerReportUserInteraction({
            event: 'Signed In',
            is_social: true,
            social_platform: 'google'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(socialLoginFulfill())
      })
      it('calls the api then dispatches success and fulfill actions - Verified account - With timeout', async () => {
        ;(axios.post as jest.Mock).mockResolvedValue({
          data: verifiedToken
        })
        const saga = setup()
        saga.dispatch(
          socialLoginTrigger({
            ...socialLoginGooglePayload
          })
        )
        await saga.waitFor(socialLoginFulfill().type)

        expect(createClient).toHaveBeenCalledWith({
          addAnonymousCustomerUniqueId: true,
          locale: 'cimode'
        })
        expect(axios.post).toHaveBeenCalledWith(
          '/api/social/login',
          socialLoginGooglePayload
        )

        expect(saga.getCalledActions()).toContainEqual(socialLoginSuccess())
        expect(saga.getCalledActions()).not.toContainEqual(
          triggerShowCustomerNotification()
        )
        expect(saga.getCalledActions()).toContainEqual(
          triggerReportUserInteraction({
            event: 'Signed In',
            is_social: true,
            social_platform: 'google'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(socialLoginFulfill())
      }, 20000)
      it('calls the api then dispatches success and fulfill actions - No Verified account', async () => {
        ;(axios.post as jest.Mock).mockResolvedValue({
          data: nonVerifiedToken
        })
        const saga = setup({}, 'some@email.com', 'some-reference')
        saga.dispatch(
          socialLoginTrigger({
            ...socialLoginGooglePayload
          })
        )
        await saga.waitFor(socialLoginFulfill().type)

        expect(createClient).toHaveBeenCalledWith({
          addAnonymousCustomerUniqueId: true,
          locale: 'cimode'
        })
        expect(axios.post).toHaveBeenCalledWith(
          '/api/social/login',
          socialLoginGooglePayload
        )

        expect(saga.getCalledActions()).toContainEqual(
          socialLoginSuccess({
            accessToken: 'socialAccessToken',
            refreshToken: 'some-refresh-token',
            expiresIn: 423423,
            messages: [{}],
            social: {
              isNew: false,
              needsVerification: true,
              email: 'someEmail@email.com',
              firstName: 'name'
            },
            redirectUri: 'somehost.com/SomeRedirectUri',
            serviceType: 'Google'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(socialLoginFulfill())
      })
      it('calls the api then dispatches success and fulfill actions - New account - Without timeout', async () => {
        ;(axios.post as jest.Mock).mockResolvedValue({ data: token })
        const saga = setup({}, 'some@email.com', 'some-reference')
        saga.dispatch(
          socialLoginTrigger({
            ...socialLoginGooglePayload
          })
        )
        await saga.waitFor(triggerReadCustomer().type)
        saga.dispatch(
          readCustomer({
            hasPreviousSuccessfulOrder: false,
            reference: 'some-reference'
          })
        )
        await saga.waitFor(
          getCustomerTrigger({ customerReference: 'some-reference' }).type
        )
        saga.dispatch(
          getCustomerSuccess({
            salutation: null,
            firstName: 'Test',
            lastName: 'McTest',
            email: 'some@email.com',
            emailNotification: false,
            taxReference: null,
            company: null,
            accountType: 'Personal',
            surcharge: null,
            receivePersonalRecommendations: true,
            receivePinnedProductsNotifications: false,
            hasPreviousSuccessfulOrder: false
          })
        )
        await saga.waitFor(socialLoginFulfill().type)

        expect(createClient).toHaveBeenCalledWith({
          addAnonymousCustomerUniqueId: true,
          locale: 'cimode'
        })
        expect(axios.post).toHaveBeenCalledWith(
          '/api/social/login',
          socialLoginGooglePayload
        )

        expect(saga.getCalledActions()).toContainEqual(socialLoginSuccess())
        expect(saga.getCalledActions()).toContainEqual(
          triggerShowCustomerNotification()
        )
        expect(saga.getCalledActions()).toContainEqual(
          triggerReportAccountCreatedAttempted({
            is_social: true,
            social_platform: 'google',
            account_type: ACCOUNT_TYPE_PERSONAL
          })
        )
        expect(saga.getCalledActions()).toContainEqual(
          triggerReportIdentifyUser({ email: 'some@email.com' })
        )
        expect(saga.getCalledActions()).toContainEqual(
          triggerReportEmailSubscription({
            email: 'some@email.com',
            subscribed_from: 'account_creation',
            email_list: 'newsletter'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(
          triggerReportUserInteraction({
            event: 'Account Created',
            is_social: true,
            social_platform: 'google',
            account_type: ACCOUNT_TYPE_PERSONAL
          })
        )
        expect(saga.getCalledActions()).toContainEqual(socialLoginFulfill())
      })
      it('calls the api then dispatches success and fulfill actions - New account - With timeout', async () => {
        ;(axios.post as jest.Mock).mockResolvedValue({ data: token })
        const saga = setup()
        saga.dispatch(
          socialLoginTrigger({
            ...socialLoginGooglePayload
          })
        )
        await saga.waitFor(socialLoginFulfill().type)

        expect(createClient).toHaveBeenCalledWith({
          addAnonymousCustomerUniqueId: true,
          locale: 'cimode'
        })
        expect(axios.post).toHaveBeenCalledWith(
          '/api/social/login',
          socialLoginGooglePayload
        )

        expect(saga.getCalledActions()).toContainEqual(socialLoginSuccess())
        expect(saga.getCalledActions()).toContainEqual(
          triggerShowCustomerNotification()
        )

        expect(saga.getCalledActions()).toContainEqual(
          triggerReportAccountCreatedAttempted({
            is_social: true,
            social_platform: 'google',
            account_type: ACCOUNT_TYPE_PERSONAL
          })
        )
        expect(saga.getCalledActions()).toContainEqual(
          triggerReportUserInteraction({
            event: 'Account Created',
            is_social: true,
            social_platform: 'google',
            account_type: ACCOUNT_TYPE_PERSONAL
          })
        )
        expect(saga.getCalledActions()).toContainEqual(socialLoginFulfill())
      }, 20000)
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

        const saga = setup({}, 'some@email.com', 'some-reference')
        saga.dispatch(
          socialLoginTrigger({
            ...socialLoginGooglePayload
          })
        )
        await saga.waitFor(socialLoginFulfill().type)

        expect(saga.getCalledActions()).toContainEqual(
          socialLoginFailure({
            message: 'Some unknown error'
          })
        )
        expect(saga.getCalledActions()).toContainEqual(socialLoginFulfill())
      })
    })
  })
})
