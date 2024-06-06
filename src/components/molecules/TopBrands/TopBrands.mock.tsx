import { CmsContentTypes } from '~config/content-types'

const randomImage = () => {
  const randomUrl = Math.random().toString(36)
  return `https://avatars.dicebear.com/4.5/api/avataaars/${randomUrl}.svg?options[mouth][]=smile&options[eyes][]=happy`
}

export const brandTiles = {
  contentType: CmsContentTypes.TOP_BRANDS as const,
  title: 'Our top brands',
  items: [
    {
      title: 'L`Oréal',
      logoImage: {
        title: '',
        alt: '',
        url: 'https://source.unsplash.com/random/208x208?sig=0'
      },
      url: 'http://google.de'
    },
    {
      title: 'Unilever',
      logoImage: {
        title: '',
        alt: '',
        url: 'https://source.unsplash.com/random/8x108?sig=0'
      },
      url: ''
    },
    {
      title: 'Estée Lauder',
      logoImage: {
        title: '',
        alt: '',
        url: 'https://source.unsplash.com/random/48x48?sig=0'
      },
      url: '/test-url'
    },
    {
      title: 'Proctor and Gamble',
      logoImage: {
        title: '',
        alt: '',
        url: 'https://source.unsplash.com/random/68x38?sig=0'
      },
      url: ''
    },
    {
      title: 'Coty',
      logoImage: {
        title: '',
        alt: '',
        url: 'https://source.unsplash.com/random/38x68?sig=0'
      },
      url: '/'
    },
    {
      title: 'Shiseido',
      logoImage: { title: '', alt: '', url: randomImage() },
      url: '/'
    },
    {
      title: 'Beiersdorf',
      logoImage: { title: '', alt: '', url: randomImage() },
      url: '/'
    }
  ]
}
