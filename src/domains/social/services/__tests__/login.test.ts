/**
 * @jest-environment node
 */
import axios from 'axios'
import { createClient } from '~helpers'
import getConfig from 'next/config'
import { socialLogin } from '../login'
import {
  socialLoginGooglePayload,
  socialLoginApplePayload,
  socialLoginFacebookPayload
} from '~domains/social/__mocks__/social-login'
import {
  sprykerVerifiedToken,
  sprykerNonVerifiedToken,
  verifiedToken,
  nonVerifiedToken
} from '~domains/account/__mocks__/token'

describe(socialLogin, () => {
  const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
  const locale = 'pt-pt'
  const addAnonymousCustomerUniqueId = 'some-unique-id'

  it('creates the client & passes the redirect uri to the spryker request - Facebook', async () => {
    ;(axios.post as jest.Mock).mockResolvedValue({ data: sprykerVerifiedToken })
    await socialLogin(
      locale,
      socialLoginFacebookPayload,
      addAnonymousCustomerUniqueId
    )
    expect(createClient).toHaveBeenCalledWith({
      locale,
      addAnonymousCustomerUniqueId,
      options: {
        baseURL: serverRuntimeConfig.ecommerceHost[locale]
      }
    })
    expect(axios.post).toHaveBeenCalledWith('oauth-facebook', {
      data: {
        type: 'oauth-facebook',
        attributes: {
          code: socialLoginFacebookPayload.code,
          redirectUri: `${publicRuntimeConfig.host}/${publicRuntimeConfig.socialAuthenticate.redirectUri}`
        }
      }
    })
  })

  it('creates the client & passes the redirect uri to the spryker request - Google', async () => {
    ;(axios.post as jest.Mock).mockResolvedValue({ data: sprykerVerifiedToken })
    await socialLogin(
      locale,
      socialLoginGooglePayload,
      addAnonymousCustomerUniqueId
    )
    expect(createClient).toHaveBeenCalledWith({
      locale,
      addAnonymousCustomerUniqueId,
      options: {
        baseURL: serverRuntimeConfig.ecommerceHost[locale]
      }
    })
    expect(axios.post).toHaveBeenCalledWith('oauth-google', {
      data: {
        type: 'oauth-google',
        attributes: {
          code: socialLoginGooglePayload.code,
          redirectUri: `${publicRuntimeConfig.host}/${publicRuntimeConfig.socialAuthenticate.redirectUri}`
        }
      }
    })
  })

  it('creates the client & passes the redirect uri to the spryker request - Apple', async () => {
    ;(axios.post as jest.Mock).mockResolvedValue({ data: sprykerVerifiedToken })
    await socialLogin(
      locale,
      socialLoginApplePayload,
      addAnonymousCustomerUniqueId
    )
    expect(createClient).toHaveBeenCalledWith({
      locale,
      addAnonymousCustomerUniqueId,
      options: {
        baseURL: serverRuntimeConfig.ecommerceHost[locale]
      }
    })
    expect(axios.post).toHaveBeenCalledWith('oauth-apple', {
      data: {
        type: 'oauth-apple',
        attributes: {
          code: socialLoginApplePayload.code,
          redirectUri: `${publicRuntimeConfig.host}/${publicRuntimeConfig.socialAuthenticate.redirectUri}`
        }
      }
    })
  })

  it('includes the first and last name if passed to spryker request - Apple', async () => {
    ;(axios.post as jest.Mock).mockResolvedValue({ data: sprykerVerifiedToken })
    await socialLogin(
      locale,
      {
        ...socialLoginApplePayload,
        firstName: 'first name',
        lastName: 'last name'
      },
      addAnonymousCustomerUniqueId
    )
    expect(axios.post).toHaveBeenCalledWith('oauth-apple', {
      data: {
        type: 'oauth-apple',
        attributes: {
          code: socialLoginApplePayload.code,
          redirectUri: `${publicRuntimeConfig.host}/${publicRuntimeConfig.socialAuthenticate.redirectUri}`,
          firstName: 'first name',
          lastName: 'last name'
        }
      }
    })
  })

  it('returns the normalized response - Verified token', async () => {
    ;(axios.post as jest.Mock).mockResolvedValue({ data: sprykerVerifiedToken })
    const loginResponse = await socialLogin(
      'es-es',
      {
        code: socialLoginGooglePayload.code,
        serviceType: socialLoginGooglePayload.serviceType
      },
      'some-unique-id'
    )

    expect(loginResponse).toEqual(verifiedToken)
  })

  it('returns the normalized response - Non verified token', async () => {
    ;(axios.post as jest.Mock).mockResolvedValue({
      data: sprykerNonVerifiedToken
    })
    const loginResponse = await socialLogin(
      'es-es',
      {
        code: socialLoginGooglePayload.code,
        serviceType: socialLoginGooglePayload.serviceType
      },
      'some-unique-id'
    )

    expect(loginResponse).toEqual(nonVerifiedToken)
  })
})
