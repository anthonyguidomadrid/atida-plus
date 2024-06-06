import { Menu } from '~domains/contentful'

export const languages = [
  { value: 'en', label: 'English' },
  { value: 'pt', label: 'Portuguese' }
]

export const termsConditionsLinks: Menu = {
  id: '',
  title: 'Minimal Footer Terms & Conditions Links',
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
