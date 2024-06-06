import { getOAuthUrl } from '../oauth'
import { getUuidHash } from '~helpers/getHash'
import { SOCIAL_LOGIN_SERVICE_TYPE } from '~config/constants/social-login-service-types'
import { oauthUrlMockData } from '../__mocks__/oauthUrls'

describe(getOAuthUrl, () => {
  beforeEach(() => {
    ;(getUuidHash as jest.Mock).mockReturnValue(
      '7a584740b5963bf0b4c78714fb6a1d1f57017d46f1a445d69e339fddbed439db'
    )
  })

  it('returns the url when the service type is google', () => {
    expect(getOAuthUrl(SOCIAL_LOGIN_SERVICE_TYPE.google, 'es-es')).toEqual(
      oauthUrlMockData.google
    )
  })

  it('returns the url when the service type is facebook', () => {
    expect(getOAuthUrl(SOCIAL_LOGIN_SERVICE_TYPE.facebook, 'es-es')).toEqual(
      oauthUrlMockData.facebook
    )
  })

  it('returns the url when the service type is apple', () => {
    expect(getOAuthUrl(SOCIAL_LOGIN_SERVICE_TYPE.apple, 'es-es')).toEqual(
      oauthUrlMockData.apple
    )
  })
})
