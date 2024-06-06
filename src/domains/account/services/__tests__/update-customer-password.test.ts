/**
 * @jest-environment node
 */
import axios from 'axios'
import { createClient } from '~helpers'
import { updateCustomerPassword } from '../update-customer-password'
import { changePassword } from '~domains/account/__mocks__/update-customer-password'
import { token } from '~domains/account/__mocks__/token'
import getConfig from 'next/config'

describe(updateCustomerPassword, () => {
  const data = changePassword
  const { serverRuntimeConfig } = getConfig()
  const user = {
    token: token.accessToken
  }

  it('creates the client & passes the locale and token to Spryker request', async () => {
    await updateCustomerPassword('en-gb', data, user)
    expect(createClient).toHaveBeenCalledWith({
      locale: 'en-gb',
      options: {
        baseURL: serverRuntimeConfig.ecommerceHost['en-gb'],
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
    })

    expect(axios.patch).toHaveBeenCalledTimes(1)

    expect(axios.patch).toHaveBeenCalledWith(`/customer-password/PT-000`, {
      data: {
        type: 'customer-password',
        attributes: {
          password: data.password,
          newPassword: data.newPassword,
          confirmPassword: data.confirmNewPassword
        }
      }
    })
  })
})
