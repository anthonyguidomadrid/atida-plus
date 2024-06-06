/**
 * @jest-environment node
 */
import axios from 'axios'
import { createClient } from '~helpers'
import { authenticationRefreshToken } from '../authentication-refresh-token'
import {
  refreshToken,
  refreshTokenResponse,
  sprykerRefreshTokenResponse
} from '~domains/account/__mocks__/token'
import getConfig from 'next/config'

const unauthorizedErrorResponse = {
  errors: [
    {
      code: '004',
      status: 401,
      detail: 'Failed to refresh token.'
    }
  ]
}

describe(authenticationRefreshToken, () => {
  const { serverRuntimeConfig } = getConfig()
  const locale = 'pt-pt'

  describe('successfully refreshes access token', () => {
    beforeEach(() => {
      ;(axios.post as jest.Mock).mockResolvedValue({
        data: sprykerRefreshTokenResponse
      })
    })

    it('creates the client & passes the locale and refresh token to spryker request', async () => {
      await authenticationRefreshToken(locale, {
        refreshToken
      })
      expect(createClient).toHaveBeenCalledWith({
        locale: locale,
        options: {
          baseURL: serverRuntimeConfig.ecommerceHost[locale]
        }
      })

      expect(axios.post).toHaveBeenCalledWith('/refresh-tokens', {
        data: {
          type: 'refresh-tokens',
          attributes: {
            refreshToken
          }
        }
      })
    })

    it('returns the normalized customer response', async () => {
      const response = await authenticationRefreshToken('en-gb', {
        refreshToken
      })

      expect(response).toEqual(refreshTokenResponse)
    })
  })

  describe('fails to refresh access token', () => {
    beforeEach(() => {
      ;(axios.post as jest.Mock).mockRejectedValue(unauthorizedErrorResponse)
    })

    it('returns error when called with an invalid refresh token', async () => {
      try {
        await authenticationRefreshToken('en-gb', {
          refreshToken
        })
      } catch (errorsResponse) {
        expect(
          (errorsResponse as typeof unauthorizedErrorResponse)?.errors?.[0]
            ?.status
        ).toEqual(401)

        expect(errorsResponse).toMatchObject(unauthorizedErrorResponse)
      }
    })
  })
})
