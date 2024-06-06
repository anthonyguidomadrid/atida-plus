import { PageContent, PageType } from '../types'

export const promoPage: PageContent = {
  type: PageType.PromoDP,
  title: 'Make your skin shine with Avène',
  slug: 'medicines/digestion',
  contentBlocks: [],
  category: {
    color: 'category-beauty',
    id: 'Medicines > Digestion',
    level: 1,
    image: {
      title: '',
      description: '',
      type: '',
      url:
        '//images.ctfassets.net/7g2w796onies/3Pa3xwIiNIsKGQB2SE2KYy/9045bf905aba7e22e69054b4419c58a9/category-header-sample.png'
    }
  },
  promotion: {
    title: 'Make your skin shine with Avène',
    id: 'Jason 10% off update1',
    description: 'Free product with every purchase',
    teaserDescription: 'Free product with every purchase',
    color: 'category-beauty',
    isContentWithImage: true,
    image: {
      title: 'Avène',
      description: 'Make your skin shine with Avène',
      url:
        'https://images.ctfassets.net/7g2w796onies/2FxL8j1drC2fIORm0MPbas/d151066571b4b7d4e8024909abf54afb/AVene.png',
      type: ''
    }
  }
}
