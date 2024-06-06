import type { FunctionComponent } from 'react'
import React, {
  ComponentPropsWithoutRef,
  FunctionComponentElement,
  RefObject,
  SVGAttributes,
  useEffect
} from 'react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Button } from '~components/atoms/Button'
import { ReactComponent as NavAdvice } from '~assets/svg/navigation-24px/NavAdvice.svg'
import { Link } from '~components/atoms/Link'

const POSITION_TOP = 'top'
const POSITION_BOTTOM = 'bottom'
const POSITION_CENTER = 'center'
const POSITION_LEFT = 'left'
const POSITION_LEFT_MOBILE = 'left-mobile'

export type NotificationModalLayoutProps = ComponentPropsWithoutRef<'div'> & {
  confirmButtonLabel?: string
  closeButtonLabel?: string
  modalRef?: RefObject<HTMLDivElement>
  title?: string
  body?: string
  children?: React.ReactNode
  isOpen: boolean
  variant: typeof POSITION_TOP | typeof POSITION_CENTER | typeof POSITION_BOTTOM
  maxWidth?: boolean
  className?: string
  isFixedPosition?: boolean
  isNestedModalNotification?: boolean
  isBasketNotification?: boolean
  isVoucherCodeNotification?: boolean
  showIcon?: boolean
  icon?: FunctionComponentElement<SVGAttributes<'svg'>>
  iconPosition?:
    | typeof POSITION_TOP
    | typeof POSITION_LEFT
    | typeof POSITION_LEFT_MOBILE
  handleConfirm?: () => void
  handleClose?: () => void
  isTrackingModal?: boolean
  erpTrackingUrl?: string
  hideButtonSection?: boolean
  isCashBalanceModal?: boolean
  isTaxReferenceModal?: boolean
  isMondialRelayNotification?: boolean
  isMondialRelayModalOpen?: boolean
}

export const NotificationModalLayout: FunctionComponent<NotificationModalLayoutProps> = ({
  confirmButtonLabel = '',
  closeButtonLabel = '',
  modalRef,
  title = '',
  body = '',
  children,
  variant = POSITION_CENTER,
  maxWidth = false,
  className = '',
  isFixedPosition = false,
  isNestedModalNotification = false,
  isBasketNotification = false,
  isVoucherCodeNotification = false,
  showIcon = true,
  icon = '',
  iconPosition = POSITION_TOP,
  isOpen,
  handleConfirm,
  handleClose,
  isTrackingModal,
  erpTrackingUrl,
  hideButtonSection = false,
  isCashBalanceModal,
  isTaxReferenceModal,
  isMondialRelayNotification = false,
  isMondialRelayModalOpen = false
}) => {
  const { t } = useTranslation()

  useEffect(() => {
    if (isMondialRelayModalOpen && !isMondialRelayNotification) {
      return
    }
    isOpen
      ? document.body.setAttribute('style', 'overflow: hidden')
      : document.body.setAttribute('style', 'overflow: visible')
  }, [isMondialRelayModalOpen, isMondialRelayNotification, isOpen])

  const renderButtons = () => {
    const hasConfirmButton = handleConfirm && confirmButtonLabel
    const hasCloseButton = handleClose && closeButtonLabel

    return (
      <div
        data-testid="buttonsSection"
        className={classNames('flex justify-center', {
          'w-full': !isMondialRelayNotification,
          'w-screen': isMondialRelayNotification,
          'my-2 sm:my-0 sm:mb-4':
            iconPosition === POSITION_LEFT_MOBILE && !isTrackingModal,
          'my-2 xs:my-0 xs:mb-4':
            !isNestedModalNotification &&
            iconPosition !== POSITION_LEFT_MOBILE &&
            !isTrackingModal,
          'my-2': isNestedModalNotification && !isTrackingModal,
          'mb-2 my-2 sm:my-0 sm:mb-4': isTrackingModal
        })}
      >
        {hasCloseButton && (
          <Button
            data-testid="notificationModalLayoutCloseButton"
            variant="secondary"
            onClick={handleClose}
            className={classNames('h-6', {
              'w-full mx-4': !hasConfirmButton,
              'w-1/2 mr-1 max-w-20': hasConfirmButton,
              'xs:mx-2': isNestedModalNotification
            })}
            aria-label={t(closeButtonLabel)}
          >
            {closeButtonLabel}
          </Button>
        )}
        {hasConfirmButton && (
          <Button
            data-testid="notificationModalLayoutConfirmButton"
            onClick={handleConfirm}
            className={classNames('h-6', {
              'w-full mx-4': !hasCloseButton,
              'w-1/2 max-w-20': hasCloseButton,
              'xs:mx-2': isNestedModalNotification
            })}
            aria-label={t(confirmButtonLabel)}
          >
            {confirmButtonLabel}
          </Button>
        )}
        {isTrackingModal && (
          <Link
            variant="button"
            href={erpTrackingUrl}
            target="_blank"
            className="w-full mx-2 sm:mx-4"
            data-testid="trackingProviderButton"
          >
            {t('account.track-order-modal.button-label')}
          </Link>
        )}
      </div>
    )
  }

  if (!isOpen) {
    return null
  }

  return (
    <div
      data-testid="notificationModalLayout"
      className={classNames('top-0 left-0 w-screen sm:w-full h-full z-50', {
        fixed: isFixedPosition,
        absolute: !isFixedPosition
      })}
    >
      <div
        data-testid="modal-background"
        style={isOpen ? { backgroundColor: 'rgba(26, 29, 50, 0.2)' } : {}}
        className={classNames('flex h-full relative justify-center', {
          'items-end xs:items-center': variant === POSITION_CENTER
        })}
      >
        <div
          ref={modalRef}
          className={classNames(
            'min-h-10 absolute bg-primary-white',
            {
              'w-full max-w-50': !isMondialRelayNotification,
              'sm:w-11/12 h-full sm:h-[92%]': isMondialRelayNotification,
              'top-0': variant === POSITION_TOP,
              'bottom-0': variant === POSITION_BOTTOM,
              'right-0 max-w-66': isNestedModalNotification,
              'max-w-full': maxWidth
            },
            className
          )}
        >
          <div
            className={classNames('text-center', {
              flex: !isMondialRelayNotification,
              'pt-1': isMondialRelayNotification,
              'justify-center p-2 xs:p-4 xs:pb-2': isBasketNotification,
              'justify-center pt-3 pl-3 pr-3 pb-4': isVoucherCodeNotification,
              'p-2 xs:p-4 xs:pb-2':
                !isNestedModalNotification &&
                !isTrackingModal &&
                !isCashBalanceModal &&
                !isTaxReferenceModal &&
                !isMondialRelayNotification,
              'p-2': isNestedModalNotification,
              'flex-col items-center':
                showIcon && iconPosition === POSITION_TOP,
              'flex-row border-b border-ui-grey-light':
                showIcon && iconPosition === POSITION_LEFT,
              'sm:flex-col sm:items-center border-b border-ui-grey-light sm:border-none':
                showIcon && iconPosition === POSITION_LEFT_MOBILE,
              'p-2 sm:p-4 sm:pb-0 pb-2': isTrackingModal || isTaxReferenceModal,
              'p-2 xs:p-3 xs:pb-1 sm:p-4 sm:pb-1 justify-center': isCashBalanceModal
            })}
          >
            {showIcon && (
              <div>
                <div
                  className={classNames(
                    'flex justify-center items-center bg-ui-guyabano hover:bg-ui-guyabano no-border rounded-full w-8 h-8',
                    {
                      'mb-2': iconPosition === POSITION_TOP,
                      'mr-3': iconPosition === POSITION_LEFT,
                      'sm:mb-3 mr-2 sm:mr-0':
                        iconPosition === POSITION_LEFT_MOBILE
                    }
                  )}
                  data-testid="notificationModalLayoutIcon"
                  aria-label="icon"
                >
                  {icon ? (
                    icon
                  ) : (
                    <NavAdvice className="icon-24 bg-transparent text-primary-oxford-blue" />
                  )}
                </div>
              </div>
            )}
            {isNestedModalNotification ? (
              <div className="text-left">
                {title && <p className="text-sm font-semibold">{title}</p>}
                {body && <p className="text-sm">{body}</p>}
              </div>
            ) : (
              title && <p className="font-semibold">{title}</p>
            )}
            {children}
          </div>
          {!hideButtonSection && renderButtons()}
        </div>
      </div>
    </div>
  )
}
