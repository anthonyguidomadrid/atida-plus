import { BLOCKS } from '@contentful/rich-text-types'
import { VoucherCodesFragment } from '~generated-graphql'
import { ContentfulVoucherCodes, normalizeVoucherCodes } from '../voucher-codes'

const restMock = {
  sys: {
    space: { sys: { type: 'Link', linkType: 'Space', id: 'voucherCodes' } },
    id: 'some-id',
    type: 'Entry',
    createdAt: '2021-02-11T10:43:54.954Z',
    updatedAt: '2021-02-11T10:43:54.954Z',
    environment: { sys: { id: 'dev', type: 'Link', linkType: 'Environment' } },
    revision: 1,
    contentType: {
      sys: { type: 'Link', linkType: 'ContentType', id: 'voucherCodes' }
    },
    locale: 'en-gb'
  },
  fields: {
    title: 'VoucherCodes',
    voucherCodes: [
      {
        sys: {
          space: {
            sys: { type: 'Link', linkType: 'Space', id: 'some-id' }
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
            sys: { type: 'Link', linkType: 'ContentType', id: 'some-id' }
          },
          locale: 'en-gb'
        },
        fields: {
          voucherRichTextTitle: {
            data: {},
            content: [
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value: 'with coupon ATIDA5',
                    nodeType: 'text'
                  }
                ],
                nodeType: BLOCKS.PARAGRAPH
              }
            ],
            nodeType: BLOCKS.DOCUMENT
          },
          discount: '-10%',
          code: 'ATIDA5',
          description:
            'Até -30% na categoria de bebé + 10%desc. na 2ª und. em todo o site Até -30% na categoria de bebé'
        }
      }
    ]
  }
}

const graphQLMock: VoucherCodesFragment = {
  __typename: 'VoucherCodes',
  title: 'Voucher codes',
  voucherCodesCollection: {
    items: [
      {
        __typename: 'VoucherCode',
        discount: '-10%',
        code: 'ATIDA5',
        voucherRichTextTitle: {
          __typename: 'VoucherCodeNewTitle',
          json: {
            nodeType: 'document',
            data: {},
            content: [
              {
                nodeType: 'paragraph',
                content: [
                  {
                    nodeType: 'text',
                    value: 'with coupon ATIDA5',
                    marks: [],
                    data: {}
                  }
                ],
                data: {}
              }
            ]
          }
        },
        description:
          'Até -30% na categoria de bebé + 10%desc. na 2ª und. em todo o site Até -30% na categoria de bebé'
      }
    ]
  }
} as const

describe(normalizeVoucherCodes, () => {
  describe('REST', () => {
    it('normalizes the data', () => {
      // @ts-ignore
      const normalizedData = normalizeVoucherCodes(restMock)
      expect(normalizedData).toEqual({
        contentType: 'VoucherCodes',
        title: 'VoucherCodes',
        items: [
          {
            title: '',
            voucherRichTextTitle: '<p>with coupon ATIDA5</p>',
            discount: '-10%',
            code: 'ATIDA5',
            description:
              'Até -30% na categoria de bebé + 10%desc. na 2ª und. em todo o site Até -30% na categoria de bebé'
          }
        ]
      })
    })

    it('does not error if passed undefined', () => {
      const normalizedData = normalizeVoucherCodes(undefined)
      expect(normalizedData).toEqual({
        contentType: 'VoucherCodes',
        title: ''
      })
    })

    it('does not error if passed empty object', () => {
      const normalizedData = normalizeVoucherCodes({} as ContentfulVoucherCodes)
      expect(normalizedData).toEqual({
        contentType: 'VoucherCodes',
        title: ''
      })
    })
  })

  describe('GraphQL', () => {
    it('normalizes the data', () => {
      const normalizedData = normalizeVoucherCodes(graphQLMock)
      expect(normalizedData).toEqual({
        contentType: 'VoucherCodes',
        title: 'Voucher codes',
        items: [
          {
            title: '',
            voucherRichTextTitle: '<p>with coupon ATIDA5</p>',
            discount: '-10%',
            code: 'ATIDA5',
            description:
              'Até -30% na categoria de bebé + 10%desc. na 2ª und. em todo o site Até -30% na categoria de bebé'
          }
        ]
      })
    })
  })
})
