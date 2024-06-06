import { PageContent, PageType } from '../types'

export const brandPage: PageContent = {
  type: PageType.Brand,
  title: 'Avene',
  slug: 'brand/avene',
  brand: {
    title: 'Avene test PT',
    id: 'avene',
    image: {
      url:
        'https://images.ctfassets.net/7g2w796onies/2FxL8j1drC2fIORm0MPbas/9d9fa970019903f207f18a85e09f974b/Avene.jpg'
    }
  },
  contentBlocks: [],
  seo: {
    title: 'Avene SEO',
    description: 'Avene description',
    keywords: 'random keywords',
    copy: '',
    copyExpandable: '<p>avene description brand</p>'
  }
}
