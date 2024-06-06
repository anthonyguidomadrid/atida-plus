/**
 * @jest-environment node
 */
import axios from 'axios'
import {
  GetFavouritesResponseMock,
  SprykerFavouritesResponseMock
} from '~domains/favourites/__mocks__/get-favourites'
import { createClient } from '~helpers'
import getConfig from 'next/config'
import { token } from '../../../account/__mocks__/token'
import { getFavourites } from '../get-favourites'

describe(getFavourites, () => {
  beforeEach(() => {
    ;(axios.get as jest.Mock).mockResolvedValue({
      data: SprykerFavouritesResponseMock
    })
  })
  const { serverRuntimeConfig } = getConfig()
  const locale = 'pt-pt'
  const user = {
    token: token.accessToken
  }
  it('creates the client & passes the locale to the spryker request', async () => {
    await getFavourites(locale, user)
    expect(createClient).toHaveBeenCalledWith({
      locale,
      options: {
        baseURL: serverRuntimeConfig.ecommerceHost[locale],
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
    })
    expect(axios.get).toHaveBeenCalledWith('wishlists')
  })

  it('returns the normalized order response', async () => {
    const response = await getFavourites(locale, user)
    expect(response).toEqual(GetFavouritesResponseMock)
  })
})
