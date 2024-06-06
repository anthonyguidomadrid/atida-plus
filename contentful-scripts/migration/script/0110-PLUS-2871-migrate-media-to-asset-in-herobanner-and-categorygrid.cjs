module.exports = async function (migration, { makeRequest }) {
  const fn = await import('../../helpers/locales/getDefaultLocale.mjs')

  const categoryTile = migration.editContentType('categoryTile')
  categoryTile.editField('image').disabled(true).omitted(true)

  categoryTile
    .createField('imageAsset')
    .name('Image')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .linkType('Asset')

  categoryTile.moveField('imageAsset').afterField('image')

  try {
    await migration.transformEntries({
      contentType: 'categoryTile',
      from: ['image'],
      to: ['imageAsset'],
      transformEntryForLocale: async function (fromFields, currentLocale) {
        try {
          if (
            fromFields !== undefined &&
            fromFields?.image !== undefined &&
            currentLocale === fn.getDefaultLocale()
          ) {
            const mediaEntryId =
              fromFields?.image[fn.getDefaultLocale()]?.sys?.id

            if (mediaEntryId !== undefined) {
              const imageEntry = await makeRequest({
                method: 'GET',
                url: `/entries/${mediaEntryId}`
              })

              if (
                imageEntry !== undefined &&
                imageEntry?.fields !== undefined &&
                imageEntry?.fields?.asset !== undefined
              ) {
                const referencedAsset =
                  imageEntry?.fields?.asset[fn.getDefaultLocale()]

                if (referencedAsset !== undefined) {
                  const assetId = referencedAsset?.sys?.id
                  const assetEntry = await makeRequest({
                    method: 'GET',
                    url: `/assets/${assetId}`
                  })

                  if (assetEntry !== undefined) {
                    const assetVersion = assetEntry?.sys?.version ?? 1
                    const seoTitle = imageEntry?.fields?.title
                    const seoAlt = imageEntry?.fields?.alt

                    assetEntry.fields.title = seoTitle
                    assetEntry.fields.description = seoAlt

                    await makeRequest({
                      headers: { 'X-Contentful-Version': assetVersion },
                      method: 'PUT',
                      url: `/assets/${assetId}`,
                      data: {
                        fields: assetEntry.fields
                      }
                    })

                    await makeRequest({
                      headers: { 'X-Contentful-Version': assetVersion + 1 },
                      method: 'PUT',
                      url: `/assets/${assetId}/published`
                    })

                    return {
                      imageAsset: referencedAsset
                    }
                  }
                }
              }
            }
          }
        } catch (e) {
          // Do nothing
        }
      }
    })
  } catch (e) {
    // Do nothing
  }

  const heroBanner = migration.editContentType('heroBanner')

  heroBanner.editField('newTitle').required(false)

  heroBanner.editField('id').required(false)

  heroBanner.editField('text').validations([
    {
      enabledMarks: ['bold', 'italic', 'underline', 'code'],
      message: 'Only bold, italic, underline, and code marks are allowed'
    },
    {
      enabledNodeTypes: [
        'ordered-list',
        'unordered-list',
        'hr',
        'blockquote',
        'hyperlink',
        'entry-hyperlink',
        'asset-hyperlink',
        'heading-1',
        'heading-2',
        'heading-3',
        'heading-4',
        'heading-5',
        'heading-6'
      ],
      message:
        'Only ordered list, unordered list, horizontal rule, quote, link to Url, link to entry, link to asset, heading 1, heading 2, heading 3, heading 4, heading 5, and heading 6 nodes are allowed'
    },
    {
      nodes: {}
    }
  ])

  heroBanner
    .editField('title')
    .disabled(false)
    .omitted(false)
    .validations([
      {
        enabledMarks: ['bold', 'italic', 'underline', 'code'],
        message: 'Only bold, italic, underline, and code marks are allowed'
      },
      {
        enabledNodeTypes: [
          'ordered-list',
          'unordered-list',
          'hr',
          'blockquote',
          'hyperlink',
          'entry-hyperlink',
          'asset-hyperlink',
          'heading-1',
          'heading-2',
          'heading-3',
          'heading-4',
          'heading-5',
          'heading-6'
        ],
        message:
          'Only ordered list, unordered list, horizontal rule, quote, link to Url, link to entry, link to asset, heading 1, heading 2, heading 3, heading 4, heading 5, and heading 6 nodes are allowed'
      },
      {
        nodes: {}
      }
    ])

  heroBanner.editField('image').disabled(true).omitted(true)

  heroBanner
    .createField('imageAsset')
    .name('Image')
    .type('Link')
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .linkType('Asset')

  heroBanner.moveField('imageAsset').afterField('image')

  try {
    await migration.transformEntries({
      contentType: 'heroBanner',
      from: ['image'],
      to: ['imageAsset'],
      transformEntryForLocale: async function (fromFields, currentLocale) {
        try {
          if (
            fromFields !== undefined &&
            fromFields?.image !== undefined &&
            currentLocale === fn.getDefaultLocale()
          ) {
            const mediaEntryId =
              fromFields?.image[fn.getDefaultLocale()]?.sys?.id

            if (mediaEntryId !== undefined) {
              const imageEntry = await makeRequest({
                method: 'GET',
                url: `/entries/${mediaEntryId}`
              })

              if (
                imageEntry !== undefined &&
                imageEntry?.fields !== undefined &&
                imageEntry?.fields?.asset !== undefined
              ) {
                const referencedAsset =
                  imageEntry?.fields?.asset[fn.getDefaultLocale()]

                if (referencedAsset !== undefined) {
                  const assetId = referencedAsset?.sys?.id
                  const assetEntry = await makeRequest({
                    method: 'GET',
                    url: `/assets/${assetId}`
                  })

                  if (assetEntry !== undefined) {
                    const assetVersion = assetEntry?.sys?.version ?? 1
                    const seoTitle = imageEntry?.fields?.title
                    const seoAlt = imageEntry?.fields?.alt

                    assetEntry.fields.title = seoTitle
                    assetEntry.fields.description = seoAlt

                    await makeRequest({
                      headers: { 'X-Contentful-Version': assetVersion },
                      method: 'PUT',
                      url: `/assets/${assetId}`,
                      data: {
                        fields: assetEntry.fields
                      }
                    })

                    await makeRequest({
                      headers: { 'X-Contentful-Version': assetVersion + 1 },
                      method: 'PUT',
                      url: `/assets/${assetId}/published`
                    })

                    return {
                      imageAsset: referencedAsset
                    }
                  }
                }
              }
            }
          }
        } catch (e) {
          // Do nothing
        }
      }
    })
  } catch (e) {
    // Do nothing
  }

  heroBanner.editField('newTitle').required(true)

  heroBanner.editField('id').required(true)

  heroBanner.editField('text').validations([
    {
      enabledMarks: ['bold', 'italic', 'underline', 'code'],
      message: 'Only bold, italic, underline, and code marks are allowed'
    },
    {
      enabledNodeTypes: [
        'ordered-list',
        'unordered-list',
        'hr',
        'blockquote',
        'hyperlink',
        'entry-hyperlink',
        'asset-hyperlink'
      ],
      message:
        'Only ordered list, unordered list, horizontal rule, quote, link to URL, link to entry and link to asset nodes are allowed'
    },
    {
      nodes: {}
    }
  ])

  heroBanner
    .editField('title')
    .disabled(true)
    .omitted(true)
    .validations([
      {
        enabledMarks: ['bold', 'italic', 'underline', 'code'],
        message: 'Only bold, italic, underline, and code marks are allowed'
      },
      {
        enabledNodeTypes: [
          'ordered-list',
          'unordered-list',
          'hr',
          'blockquote',
          'hyperlink',
          'entry-hyperlink',
          'asset-hyperlink'
        ],
        message:
          'Only ordered list, unordered list, horizontal rule, quote, link to URL, link to entry and link to asset nodes are allowed'
      },
      {
        nodes: {}
      }
    ])
}
