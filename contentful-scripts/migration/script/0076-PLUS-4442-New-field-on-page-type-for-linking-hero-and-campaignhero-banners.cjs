module.exports = function (migration) {
  const page = migration.editContentType('page')

  page
    .createField('heroHeader')
    .name('Hero Header')
    .type('Link')
    .linkType('Entry')
    .localized(true)
    .required(false)
    .validations([
      {
        linkContentType: ['heroBanner', 'campaignHeroBanner']
      }
    ])
    .disabled(false)
    .omitted(false)

  page.changeFieldControl('heroHeader', 'builtin', 'entryLinkEditor', {
    helpText:
      'Makes it possible to display a HeroBanner or CampaignHeroBanner on brand pages, COP and POP. If not provided, the current, simple header is displayed.'
  })

  page.moveField('heroHeader').afterField('referencedContent')
}
