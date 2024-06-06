/**
 * @jest-environment node
 */
import axios from 'axios'
import { createClient } from '~helpers'
import getConfig from 'next/config'
import { socialVerify } from '../verify'
import {
  socialVerifyGooglePayload,
  socialVerifyApplePayload,
  socialVerifyFacebookPayload
} from '~domains/social/__mocks__/social-verify'
import {
  sprykerVerifiedToken,
  verifiedToken
} from '~domains/account/__mocks__/token'
import { SocialLoginAndSignUpServiceTypes } from '~components/atoms/SocialLoginAndSignUp'

describe(socialVerify, () => {
  const { serverRuntimeConfig } = getConfig()
  const locale = 'pt-pt'
  const addAnonymousCustomerUniqueId = 'some-unique-id'

  beforeEach(() => {
    ;(axios.post as jest.Mock).mockResolvedValue({ data: sprykerVerifiedToken })
  })

  it('creates the client & requests spryker the new tokens - Facebook', async () => {
    await socialVerify(
      locale,
      socialVerifyFacebookPayload,
      addAnonymousCustomerUniqueId
    )
    expect(createClient).toHaveBeenCalledWith({
      locale,
      addAnonymousCustomerUniqueId,
      options: {
        baseURL: serverRuntimeConfig.ecommerceHost[locale]
      }
    })
    expect(axios.post).toHaveBeenCalledWith('oauth-verification-facebook', {
      data: {
        type: 'oauth-verification-facebook',
        attributes: {
          password: 'P@ssword',
          accessToken: 'some accesToken',
          expiresIn: 1,
          redirectUri: 'someRedirectUri'
        }
      }
    })
  })

  it('creates the client & requests spryker the new tokens - Google', async () => {
    await socialVerify(
      locale,
      socialVerifyGooglePayload,
      addAnonymousCustomerUniqueId
    )
    expect(createClient).toHaveBeenCalledWith({
      locale,
      addAnonymousCustomerUniqueId,
      options: {
        baseURL: serverRuntimeConfig.ecommerceHost[locale]
      }
    })
    expect(axios.post).toHaveBeenCalledWith('oauth-verification-google', {
      data: {
        type: 'oauth-verification-google',
        attributes: {
          password: 'P@ssword',
          accessToken: 'some accesToken',
          expiresIn: 1,
          redirectUri: 'someRedirectUri'
        }
      }
    })
  })

  it('creates the client & requests spryker the new tokens - Apple', async () => {
    await socialVerify(
      locale,
      socialVerifyApplePayload,
      addAnonymousCustomerUniqueId
    )
    expect(createClient).toHaveBeenCalledWith({
      locale,
      addAnonymousCustomerUniqueId,
      options: {
        baseURL: serverRuntimeConfig.ecommerceHost[locale]
      }
    })
    expect(axios.post).toHaveBeenCalledWith('oauth-verification-apple', {
      data: {
        type: 'oauth-verification-apple',
        attributes: {
          password: 'P@ssword',
          refreshToken: 'some refreshToken',
          redirectUri: 'someRedirectUri'
        }
      }
    })
  })

  it('returns the normalized response', async () => {
    const verifyResponse = await socialVerify(
      'es-es',
      {
        password: 'P@ssword',
        accessToken: 'someAccesToken',
        expiresIn: 1,
        redirectUri: 'someRedirectUri',
        serviceType: 'google' as SocialLoginAndSignUpServiceTypes
      },
      'some-unique-id'
    )

    expect(verifyResponse).toEqual(verifiedToken)
  })
})
