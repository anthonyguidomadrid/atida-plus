import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { ReactComponent as ContainsAlcohol } from '~assets/svg/navigation-24px/ContainsAlcohol.svg'
import { ReactComponent as Warning } from '~assets/svg/navigation-24px/Warning.svg'
import { ReactComponent as Vegan } from '~assets/svg/navigation-24px/Vegan.svg'
import { ReactComponent as GlutenFree } from '~assets/svg/navigation-24px/GlutenFree.svg'
import { ReactComponent as Organic } from '~assets/svg/navigation-24px/Organic.svg'
import { ReactComponent as Reimport } from '~assets/svg/navigation-24px/ReImport.svg'
import { ReactComponent as Apotekhe } from '~assets/svg/navigation-24px/apotekhe.svg'
import { Product, selectPDPInfoDetailsData } from '~domains/product'

export type PDPImportantInfoAttributesList = {
  icon?: JSX.Element
  title?: string
  description?: string
  link?: {
    href: string
    text: string
  }
}[]

export type ImportantInfoIcons = {
  Alcohol: JSX.Element
  Biocide: JSX.Element
  Vegan: JSX.Element
  'Gluten Free': JSX.Element
  Organic: JSX.Element
  ReImport: JSX.Element
  Apotekhe: JSX.Element
}

export const usePDPImportantInfoAttributesList = (): {
  importantInfoAttributes: PDPImportantInfoAttributesList
} => {
  const { t } = useTranslation()
  const productData = useSelector(selectPDPInfoDetailsData) as Product

  const importantInfoIconsMap: ImportantInfoIcons = useMemo(() => {
    return {
      Alcohol: <ContainsAlcohol className="icon-24" />,
      Biocide: <Warning className="icon-24" />,
      Vegan: <Vegan className="icon-24" />,
      'Gluten Free': <GlutenFree className="icon-24" />,
      Organic: <Organic className="icon-24" />,
      ReImport: <Reimport className="icon-24" />,
      Apotekhe: <Apotekhe className="icon-24" />
    }
  }, [])

  const productSpecialFeatures = useMemo(
    () =>
      productData?.productFeaturesListMultiselect &&
      productData?.productFeaturesListMultiselect
        .map(feature => {
          return {
            icon:
              importantInfoIconsMap[
                feature.label as keyof ImportantInfoIcons
              ] ?? null,
            title: feature.label
          }
        })
        //Show the product feature only if it has icon
        .filter(feature => feature.icon),
    [importantInfoIconsMap, productData?.productFeaturesListMultiselect]
  )

  const importantInfoAttributes = useMemo(() => {
    const attributesList = []
    productData?.isPharmacyExclusive &&
      attributesList.push({
        icon: importantInfoIconsMap.Apotekhe,
        title: t('pdp.pharmacy.title')
      })

    productData?.ethanolContent &&
      attributesList.push({
        icon: importantInfoIconsMap.Alcohol,
        title: t('pdp.ethanol-percentage.title', {
          ethanolContent: Number(productData?.ethanolContent)
        }),
        description: t('pdp.ethanol-percentage.description')
      })

    productSpecialFeatures && attributesList.push(...productSpecialFeatures)

    productData?.isBiocide &&
      attributesList.push({
        icon: importantInfoIconsMap.Biocide,
        title: t('pdp.biocide.title'),
        description: t('pdp.biocide.warning-message', {
          biocide_baua_number: productData?.biocideBauaNumber
        }),
        //TODO: The downloadable leaflet is still using mocked data. Change once we know how the data will be passed from Akeneo
        link: {
          href: '/pdp/biocide-information',
          text: 'Biocide Information (PDP)'
        }
      })

    // Code mapping according to Akeneo: is_reimport_yes = Reimport, is_reimport_no = Not Reimport
    productData?.isReimport?.code === 'is_reimport_yes' &&
      attributesList.push({
        icon: importantInfoIconsMap.ReImport,
        title: t('pdp.reimport.title')
      })

    // Code mapping according to Akeneo: '0' = No information, '1' = No, '2' = Yes
    productData?.hasOrganicSealLogo?.code === '2' &&
      attributesList.push({
        icon: importantInfoIconsMap.Organic,
        title: t('pdp.organic.title'),
        description: productData?.organicControlNumber
          ? t('pdp.organic.product.description', {
              organicControlNumber: productData?.organicControlNumber
            })
          : null
      })

    return attributesList
  }, [
    importantInfoIconsMap.Alcohol,
    importantInfoIconsMap.Apotekhe,
    importantInfoIconsMap.Biocide,
    importantInfoIconsMap.Organic,
    importantInfoIconsMap.ReImport,
    productData?.biocideBauaNumber,
    productData?.ethanolContent,
    productData?.hasOrganicSealLogo?.code,
    productData?.isBiocide,
    productData?.isPharmacyExclusive,
    productData?.isReimport?.code,
    productData?.organicControlNumber,
    productSpecialFeatures,
    t
  ])

  return { importantInfoAttributes }
}
