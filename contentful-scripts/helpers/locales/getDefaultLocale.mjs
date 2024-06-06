import { readEnv } from './readEnv.mjs'

export const getDefaultLocale = () => {
  const envValues = readEnv()

  return envValues.CMS_LOCALE_DEFAULT ?? 'en-GB'
}
