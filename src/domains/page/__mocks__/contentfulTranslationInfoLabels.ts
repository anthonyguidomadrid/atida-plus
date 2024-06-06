const labels = [
  {
    fields: {
      labelKey: '0',
      translation: 'Hello',
      textColor: {
        sys: {
          contentType: {
            sys: { type: 'Link', linkType: 'ContentType', id: 'color' }
          }
        },
        fields: {
          ref: 'primary-white'
        }
      },
      backgroundColor: {
        sys: {
          contentType: {
            sys: { type: 'Link', linkType: 'ContentType', id: 'color' }
          }
        },
        fields: {
          ref: 'secondary-portland-orange'
        }
      }
    }
  }
]

export const contentfulTranslationLabels = {
  items: labels
}

export const contentfulTranslationLabelsNormalized = [
  {
    key: '0',
    translation: 'Hello',
    backgroundColor: 'secondary-portland-orange',
    textColor: 'primary-white'
  }
]
