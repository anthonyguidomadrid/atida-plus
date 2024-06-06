import { Tag, TagProps } from '.'

export default {
  component: Tag,
  title: 'atoms/Tag',
  args: {
    href: '#',
    children: 'Nav item 6'
  }
}

export const basic = (args: TagProps): JSX.Element => <Tag {...args} />
