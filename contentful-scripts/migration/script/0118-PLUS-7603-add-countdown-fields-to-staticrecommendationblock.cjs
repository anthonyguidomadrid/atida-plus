module.exports = async function (migration) {
  const fn = await import('../../helpers/locales/getDefaultLocale.mjs')

  const defaultLocaleKey = fn.getDefaultLocale()

  const staticRecommendationBlock = migration.editContentType(
    'staticRecommendationBlock'
  )

  staticRecommendationBlock
    .createField('showCount')
    .name('Show Countdown')
    .type('Boolean')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .defaultValue({
      [defaultLocaleKey]: false
    })
    .omitted(false)

  staticRecommendationBlock
    .createField('countExpire')
    .name('Countdown Expiration')
    .type('Date')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
}
