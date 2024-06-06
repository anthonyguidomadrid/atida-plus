module.exports = async function (migration) {
  const promotion = migration.editContentType('promotion')

  promotion
    .createField('slug')
    .name('Slug')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([
      {
        regexp: {
          pattern: '^[a-z0-9-/_]+$',
          flags: 'g'
        },
        message:
          'The slug only allows: lowercase letters, numbers, hyphens, underscores and forward slashes'
      }
    ])
    .disabled(true)
    .omitted(false)

  const category = migration.editContentType('category')

  category
    .createField('slug')
    .name('Slug')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([
      {
        regexp: {
          pattern: '^[a-z0-9-/_]+$',
          flags: 'g'
        },
        message:
          'The slug only allows: lowercase letters, numbers, hyphens, underscores and forward slashes'
      }
    ])
    .disabled(true)
    .omitted(false)

  const categoryCop = migration.editContentType('categoryCop')

  categoryCop
    .createField('slug')
    .name('Slug')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([
      {
        regexp: {
          pattern: '^[a-z0-9-/_]+$',
          flags: 'g'
        },
        message:
          'The slug only allows: lowercase letters, numbers, hyphens, underscores and forward slashes'
      }
    ])
    .disabled(true)
    .omitted(false)

  const brand = migration.editContentType('brand')

  brand
    .createField('slug')
    .name('Slug')
    .type('Symbol')
    .localized(true)
    .required(false)
    .validations([
      {
        regexp: {
          pattern: '^[a-z0-9-/_]+$',
          flags: 'g'
        },
        message:
          'The slug only allows: lowercase letters, numbers, hyphens, underscores and forward slashes'
      }
    ])
    .disabled(true)
    .omitted(false)
}
