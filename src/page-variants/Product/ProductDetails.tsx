import { FunctionComponent, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import { Product } from '~domains/product'
import { parseHtml } from '~helpers'

import { Accordion } from '~components/molecules/Accordion'
import { AccordionPanel } from '~components/atoms/AccordionPanel'
import { KeyDetailsTable } from '~components/atoms/KeyDetailsTable'
import { ProductDescription } from './ProductDescription'
import { ManufacturerDetails } from '~components/atoms/ManufacturerDetails/ManufacturerDetails'

import { ReactComponent as Eye } from '~assets/svg/navigation-24px/Eye.svg'
import { ReactComponent as Description } from '~assets/svg/navigation-24px/Description.svg'
import { ReactComponent as Composition } from '~assets/svg/navigation-24px/Composition.svg'
import { ReactComponent as Information } from '~assets/svg/navigation-24px/Information.svg'
import { ReactComponent as Shop } from '~assets/svg/navigation-24px/Shop.svg'
import { ReactComponent as Lamp } from '~assets/svg/navigation-24px/Lamp.svg'
import { ReactComponent as Fridge } from '~assets/svg/navigation-24px/Fridge.svg'

import {
  manufacturerDetailsMock,
  certificateButtonsData as productUsageLeaflets
} from './__mocks__/germany-data'
import { FeatureFlag } from '~config/constants/feature-flags'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { useRouter } from 'next/router'

export type ProductDetailProps = {
  product: Product
  brandDetailsPageUrl: string
}

export const ProductDetails: FunctionComponent<ProductDetailProps> = ({
  product,
  brandDetailsPageUrl
}) => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  const isGermanShop = useMemo(() => locale === 'de-de', [locale])

  const isShowGermanPDPDetailsEnabled = useFeatureFlag(
    FeatureFlag.PDP_SHOW_GERMAN_PRODUCT_DETAILS
  )

  const sections = useMemo(
    () => [
      {
        heading: 'product.description-title',
        icon: Description,
        testId: 'productDescriptionPanel',
        className: '',
        content: product.description ? (
          <ProductDescription
            product={product}
            collapsible
            showCertificateButtons
            type="description"
          />
        ) : (
          <ProductDescription
            product={product}
            collapsible={false}
            type="usageNotes"
            showUsageLeaflets
            showLeafletMessage
            //TODO: Add logic for fetching usage leaflets once the attribute is ready on the BE. Currently it uses mocked data.
            productUsageLeaflets={productUsageLeaflets}
          />
        )
      },
      {
        heading: 'product.key-details-title',
        icon: Eye,
        testId: 'productKeyDetailsPanel',
        className: '',
        content: (
          <KeyDetailsTable
            brandDetailsPageUrl={brandDetailsPageUrl}
            format={product.format}
            unitPrice={product.pricePerUnit}
            brand={product.brand}
            msrp={product.rrp}
            data-testid="pdpKeyDetailsTable"
          />
        )
      },
      {
        heading: 'product.composition-title',
        icon: Composition,
        testId: 'productCompositionPanel',
        className: classNames({
          hidden: product.ingredients === undefined
        }),
        content: parseHtml(
          product.ingredients ?? '',
          { p: { className: 'break-words' } },
          true
        )
      },
      {
        heading: 'product.how-to-use-title',
        icon: Information,
        testId: 'productHowToUsePanel',
        className: classNames({
          //Hide How to use notes if they are undefined or if it's german shop and there is no product description
          hidden:
            product.usageNotes === undefined ||
            (isGermanShop && !product.description)
        }),
        content: isShowGermanPDPDetailsEnabled ? (
          <ProductDescription
            product={product}
            collapsible
            type="usageNotes"
            showUsageLeaflets
            //TODO: Add logic for fetching usage leaflets once the attribute is ready on the BE. Currently it uses mocked data.
            productUsageLeaflets={productUsageLeaflets}
          />
        ) : (
          parseHtml(
            product.usageNotes ?? '',
            { p: { className: 'break-words' } },
            true
          )
        )
      },
      {
        heading: 'product.hints-title',
        icon: Lamp,
        testId: 'productHintsPanel',
        className: classNames({
          hidden: !isShowGermanPDPDetailsEnabled || !product.hints
        }),
        content: parseHtml(
          product.hints ?? '',
          { p: { className: 'break-words' } },
          true
        )
      },
      {
        heading: 'product.manufacturer-information-title',
        icon: Shop,
        testId: 'productManufacturerInformationPanel',
        className: classNames({
          hidden:
            manufacturerDetailsMock === undefined ||
            !isShowGermanPDPDetailsEnabled
        }),
        content: (
          //ManufacturerDetails component is working with mocked data. It might need refactor once we clarify the real data format
          <ManufacturerDetails
            name={manufacturerDetailsMock?.name}
            address={manufacturerDetailsMock?.address}
          />
        )
      },
      {
        heading: 'product.lmiv-storage-title',
        icon: Fridge,
        testId: 'lmivStoragePanel',
        className: classNames({
          hidden: !isShowGermanPDPDetailsEnabled || !product.lmivStorage
        }),
        content: parseHtml(
          product.lmivStorage ?? '',
          { p: { className: 'break-words' } },
          true
        )
      }
    ],
    [brandDetailsPageUrl, isGermanShop, isShowGermanPDPDetailsEnabled, product]
  )

  return (
    <Accordion controlled defaultActivePanel={0} data-testid="productAccordion">
      {sections.map(section => (
        <AccordionPanel
          key={section.testId}
          heading={t(section.heading)}
          icon={<section.icon className="icon-24" />}
          data-testid={section.testId}
          className={section.className}
        >
          <div className="bg-ui-guyabano p-3 -mx-2 md:mx-0">
            {section.content}
          </div>
        </AccordionPanel>
      ))}
    </Accordion>
  )
}
