import { MarketingTeaser, MarketingTeaserProps } from '.'
import { marketingTeaser } from './MarketingTeaser.mock'

export default {
  component: MarketingTeaser,
  title: 'molecules/MarketingTeaser',
  parameters: { layout: 'fullscreen' },
  args: {
    ...marketingTeaser
  }
}

export const withContentFromDesign = (
  args: MarketingTeaserProps
): JSX.Element => <MarketingTeaser {...args} />
