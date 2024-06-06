import { USPCard } from '.'
import { USPCardProps } from './USPCard'

export default {
  component: USPCard,
  title: 'molecules/USPCard',
  args: {
    title: 'Your trusted personal pharmacy expert-Pt',
    items: [
      {
        icon: 'Scan24',
        text: 'Free delivery above €49-Pt'
      },
      {
        icon: 'Return24',
        text: 'Free returns-Pt'
      },
      {
        icon: 'NavAdvice24',
        text: 'Personal help from our pharmacy team or a very looooong text'
      }
    ]
  }
}

export const basic = (args: USPCardProps): JSX.Element => <USPCard {...args} />
