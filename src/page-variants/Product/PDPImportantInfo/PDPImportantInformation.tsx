import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import {
  PDPInfoLayout,
  PDPInfoDescription,
  PDPImportantInfoAttributes,
  PDPInfoDetails
} from '.'
import { Trans, useTranslation } from 'react-i18next'
import { pdpType } from '~config/constants/pdp-types'
import { certificateButtonsData } from '../__mocks__/germany-data'
import { Product, selectPDPInfoDetailsData } from '~domains/product'
import { usePDPImportantInfoAttributesList } from '~helpers/usePDPImportantInfoAttributesList'

export const PDPImportantInformation = () => {
  const { t } = useTranslation()
  const product = useSelector(selectPDPInfoDetailsData) as Product

  // Code mapping according to Akeneo: '1' = 'No', '2' = 'Yes, according to 31 SGB V', '3' = 'Other dietetic'
  const showDieteticMessage = useMemo(() => product.dietetic?.code !== '1', [
    product.dietetic?.code
  ])

  const importantDescription = useMemo(() => {
    switch (product?.family) {
      case pdpType.OTC:
        return 'pdp.important-info-description-otc'
      case pdpType.NUTRITION:
        return 'pdp.important-info-description-nutrition'
      case pdpType.PETS:
        return product?.isPharmacyExclusive
          ? 'pdp.important-info-description-pet'
          : null
      case pdpType.MEDICAL_DEVICE:
        return 'pdp.important-info-description-medical-devices'
      default:
        return null
    }
  }, [product?.family, product?.isPharmacyExclusive])

  const { importantInfoAttributes } = usePDPImportantInfoAttributesList()

  return (
    <PDPInfoLayout>
      {(importantDescription ||
        certificateButtonsData ||
        showDieteticMessage) && (
        <PDPInfoDescription certificateButtonsData={certificateButtonsData}>
          {/* This is a generic attribute which might be shown on different product families */}
          {showDieteticMessage && (
            <div data-testid="dieteticMessage">
              <Trans
                i18nKey={t('pdp.important-info.dietetic.message')}
                components={{
                  p: <p className="pb-1" />
                }}
              />
            </div>
          )}
          {importantDescription && (
            <Trans
              i18nKey={t(importantDescription)}
              components={{
                p: <p className="pb-1" />
              }}
            />
          )}
        </PDPInfoDescription>
      )}
      {importantInfoAttributes.length > 0 && (
        <PDPImportantInfoAttributes list={importantInfoAttributes} />
      )}
      <PDPInfoDetails />
    </PDPInfoLayout>
  )
}
