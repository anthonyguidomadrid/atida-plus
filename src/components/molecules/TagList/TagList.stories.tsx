import { Story } from '@storybook/react/types-6-0'
import { TagList, TagListProps } from '.'
import { Tag } from '~components/atoms/Tag'

export default {
  component: TagList,
  title: 'molecules/TagList'
}

const generateTagChildren = (amount: number) =>
  new Array(amount)
    .fill(0)
    .map((_, idx) => idx + 1)
    .map(number => (
      <Tag
        key={`#nav-item-${number}`}
        href={`#nav-item-${number}`}
      >{`Nav Item ${number}`}</Tag>
    ))

const Template: Story<TagListProps> = (args: TagListProps) => (
  <TagList {...args} />
)

export const fewTags = Template.bind({})
fewTags.args = {
  children: generateTagChildren(5)
}

export const moreTags = Template.bind({})
moreTags.args = {
  children: generateTagChildren(10)
}

export const manyMoreTags = Template.bind({})
manyMoreTags.args = {
  children: generateTagChildren(99)
}
