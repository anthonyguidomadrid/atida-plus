import { CmsContentTypes } from '~config/content-types'

const randomImage = () => {
  const randomUrl = Math.random().toString(36)
  return `https://avatars.dicebear.com/4.5/api/avataaars/${randomUrl}.svg?options[mouth][]=smile&options[eyes][]=happy`
}

export const categoryTiles = {
  contentType: CmsContentTypes.CATEGORY_GRID as const,
  title: 'Shop by category',
  items: [
    {
      title: 'Cosmetics & Beauty',
      color: 'bg-category-beauty',
      image: {
        title: '',
        alt: 'Random Image 1',
        url: 'https://source.unsplash.com/random/25x91?sig=0'
      },
      url: 'http://google.de'
    },
    {
      title: 'Personal care',
      color: 'bg-category-personal-care',
      image: {
        title: '',
        alt: '',
        url: 'https://source.unsplash.com/random/8x108?sig=0'
      },
      url: '/'
    },
    {
      title: 'Vitamines & supplements',
      color: 'bg-category-vitamins-and-supplements',
      image: {
        title: '',
        alt: '',
        url: 'https://source.unsplash.com/random/48x48?sig=0'
      },
      url: '/'
    },
    {
      title: 'Homeopathy & natural products',
      color: 'bg-category-homeopathy-and-natural-products',
      image: {
        title: '',
        alt: '',
        url: 'https://source.unsplash.com/random/71x99?sig=0'
      },
      url: '/'
    },
    {
      title: 'Nutrition, exercise & weight loss',
      color: 'bg-category-nutrition-exercise-and-weight-loss',
      image: {
        title: '',
        alt: '',
        url: 'https://source.unsplash.com/random/120x50?sig=0'
      },
      url: '/'
    },
    {
      title: 'Baby & Kids',
      color: 'bg-category-baby-and-kids',
      image: {
        title: '',
        alt: '',
        url: randomImage()
      },
      url: '/'
    },
    {
      title: 'Medical supply & orthopedics',
      color: 'bg-category-medical-supply-and-orthopedics',
      image: {
        title: '',
        alt: '',
        url: randomImage()
      },
      url: '/'
    },
    {
      title: 'Pets',
      color: 'bg-category-pets',
      image: {
        title: '',
        alt: '',
        url: randomImage()
      },
      url: '/'
    },
    {
      title: 'Private label',
      color: 'bg-category-private-label',
      image: {
        title: '',
        alt: '',
        url: randomImage()
      },
      url: '/'
    },
    {
      title: 'Gifts',
      color: 'bg-ui-guyabano',
      image: {
        title: '',
        alt: '',
        url: randomImage()
      },
      url: '/'
    },
    {
      title: 'Promotions',
      color: 'bg-secondary-portland-orange',
      image: {
        title: '',
        alt: '',
        url: randomImage()
      },
      url: '/'
    }
  ],
  viewType: 'Grid'
}
