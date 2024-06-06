import { NotificationModalLayout } from '~components/molecules/NotificationModalLayout'
import { ReactComponent as Box } from '~assets/svg/navigation-24px/Box.svg'
import { ReactComponent as Copy } from '~assets/svg/CopyBold.svg'
import { ReactComponent as CopyDisabled } from '~assets/svg/CopyBoldDisabled.svg'
import { useTranslation } from 'react-i18next'
import { RefObject, useCallback, useState } from 'react'
import { copyToClipboard } from '~helpers'

export interface OrderTrackingModalProps {
  modalRef?: RefObject<HTMLDivElement>
  isTrackingModalOpen: boolean
  isDesktopScreen: boolean
  erpTrackingUrl: string
  erpTrackingReference: string
}

export const OrderTrackingModal = ({
  modalRef,
  isTrackingModalOpen,
  isDesktopScreen,
  erpTrackingUrl,
  erpTrackingReference
}: OrderTrackingModalProps) => {
  const { t } = useTranslation()
  const handleCopytrackingCodeToClipboard = useCallback(copyToClipboard, [])
  const [isTrackingCodeCopied, setIsTrackingCodeCopied] = useState('')

  return (
    <NotificationModalLayout
      erpTrackingUrl={erpTrackingUrl}
      isTrackingModal
      modalRef={modalRef}
      isOpen={isTrackingModalOpen}
      variant={isDesktopScreen ? 'center' : 'bottom'}
      maxWidth={!isDesktopScreen}
      isFixedPosition
      icon={<Box className="icon-24 bg-transparent text-primary-oxford-blue" />}
      iconPosition="left-mobile"
      children={
        <div
          data-testid="orderTrackingModalChildren"
          className="text-left sm:text-center text-sm sm:text-base"
        >
          <div className="flex flex-col">
            <p className="mb-0.5 font-bold">
              {t('account.track-order-modal.label')}
            </p>
            <p>{t('account.track-order-modal.description')}</p>
            <div className="sm:mb-3 mt-2 flex  sm:justify-center">
              {isTrackingCodeCopied === erpTrackingReference ? (
                <div className="text-ui-grey-dark grey-border bg-ui-black-5">
                  <button className="inline-flex items-center hover:cursor-pointer py-1 px-2">
                    <CopyDisabled className="icon-19 font-bold mr-[7px]" />
                    <p className="text-sm-base font-semibold">
                      {t('account.order-tracking.number-copied')}{' '}
                      {erpTrackingReference}
                    </p>
                  </button>
                </div>
              ) : (
                <div className="grey-border bg-ui-black-5">
                  <button
                    onClick={() =>
                      handleCopytrackingCodeToClipboard(
                        erpTrackingReference,
                        setIsTrackingCodeCopied
                      )
                    }
                    className="inline-flex items-center hover:cursor-pointer py-1 px-2"
                  >
                    <Copy className="icon-19 font-bold mr-[7px]" />
                    <p className="text-sm-base font-semibold">
                      {t('account.track-order-modal.copy-code')}{' '}
                      {erpTrackingReference}
                    </p>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      }
    />
  )
}
