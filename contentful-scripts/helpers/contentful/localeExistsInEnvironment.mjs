/**
 * @param {Object[{code}]} locale
 * @param {Object[]} environmentLocales
 * @returns {Boolean}
 */
export const localeExistsInEnvironment = (locale, environmentLocales) => {
  const localeExists = environmentLocales.filter(envLocale => {
    return locale.code === envLocale.code
  })
  return !!localeExists.length
}
