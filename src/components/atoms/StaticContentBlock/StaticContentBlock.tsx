import { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import { CmsContentTypes } from '~config/content-types'
import { parseHtml } from '~helpers'
import classNames from 'classnames'

export type StaticContentBlockProps = {
  contentType?: CmsContentTypes.STATIC_CONTENT_BLOCK
  title?: string
  content?: string
}

export const StaticContentBlock: FunctionComponent<
  ComponentPropsWithoutRef<'div'> & StaticContentBlockProps
> = ({ contentType, content, className, ...props }) => {
  return (
    <div
      data-testid="staticContentBlock"
      className={classNames(
        'mx-2 sm:mx-5 md:mx-18 lg:mx-36 static-content-block',
        className
      )}
      {...props}
    >
      {parseHtml(content, {
        ul: {
          className: 'mb-6'
        },
        li: {
          className: 'list-disc ml-2'
        }
      })}
    </div>
  )
}
