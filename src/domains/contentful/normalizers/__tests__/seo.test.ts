import { normalizeSeo } from '../seo'

const graphQLMock = {
  __typename: 'Seo',
  title: 'Medicines',
  description: 'Medicines meta description',
  keywords: 'Medicines meta keywords',
  image: {
    __typename: 'Asset',
    url:
      'https://images.ctfassets.net/7g2w796onies/35tV6r5Xt807nhoDcinSDa/3101eed88918b130f62985022e2f1a7e/Medicines.png'
  },
  header: 'Hair care',
  copy: {
    __typename: 'SeoCopy',
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
                'However, it takes time to decide on the right hair care that is tailored to the needs of your hair. After all, the care products should also ',
              nodeType: 'text'
            },
            {
              data: {},
              marks: [{ type: 'italic' }],
              value: 'improve hair problems',
              nodeType: 'text'
            },
            {
              data: {},
              marks: [],
              value:
                ' and not every hair can tolerate every care. For example, fine hair reacts very sensitively if it is cared for with hair treatments that are too intensive.',
              nodeType: 'text'
            }
          ],
          nodeType: 'paragraph'
        },
        {
          data: {},
          content: [
            {
              data: {},
              marks: [],
              value:
                'The hair care shop is a good way to help you decide on the right products. Relaxed, without the stress of opening times or other customers, you can order the right hair care online. Detailed descriptions of the products enable you to decide on the right care series or, if necessary, to combine products from ',
              nodeType: 'text'
            },
            {
              data: {},
              marks: [{ type: 'bold' }],
              value: 'different hair care series.',
              nodeType: 'text'
            },
            {
              data: {},
              marks: [],
              value:
                ' After your decision you can order the hair care. Further advantages of buying hair care products online in the shop are that you do not have to queue in long lines at the checkout and that your new care range simply comes to your home.',
              nodeType: 'text'
            }
          ],
          nodeType: 'paragraph'
        }
      ],
      nodeType: 'document'
    }
  },
  copyExpandable: {
    __typename: 'SeoCopyExpandable',
    json: {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value:
                'A lot of attention is paid to hair. But the hair needs care due to daily use of the blow dryer and styling products, as well as chemical changes due to coloration and changes in shade. The hair care shop is a good way to help you decide on the right products. Relaxed, without the stress of opening times or other customers, you can order the right hair care online.',
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
              value:
                'Detailed descriptions of the products enable you to decide on the right care series or, if necessary, to combine products from different hair care series. After your decision you can order the hair care. Further advantages of buying hair care products online in the shop are that you do not have to queue in long lines at the checkout and that your new care range simply comes to your home.',
              marks: [],
              data: {}
            }
          ],
          data: {}
        }
      ]
    }
  }
} as const

const expected = {
  contentType: 'Seo',
  title: 'Medicines',
  description: 'Medicines meta description',
  keywords: 'Medicines meta keywords',
  image: {
    url:
      'https://images.ctfassets.net/7g2w796onies/35tV6r5Xt807nhoDcinSDa/3101eed88918b130f62985022e2f1a7e/Medicines.png'
  },
  header: 'Hair care',
  copy:
    '<p>However, it takes time to decide on the right hair care that is tailored to the needs of your hair. After all, the care products should also <i>improve hair problems</i> and not every hair can tolerate every care. For example, fine hair reacts very sensitively if it is cared for with hair treatments that are too intensive.</p><p>The hair care shop is a good way to help you decide on the right products. Relaxed, without the stress of opening times or other customers, you can order the right hair care online. Detailed descriptions of the products enable you to decide on the right care series or, if necessary, to combine products from <b>different hair care series.</b> After your decision you can order the hair care. Further advantages of buying hair care products online in the shop are that you do not have to queue in long lines at the checkout and that your new care range simply comes to your home.</p>',
  copyExpandable:
    '<p>A lot of attention is paid to hair. But the hair needs care due to daily use of the blow dryer and styling products, as well as chemical changes due to coloration and changes in shade. The hair care shop is a good way to help you decide on the right products. Relaxed, without the stress of opening times or other customers, you can order the right hair care online.</p><p>Detailed descriptions of the products enable you to decide on the right care series or, if necessary, to combine products from different hair care series. After your decision you can order the hair care. Further advantages of buying hair care products online in the shop are that you do not have to queue in long lines at the checkout and that your new care range simply comes to your home.</p>'
}

const graphQLMockNoImageField = {
  __typename: 'Seo',
  title: 'Medicines',
  description: 'Medicines meta description',
  keywords: 'Medicines meta keywords',
  header: 'Hair care',
  copy: {
    __typename: 'SeoCopy',
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
                'However, it takes time to decide on the right hair care that is tailored to the needs of your hair. After all, the care products should also ',
              nodeType: 'text'
            },
            {
              data: {},
              marks: [{ type: 'italic' }],
              value: 'improve hair problems',
              nodeType: 'text'
            },
            {
              data: {},
              marks: [],
              value:
                ' and not every hair can tolerate every care. For example, fine hair reacts very sensitively if it is cared for with hair treatments that are too intensive.',
              nodeType: 'text'
            }
          ],
          nodeType: 'paragraph'
        },
        {
          data: {},
          content: [
            {
              data: {},
              marks: [],
              value:
                'The hair care shop is a good way to help you decide on the right products. Relaxed, without the stress of opening times or other customers, you can order the right hair care online. Detailed descriptions of the products enable you to decide on the right care series or, if necessary, to combine products from ',
              nodeType: 'text'
            },
            {
              data: {},
              marks: [{ type: 'bold' }],
              value: 'different hair care series.',
              nodeType: 'text'
            },
            {
              data: {},
              marks: [],
              value:
                ' After your decision you can order the hair care. Further advantages of buying hair care products online in the shop are that you do not have to queue in long lines at the checkout and that your new care range simply comes to your home.',
              nodeType: 'text'
            }
          ],
          nodeType: 'paragraph'
        }
      ],
      nodeType: 'document'
    }
  },
  copyExpandable: {
    __typename: 'SeoCopyExpandable',
    json: {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value:
                'A lot of attention is paid to hair. But the hair needs care due to daily use of the blow dryer and styling products, as well as chemical changes due to coloration and changes in shade. The hair care shop is a good way to help you decide on the right products. Relaxed, without the stress of opening times or other customers, you can order the right hair care online.',
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
              value:
                'Detailed descriptions of the products enable you to decide on the right care series or, if necessary, to combine products from different hair care series. After your decision you can order the hair care. Further advantages of buying hair care products online in the shop are that you do not have to queue in long lines at the checkout and that your new care range simply comes to your home.',
              marks: [],
              data: {}
            }
          ],
          data: {}
        }
      ]
    }
  },
  noIndex: true,
  noFollow: true,
  link: {
    slug: 'test-slug'
  }
} as const

const expectedNoImage = {
  contentType: 'Seo',
  title: 'Medicines',
  description: 'Medicines meta description',
  keywords: 'Medicines meta keywords',
  header: 'Hair care',
  copy:
    '<p>However, it takes time to decide on the right hair care that is tailored to the needs of your hair. After all, the care products should also <i>improve hair problems</i> and not every hair can tolerate every care. For example, fine hair reacts very sensitively if it is cared for with hair treatments that are too intensive.</p><p>The hair care shop is a good way to help you decide on the right products. Relaxed, without the stress of opening times or other customers, you can order the right hair care online. Detailed descriptions of the products enable you to decide on the right care series or, if necessary, to combine products from <b>different hair care series.</b> After your decision you can order the hair care. Further advantages of buying hair care products online in the shop are that you do not have to queue in long lines at the checkout and that your new care range simply comes to your home.</p>',
  copyExpandable:
    '<p>A lot of attention is paid to hair. But the hair needs care due to daily use of the blow dryer and styling products, as well as chemical changes due to coloration and changes in shade. The hair care shop is a good way to help you decide on the right products. Relaxed, without the stress of opening times or other customers, you can order the right hair care online.</p><p>Detailed descriptions of the products enable you to decide on the right care series or, if necessary, to combine products from different hair care series. After your decision you can order the hair care. Further advantages of buying hair care products online in the shop are that you do not have to queue in long lines at the checkout and that your new care range simply comes to your home.</p>',
  noIndex: true,
  noFollow: true,
  canonicalHrefOverride: 'test-slug'
}

describe(normalizeSeo, () => {
  describe('GraphQL', () => {
    it('normalizes the data', () => {
      const normalizedData = normalizeSeo(graphQLMock)
      expect(normalizedData).toEqual(expected)
    })
    it('normalizes the data when image is not present', () => {
      const normalizedData = normalizeSeo(graphQLMockNoImageField)
      expect(normalizedData).toEqual(expectedNoImage)
    })
  })
})
