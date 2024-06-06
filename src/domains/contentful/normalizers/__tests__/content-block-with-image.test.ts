import { BLOCKS } from '@contentful/rich-text-types'
import type { Asset, ContentTypeLink, Sys } from 'contentful'
import { ContentBlockWithImageFragment } from '~generated-graphql'
import { ContentfulColor } from '../color'
import {
  ContentfulContentBlockWithImage,
  normalizeContentBlockWithImage
} from '../content-block-with-image'
import { ContentfulIcon } from '../icon'
import { ContentfulLink } from '../link'

const restMock: ContentfulContentBlockWithImage = {
  toPlainObject: () => ({}),
  update: () => ({} as never),
  metadata: {
    tags: []
  },
  sys: {
    contentType: {
      sys: {
        id: 'contentBlockWithImage'
      } as ContentTypeLink
    }
  } as Sys,
  fields: {
    title: 'Any questions?',
    content: {
      data: {},
      content: [
        {
          data: {},
          content: [
            {
              data: {},
              marks: [],
              value:
                "We're here to help. Ask about our products or get expert medical advice.",
              nodeType: 'text'
            }
          ],
          nodeType: BLOCKS.PARAGRAPH
        }
      ],
      nodeType: BLOCKS.DOCUMENT
    },
    image: {
      fields: {
        title: 'Contact image',
        description: 'Person looking at a tablet',
        file: {
          url: 'https://atida.com/adam-winger-iirbrh939yc-unsplash_1.jpg',
          fileName: 'adam-winger-iirbrh939yc-unsplash 1.jpg',
          contentType: 'image/jpeg',
          details: { size: 0 }
        }
      }
    } as Asset,
    cta: {
      fields: {
        label: 'Chat with an expert',
        url: '/contact',
        icon: {
          fields: {
            ref: 'NavAdvice24'
          }
        } as ContentfulIcon
      }
    } as ContentfulLink,
    textLink: {
      fields: {
        label: 'Read our FAQ',
        url: '/faq'
      }
    } as ContentfulLink,
    bgColor: {
      fields: {
        ref: 'secondary-dark-sky-blue'
      }
    } as ContentfulColor,
    textColor: {
      fields: {
        ref: 'primary-white'
      }
    } as ContentfulColor
  }
}

const graphQLMock: ContentBlockWithImageFragment = {
  __typename: 'ContentBlockWithImage',
  title: 'Any questions?',
  image: {
    __typename: 'Asset',
    title: 'Contact image',
    description: 'Person looking at a tablet',
    url: 'https://atida.com/adam-winger-iirbrh939yc-unsplash_1.jpg',
    contentType: 'image/jpeg'
  },
  content: {
    __typename: 'ContentBlockWithImageContent',
    json: {
      data: {},
      content: [
        {
          data: {},
          content: [
            {
              data: {},
              marks: [],
              value:
                "We're here to help. Ask about our products or get expert medical advice.",
              nodeType: 'text'
            }
          ],
          nodeType: 'paragraph'
        }
      ],
      nodeType: 'document'
    }
  },
  cta: {
    __typename: 'Link',
    label: 'Chat with an expert',
    url: '/contact',
    icon: {
      __typename: 'Icon',
      ref: 'NavAdvice24'
    },
    content: null
  },
  textLink: {
    __typename: 'Link',
    label: 'Read our FAQ',
    url: '/faq',
    icon: null,
    content: null
  },
  bgColor: {
    __typename: 'Color',
    ref: 'secondary-dark-sky-blue'
  },
  textColor: {
    __typename: 'Color',
    ref: 'primary-white'
  },
  imageLeft: false,
  sponsored: false,
  typography: 'Heading',
  imageSize: 'Large',
  txtAlignMobile: 'Left',
  showDesc: true,
  btnType: 'Primary',
  btnWidthMobile: 'Auto',
  btnPosTablet: 'Right'
} as const

const expected = {
  backgroundColor: 'secondary-dark-sky-blue',
  content:
    '<p>We&#39;re here to help. Ask about our products or get expert medical advice.</p>',
  contentType: 'ContentBlockWithImage',
  cta: {
    content: '',
    icon: 'NavAdvice24',
    label: 'Chat with an expert',
    url: '/contact'
  },
  header: '',
  image: {
    description: 'Person looking at a tablet',
    title: 'Contact image',
    type: 'image/jpeg',
    url: 'https://atida.com/adam-winger-iirbrh939yc-unsplash_1.jpg'
  },
  imageOnTheLeft: false,
  isSponsoredContent: false,
  textColor: 'primary-white',
  textLink: {
    content: '',
    label: 'Read our FAQ',
    url: '/faq'
  },
  title: 'Any questions?',
  titleTypography: 'heading',
  imageSize: 'large',
  textAlignmentForMobile: 'left',
  showDescription: true,
  buttonVariant: 'primary',
  buttonWidthForMobile: 'auto',
  buttonPositionForTablet: 'right'
}

describe(normalizeContentBlockWithImage, () => {
  describe('REST', () => {
    it('normalizes the data', () => {
      const normalizedData = normalizeContentBlockWithImage(restMock)
      expect(normalizedData).toEqual(expected)
    })

    it('does not error if passed undefined', () => {
      const normalizedData = normalizeContentBlockWithImage(undefined)
      expect(normalizedData).toEqual({
        contentType: 'ContentBlockWithImage',
        header: '',
        title: '',
        content: '',
        imageOnTheLeft: false,
        isSponsoredContent: false,
        titleTypography: 'heading',
        imageSize: 'large',
        textAlignmentForMobile: 'left',
        showDescription: true,
        buttonVariant: 'primary',
        buttonWidthForMobile: 'auto',
        buttonPositionForTablet: 'right'
      })
    })

    it('does not error if passed empty object', () => {
      const normalizedData = normalizeContentBlockWithImage(
        {} as ContentfulContentBlockWithImage
      )
      expect(normalizedData).toEqual({
        contentType: 'ContentBlockWithImage',
        header: '',
        title: '',
        content: '',
        imageOnTheLeft: false,
        isSponsoredContent: false,
        titleTypography: 'heading',
        imageSize: 'large',
        textAlignmentForMobile: 'left',
        showDescription: true,
        buttonVariant: 'primary',
        buttonWidthForMobile: 'auto',
        buttonPositionForTablet: 'right'
      })
    })
  })

  describe('GraphQL', () => {
    it('normalizes the data', () => {
      const normalizedData = normalizeContentBlockWithImage(graphQLMock)
      expect(normalizedData).toEqual(expected)
    })
  })
})
