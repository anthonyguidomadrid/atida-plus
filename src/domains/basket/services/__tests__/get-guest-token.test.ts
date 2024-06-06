/**
 * @jest-environment node
 */
import axios from 'axios'
import {
  normalizedGuestToken,
  sprykerGuestToken
} from '~domains/account/__mocks__/token'
import { createClient } from '~helpers'
import { getGuestToken } from '../get-guest-token'

describe(getGuestToken, () => {
  beforeEach(() => {
    ;(axios.post as jest.Mock).mockResolvedValue({ data: sprykerGuestToken })
  })

  it('creates the client & passes the locale to spryker request', async () => {
    await getGuestToken('en-gb')
    expect(createClient).toHaveBeenCalledWith({
      locale: 'en-gb',
      options: {
        baseURL: 'spryker.co.uk'
      }
    })

    expect(axios.post).toHaveBeenCalledWith(`/guest-tokens`, {
      data: {
        attributes: {},
        type: 'guest-tokens'
      }
    })
  })

  it('returns the normalized guest token response', async () => {
    const tokenResponse = await getGuestToken('pt-pt')

    expect(tokenResponse).toEqual(normalizedGuestToken)
  })
})
