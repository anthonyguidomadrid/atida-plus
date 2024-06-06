/**
 * @jest-environment node
 */
import axios from 'axios'
import { createClient } from '~helpers'
import getConfig from 'next/config'
import { token } from '../../../account/__mocks__/token'
import { addFavourites } from '../add-favourites'

describe(addFavourites, () => {
  const { serverRuntimeConfig } = getConfig()
  const locale = 'pt-pt'
  const user = {
    token: token.accessToken
  }
  const data = {
    sku: 'some-id'
  }

  it('creates the client & passes the locale to the spryker request', async () => {
    await addFavourites(locale, user, data)
    expect(createClient).toHaveBeenCalledWith({
      locale,
      options: {
        baseURL: serverRuntimeConfig.ecommerceHost[locale],
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
    })
    expect(axios.post).toHaveBeenCalledWith('add-to-wishlist', {
      data: {
        type: 'add-to-wishlist',
        attributes: { items: [{ sku: 'some-id', isNew: true }] }
      }
    })
  })
})
