import { PageType } from '~domains/page/types'
import { CmsContentTypes } from '~config/content-types'
import { PageContent } from '../types'
import { PageQuery } from '~generated-graphql'

export const contentfulPageContentGraphQL: { data: PageQuery } = {
  data: {
    pageCollection: {
      items: [
        {
          __typename: 'Page',
          title: 'Homepage',
          slugOne: '',
          slugTwo: '',
          contentBlocksCollection: {
            items: [
              {
                __typename: 'HeroBanner',
                heroBannerTitle: 'Your personal online pharmacy',
                searchPlaceholder: 'What are you looking for?',
                isSponsoredContent: true,
                link: {
                  __typename: 'Link',
                  label: 'view more',
                  url: '/about-us',
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
              },
              {
                __typename: 'HeroBanner',
                heroBannerTitle: 'Your personal online pharmacy',
                searchPlaceholder: 'test placeholder',
                isSponsoredContent: false,
                link: {
                  __typename: 'Link',
                  url: '/some-url',
                  label: 'some'
                },
                text: {
                  __typename: 'HeroBannerText',
                  json: {
                    data: {},
                    content: [],
                    nodeType: 'document'
                  }
                },
                imageAsset: {
                  __typename: 'Asset',
                  title: 'Hero Image',
                  description: 'Hero image',
                  url: 'https://atida.com/Atida_Private_label_wide_STV_1.png'
                }
              },
              {
                __typename: 'CategoryGrid',
                title: 'Shop by category',
                itemsCollection: {
                  items: [
                    {
                      __typename: 'CategoryTile',
                      title: 'Cosmetics & Beauty',
                      color: 'bg-category-beauty',
                      url: 'https://google.de',
                      imageAsset: {
                        __typename: 'Asset',
                        title: 'Cosmetics & Beauty',
                        description: 'Cosmetics & Beauty',
                        url:
                          '//images.ctfassets.net/7g2w796onies/h042FsWiZImPOQnccxPzO/d7b12119f74eaf3bfec9626b5a4f17c4/Cosmetics___Beauty.png'
                      }
                    },
                    {
                      __typename: 'CategoryTile',
                      title: 'Personal care',
                      color: 'bg-category-personal-care',
                      url: '/',
                      imageAsset: {
                        __typename: 'Asset',
                        title: 'Personal care',
                        description: 'Personal care',
                        url:
                          '//images.ctfassets.net/7g2w796onies/6lL3GTSipzBGf3K67argHx/d929e7d3cc7163336e68524a1ac8fa8f/Personal_care.png'
                      }
                    },
                    {
                      __typename: 'CategoryTile',
                      title: 'Promotions',
                      color: 'bg-secondary-portland-orange',
                      url: '/'
                    }
                  ]
                }
              },
              {
                __typename: 'ContentBlockWithImage',
                title: 'Any questions?',
                image: {
                  __typename: 'Asset',
                  title: 'Contact image',
                  description: 'Person looking at a tablet',
                  url:
                    'https://atida.com/adam-winger-iirbrh939yc-unsplash_1.jpg',
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
                }
              }
            ]
          },
          referencedContent: null,
          contentfulMetadata: {
            tags: [{ id: 'country-pt' }]
          }
        }
      ]
    }
  }
}

export const contentfulPageContentNormalized: PageContent = {
  type: PageType.Content,
  title: 'Homepage',
  slug: '',
  allSlugs: {
    'pt-pt': ''
  },
  isCampaignPage: false,
  contentBlocks: [
    {
      contentType: CmsContentTypes.HERO_BANNER,
      title: 'Your personal online pharmacy',
      searchPlaceholder: 'What are you looking for?',
      isSponsoredContent: true,
      link: {
        label: 'view more',
        url: '/about-us',
        content: ''
      },
      text: '<p>Atida private label</p>',
      image: {
        title: 'Hero Image',
        alt: 'Hero image',
        url: 'https://atida.com/Atida_Private_label_wide_STV_1.png'
      },
      sponsoredContentPosition: 1
    },
    {
      contentType: CmsContentTypes.HERO_BANNER,
      title: 'Your personal online pharmacy',
      searchPlaceholder: 'test placeholder',
      link: {
        label: 'some',
        url: '/some-url',
        content: ''
      },
      text: '',
      image: {
        title: 'Hero Image',
        alt: 'Hero image',
        url: 'https://atida.com/Atida_Private_label_wide_STV_1.png'
      },
      isSponsoredContent: false
    },
    {
      contentType: CmsContentTypes.CATEGORY_GRID,
      title: 'Shop by category',
      items: [
        {
          title: 'Cosmetics & Beauty',
          color: 'bg-category-beauty',
          image: {
            title: 'Cosmetics & Beauty',
            alt: 'Cosmetics & Beauty',
            url:
              '//images.ctfassets.net/7g2w796onies/h042FsWiZImPOQnccxPzO/d7b12119f74eaf3bfec9626b5a4f17c4/Cosmetics___Beauty.png'
          },
          url: 'https://google.de'
        },
        {
          title: 'Personal care',
          color: 'bg-category-personal-care',
          image: {
            title: 'Personal care',
            alt: 'Personal care',
            url:
              '//images.ctfassets.net/7g2w796onies/6lL3GTSipzBGf3K67argHx/d929e7d3cc7163336e68524a1ac8fa8f/Personal_care.png'
          },
          url: '/'
        },
        {
          title: 'Promotions',
          color: 'bg-secondary-portland-orange',
          url: '/'
        }
      ],
      viewType: 'Slider'
    },
    {
      contentType: CmsContentTypes.CONTENT_BLOCK_WITH_IMAGE,
      header: '',
      title: 'Any questions?',
      image: {
        title: 'Contact image',
        description: 'Person looking at a tablet',
        url: 'https://atida.com/adam-winger-iirbrh939yc-unsplash_1.jpg',
        type: 'image/jpeg'
      },
      imageOnTheLeft: false,
      content:
        '<p>We&#39;re here to help. Ask about our products or get expert medical advice.</p>',
      cta: {
        label: 'Chat with an expert',
        url: '/contact',
        icon: 'NavAdvice24',
        content: ''
      },
      textLink: {
        label: 'Read our FAQ',
        url: '/faq',
        content: ''
      },
      backgroundColor: 'secondary-dark-sky-blue',
      textColor: 'primary-white',
      isSponsoredContent: false,
      titleTypography: 'heading',
      imageSize: 'large',
      textAlignmentForMobile: 'left',
      showDescription: true,
      buttonVariant: 'primary',
      buttonWidthForMobile: 'auto',
      buttonPositionForTablet: 'right'
    }
  ]
}
