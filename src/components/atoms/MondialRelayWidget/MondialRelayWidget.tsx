import { ReactComponent as Cross } from '~assets/svg/navigation-24px/Cross.svg'
import { ReactComponent as Back } from '~assets/svg/navigation-24px/Back.svg'
import { FunctionComponent, useEffect } from 'react'
import { Button } from '~components/atoms/Button'
import { useTranslation } from 'react-i18next'
import { NotificationModalLayout } from '../../molecules/NotificationModalLayout'
import { MondialAddress } from '~domains/checkout/types'

export type MondialRelayWidgetProps = {
  isSmallScreen?: boolean
  isMondialRelayModalOpen: boolean
  setIsMondialRelayModalOpen: (isMondialRelayModalOpen: boolean) => void
  handlePickUpAddress: () => void
  setMondialRelayAddress: (address: MondialAddress | null) => void
}

export const MondialRelayWidget: FunctionComponent<MondialRelayWidgetProps> = ({
  isSmallScreen,
  isMondialRelayModalOpen,
  setIsMondialRelayModalOpen,
  handlePickUpAddress,
  setMondialRelayAddress
}) => {
  const { t } = useTranslation()

  useEffect(() => {
    if (isMondialRelayModalOpen) {
      setMondialRelayAddress(null)
    }
  }, [isMondialRelayModalOpen, setMondialRelayAddress])

  const closeMondialRelayModal = () => {
    setMondialRelayAddress(null)
    setIsMondialRelayModalOpen(false)
  }

  return (
    <NotificationModalLayout
      isOpen={isMondialRelayModalOpen}
      variant="center"
      isFixedPosition
      isMondialRelayNotification
      onBlur={closeMondialRelayModal}
      showIcon={false}
      children={
        <>
          {!isSmallScreen && (
            <Button
              data-testid="back-button"
              className="absolute left-7 top-2.25 z-10 w-fit h-fit"
              icon={<Back className="icon-20-16 text-primary-oxford-blue" />}
              onClick={closeMondialRelayModal}
              variant="back"
            />
          )}
          {isSmallScreen && (
            <Button
              data-testid="cross-button"
              className="absolute right-8 top-2.25 z-10 border-none w-fit h-fit"
              icon={<Cross className="icon-14 text-primary-oxford-blue" />}
              onClick={closeMondialRelayModal}
              variant="tertiary"
            />
          )}
          <div className="pt-4 absolute h-[85%] sm:h-[86%] left-1 right-1">
            <span
              className="h-full block"
              data-testid="zone-widget"
              id="Zone_Widget"
            />
            <input
              data-testid="parcel-shop-code"
              type="hidden"
              id="ParcelShopCode"
              name="ParcelShopCode"
            />
            <div className="flex justify-end">
              <Button
                variant="secondary"
                data-testid="pickup-button"
                className="mt-2 sm:mr-1 lg:mr-1.5 xs-only:w-full"
                onClick={() => {
                  handlePickUpAddress()
                  setIsMondialRelayModalOpen(false)
                }}
              >
                {t('checkout.delivery.mondial-relay.pick-up')}
              </Button>
            </div>
          </div>
        </>
      }
    />
  )
}
