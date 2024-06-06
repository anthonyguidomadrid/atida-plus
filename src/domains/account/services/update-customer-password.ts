import getConfig from 'next/config'
import { createClient } from '~helpers'
import type { ChangePassword } from '../types'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const updateCustomerPassword = async (
  locale: string,
  data: ChangePassword & { customerReference: string },
  user: {
    token?: string
  }
): Promise<undefined> => {
  const { serverRuntimeConfig } = getConfig()
  const client = createClient({
    locale,
    options: {
      baseURL: serverRuntimeConfig.ecommerceHost[locale],
      headers: user.token
        ? {
            Authorization: `Bearer ${user.token}`
          }
        : undefined
    }
  })

  await client.patch<null>(`/customer-password/${data.customerReference}`, {
    data: {
      type: 'customer-password',
      attributes: {
        password: data.password,
        newPassword: data.newPassword,
        confirmPassword: data.confirmNewPassword
      }
    }
  })
  return
}
