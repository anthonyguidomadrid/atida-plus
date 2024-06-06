import {
  CmsContainerContentTypes,
  CmsContentTypes
} from '~config/content-types'

export const containerOfContentBlocks = {
  contentType: CmsContentTypes.CONTAINER_OF_CONTENT_BLOCKS,
  title: 'Home page container of content blocks',
  blocks: [
    {
      contentType: CmsContainerContentTypes.MARKETING_TEASER,
      title: 'Save over 50% with Atida Plus',
      description: 'Free product with every purchase',
      labelText: 'Exclusive Offer',
      labelColor: 'primary-prime',
      backgroundColor: 'category-nutrition-exercise-and-weight-loss',
      image: {
        title: '',
        url: 'https://source.unsplash.com/random/448x228?sig=0'
      },
      url: '/',
      hasButton: false
    },
    {
      contentType: CmsContainerContentTypes.MARKETING_TEASER,
      title: 'Boost your immunity',
      description: 'High quality vitamins for a low price. ',
      labelText: '20% Discount',
      labelColor: 'secondary-portland-orange',
      backgroundColor: 'category-beauty',
      image: {
        title: '',
        url: 'https://source.unsplash.com/random/448x228?sig=0'
      },
      url: '/',
      hasButton: true
    },
    {
      contentType: CmsContentTypes.PROMOTION,
      name: 'Make the most of your money',
      shortDescription: 'Free product with every purchase',
      categoryColor: 'category-medicines',
      teaserImage: {
        title: '',
        description: '',
        type: undefined,
        url: 'https://source.unsplash.com/random/448x228?sig=0'
      },
      teaserType: true,
      url: '/',
      validFrom: '2021-01-01T00:00:01',
      validTo: '2024-01-01T00:00:01'
    }
  ]
}
