import { ReactNode } from 'react'
import classNames from 'classnames'
import NextLink from 'next/link'

export type BannerLinkProps = {
  href?: string
  trackingHandler?: () => void
  className?: string
  children?: ReactNode
}

/**
 * Wraps HeroBanner and CampaignHero banner in a next link, if a href is present.
 * @param href
 * @param trackingHandler - the tracking function that should be fired in case the child is sponsored content
 * @param className
 * @param children
 */
export const BannerLink = ({
  href,
  trackingHandler,
  className,
  children
}: BannerLinkProps) => (
  <div
    className={classNames(
      'w-full',
      {
        'cursor-pointer': !!href
      },
      className
    )}
    data-testid="bannerLink"
    tabIndex={0}
    role={href ? 'button' : ''}
    onClick={href ? trackingHandler : undefined}
    onKeyUp={href ? trackingHandler : undefined}
  >
    {href ? (
      <NextLink href={href} passHref prefetch={false}>
        {children}
      </NextLink>
    ) : (
      <>{children}</>
    )}
  </div>
)
