import classNames from 'classnames'
import { parseHtml } from '~helpers'
import { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import { CmsContentTypes } from '~config/content-types'

export type StaticHeaderBlockProps = {
  contentType?: CmsContentTypes.STATIC_HEADER_BLOCK
  title?: string
}

export const StaticHeaderBlock: FunctionComponent<
  ComponentPropsWithoutRef<'div'> & StaticHeaderBlockProps
> = ({ contentType, title, className, ...props }) => {
  return (
    <div
      className={classNames(
        'bg-ui-guyabano h-20 md:h-25 lg:h-29 flex items-center',
        className
      )}
      data-testid="staticHeaderBlock"
      {...props}
    >
      <h2 className="text-6xl lg:text-8xl font-light ml-2 sm:ml-5 md:ml-8">
        {parseHtml(title)}
      </h2>
    </div>
  )
}
