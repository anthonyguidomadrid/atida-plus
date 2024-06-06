import {
  Children,
  ComponentPropsWithoutRef,
  FunctionComponent,
  isValidElement,
  memo,
  useEffect,
  useState
} from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import TruncatedList from 'react-truncate-list'
import { breakpoints, useBreakpoint } from '~domains/breakpoints'
import { Button } from '~components/atoms/Button'

export type TagListProps = ComponentPropsWithoutRef<'ul'>

const TagListComponent: FunctionComponent<TagListProps> = ({
  className,
  children,
  ...props
}) => {
  const { t } = useTranslation()
  const isLargerScreen = useBreakpoint(breakpoints.sm)
  const [isLoading, setIsLoading] = useState(true)
  const [showAfterFold, setShowAfterFold] = useState(false)
  const itemClassName = classNames('mr-1 mb-0.5 sm:mb-1 shrink-0')

  //Used to avoid CLS when SSR
  useEffect(() => {
    setIsLoading(false)
  }, [])

  return isLargerScreen && !showAfterFold ? (
    <TruncatedList
      renderTruncator={({ hiddenItemsCount }) => (
        <Button
          className="h-5 px-1.5 text-sm"
          aria-label={t('shared.show-more-tags', { count: hiddenItemsCount })}
          onClick={
            /* istanbul ignore next - expect cypress coverage here */ () =>
              setShowAfterFold(true)
          }
        >
          + {hiddenItemsCount}
        </Button>
      )}
      role="list"
      className={classNames(
        'list-none flex flex-wrap hide-scrollbar',
        { 'h-6': !showAfterFold },
        className
      )}
      itemClassName={itemClassName}
      {...props}
    >
      {children}
    </TruncatedList>
  ) : (
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <ul
      role="list"
      className={classNames(
        'list-none flex flex-nowrap hide-scrollbar',
        {
          'overflow-hidden h-6': isLoading,
          'overflow-x-auto sm:overflow-x-visible sm:flex-wrap': !isLoading
        },
        className
      )}
      {...props}
    >
      {Children.map(children, child =>
        isValidElement(child) ? (
          <li key={child.props.href} className={itemClassName}>
            {child}
          </li>
        ) : null
      )}
    </ul>
  )
}

export const TagList = memo(TagListComponent)
