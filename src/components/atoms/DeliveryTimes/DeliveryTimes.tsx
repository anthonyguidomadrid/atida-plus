import { useTranslation } from 'react-i18next'
import { ReactComponent as DeliveryTruck } from '~assets/svg/navigation-24px/Delivery.svg'

export type DeliveryTimesProps = {
  onDemand?: boolean
}

export const DeliveryTimes = ({ onDemand }: DeliveryTimesProps) => {
  const { t } = useTranslation()

  return (
    <div
      data-testid="delivery-times"
      className="text-primary-caribbean-green-darker flex items-center"
    >
      <DeliveryTruck className="icon-24 inline mr-1" />
      <p className="block font-semibold">
        {onDemand ? t('product.on-demand') : t('product.standard-delivery')}
      </p>
    </div>
  )
}
