import {
  cloneElement,
  FunctionComponentElement,
  ReactNode,
  SVGAttributes
} from 'react'
import NextLink from 'next/link'
import { Link } from '../Link'
import classNames from 'classnames'
import { ReactComponent as ChevronRight } from '~assets/svg/navigation-24px/ChevronRight.svg'
import { useBreakpoint } from '~domains/breakpoints'
import { breakpoints } from '~domains/breakpoints/config'
import { useTranslation } from 'react-i18next'

export type PreferencePanelProps = {
  title: string
  href: string
  icon?: FunctionComponentElement<SVGAttributes<'svg'>>
  isBold?: boolean
  tag?: ReactNode | null
  cashBalance?: string
  isFullWidth?: boolean
  children?: ReactNode
}

export const PreferencePanel = ({
  title,
  href,
  icon,
  isBold,
  isFullWidth = true,
  tag = null,
  cashBalance,
  children,
  ...props
}: PreferencePanelProps) => {
  const { t } = useTranslation()
  const isDesktop = useBreakpoint(breakpoints.sm)
  return (
    <div
      data-testid="preference-panel"
      className="border-t border-ui-grey-light relative"
      {...props}
    >
      <NextLink href={href} passHref prefetch={false}>
        <Link
          className="no-underline cursor-pointer hover:text-primary-oxford-blue w-full"
          data-testid="preference-panel-link"
        >
          <div
            className={classNames('flex w-3/4 my-2', {
              'ml-2 sm:ml-0': !isFullWidth
            })}
          >
            {icon && (
              <div className="w-4">
                {cloneElement(icon, {
                  ...icon.props,
                  className: classNames('mr-1.5', icon.props.className)
                })}
              </div>
            )}

            <div className=" flex flex-col w-full">
              <div
                className={classNames('flex flex-row', {
                  'font-semibold': isBold
                })}
              >
                {title}
                {tag}
              </div>
              {children}
            </div>
          </div>
          <div
            className={classNames('flex flex-row absolute top-2', {
              'right-2': !isFullWidth,
              'right-0': isFullWidth
            })}
          >
            {cashBalance && (
              <span
                className="flex pt-0.25 mr-2 text-primary-caribbean-green-dark"
                data-testid="cashBalanceAmount"
              >
                {isDesktop && t('account.my-cash-balance.balance-title')} {''}
                {cashBalance}
              </span>
            )}
            <ChevronRight className={classNames('icon-24')} />
          </div>
        </Link>
      </NextLink>
    </div>
  )
}
