export const promotions = {
  total: 1,
  items: [
    {
      title: 'Make the most of your money',
      id: '1',
      description: 'Free product with every purchase',
      color: 'category-medicine',
      teaserDescription: 'Free product with every purchase',
      isContentWithImage: true,
      url: 'promotions/avene',
      image: {
        description: '',
        title: 'Beauty Category Image',
        url: 'https://source.unsplash.com/random/448x228?sig=0',
        type: 'image/png'
      }
    }
  ]
}

export const contentfulPromotion = {
  data: {
    promotionCollection: {
      total: 8,
      items: [
        {
          __typename: 'Promotion',
          title: 'Marjolein Test promo',
          id: 'marjolein.test',
          isContentWithImage: true,
          description: {
            __typename: 'PromotionDescription',
            json: {
              data: {},
              content: [
                {
                  data: {},
                  content: [
                    {
                      data: {},
                      // @ts-ignore
                      marks: [],
                      value: 'This is a test promotion 50% of Tropicania',
                      nodeType: 'text'
                    }
                  ],
                  nodeType: 'paragraph'
                }
              ],
              nodeType: 'document'
            }
          },
          teaserDescription: 'Whoop whoop',
          color: {
            __typename: 'Color',
            ref: 'category-personal-care'
          },
          image: {
            __typename: 'Asset',
            url:
              'https://images.ctfassets.net/7g2w796onies/2FxL8j1drC2fIORm0MPbas/d151066571b4b7d4e8024909abf54afb/AVene.png'
          },
          categoriesCollection: {
            items: [
              {
                __typename: 'Category',
                id: 'beauty'
              },
              {
                __typename: 'Category',
                id: 'beauty_body'
              }
            ]
          },
          validFrom: '2021-06-04T00:00:00.000+02:00',
          validTo: '2021-06-11T00:00:00.000+02:00',
          label: 'Whoop whoop',
          url: {
            pageCollection: {
              items: [
                {
                  __typename: 'Page',
                  slug: 'marjolein-test-promo',
                  referencedContent: {
                    __typename: 'Promotion',
                    id: 'marjolein.test'
                  }
                }
              ]
            }
          },
          labelsCollection: {
            items: [
              {
                __typename: 'Translation',
                key: 'campaign-promo.black-friday.promo.2021',
                value: 'Whoop whoop'
              },
              {
                __typename: 'Translation',
                key: 'promo.black-friday',
                value: 'Whoop whoop 2'
              }
            ]
          }
        }
      ]
    }
  }
}

export const normalizedPromotion = {
  items: [
    {
      title: 'Make the most of your money',
      id: '1',
      description: 'Free product with every purchase',
      color: 'category-medicine',
      teaserDescription: 'Free product with every purchase',
      isContentWithImage: false,
      url: 'promotions/avene',
      image: {
        description: '',
        title: 'Beauty Category Image',
        url:
          '//images.ctfassets.net/7g2w796onies/2eBa8I8ATi8KEN5Sf4Ubu6/991b2273ce2b8b5159e8147a08751371/category-header-sample.png',

        type: 'image/png'
      }
    }
  ]
}

export const contentfulPromotionPage = {
  data: {
    pageCollection: {
      items: [
        {
          fields: {
            __typename: 'Promotion',
            title: 'Make the most of your money',
            id: '1',
            description: {
              content: [
                {
                  content: {
                    value: 'Free product with every purchase'
                  }
                }
              ]
            },
            color: {
              fields: {
                ref: 'category-medicine'
              }
            },
            teaserDescription: 'Free product with every purchase',
            url: {
              pageCollection: {
                items: [
                  {
                    slug: ''
                  }
                ]
              }
            },
            image: {
              fields: {
                title: 'Beauty Category Image',
                description: '',
                file: {
                  url:
                    '//images.ctfassets.net/7g2w796onies/2eBa8I8ATi8KEN5Sf4Ubu6/991b2273ce2b8b5159e8147a08751371/category-header-sample.png',
                  fileName: 'category-header-sample.png',
                  contentType: 'image/png'
                }
              }
            }
          }
        }
      ]
    }
  }
}
