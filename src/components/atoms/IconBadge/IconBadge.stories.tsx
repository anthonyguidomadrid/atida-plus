import { IconBadge, IconBadgeProps } from '.'
import { ReactComponent as Visa } from '~assets/svg/payment-providers/Visa.svg'

export default {
  component: IconBadge,
  title: 'atoms/IconBadge',
  args: {
    icon: <Visa />,
    className: 'w-8 shadow'
  }
}

export const Standard = (args: IconBadgeProps): JSX.Element => (
  <IconBadge icon={args.icon} className={args.className} />
)
