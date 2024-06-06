import { RewardTypes } from '~components/atoms/Reward/types'

export const defaultGridRewards = [
  {
    claimed: true,
    content: 'We added 2,50 € discount to your next order',
    cta: 'Get your gift',
    title: 'Welcome gift',
    type: 'basic' as RewardTypes,
    value: 250
  },
  {
    claimed: false,
    content: 'Get 5,00 € Cash every year on your birthday',
    cta: 'Tell us your birthday',
    title: '5,00 € Birthday Gift',
    type: 'basic' as RewardTypes,
    value: 500
  },
  {
    claimed: false,
    content: 'Get 4,00 € Cash every year on your account birthday',
    cta: 'Get your gift',
    title: '4,00 € Aniversary Gift',
    type: 'basic' as RewardTypes,
    value: 400
  }
]
export const defaultListRewards = [
  {
    claimed: false,
    content: 'Tell us what you think and earn 2,50 € on each review',
    cta: 'Write a review',
    title: 'Submit a review',
    type: 'advanced' as RewardTypes,
    value: 250
  },
  {
    claimed: true,
    content: 'With your first order you get free Atida Coins.',
    cta: 'Subscribe to the newsletter',
    title: 'Newsletter subscription',
    type: 'advanced' as RewardTypes,
    value: 300
  }
]
