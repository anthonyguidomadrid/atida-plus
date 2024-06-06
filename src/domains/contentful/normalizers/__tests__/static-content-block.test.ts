import { normalizeStaticContentBlock } from '../static-content-block'

//eslint-disable-next-line
const restMock: any = {
  contentType: {
    sys: {
      id: 'staticContentBlock'
    }
  },
  fields: {
    title: 'Personal data request',
    content: {
      data: {},
      content: [
        {
          data: {},
          content: [
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: 'Personal data you’ve provided',
                      nodeType: 'text'
                    }
                  ],
                  nodeType: 'paragraph'
                }
              ],
              nodeType: 'list-item'
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: 'Your order history at Atida Plus',
                      nodeType: 'text'
                    }
                  ],
                  nodeType: 'paragraph'
                }
              ],
              nodeType: 'list-item'
            }
          ],
          nodeType: 'unordered-list'
        },
        {
          data: {},
          content: [
            {
              data: {},
              marks: [],
              value: '',
              nodeType: 'text'
            }
          ],
          nodeType: 'paragraph'
        }
      ],
      nodeType: 'document'
    }
  }
}

const restMockWithIcon = {
  contentType: {
    sys: {
      id: 'staticContentBlock'
    }
  },
  fields: {
    title: 'Personal data request',
    content: {
      data: {},
      content: [
        {
          data: {},
          content: [
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: 'Personal data you’ve provided',
                      nodeType: 'text'
                    }
                  ],
                  nodeType: 'paragraph'
                }
              ],
              nodeType: 'list-item'
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: 'Your order history at Atida Plus',
                      nodeType: 'text'
                    }
                  ],
                  nodeType: 'paragraph'
                }
              ],
              nodeType: 'list-item'
            }
          ],
          nodeType: 'unordered-list'
        },
        {
          data: {},
          content: [
            {
              data: {},
              marks: [],
              value: '',
              nodeType: 'text'
            }
          ],
          nodeType: 'paragraph'
        }
      ],
      nodeType: 'document'
    },
    icon: {
      __typename: 'Icon',
      ref: 'iconReference'
    }
  }
}

//eslint-disable-next-line
const graphQLMock: any = {
  __typename: 'StaticContentBlock',
  title: 'Personal data request',
  content: {
    json: {
      data: {},
      content: [
        {
          data: {},
          content: [
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: 'Personal data you’ve provided',
                      nodeType: 'text'
                    }
                  ],
                  nodeType: 'paragraph'
                }
              ],
              nodeType: 'list-item'
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: 'Your order history at Atida Plus',
                      nodeType: 'text'
                    }
                  ],
                  nodeType: 'paragraph'
                }
              ],
              nodeType: 'list-item'
            }
          ],
          nodeType: 'unordered-list'
        },
        {
          data: {},
          content: [
            {
              data: {},
              marks: [],
              value: '',
              nodeType: 'text'
            }
          ],
          nodeType: 'paragraph'
        }
      ],
      nodeType: 'document'
    }
  }
} as const

//eslint-disable-next-line
const graphQLMockWithIcon: any = {
  __typename: 'StaticContentBlock',
  title: 'Personal data request',
  content: {
    json: {
      data: {},
      content: [
        {
          data: {},
          content: [
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: 'Personal data you’ve provided',
                      nodeType: 'text'
                    }
                  ],
                  nodeType: 'paragraph'
                }
              ],
              nodeType: 'list-item'
            },
            {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      marks: [],
                      value: 'Your order history at Atida Plus',
                      nodeType: 'text'
                    }
                  ],
                  nodeType: 'paragraph'
                }
              ],
              nodeType: 'list-item'
            }
          ],
          nodeType: 'unordered-list'
        },
        {
          data: {},
          content: [
            {
              data: {},
              marks: [],
              value: '',
              nodeType: 'text'
            }
          ],
          nodeType: 'paragraph'
        }
      ],
      nodeType: 'document'
    }
  },
  icon: {
    __typename: 'Icon',
    ref: 'iconReference'
  }
} as const

const expected = {
  contentType: 'StaticContentBlock',
  title: 'Personal data request',
  content:
    '<ul><li><p>Personal data you’ve provided</p></li><li><p>Your order history at Atida Plus</p></li></ul><p></p>'
}

const expectedWithIcon = {
  contentType: 'StaticContentBlock',
  title: 'Personal data request',
  content:
    '<ul><li><p>Personal data you’ve provided</p></li><li><p>Your order history at Atida Plus</p></li></ul><p></p>',
  icon: 'iconReference'
}

describe(normalizeStaticContentBlock, () => {
  describe('REST', () => {
    it('normalizes the data', () => {
      //@ts-ignore
      const normalizedData = normalizeStaticContentBlock(restMock)
      expect(normalizedData).toEqual(expected)
    })
    it('normalizes the data with icon', () => {
      //@ts-ignore
      const normalizedData = normalizeStaticContentBlock(restMockWithIcon)
      expect(normalizedData).toEqual(expectedWithIcon)
    })
  })
  describe('GraphQL', () => {
    it('normalized the data', () => {
      const normalizedData = normalizeStaticContentBlock(graphQLMock)
      expect(normalizedData).toEqual(expected)
    })
    it('normalized the data with icon', () => {
      const normalizedData = normalizeStaticContentBlock(graphQLMockWithIcon)
      expect(normalizedData).toEqual(expectedWithIcon)
    })
  })
})
