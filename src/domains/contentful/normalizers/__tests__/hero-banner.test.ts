import { BLOCKS, Document } from '@contentful/rich-text-types'
import type { DeepPartial } from '@reduxjs/toolkit'
import { HeroBannerFragment } from '~generated-graphql'
import { ContentfulHeroBanner, normalizeHeroBanner } from '../hero-banner'
import { ContentfulLink } from '../link'

const restMock: DeepPartial<ContentfulHeroBanner> = {
  sys: {
    contentType: {
      sys: {
        id: 'heroBanner'
      }
    }
  },
  fields: {
    title: 'Your personal online pharmacy',
    searchPlaceholder: 'What are you looking for?',
    imageAsset: {
      fields: {
        title: 'Hero Image',
        description: 'Hero image',
        file: {
          url: 'https://atida.com/Atida_Private_label_wide_STV_1.png',
          details: {
            size: 633166,
            image: {
              width: 1024,
              height: 507
            }
          },
          fileName: 'Atida_Private_label_wide_STV 1.png',
          contentType: 'image/png'
        }
      }
    },
    text: {
      nodeType: BLOCKS.DOCUMENT,
      data: {},
      content: [
        {
          nodeType: BLOCKS.PARAGRAPH,
          content: [
            {
              nodeType: 'text',
              value: 'Atida private label',
              marks: [],
              data: {}
            }
          ],
          data: {}
        }
      ]
    },
    link: ({
      fields: {
        label: 'view more',
        url: 'about-us',
        content: ({} as unknown) as Document
      }
    } as unknown) as ContentfulLink
  }
}

const graphQLMock: HeroBannerFragment = {
  __typename: 'HeroBanner',
  heroBannerTitle: 'Your personal online pharmacy',
  searchPlaceholder: 'What are you looking for?',
  link: {
    __typename: 'Link',
    label: 'view more',
    url: 'about-us',
    icon: null,
    content: null
  },
  text: {
    __typename: 'HeroBannerText',
    json: {
      data: {},
      content: [
        {
          data: {},
          content: [
            {
              data: {},
              marks: [],
              value: 'Atida private label',
              nodeType: 'text'
            }
          ],
          nodeType: 'paragraph'
        }
      ],
      nodeType: 'document'
    }
  },
  imageAsset: {
    __typename: 'Asset',
    title: 'Hero Image',
    description: 'Hero image',
    url: 'https://atida.com/Atida_Private_label_wide_STV_1.png'
  }
}

describe(normalizeHeroBanner, () => {
  describe('REST', () => {
    it('normalizes the data', () => {
      // @ts-ignore
      const normalizedData = normalizeHeroBanner(restMock)
      expect(normalizedData?.title).toBe('Your personal online pharmacy')
      expect(normalizedData?.contentType).toBe('HeroBanner')
      expect(normalizedData?.searchPlaceholder).toBe(
        'What are you looking for?'
      )
      expect(normalizedData?.link).toEqual({
        content: '',
        label: 'view more',
        url: '/about-us'
      })
      expect(normalizedData?.text).toBe('<p>Atida private label</p>')
      expect(normalizedData?.image).toEqual({
        title: 'Hero Image',
        alt: 'Hero image',
        url: 'https://atida.com/Atida_Private_label_wide_STV_1.png'
      })
    })

    it('does not error if passed undefined', () => {
      // @ts-ignore
      const normalizedData = normalizeHeroBanner(undefined)
      expect(normalizedData).toEqual({
        contentType: 'HeroBanner',
        text: '',
        isSponsoredContent: false
      })
    })

    it('does not error if passed empty objet', () => {
      // @ts-ignore
      const normalizedData = normalizeHeroBanner({})
      expect(normalizedData).toEqual({
        contentType: 'HeroBanner',
        text: '',
        isSponsoredContent: false
      })
    })
  })

  describe('GraphQL', () => {
    it('normalizes the data', () => {
      const normalizedData = normalizeHeroBanner(graphQLMock)
      expect(normalizedData?.title).toBe('Your personal online pharmacy')
      expect(normalizedData?.contentType).toBe('HeroBanner')
      expect(normalizedData?.searchPlaceholder).toBe(
        'What are you looking for?'
      )
      expect(normalizedData?.link).toEqual({
        content: '',
        label: 'view more',
        url: '/about-us'
      })
      expect(normalizedData?.text).toBe('<p>Atida private label</p>')
      expect(normalizedData?.image).toEqual({
        title: 'Hero Image',
        alt: 'Hero image',
        url: 'https://atida.com/Atida_Private_label_wide_STV_1.png'
      })
    })
  })
})
