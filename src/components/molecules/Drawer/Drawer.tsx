import { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import classNames from 'classnames'
import { Button } from '~components/atoms/Button'
import { ReactComponent as Cross } from '~assets/svg/navigation-24px/Cross.svg'
import { useTranslation } from 'react-i18next'

export type DrawerProps = {
  title?: string
  isFilter?: boolean
  isInverted?: boolean
  hasNewAccountMenuStyle?: boolean
  onClickCloseIcon?: () => void
}

export const Drawer: FunctionComponent<
  ComponentPropsWithoutRef<'aside'> & DrawerProps
> = ({
  title,
  onClickCloseIcon,
  isFilter = false,
  isInverted = false,
  hasNewAccountMenuStyle = false,
  children,
  className
}) => {
  const { t } = useTranslation()
  return (
    <aside
      data-testid="drawer"
      className={classNames(
        'bg-primary-white cursor-default',
        {
          'sm:border border-ui-grey-light': !isFilter && !hasNewAccountMenuStyle
        },
        className
      )}
    >
      {onClickCloseIcon && (
        <div
          data-testid="drawerHeader"
          className={classNames('relative', {
            'bg-primary-oxford-blue': !hasNewAccountMenuStyle,
            'border border-ui-grey-light sm:hidden -m-fixed-1px': hasNewAccountMenuStyle
          })}
        >
          {title && (
            <span
              className={classNames('py-2 block text-center sm:text-3xl', {
                'font-body font-light text-base ': hasNewAccountMenuStyle,
                'text-xl text-primary-white': !hasNewAccountMenuStyle,
                'py-3 text-base': isFilter
              })}
            >
              {title}
            </span>
          )}
          {hasNewAccountMenuStyle || isInverted ? (
            <button
              data-testid="closeMenu"
              onClick={onClickCloseIcon}
              className={classNames(
                'button--close',
                isInverted && 'button--close-inverted',
                isFilter && 'top-2.25 mr-1'
              )}
              aria-label={t('shared.close-drawer')}
            ></button>
          ) : (
            <Button
              variant={hasNewAccountMenuStyle ? 'tertiary' : 'primary'}
              data-testid="closeMenu"
              onClick={onClickCloseIcon}
              icon={<Cross className={classNames('icon-24')} />}
              className={classNames(
                'absolute top-1',
                {
                  'hover:bg-primary-oxford-blue focus:bg-primary-oxford-blue': !hasNewAccountMenuStyle
                },
                { 'border-0': hasNewAccountMenuStyle },
                { 'right-0.5': isFilter },
                { 'right-2.5': !isFilter }
              )}
              aria-label={t('shared.close-drawer')}
            />
          )}
        </div>
      )}
      <div>{children}</div>
    </aside>
  )
}
