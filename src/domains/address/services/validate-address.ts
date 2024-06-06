import getConfig from 'next/config'
import {
  createClient,
  getGeocodeISOFromLocale,
  getLanguageFromLocale
} from '~helpers'
import { ValidateAddressTriggerPayload, ValidatedAddress } from '../types'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const validateAddress = async (
  locale: string,
  data: ValidateAddressTriggerPayload
): Promise<{ items: ValidatedAddress[] }> => {
  const { serverRuntimeConfig } = getConfig()

  const client = createClient({
    locale
  })

  const response = await client.get<{ items: ValidatedAddress[] }>(
    `${serverRuntimeConfig.geoCode.baseUrl}?apiKey=${
      serverRuntimeConfig.geoCode.apiKey
    }${data.query}&in=countryCode:${getGeocodeISOFromLocale(
      locale ?? ''
    )}&lang=${getLanguageFromLocale(locale)}`
  )

  return response.data
}
