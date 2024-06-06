import { LinkBlock, LinkBlockProps } from '.'

export default {
  component: LinkBlock,
  title: 'atoms/LinkBlock',
  args: {
    label: 'Some Button',
    url: 'http://www.atida.com'
  },
  argTypes: {
    icon: { control: { disable: true } }
  }
}

type LinkBlockArgs = LinkBlockProps

export const basic = ({ label, url, ...args }: LinkBlockArgs): JSX.Element => (
  <LinkBlock label={label} url={url} {...args} />
)

export const withIcon = ({
  label,
  url,
  ...args
}: LinkBlockArgs): JSX.Element => (
  <LinkBlock label={label} url={url} icon={'PlusLarge'} {...args} />
)
