import { Notification, NotificationProps } from './index'
import NextLink from 'next/link'
import { Link } from '~components/atoms/Link'

export default {
  component: Notification,
  title: 'atoms/Notification'
}

export const Success = (args: NotificationProps): JSX.Element => (
  <Notification {...args}></Notification>
)

Success.args = {
  type: 'success',
  title: 'Success message',
  content:
    'Our recent move from Mifarma to Atida Plus means some of your order history won’t be available.'
}

export const Error = (args: NotificationProps): JSX.Element => (
  <Notification {...args}>
    <NextLink href="/" passHref prefetch={false}>
      <Link>See details</Link>
    </NextLink>
  </Notification>
)

Error.args = {
  type: 'error',
  title: 'Error notification',
  content:
    'Our recent move from Mifarma to Atida Plus means some of your order history won’t be available.'
}

export const Warning = (args: NotificationProps): JSX.Element => (
  <Notification {...args}>
    <NextLink href="/" passHref prefetch={false}>
      <Link>See details</Link>
    </NextLink>
  </Notification>
)

Warning.args = {
  type: 'warning',
  title: 'Order history isn’t available',
  content:
    'Our recent move from Mifarma to Atida Plus means some of your order history won’t be available.'
}

export const Info = (args: NotificationProps): JSX.Element => (
  <Notification {...args}>
    <NextLink href="/" passHref prefetch={false}>
      <Link>See details</Link>
    </NextLink>
  </Notification>
)

Info.args = {
  type: 'info',
  title: 'Info',
  content:
    'Our recent move from Mifarma to Atida Plus means some of your order history won’t be available.'
}
