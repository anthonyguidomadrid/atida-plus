import { CampaignLabel, Props } from '.'

export default {
  component: CampaignLabel,
  title: 'atoms/CampaignLabel',
  args: {
    label: {
      translation: 'Hello World',
      textColor: 'primary-white',
      backgroundColor: 'labels-tangerine-base',
      icon: 'Gift'
    }
  }
}

export const campaignLabel = (args: Props): JSX.Element => (
  <div className="w-20 h-20 flex justify-center items-center">
    <CampaignLabel {...args} />
  </div>
)
