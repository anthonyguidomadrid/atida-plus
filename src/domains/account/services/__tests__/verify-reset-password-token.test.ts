/**
 * @jest-environment node
 */
import axios from 'axios'
import { createClient } from '~helpers'

import { verifyToken } from '../../__mocks__/verify-reset-token'
import { verifyResetPasswordToken } from '../verify-reset-password-token'

describe(verifyResetPasswordToken, () => {
  it('creates the client & passes the locale to spryker request', async () => {
    ;(axios.get as jest.Mock).mockResolvedValue(verifyToken)

    await verifyResetPasswordToken('en-gb', 'some-token')
    expect(createClient).toHaveBeenCalledWith({
      locale: 'en-gb',
      options: {
        baseURL: 'spryker.co.uk'
      }
    })
    expect(axios.get).toHaveBeenCalledWith(`/customer-verify-token/some-token`)
  })

  it('returns the correct response', async () => {
    const verifyTokenResponse = await verifyResetPasswordToken(
      'en-gb',
      verifyToken.data.id
    )
    expect(verifyTokenResponse).toBe(verifyToken.data)
  })
})
