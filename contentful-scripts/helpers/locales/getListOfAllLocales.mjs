import { getDefaultLocale } from './getDefaultLocale.mjs'
import { getListOfUsedLocales } from './getListOfUsedLocales.mjs'

export const getListOfAllLocales = () => {
  let localeList = getListOfUsedLocales()
  localeList.push(getDefaultLocale())

  return localeList
}
