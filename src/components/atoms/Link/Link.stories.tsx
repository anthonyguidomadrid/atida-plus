import NextLink from 'next/link'
import { ReactComponent as ChevronLeft } from '~assets/svg/navigation-16px/ChevronLeft.svg'
import { Link, LinkProps } from '.'

export default {
  component: Link,
  title: 'atoms/Link',
  args: {
    href: 'http://www.atida.com',
    content: 'Link',
    className: ''
  },
  argTypes: {
    icon: { control: { disable: true } }
  }
}

type LinkArgs = LinkProps & { content: string }

export const basic = ({ content, href, ...args }: LinkArgs): JSX.Element => (
  <Link href={href} {...args}>
    {content}
  </Link>
)

export const nextLink = ({ content, href, ...args }: LinkArgs): JSX.Element => (
  <NextLink href={href ?? ''} passHref>
    <Link {...args}>{content}</Link>
  </NextLink>
)

export const withIcon = ({ content, href, ...args }: LinkArgs): JSX.Element => (
  <Link href={href} {...args}>
    {content}
  </Link>
)
withIcon.args = {
  icon: <ChevronLeft className="icon-16" />,
  className: 'no-underline font-semibold'
}

export const asButton = ({ content, href, ...args }: LinkArgs): JSX.Element => (
  <Link href={href} {...args}>
    {content}
  </Link>
)
asButton.args = {
  className: 'no-underline cursor-pointer button button--primary font-semibold'
}

export const withCustomColor = ({
  content,
  href,
  ...args
}: LinkArgs): JSX.Element => (
  <Link href={href} {...args}>
    {content}
  </Link>
)
withCustomColor.args = {
  className:
    'text-primary-caribbean-green hover:text-primary-caribbean-green-light'
}
