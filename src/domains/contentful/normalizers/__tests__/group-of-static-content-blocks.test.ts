import { normalizeGroupOfStaticContentBlocks } from '../group-of-static-content-blocks'

const contentBlockWithImage = {
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
  imageOnTheLeft: false,
  isSponsoredContent: false
} as const

const graphQLMockAccordion = {
  __typename: 'GroupOfStaticContentBlocks',
  title: 'Frequently asked questionsrs',
  type: 'Accordion',
  staticContentBlocksCollection: {
    items: [
      {
        __typename: 'StaticContentBlock',
        title: 'How do I earn Atida cash rewards?',
        content: {
          json: {
            nodeType: 'document',
            data: {},
            content: [
              {
                nodeType: 'heading-2',
                data: {},
                content: [
                  {
                    nodeType: 'text',
                    value: 'Nam venenatis',
                    marks: [],
                    data: {}
                  }
                ]
              },
              {
                nodeType: 'paragraph',
                data: {},
                content: [
                  {
                    nodeType: 'text',
                    value:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et massa convallis, feugiat odio eget, mollis risus. Nunc a efficitur orci. Nam lacinia commodo ipsum, non blandit velit euismod in. Aliquam non dui nec tortor tincidunt consequat vel a massa. Suspendisse viverra luctus euismod. Donec vitae posuere leo. Ut posuere elementum libero eu fringilla. Suspendisse at pulvinar risus. Pellentesque eget bibendum dui, in feugiat odio. Maecenas fermentum ipsum sed tincidunt posuere.',
                    marks: [],
                    data: {}
                  }
                ]
              }
            ]
          }
        }
      },
      {
        __typename: 'StaticContentBlock',
        title: 'What are Atida cash rewards??',
        content: {
          json: {
            nodeType: 'document',
            data: {},
            content: [
              {
                nodeType: 'heading-2',
                data: {},
                content: [
                  {
                    nodeType: 'text',
                    value: 'Nam venenatis',
                    marks: [],
                    data: {}
                  }
                ]
              },
              {
                nodeType: 'paragraph',
                data: {},
                content: [
                  {
                    nodeType: 'text',
                    value:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et massa convallis, feugiat odio eget, mollis risus. Nunc a efficitur orci. Nam lacinia commodo ipsum, non blandit velit euismod in. Aliquam non dui nec tortor tincidunt consequat vel a massa. Suspendisse viverra luctus euismod. Donec vitae posuere leo. Ut posuere elementum libero eu fringilla. Suspendisse at pulvinar risus. Pellentesque eget bibendum dui, in feugiat odio. Maecenas fermentum ipsum sed tincidunt posuere.',
                    marks: [],
                    data: {}
                  }
                ]
              }
            ]
          }
        }
      }
    ]
  }
} as const

const graphQLMockBulletPoints = {
  __typename: 'GroupOfStaticContentBlocks',
  title: 'Frequently asked questionsrs',
  type: 'Bullet points',
  staticContentBlocksCollection: {
    items: [
      {
        __typename: 'StaticContentBlock',
        title: 'How do I earn Atida cash rewards?',
        content: {
          json: {
            nodeType: 'document',
            data: {},
            content: [
              {
                nodeType: 'heading-2',
                data: {},
                content: [
                  {
                    nodeType: 'text',
                    value: 'Nam venenatis',
                    marks: [],
                    data: {}
                  }
                ]
              },
              {
                nodeType: 'paragraph',
                data: {},
                content: [
                  {
                    nodeType: 'text',
                    value:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et massa convallis, feugiat odio eget, mollis risus. Nunc a efficitur orci. Nam lacinia commodo ipsum, non blandit velit euismod in. Aliquam non dui nec tortor tincidunt consequat vel a massa. Suspendisse viverra luctus euismod. Donec vitae posuere leo. Ut posuere elementum libero eu fringilla. Suspendisse at pulvinar risus. Pellentesque eget bibendum dui, in feugiat odio. Maecenas fermentum ipsum sed tincidunt posuere.',
                    marks: [],
                    data: {}
                  }
                ]
              }
            ]
          }
        },
        icon: {
          __typename: 'Icon',
          ref: 'iconReference'
        }
      },
      {
        __typename: 'StaticContentBlock',
        title: 'What are Atida cash rewards??',
        content: {
          json: {
            nodeType: 'document',
            data: {},
            content: [
              {
                nodeType: 'heading-2',
                data: {},
                content: [
                  {
                    nodeType: 'text',
                    value: 'Nam venenatis',
                    marks: [],
                    data: {}
                  }
                ]
              },
              {
                nodeType: 'paragraph',
                data: {},
                content: [
                  {
                    nodeType: 'text',
                    value:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et massa convallis, feugiat odio eget, mollis risus. Nunc a efficitur orci. Nam lacinia commodo ipsum, non blandit velit euismod in. Aliquam non dui nec tortor tincidunt consequat vel a massa. Suspendisse viverra luctus euismod. Donec vitae posuere leo. Ut posuere elementum libero eu fringilla. Suspendisse at pulvinar risus. Pellentesque eget bibendum dui, in feugiat odio. Maecenas fermentum ipsum sed tincidunt posuere.',
                    marks: [],
                    data: {}
                  }
                ]
              }
            ]
          }
        },
        icon: {
          __typename: 'Icon',
          ref: 'iconReference'
        }
      },
      {
        __typename: 'StaticContentBlock',
        title: 'What are Atida cash rewards??',
        content: {
          json: {
            nodeType: 'document',
            data: {},
            content: [
              {
                nodeType: 'heading-2',
                data: {},
                content: [
                  {
                    nodeType: 'text',
                    value: 'Nam venenatis',
                    marks: [],
                    data: {}
                  }
                ]
              },
              {
                nodeType: 'paragraph',
                data: {},
                content: [
                  {
                    nodeType: 'text',
                    value:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et massa convallis, feugiat odio eget, mollis risus. Nunc a efficitur orci. Nam lacinia commodo ipsum, non blandit velit euismod in. Aliquam non dui nec tortor tincidunt consequat vel a massa. Suspendisse viverra luctus euismod. Donec vitae posuere leo. Ut posuere elementum libero eu fringilla. Suspendisse at pulvinar risus. Pellentesque eget bibendum dui, in feugiat odio. Maecenas fermentum ipsum sed tincidunt posuere.',
                    marks: [],
                    data: {}
                  }
                ]
              }
            ]
          }
        },
        icon: {
          __typename: 'Icon',
          ref: 'iconReference'
        }
      }
    ]
  }
} as const

const graphQLMockSlider = {
  __typename: 'GroupOfStaticContentBlocks',
  title: 'Frequently asked questionsrs',
  type: 'Slider',
  staticContentBlocksCollection: {
    items: [contentBlockWithImage, contentBlockWithImage, contentBlockWithImage]
  }
} as const

const nullGraphQLMock = {
  __typename: 'GroupOfStaticContentBlocks',
  title: 'Frequently asked questions',
  contentBlocksCollection: {
    items: [null, null]
  }
} as const

describe(normalizeGroupOfStaticContentBlocks, () => {
  describe('GraphQL group of static content blocks', () => {
    it('pulls out the container of static content blocks - Accordion', () => {
      expect(
        normalizeGroupOfStaticContentBlocks(graphQLMockAccordion)
      ).toMatchSnapshot()
    })
    it('pulls out the container of static content blocks - Bullet points', () => {
      expect(
        normalizeGroupOfStaticContentBlocks(graphQLMockBulletPoints)
      ).toMatchSnapshot()
    })
    it('pulls out the container of content blocks with image - Slider', () => {
      expect(
        normalizeGroupOfStaticContentBlocks(graphQLMockSlider)
      ).toMatchSnapshot()
    })
  })
  describe('GraphQL null blocks', () => {
    it('does not error', () => {
      expect(
        normalizeGroupOfStaticContentBlocks(nullGraphQLMock)
      ).toMatchSnapshot()
    })
  })
})
