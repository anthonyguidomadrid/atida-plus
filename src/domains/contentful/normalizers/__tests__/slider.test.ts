import { BLOCKS, Document } from '@contentful/rich-text-types'
import type { DeepPartial } from '@reduxjs/toolkit'
import { SliderFragment } from '~generated-graphql'
import type { Link as GraphQLLink } from '~generated-graphql'
import { ContentfulSlider, normalizeSlider } from '../slider'
import { ContentfulLink } from '../link'

const restMock: DeepPartial<ContentfulSlider> = {
  sys: {
    contentType: {
      sys: {
        id: 'slider'
      }
    }
  },
  fields: {
    name: 'Slider Test',
    contentBlocks: Array(3).fill({
      sys: {
        contentType: {
          sys: {
            id: 'heroBanner'
          }
        }
      },
      fields: {
        title: {
          data: {},
          content: [
            {
              data: {},
              content: [
                {
                  data: {},
                  marks: [],
                  value: 'Your personal',
                  nodeType: 'text'
                }
              ],
              nodeType: BLOCKS.PARAGRAPH
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  marks: [],
                  value: 'online pharmacy',
                  nodeType: 'text'
                }
              ],
              nodeType: BLOCKS.PARAGRAPH
            }
          ],
          nodeType: BLOCKS.DOCUMENT
        },
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
    })
  }
}

const graphQLMock: SliderFragment = {
  __typename: 'Slider',
  name: 'Slider Test',
  contentBlocksCollection: {
    items: Array(3).fill({
      __typename: 'HeroBanner',
      heroBannerTitle: {
        __typename: 'HeroBannerTitle',
        json: {
          nodeType: 'document',
          data: {},
          content: [
            {
              nodeType: 'paragraph',
              content: [
                {
                  nodeType: 'text',
                  value: 'Your personal',
                  marks: [],
                  data: {}
                }
              ],
              data: {}
            },
            {
              nodeType: 'paragraph',
              content: [
                {
                  nodeType: 'text',
                  value: 'online pharmacy',
                  marks: [],
                  data: {}
                }
              ],
              data: {}
            }
          ]
        }
      },
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
    })
  }
}

jest.mock('~domains/contentful', () => ({
  normalizeRichText: (content: Document) =>
    // @ts-expect-error
    `richText-${content?.content?.[0]?.content?.[0]?.value}`,
  normalizeLink: (content: ContentfulLink | Partial<GraphQLLink>) =>
    `link-${
      (content as Partial<GraphQLLink>)?.label ||
      (content as ContentfulLink)?.fields?.label
    }`
}))

describe(normalizeSlider, () => {
  describe('REST', () => {
    it('normalizes the data', () => {
      // @ts-expect-error
      const normalizedData = normalizeSlider(restMock)
      expect(normalizedData?.contentType).toBe('Slider')
      expect(normalizedData?.title).toBe('Slider Test')
      expect(normalizedData?.contentBlocks).toHaveLength(3)
      expect(normalizedData?.contentBlocks?.[0]?.title).toStrictEqual({
        content: [
          {
            content: [
              { data: {}, marks: [], nodeType: 'text', value: 'Your personal' }
            ],
            data: {},
            nodeType: 'paragraph'
          },
          {
            content: [
              {
                data: {},
                marks: [],
                nodeType: 'text',
                value: 'online pharmacy'
              }
            ],
            data: {},
            nodeType: 'paragraph'
          }
        ],
        data: {},
        nodeType: 'document'
      })
      expect(normalizedData?.contentBlocks?.[0]?.contentType).toBe('HeroBanner')
      expect(normalizedData?.contentBlocks?.[0]?.searchPlaceholder).toBe(
        'What are you looking for?'
      )
      expect(normalizedData?.contentBlocks?.[0]?.isSponsoredContent).toBe(false)
      expect(normalizedData?.contentBlocks?.[0]?.link).toBe('link-view more')
      expect(normalizedData?.contentBlocks?.[0]?.text).toBe(
        'richText-Atida private label'
      )
      expect(normalizedData?.contentBlocks?.[0]?.image).toEqual({
        title: 'Hero Image',
        alt: 'Hero image',
        url: 'https://atida.com/Atida_Private_label_wide_STV_1.png'
      })
    })

    it('does not error if passed undefined', () => {
      // @ts-expect-error
      const normalizedData = normalizeSlider(undefined)
      expect(normalizedData).toEqual({
        contentType: 'Slider',
        title: '',
        contentBlocks: []
      })
    })

    it('does not error if passed empty objet', () => {
      const normalizedData = normalizeSlider({})
      expect(normalizedData).toEqual({
        contentType: 'Slider',
        title: '',
        contentBlocks: []
      })
    })
  })

  describe('GraphQL', () => {
    it('normalizes the data', () => {
      const normalizedData = normalizeSlider(graphQLMock)
      expect(normalizedData?.contentType).toBe('Slider')
      expect(normalizedData?.title).toBe('Slider Test')
      expect(normalizedData?.contentBlocks).toHaveLength(3)
      expect(normalizedData?.contentBlocks?.[0]?.title).toStrictEqual({
        __typename: 'HeroBannerTitle',
        json: {
          content: [
            {
              content: [
                {
                  data: {},
                  marks: [],
                  nodeType: 'text',
                  value: 'Your personal'
                }
              ],
              data: {},
              nodeType: 'paragraph'
            },
            {
              content: [
                {
                  data: {},
                  marks: [],
                  nodeType: 'text',
                  value: 'online pharmacy'
                }
              ],
              data: {},
              nodeType: 'paragraph'
            }
          ],
          data: {},
          nodeType: 'document'
        }
      })
      expect(normalizedData?.contentBlocks?.[0]?.contentType).toBe('HeroBanner')
      expect(normalizedData?.contentBlocks?.[0]?.searchPlaceholder).toBe(
        'What are you looking for?'
      )
      expect(normalizedData?.contentBlocks?.[0]?.isSponsoredContent).toBe(false)
      expect(normalizedData?.contentBlocks?.[0]?.link).toBe('link-view more')
      expect(normalizedData?.contentBlocks?.[0]?.text).toBe(
        'richText-Atida private label'
      )
      expect(normalizedData?.contentBlocks?.[0]?.image).toEqual({
        title: 'Hero Image',
        alt: 'Hero image',
        url: 'https://atida.com/Atida_Private_label_wide_STV_1.png'
      })
    })
  })
})
