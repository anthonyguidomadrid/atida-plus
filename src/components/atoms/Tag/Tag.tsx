import type { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import NextLink from 'next/link'
import classNames from 'classnames'
import { Link } from '../Link'

export type TagProps = ComponentPropsWithoutRef<'a'> & {
  isSelected?: boolean
}

export const Tag: FunctionComponent<TagProps> = ({
  href = '',
  isSelected = false,
  className,
  children,
  ...props
}) => {
  const link = (
    <Link
      data-testid="tagLink"
      className={classNames(
        'button',
        'h-5 px-1.5 text-sm',
        { 'button--tertiary font-light border-ui-grey': !isSelected },
        { 'button--primary': isSelected },
        className
      )}
      {...props}
    >
      {children}
    </Link>
  )

  return href ? (
    <NextLink href={href} passHref prefetch={false}>
      {link}
    </NextLink>
  ) : (
    link
  )
}
