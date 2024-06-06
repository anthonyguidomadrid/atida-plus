import { InfoLabel, ProductLabelProps } from '.'
import { InfoLabelEnum as ProductLabelType } from '~domains/product'

export default {
  component: InfoLabel,
  title: 'atoms/InfoLabel'
}

export const infoLabel = (args: ProductLabelProps): JSX.Element => (
  <div className="w-20 h-20 flex justify-center items-center">
    <InfoLabel {...args} />
  </div>
)
infoLabel.argTypes = {
  variant: {
    control: {
      type: 'select',
      options: Object.values(ProductLabelType).filter(
        type => type !== ProductLabelType.CampaignPromotion
      )
    }
  },
  label: { table: { disable: true } }
}
infoLabel.args = {
  variant: 'promotion',
  children: 'Short Info Text'
}
