import { GetMenuQuery, PageQuery } from '~generated-graphql'
import { PageContent, PageType } from '../types'

export const contentfulCategoryPageRest = {
  total: 1,
  skip: 0,
  limit: 100,
  items: [
    {
      sys: {
        contentType: {
          sys: { type: 'Link', linkType: 'ContentType', id: 'page' }
        }
      },
      fields: {
        title: 'Digestion',
        slug: 'medicines/digestion',
        category: {
          sys: {
            contentType: {
              sys: { type: 'Link', linkType: 'ContentType', id: 'category' }
            }
          },
          fields: {
            title: 'Digestion',
            id: 'Medicines > Digestion',
            color: {
              sys: {
                contentType: {
                  sys: {
                    type: 'Link',
                    linkType: 'ContentType',
                    id: 'color'
                  }
                }
              },
              fields: { ref: 'category-beauty' }
            },
            image: {
              sys: {
                type: 'Asset'
              },
              fields: {
                title: 'Beauty Category Image',
                file: {
                  url:
                    '//images.ctfassets.net/7g2w796onies/3Pa3xwIiNIsKGQB2SE2KYy/9045bf905aba7e22e69054b4419c58a9/category-header-sample.png',
                  details: { size: 249696, image: { width: 845, height: 336 } },
                  fileName: 'category-header-sample.png',
                  contentType: 'image/png'
                }
              }
            }
          }
        }
      }
    }
  ]
}

export const contentfulCategoryPageGraphQL: { data: PageQuery } = {
  data: {
    pageCollection: {
      items: [
        {
          __typename: 'Page',
          title: 'Digestion',
          slugOne: 'medicines/digestion',
          slugTwo: 'medicines/digestion',
          contentBlocksCollection: {
            items: []
          },
          pageType: 'Category',
          referencedContent: {
            __typename: 'Category',
            title: 'Digestion',
            id: 'Medicines > Digestion',
            level: 1,
            color: {
              __typename: 'Color',
              ref: 'category-beauty'
            },
            image: {
              __typename: 'Asset',
              url:
                '//images.ctfassets.net/7g2w796onies/3Pa3xwIiNIsKGQB2SE2KYy/9045bf905aba7e22e69054b4419c58a9/category-header-sample.png'
            },
            linkedFrom: {
              categoryCollection: {
                items: [
                  {
                    __typename: 'Category',
                    id: 'medicines',
                    linkedFrom: {
                      categoryCollection: {
                        items: [
                          { __typename: 'Category', id: 'medicines/digestion' }
                        ]
                      }
                    }
                  }
                ]
              }
            }
          },
          contentfulMetadata: {
            tags: [{ id: 'country-pt' }]
          }
        }
      ]
    }
  }
}

export const categoryPagePOP: PageContent = {
  type: PageType.POP,
  title: 'Digestion',
  slug: 'medicines/digestion',
  allSlugs: {
    'pt-pt': 'medicines/digestion'
  },
  isCampaignPage: false,
  contentBlocks: [],
  referencedContent: {
    color: 'category-beauty',
    title: 'Digestion',
    id: 'Medicines > Digestion',
    level: 1,
    image: {
      url:
        '//images.ctfassets.net/7g2w796onies/3Pa3xwIiNIsKGQB2SE2KYy/9045bf905aba7e22e69054b4419c58a9/category-header-sample.png'
    },
    path: {
      id0: 'medicines',
      id1: 'Medicines > Digestion',
      title1: 'Digestion'
    }
  },
  category: {
    color: 'category-beauty',
    id: 'Medicines > Digestion',
    title: 'Digestion',
    level: 1,
    image: {
      url:
        '//images.ctfassets.net/7g2w796onies/3Pa3xwIiNIsKGQB2SE2KYy/9045bf905aba7e22e69054b4419c58a9/category-header-sample.png'
    },
    path: {
      id0: 'medicines',
      id1: 'Medicines > Digestion',
      title1: 'Digestion'
    }
  }
}

export const categoryPageCOP = {
  ...categoryPagePOP,
  type: PageType.COP,
  categoryCop: {
    level: 0,
    category: {
      ...categoryPagePOP.category,
      level: 0,
      subcategories: [
        { id: '1', url: '/sub1', title: 'sub1' },
        { id: '2', url: '/sub2', title: 'sub2' }
      ]
    },
    url: '/beauty',
    color: 'beauty-color'
  }
}

export const menuMock = {
  id: 'test-menu',
  title: 'testTitle',
  items: [
    {
      id: 'submenu1',
      title: 'Submenu title 1',
      url: 'test/url'
    },
    {
      id: 'submenu2',
      title: 'Submenu title 2',
      url: 'test/url'
    }
  ]
}

export const menuResponseMock: { data: { data: GetMenuQuery } } = {
  data: {
    data: {
      menuCollection: {
        __typename: 'MenuCollection',
        items: [{ ...menuMock, __typename: 'Menu' }]
      }
    }
  }
}
