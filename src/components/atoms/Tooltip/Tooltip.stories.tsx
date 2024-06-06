import { Tooltip, TooltipProps } from './index'

export default {
  component: Tooltip,
  title: 'atoms/Tooltip',
  args: {
    children: 'button',
    content: 'example text tooltip',
    delay: 200
  }
}

export const Basic = (args: TooltipProps): JSX.Element => <Tooltip {...args} />
