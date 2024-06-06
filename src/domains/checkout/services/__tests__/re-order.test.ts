/**
 * @jest-environment node
 */
import axios from 'axios'
import {
  reOrderPayload as data,
  reOrderResponse
} from '~domains/checkout/__mocks__/re-order'
import { createClient } from '~helpers'
import { token } from '../../../account/__mocks__/token'
import { reOrder } from '../re-order'

describe(reOrder, () => {
  beforeEach(() => {
    ;(axios.post as jest.Mock).mockResolvedValue({ data: reOrderResponse })
  })
  const locale = 'pt-pt'
  const user = {
    token: token.accessToken
  }
  it('creates the client & passes the locale, orderId and options with access to the BE request', async () => {
    await reOrder(locale, data, user)
    expect(createClient).toHaveBeenCalledWith({
      locale,
      options: {
        baseURL: 'spryker.pt',
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
    })
    expect(axios.post).toHaveBeenCalledWith(`/orders/${data.orderId}/reorder`, {
      data: { type: 'reorder', attributes: {} }
    })
  })

  it('returns the normalized order response', async () => {
    const response = await reOrder('pt-pt', data, user)
    expect(response).toEqual(reOrderResponse)
  })
})
