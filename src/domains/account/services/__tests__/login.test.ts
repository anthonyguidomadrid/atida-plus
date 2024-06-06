/**
 * @jest-environment node
 */
import axios from 'axios'
import { createClient } from '~helpers'
import { login } from '../login'
import { sprykerToken, token } from '~domains/account/__mocks__/token'

describe(login, () => {
  beforeEach(() => {
    ;(axios.post as jest.Mock).mockResolvedValue({ data: sprykerToken })
  })

  it('creates the client & passes the locale and anonymous id to spryker request', async () => {
    await login(
      'en-gb',
      { email: 'someemail@example.com', password: 'some-password' },
      'some-unique-id'
    )
    expect(createClient).toHaveBeenCalledWith({
      addAnonymousCustomerUniqueId: 'some-unique-id',
      locale: 'en-gb',
      options: {
        baseURL: 'spryker.co.uk'
      }
    })

    expect(axios.post).toHaveBeenCalledWith(`/access-tokens`, {
      data: {
        attributes: {
          username: 'someemail@example.com',
          password: 'some-password'
        },
        type: 'access-tokens'
      }
    })
  })

  it('returns the normalized customer response', async () => {
    const loginResponse = await login(
      'en-gb',
      {
        email: 'someemail@example.com',
        password: 'some-password'
      },
      'some-unique-id'
    )

    expect(loginResponse).toEqual(token)
  })
})
