import type { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import React, { useState } from 'react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

export type SeoContentExpandableProps = ComponentPropsWithoutRef<'article'>

export const SeoContentExpandable: FunctionComponent<SeoContentExpandableProps> = ({
  children,
  ...props
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const { t } = useTranslation()

  return (
    <article data-testid="SeoContentExpandable" className="relative" {...props}>
      <div
        className={classNames(
          'seo-content',
          isCollapsed ? 'collapsed max-h-5.5 overflow-hidden' : ''
        )}
      >
        {children}
      </div>
      <div
        className={classNames(
          'right-2',
          isCollapsed ? 'top-3 absolute' : 'text-right'
        )}
      >
        <span className={classNames(isCollapsed ? '' : 'invisible')}>
          &#8230;{' '}
        </span>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="font-light underline"
          aria-expanded={!isCollapsed}
        >
          {isCollapsed ? t('seo.read-more') : t('seo.show-less')}
        </button>
      </div>
    </article>
  )
}
