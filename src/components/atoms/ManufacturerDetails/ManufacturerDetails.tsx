import { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'

export type ManufacturerDetailsProps = {
  name: string
  address: { street: string; city: string }
}

export const ManufacturerDetails: FunctionComponent<ManufacturerDetailsProps> = ({
  name,
  address
}) => {
  const { t } = useTranslation()
  return (
    <div data-testid="manufacturerDetails" className="flex">
      <div className="mr-2 sm:mr-4">
        <h5 className="mb-0.5">{t('product.manufacturer.title')}</h5>
        <span data-testid="manufacturerName">{name}</span>
      </div>
      <div>
        <h5 className="mb-0.5">{t('product.company-address.title')}</h5>
        <div data-testid="manufacturerStreet">{address.street}</div>
        <div data-testid="manufacturerCity">{address.city}</div>
      </div>
    </div>
  )
}
