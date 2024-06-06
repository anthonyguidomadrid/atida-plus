import { ContentfulUSPsCard, normalizeUSPsCard } from '../usps-card'

const restMock = {
  sys: {
    space: { sys: { type: 'Link', linkType: 'Space', id: '7g2w796onies' } },
    id: 'mBpB7FFdcWAa7YrXwQ2Q3',
    type: 'Entry',
    createdAt: '2021-02-11T10:43:54.954Z',
    updatedAt: '2021-02-11T10:43:54.954Z',
    environment: { sys: { id: 'dev', type: 'Link', linkType: 'Environment' } },
    revision: 1,
    contentType: {
      sys: { type: 'Link', linkType: 'ContentType', id: 'uspsCard' }
    },
    locale: 'en-gb'
  },
  fields: {
    title: 'Your trusted personal pharmacy expert',
    usps: [
      {
        sys: {
          space: {
            sys: { type: 'Link', linkType: 'Space', id: '7g2w796onies' }
          },
          id: '21QUtMC4BqQ3sNsQI64yP1',
          type: 'Entry',
          createdAt: '2021-02-11T10:42:31.523Z',
          updatedAt: '2021-02-11T10:42:31.523Z',
          environment: {
            sys: { id: 'dev', type: 'Link', linkType: 'Environment' }
          },
          revision: 1,
          contentType: {
            sys: { type: 'Link', linkType: 'ContentType', id: 'usp' }
          },
          locale: 'en-gb'
        },
        fields: {
          text: 'Free delivery above €49',
          icon: {
            sys: {
              space: {
                sys: { type: 'Link', linkType: 'Space', id: '7g2w796onies' }
              },
              id: '6JbALobydoEBhr3qZ9473r',
              type: 'Entry',
              createdAt: '2021-02-11T10:42:23.224Z',
              updatedAt: '2021-02-11T10:42:23.224Z',
              environment: {
                sys: { id: 'dev', type: 'Link', linkType: 'Environment' }
              },
              revision: 1,
              contentType: {
                sys: { type: 'Link', linkType: 'ContentType', id: 'icon' }
              },
              locale: 'en-gb'
            },
            fields: { ref: 'Parcel24' }
          }
        }
      },
      {
        sys: {
          space: {
            sys: { type: 'Link', linkType: 'Space', id: '7g2w796onies' }
          },
          id: '3rO1bgC8dLJ7VNGdN04iVm',
          type: 'Entry',
          createdAt: '2021-02-11T10:43:08.976Z',
          updatedAt: '2021-02-11T10:43:08.976Z',
          environment: {
            sys: { id: 'dev', type: 'Link', linkType: 'Environment' }
          },
          revision: 1,
          contentType: {
            sys: { type: 'Link', linkType: 'ContentType', id: 'usp' }
          },
          locale: 'en-gb'
        },
        fields: {
          text: 'Free returns',
          icon: {
            sys: {
              space: {
                sys: { type: 'Link', linkType: 'Space', id: '7g2w796onies' }
              },
              id: '2Oq2GYdv8GdBrx2NmZU907',
              type: 'Entry',
              createdAt: '2021-02-01T10:50:51.726Z',
              updatedAt: '2021-02-01T10:50:51.726Z',
              environment: {
                sys: { id: 'dev', type: 'Link', linkType: 'Environment' }
              },
              revision: 1,
              contentType: {
                sys: { type: 'Link', linkType: 'ContentType', id: 'icon' }
              },
              locale: 'en-gb'
            },
            fields: { ref: 'Return24' }
          }
        }
      },
      {
        sys: {
          space: {
            sys: { type: 'Link', linkType: 'Space', id: '7g2w796onies' }
          },
          id: '32kh4oYkK5Hf8pHJfGao3S',
          type: 'Entry',
          createdAt: '2021-02-11T10:43:47.578Z',
          updatedAt: '2021-02-11T10:43:47.578Z',
          environment: {
            sys: { id: 'dev', type: 'Link', linkType: 'Environment' }
          },
          revision: 1,
          contentType: {
            sys: { type: 'Link', linkType: 'ContentType', id: 'usp' }
          },
          locale: 'en-gb'
        },
        fields: {
          text: 'Personal help from our pharmacy team',
          icon: {
            sys: {
              space: {
                sys: { type: 'Link', linkType: 'Space', id: '7g2w796onies' }
              },
              id: '2kQXP3cyRUZ8DL1unQN5gX',
              type: 'Entry',
              createdAt: '2021-02-01T10:49:12.147Z',
              updatedAt: '2021-02-01T10:49:12.147Z',
              environment: {
                sys: { id: 'dev', type: 'Link', linkType: 'Environment' }
              },
              revision: 1,
              contentType: {
                sys: { type: 'Link', linkType: 'ContentType', id: 'icon' }
              },
              locale: 'en-gb'
            },
            fields: { ref: 'NavAdvice24' }
          }
        }
      }
    ]
  }
}

const graphQLMock = {
  __typename: 'UspsCard',
  title: 'Your trusted personal pharmacy expert',
  uspsCollection: {
    items: [
      {
        __typename: 'Usp',
        icon: {
          __typename: 'Icon',
          ref: 'Parcel24'
        },
        text: 'Free delivery above €49'
      },
      {
        __typename: 'Usp',
        icon: {
          __typename: 'Icon',
          ref: 'Return24'
        },
        text: 'Free returns'
      },
      {
        __typename: 'Usp',
        icon: {
          __typename: 'Icon',
          ref: 'NavAdvice24'
        },
        text: 'Personal help from our pharmacy team'
      }
    ]
  }
} as const

describe(normalizeUSPsCard, () => {
  describe('REST', () => {
    it('normalizes the data', () => {
      // @ts-ignore
      const normalizedData = normalizeUSPsCard(restMock)
      expect(normalizedData).toEqual({
        contentType: 'UspsCard',
        title: 'Your trusted personal pharmacy expert',
        items: [
          { icon: 'Parcel24', text: 'Free delivery above €49' },
          { icon: 'Return24', text: 'Free returns' },
          {
            icon: 'NavAdvice24',
            text: 'Personal help from our pharmacy team'
          }
        ]
      })
    })

    it('does not error if passed undefined', () => {
      const normalizedData = normalizeUSPsCard(undefined)
      expect(normalizedData).toEqual({
        contentType: 'UspsCard',
        title: ''
      })
    })

    it('does not error if passed empty object', () => {
      const normalizedData = normalizeUSPsCard({} as ContentfulUSPsCard)
      expect(normalizedData).toEqual({
        contentType: 'UspsCard',
        title: ''
      })
    })
  })

  describe('GraphQL', () => {
    it('normalizes the data', () => {
      const normalizedData = normalizeUSPsCard(graphQLMock)
      expect(normalizedData).toEqual({
        contentType: 'UspsCard',
        title: 'Your trusted personal pharmacy expert',
        items: [
          { icon: 'Parcel24', text: 'Free delivery above €49' },
          { icon: 'Return24', text: 'Free returns' },
          {
            icon: 'NavAdvice24',
            text: 'Personal help from our pharmacy team'
          }
        ]
      })
    })
  })
})
