import type {
  ComponentPropsWithoutRef,
  FunctionComponent,
  ReactNode
} from 'react'
import React from 'react'
import classNames from 'classnames'

export type SeoContentProps = ComponentPropsWithoutRef<'article'> & {
  header?: string
  children?: ReactNode
}

export const SeoContent: FunctionComponent<SeoContentProps> = ({
  header,
  children
}) => {
  return (
    <article
      data-testid="SeoContent"
      className={classNames(
        'row-start-1 row-end-2 col-span-12 bg-ui-guyabano w-full pt-4 pb-3',
        'sm:pt-8 sm:pb-6',
        'md:col-start-3 md:col-end-11',
        'lg:col-start-4 lg:col-end-10'
      )}
    >
      {header && <h4>{header}</h4>}
      {children && <div className="seo-content">{children}</div>}
    </article>
  )
}
