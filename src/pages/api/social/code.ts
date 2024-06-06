import type { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'
import {
  getCountrySelectorHeaderDataName,
  getJWTCookieDomain,
  getSocialLoginName
} from '~domains/account'
import { getDefaultLocale } from '~domains/translated-routes'
import { handleApiError, isApiError, handleUnknownError } from '~helpers/error'
import { clearCookies } from '~helpers/server-only/cookie'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const { serverRuntimeConfig } = getConfig()
    const socialLogin = JSON.parse(req.cookies[getSocialLoginName()] ?? '{}')
    const code = req.query.code || req.body.code

    // Hash coming back from service - google, facebook, apple
    const remoteHash = req.query.state || req.body.state

    // On Apple we have to capture the customer firstname/lastname for social sign up and send them to Spryker
    const user = JSON.parse(req.body.user ?? '{}')
    const firstName = user?.name?.firstName
    const lastName = user?.name?.lastName
    const social = socialLogin?.serviceType
    const locale =
      socialLogin.locale ??
      JSON.parse(req.cookies[getCountrySelectorHeaderDataName()] ?? '{}')
        .selectedCountry

    // Hash stored in cookie and sent to the service on oAuth
    const localHash = socialLogin?.hash || ''

    const redirect = socialLogin?.actualRedirect ?? ''
    const path = redirect.split('?')[0] ?? ''
    const params = redirect.split('?')[1]

    clearCookies(res, [getSocialLoginName()], {
      domain: getJWTCookieDomain()
    })

    if (localHash !== remoteHash || !code || !social || !locale) {
      // If the social/code params are missing, or the state hash is missing we redirect to the login page.
      const targetURL = `${serverRuntimeConfig.host}/${
        locale || getDefaultLocale()
      }/login`
      res.redirect(307, targetURL)
      return
    }

    res.redirect(
      303,
      `/${locale}/login${path}?social=${social}&code=${code}${
        !!firstName ? `&firstName=${firstName}` : ''
      }${!!lastName ? `&lastName=${lastName}` : ''}${
        !!params ? `&${params}` : ''
      }`
    )
    return
  } catch (error) {
    isApiError(error)
      ? handleApiError(res, error, 'account.social-code.error')
      : handleUnknownError(
          req,
          res,
          error,
          'account.social-code.unexpected-error'
        )
  }
}
