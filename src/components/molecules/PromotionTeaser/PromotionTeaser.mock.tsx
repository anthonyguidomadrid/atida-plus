import { PromotionTeaserType } from './PromotionTeaser'
import { InfoLabelEnum } from '~domains/product/types'

export const category = {
  id: 'medicines',
  title: 'Medicine',
  color: 'category-medicines',
  level: 0,
  url: '/medicines',
  image: {
    title: '',
    description: '',
    type: '',
    url:
      'https://images.ctfassets.net/7g2w796onies/2eBa8I8ATi8KEN5Sf4Ubu6/991b2273ce2b8b5159e8147a08751371/category-header-sample.png'
  }
}

export const promotionTeaser: PromotionTeaserType = {
  name: 'Make the most of your money',
  shortDescription: 'Free product with every purchase',
  categoryColor: category.color,
  teaserImage: {
    title: '',
    description: '',
    type: undefined,
    url: 'https://source.unsplash.com/random/448x228?sig=0'
  },
  teaserType: true,
  url: '/',
  labels: [
    {
      type: InfoLabelEnum.Promotion,
      label: '-15% desc.'
    },
    {
      type: InfoLabelEnum.CampaignPromotion,
      label: 'Gift'
    }
  ]
}
