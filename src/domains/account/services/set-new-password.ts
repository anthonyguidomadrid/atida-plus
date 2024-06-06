import getConfig from 'next/config'
import { createClient } from '~helpers'
import type { SetNewPassword, SprykerSetNewPassword } from '../types'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const setNewPassword = async (
  locale: string,
  data: SetNewPassword
): Promise<undefined> => {
  const { serverRuntimeConfig } = getConfig()
  const client = createClient({
    locale,
    options: { baseURL: serverRuntimeConfig.ecommerceHost[locale] }
  })

  await client.patch<SprykerSetNewPassword>(
    `/customer-restore-password/${data.restorePasswordKey}`,
    {
      data: {
        type: 'customer-restore-password',
        id: data.restorePasswordKey,
        attributes: {
          restorePasswordKey: data.restorePasswordKey,
          password: data.password,
          confirmPassword: data.confirmPassword
        }
      }
    }
  )
  return
}
