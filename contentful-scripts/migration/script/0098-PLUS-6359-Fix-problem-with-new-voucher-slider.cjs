module.exports = function (migration) {
  const voucherCodes = migration.editContentType('voucherCodes')

  voucherCodes.editField('voucherCodes').validations([
    {
      size: {
        min: 1,
        max: 4
      }
    }
  ])

  voucherCodes.changeFieldControl(
    'voucherCodes',
    'builtin',
    'entryLinksEditor',
    {
      helpText:
        'These are the voucher codes that will be displayed in the site. Keep in mind that only the first 3 linked published entries will be shown'
    }
  )
}
