module.exports = function (migration, context) {
  const voucherCode = migration.createContentType('voucherCode', {
    name: 'Voucher Code (single)',
    displayField: 'title',
    description: 'Single Voucher code block content'
  })

  voucherCode
    .createField('title')
    .name('Title')
    .type('Symbol')
    .localized(true)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)

  voucherCode
    .createField('code')
    .name('code')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)

  voucherCode
    .createField('discount')
    .name('Discount')
    .type('Symbol')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)

  voucherCode
    .createField('icon')
    .name('Icon')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([
      {
        linkContentType: ['icon']
      }
    ])
    .linkType('Entry')
    .disabled(false)
    .omitted(false)

  voucherCode
    .createField('description')
    .name('Description')
    .type('Symbol')
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false)
}
