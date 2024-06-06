/**
 * @jest-environment node
 */
import axios from 'axios'
import { createClient } from '~helpers'
import { passwordForgotten } from '../password-forgotten'

describe(passwordForgotten, () => {
  it('creates the client & passes the locale to the spryker request', async () => {
    await passwordForgotten('en-gb', {
      email: 'some@email.com'
    })

    expect(createClient).toHaveBeenCalledWith({
      locale: 'en-gb',
      options: {
        baseURL: 'spryker.co.uk'
      }
    })

    expect(axios.post).toHaveBeenCalledWith('/customer-forgotten-password', {
      data: {
        type: 'customer-forgotten-password',
        attributes: {
          email: 'some@email.com'
        }
      }
    })
  })

  it('returns an empty response', async () => {
    const passwordForgottenResponse = await passwordForgotten('en-gb', {
      email: 'some@email.com'
    })

    expect(passwordForgottenResponse).toBe(undefined)
  })
})
