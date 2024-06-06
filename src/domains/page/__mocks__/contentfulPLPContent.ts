import { CmsContentTypes } from '~config/content-types'
import { PageContent, PageType } from '../types'

export const PLPContent: PageContent = {
  type: PageType.POP,
  title: 'Digestion',
  slug: 'medicines/digestion',
  allSlugs: {
    'pt-pt': 'medicines/digestion'
  },
  heroHeader: {
    contentType: CmsContentTypes.HERO_BANNER,
    title: 'Title of hero banner here',
    isSponsoredContent: false,
    text: '<p>The text of the hero banner!</p>',
    image: {
      title: 'Another nice plant',
      alt: 'Another nice plant',
      url:
        'https://images.ctfassets.net/7g2w796onies/3BQlm6YVxESWNMTsxk61sL/89937dd4718d2eb66a389b0df613df6a/IMG_1518.jpg'
    }
  },
  isCampaignPage: false,
  contentBlocks: [],
  referencedContent: {
    color: 'category-beauty',
    title: 'Digestion',
    id: 'Medicines > Digestion',
    level: 1,
    image: {
      url:
        '//images.ctfassets.net/7g2w796onies/3Pa3xwIiNIsKGQB2SE2KYy/9045bf905aba7e22e69054b4419c58a9/category-header-sample.png'
    },
    path: {
      id0: 'medicines',
      id1: 'Medicines > Digestion'
    }
  },
  category: {
    color: 'category-beauty',
    id: 'Medicines > Digestion',
    title: 'Digestion',
    level: 1,
    image: {
      url:
        '//images.ctfassets.net/7g2w796onies/3Pa3xwIiNIsKGQB2SE2KYy/9045bf905aba7e22e69054b4419c58a9/category-header-sample.png'
    },
    path: {
      id0: 'medicines',
      id1: 'Medicines > Digestion'
    }
  }
}
