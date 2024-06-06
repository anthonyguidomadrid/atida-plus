/**
 * @jest-environment node
 */
import axios from 'axios'
import { createClient } from '~helpers'
import getConfig from 'next/config'
import { token } from '../../../account/__mocks__/token'
import { removeFavourites } from '../remove-favourites'

describe(removeFavourites, () => {
  const { serverRuntimeConfig } = getConfig()
  const locale = 'pt-pt'
  const user = {
    token: token.accessToken
  }
  const data = {
    sku: 'some-id',
    favouritesListId: 'some-id'
  }

  it('creates the client & passes the locale to the spryker request', async () => {
    await removeFavourites(locale, user, data)
    expect(createClient).toHaveBeenCalledWith({
      locale,
      options: {
        baseURL: serverRuntimeConfig.ecommerceHost[locale],
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
    })
    expect(axios.delete).toHaveBeenCalledWith(
      `wishlists/${data.favouritesListId}/wishlist-items/${data.sku}`
    )
  })
})
