import { ReactNode } from 'react'
import NextLink from 'next/link'

import { Link } from '~components/atoms/Link'

export type ConditionalLinkProps = {
  url?: string
  trackingHandler?: () => void
  testId?: string
  className?: string
  children?: ReactNode
}

/**
 * Wraps its children in a Link if a URL is provided, otherwise returns children.
 * @param url - the URL
 * @param trackingHandler - a callback for tracking events
 * @param testId
 * @param className
 * @param children - component to be rendered
 */
export const ConditionalLink = ({
  url,
  trackingHandler,
  testId,
  className,
  children
}: ConditionalLinkProps) =>
  url?.length ? (
    <NextLink href={url} passHref prefetch={false}>
      <Link
        trackingHandler={trackingHandler}
        data-testid={testId}
        className={className}
      >
        {children}
      </Link>
    </NextLink>
  ) : (
    <>{children}</>
  )
