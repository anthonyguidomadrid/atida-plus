import type {
  ComponentPropsWithoutRef,
  FunctionComponent,
  RefObject
} from 'react'
import { useTranslation, Trans } from 'react-i18next'
import classNames from 'classnames'
import { ReactComponent as Cross } from '~assets/svg/navigation-24px/Cross.svg'
import React from 'react'
import { Link } from '~components/atoms/Link'
import { ReactComponent as Success } from '~assets/svg/solid/Success.svg'
import { ReactComponent as Error } from '~assets/svg/solid/Error.svg'
import { ReactComponent as Warning } from '~assets/svg/solid/Warning.svg'
import { ReactComponent as Info } from '~assets/svg/solid/Info.svg'
import { ReactComponent as Delivery } from '~assets/svg/navigation-24px/Delivery.svg'

export type NotificationProps = {
  type: 'success' | 'error' | 'warning' | 'info' | 'delivery-info'
  title: string
  content?: string
  translateRichText?: boolean
  childrenClassName?: string
  closeIcon?: boolean
  handleClose?: () => void
  notificationRef?: RefObject<HTMLDivElement>
}

export const Notification: FunctionComponent<
  ComponentPropsWithoutRef<'div'> & NotificationProps
> = ({
  closeIcon,
  handleClose,
  type,
  title,
  content,
  translateRichText = false,
  className,
  childrenClassName,
  children,
  notificationRef,
  ...props
}) => {
  const { t } = useTranslation()

  const Icon = () => {
    switch (type) {
      case 'success':
        return (
          <Success
            data-testid="prefixIcon"
            className="icon-24 text-secondary-green-30"
          />
        )
      case 'error':
        return (
          <Error
            data-testid="prefixIcon"
            className="icon-24 text-secondary-red-40"
          />
        )
      case 'warning':
        return (
          <Warning
            data-testid="prefixIcon"
            className="icon-24 text-secondary-orange-60"
          />
        )
      case 'info':
        return (
          <Info
            data-testid="prefixIcon"
            className="icon-24 text-primary-oxford-blue-60"
          />
        )
      case 'delivery-info':
        return (
          <Delivery
            data-testid="prefixIcon"
            className="icon-24 text-primary-oxford-blue-60"
          />
        )
      default:
        return null
    }
  }

  return (
    <div
      ref={notificationRef}
      data-testid="notification"
      className={classNames(
        'flex p-2 border rounded text-sm-base sm:text-base',
        {
          'bg-secondary-green-100 border-secondary-green-30':
            type === 'success',
          'bg-secondary-red-100 border-secondary-red-40': type === 'error',
          'bg-secondary-orange-100 border-secondary-orange-60':
            type === 'warning',
          'bg-primary-oxford-blue-100 border-primary-oxford-blue-60':
            type === 'info' || type === 'delivery-info'
        },
        className
      )}
      {...props}
    >
      <div
        className={classNames({
          'w-3 mr-1.5 sm:mr-2': type !== 'delivery-info',
          'translate-y-0.5 sm:translate-y-1 md:translate-y-0.25 mr-1.5 md:mr-2':
            type === 'delivery-info'
        })}
      >
        <Icon />
      </div>
      <div
        className={classNames(
          'w-full flex flex-col gap-0.5 sm:gap-1',
          childrenClassName
        )}
      >
        {title && (
          <p
            data-testid="notificationTitle"
            className={classNames('font-bold', {
              'text-sm leading-5.375 md:text-base md:leading-6 translate-y-0.25 sm:translate-y-0.75 md:translate-y-0':
                type === 'delivery-info'
            })}
          >
            {t(title)}
          </p>
        )}
        {content && translateRichText && (
          <Trans
            i18nKey={content}
            components={{ a: <Link target="_self" /> }}
          ></Trans>
        )}
        {content && !translateRichText && (
          <p
            className={classNames({
              'text-sm leading-5.375 md:text-base md:leading-6 translate-y-0.25 md:translate-y-0':
                type === 'delivery-info'
            })}
          >
            {t(content)}
          </p>
        )}
        {children}
      </div>
      {closeIcon && (
        <div className="h-3 ml-1.5">
          <button
            data-testid="closeNotification"
            onClick={handleClose}
            className="bg-transparent border-0"
            aria-label={t('shared.close-dialog')}
          >
            <Cross className="icon-24 text-primary-oxford-blue" />
          </button>
        </div>
      )}
    </div>
  )
}
