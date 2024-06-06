import getConfig from 'next/config'
import { createClient } from '~helpers'
import { SprykerVerifyResetPasswordToken } from '../types'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const verifyResetPasswordToken = async (
  locale: string,
  resetPasswordToken: string
): Promise<SprykerVerifyResetPasswordToken> => {
  const { serverRuntimeConfig } = getConfig()
  const client = createClient({
    locale,
    options: { baseURL: serverRuntimeConfig.ecommerceHost[locale] }
  })
  const response = await client.get(
    `/customer-verify-token/${resetPasswordToken}`
  )
  return response.data
}
