import { ConditionalLink, ConditionalLinkProps } from '.'

export default {
  component: ConditionalLink,
  title: 'atoms/ConditionalLink',
  args: {
    url: '/test-url'
  }
}

export const basic = (args: ConditionalLinkProps): JSX.Element => (
  <ConditionalLink {...args}>
    <p>
      This will be wrapped in a <code>{'<Link>'}</code>
    </p>
  </ConditionalLink>
)
