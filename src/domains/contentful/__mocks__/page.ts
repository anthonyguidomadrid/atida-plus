export const contentfulPage = {
  fields: {
    title: 'some title',
    slug: '/some-slug',
    pageType: 'Category',
    referencedContent: {
      fields: {
        title: 'Medicines',
        level: 0,
        id: 'medicines',
        subcategories: [
          {
            fields: {
              title: 'Digestion',
              level: 1,
              id: 'medicines_digestion',
              color: {
                fields: {
                  ref: 'category-beauty'
                }
              },
              image: {
                fields: {
                  title: 'Beauty Category Image',
                  file: {
                    url:
                      '//images.ctfassets.net/7g2w796onies/2eBa8I8ATi8KEN5Sf4Ubu6/991b2273ce2b8b5159e8147a08751371/category-header-sample.png',
                    fileName: 'category-header-sample.png',
                    contentType: 'image/png'
                  }
                }
              }
            }
          },
          {
            fields: {
              title: 'Allergy',
              level: 1,
              id: 'medicines_allergy',
              color: {
                fields: {
                  ref: 'primary-caribbean-green-light'
                }
              }
            }
          },
          {
            fields: {
              title: 'Diabetes',
              level: 1,
              id: 'medicines_diabetes',
              color: {
                fields: {
                  ref: 'primary-caribbean-green-light'
                }
              }
            }
          }
        ],
        color: {
          fields: {
            ref: 'category-beauty'
          }
        },
        image: {
          fields: {
            title: 'Beauty Category Image',
            file: {
              url:
                '//images.ctfassets.net/7g2w796onies/2eBa8I8ATi8KEN5Sf4Ubu6/991b2273ce2b8b5159e8147a08751371/category-header-sample.png',
              details: [Object],
              fileName: 'category-header-sample.png',
              contentType: 'image/png'
            }
          }
        }
      }
    },
    contentBlocks: {},
    seo: {}
  }
}
