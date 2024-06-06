import { StaticHeaderBlock } from '.'
import { StaticHeaderBlockProps } from './StaticHeaderBlock'

export default {
  component: StaticHeaderBlock,
  title: 'atoms/StaticHeaderBlock',
  parameters: { layout: 'fullscreen' },
  args: {
    contentType: 'StaticHeaderBlock',
    title: 'Terms and conditions header block'
  }
}

export const withContentFromDesign = (
  args: StaticHeaderBlockProps
): JSX.Element => <StaticHeaderBlock {...args} />
