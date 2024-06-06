import type { Document } from '@contentful/rich-text-types'
import { normalizeRichText } from '../rich-text'

describe(normalizeRichText, () => {
  it('converts contentful rich text to html string', () => {
    expect(
      normalizeRichText({
        data: {},
        content: [
          {
            data: {},
            content: [
              {
                data: {},
                marks: [],
                value: 'Mo - Fr 9:00 - 18:00',
                nodeType: 'text'
              }
            ],
            nodeType: 'paragraph'
          }
        ],
        nodeType: 'document'
      } as Document)
    ).toBe('<p>Mo - Fr 9:00 - 18:00</p>')
  })

  it('converts contentful rich text to html string - with entry-hyperlink', () => {
    const document = {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value:
                'Yes, I would like signup for the Atida newsletter using the email address above and be among the first to receive the best, personalised offers and information. ',
              marks: [],
              data: {}
            },
            {
              nodeType: 'entry-hyperlink',
              data: {
                target: {
                  fields: {
                    title: 'Política de privacidad',
                    slug: 'politica-de-privacidad',
                    contentBlocks: []
                  }
                }
              },
              content: [
                { nodeType: 'text', value: 'Read more', marks: [], data: {} }
              ]
            },
            { nodeType: 'text', value: '', marks: [], data: {} }
          ]
        }
      ]
    } as Document
    expect(normalizeRichText(document)).toBe(
      '<p>Yes, I would like signup for the Atida newsletter using the email address above and be among the first to receive the best, personalised offers and information. <a alt="Política de privacidad" href="politica-de-privacidad" >Read more</a></p>'
    )
  })
})
