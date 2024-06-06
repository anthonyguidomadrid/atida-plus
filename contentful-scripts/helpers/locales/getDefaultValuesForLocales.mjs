import { getListOfAllLocales } from './getListOfAllLocales.mjs'

export const getDefaultValuesForLocales = defaultValue => {
  const localeList = getListOfAllLocales().reverse()

  let resultObject = {}

  for (let i = 0; i < localeList.length; i++) {
    resultObject[localeList[i]] = defaultValue
  }

  return resultObject
}
