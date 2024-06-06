import getConfig from 'next/config'
import { buildQueryWithUrl } from './queryBuilder'
import { SOCIAL_LOGIN_SERVICE_TYPE } from '~config/constants/social-login-service-types'
import { cookieStorageMechanism } from './storage'
import { getSocialLoginName } from '~domains/account/helpers'
import { SocialLoginAndSignUpServiceTypes } from '~components/atoms/SocialLoginAndSignUp'
import { COOKIES_EXPIRATION_TIME } from '~config/constants/time'
import { getClientCookiesDomain } from './getClientCookiesDomain'
import { getUuidHash } from '~helpers/getHash'

const setSocialLoginCookie = (
  serviceType?: SocialLoginAndSignUpServiceTypes,
  locale?: string,
  actualRedirect?: string
) => {
  cookieStorageMechanism().set(
    getSocialLoginName(),
    JSON.stringify({
      ...(locale !== '' && { locale }),
      ...(actualRedirect !== '' && { actualRedirect }),
      serviceType,
      hash: getUuidHash(locale)
    }),
    {
      expires: new Date(Date.now() + COOKIES_EXPIRATION_TIME.fifteenMinutes),
      domain: getClientCookiesDomain(window?.location?.hostname)
    }
  )
}

export const getOAuthUrl = (
  serviceType: SocialLoginAndSignUpServiceTypes,
  locale?: string,
  actualRedirect?: string
): string => {
  const { publicRuntimeConfig } = getConfig()

  let url
  let params

  switch (serviceType) {
    case SOCIAL_LOGIN_SERVICE_TYPE.apple:
      params = {
        client_id: publicRuntimeConfig.socialAuthenticate.apple.clientId,
        redirect_uri: `${publicRuntimeConfig.host}/${publicRuntimeConfig.socialAuthenticate.redirectUri}`,
        state: getUuidHash(locale),
        response_type: 'code',
        response_mode: 'form_post',
        scope: 'name email'
      }

      url = buildQueryWithUrl(
        publicRuntimeConfig.socialAuthenticate.apple.oAuthUrl,
        params
      )
      break

    case SOCIAL_LOGIN_SERVICE_TYPE.facebook:
      params = {
        client_id: publicRuntimeConfig.socialAuthenticate.facebook.clientId,
        redirect_uri: `${publicRuntimeConfig.host}/${publicRuntimeConfig.socialAuthenticate.redirectUri}`,
        state: getUuidHash(locale),
        scope: 'email'
      }

      url = buildQueryWithUrl(
        publicRuntimeConfig.socialAuthenticate.facebook.oAuthUrl,
        params
      )
      break

    case SOCIAL_LOGIN_SERVICE_TYPE.google:
      params = {
        client_id: publicRuntimeConfig.socialAuthenticate.google.clientId,
        redirect_uri: `${publicRuntimeConfig.host}/${publicRuntimeConfig.socialAuthenticate.redirectUri}`,
        state: getUuidHash(locale),
        response_type: 'code',
        access_type: 'offline',
        scope:
          'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'
      }

      url = buildQueryWithUrl(
        publicRuntimeConfig.socialAuthenticate.google.oAuthUrl,
        params
      )
      break

    default:
      url = ''
      break
  }

  url !== '' && setSocialLoginCookie(serviceType, locale, actualRedirect)

  return url
}
