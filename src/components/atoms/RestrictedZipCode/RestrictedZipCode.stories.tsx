import { Story } from '@storybook/react/types-6-0'
import { RestrictedZipCode, RestrictedZipCodeProps } from './index'

export default {
  component: RestrictedZipCode,
  title: 'atoms/RestrictedZipCode'
}

const Template: Story<RestrictedZipCodeProps> = (
  args: RestrictedZipCodeProps
) => <RestrictedZipCode {...args} />

export const zipCodeWarning = Template.bind({})
zipCodeWarning.args = {
  notificationType: 'warning'
}

export const zipCodeError = Template.bind({})
zipCodeError.args = {
  notificationType: 'error'
}
