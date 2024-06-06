import { Menu } from '~domains/contentful'

export const importantLinks: Menu = {
  id: '',
  title: 'Page Footer - Important Links',
  items: [
    {
      id: '',
      link: {
        label: 'About us',
        url: '/about-us',
        content: ''
      }
    },
    {
      id: '',
      link: {
        label: 'Delivery & return',
        url: '/delivery-and-return',
        content: ''
      }
    },
    {
      id: '',
      link: {
        label: 'Our philosophy',
        url: '/our-philosophy',
        content: ''
      }
    },
    {
      id: '',
      link: {
        label: 'Promotions',
        url: '/promotions',
        content: ''
      }
    },
    {
      id: '',
      link: {
        label: 'Atida Health Pass',
        url: '/atida-health-pass',
        content: ''
      }
    },
    {
      id: '',
      link: {
        label: 'Blog',
        url: '/blog',
        content: ''
      }
    }
  ]
}

export const serviceContactLinks: Menu = {
  id: '',
  title: 'Service & contact',
  items: [
    {
      id: '',
      link: {
        label: 'Chat with our experts',
        url: '/chat',
        icon: 'NavAdvice24',
        content: '<p>Mo - Fr 9:00 - 18:00</p>'
      }
    },
    {
      id: '',
      link: {
        label: 'Call us 0049 1234 56 78',
        url: '/call-us',
        icon: 'Telephone24',
        content:
          '<p>Free of charge</p><p>Mo - Fr 9:00 - 18:00</p><p>Sa 9:00 - 13:00</p>'
      }
    },
    {
      id: '',
      link: {
        label: 'Let us call you back',
        url: '/call-you',
        icon: 'Return24',
        content: ''
      }
    },
    {
      id: '',
      link: {
        label: 'Mail us',
        url: '/mail',
        icon: 'Mail24',
        content: ''
      }
    }
  ]
}

export const newsletterBlockTitle = 'Newsletter'

export const newsletterSellingPoints = [
  'Exclusive promotions',
  'Individual recommendations',
  'Helpful health tips'
]

export const countries = [
  { value: 'PT', label: 'Portugal' },
  { value: 'DE', label: 'Germany' }
]

export const languages = [
  { value: 'en', label: 'English' },
  { value: 'pt', label: 'Portuguese' }
]

export const termsConditionsLinks: Menu = {
  id: '',
  title: 'Footer Terms & Conditions Links',
  items: [
    {
      id: '',
      link: {
        label: 'Terms & conditions',
        url: '/terms',
        content: ''
      }
    },
    {
      id: '',
      link: {
        label: 'Privacy',
        url: '/privacy',
        content: ''
      }
    },
    {
      id: '',
      link: {
        label: 'Imprint',
        url: '/imprint',
        content: ''
      }
    }
  ]
}

export const copyright = '<p><a href="https://atida.com/">© Atida</a></p>'

export const providerBlocks = [
  {
    title: 'Secure payment',
    content: '<p>Including billing and pre-payment</p>',
    icons: [
      'PaymentSepa',
      'PaymentVisa',
      'PaymentMastercard',
      'PaymentPaypal',
      'PaymentAmazon',
      'PaymentSofort'
    ],
    links: undefined
  },
  {
    title: 'Fast delivery',
    content: '<p>Delivery within 2 days - same day delivery in Berlin</p>',
    icons: ['DeliveryDhl', 'DeliveryHermes'],
    links: undefined
  },
  {
    title: 'Trusted shop',
    content: '<p>We only offer secure and trusted payment methods</p>',
    icons: ['QualityETrustedShops'],
    links: undefined
  }
]

export const socialMediaLinks = [
  {
    title: 'Stay connected',
    content: '',
    links: [
      {
        content: '',
        icon: 'Facebook',
        label: 'Facebook',
        url: 'https://www.facebook.com/AtidaPT'
      },
      {
        content: '',
        icon: 'Instagram',
        label: 'Instagram',
        url: 'https://www.instagram.com/atida_pt/'
      }
    ]
  }
]
