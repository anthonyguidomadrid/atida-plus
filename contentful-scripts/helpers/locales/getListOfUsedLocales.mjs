import { readEnv } from './readEnv.mjs'

export const getListOfUsedLocales = () => {
  const envValues = readEnv()

  return envValues.CMS_LOCALE_USED_LIST.split(',')
}
