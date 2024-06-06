import { FunctionComponent, useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { parseHtml } from '~helpers'
import { Product } from '~domains/product'

import { Button } from '~components/atoms/Button'
import { ReactComponent as Doc } from '~assets/svg/navigation-24px/Doc.svg'
import { ReactComponent as Download } from '~assets/svg/navigation-24px/Download.svg'
import classNames from 'classnames'

export type ProductDescriptionProps = {
  product: Product
  collapsible: boolean
  showCertificateButtons?: boolean
  type?: 'description' | 'usageNotes'
  showUsageLeaflets?: boolean
  showLeafletMessage?: boolean
  productUsageLeaflets?: { type: string; url: string }[]
}

export const ProductDescription: FunctionComponent<ProductDescriptionProps> = ({
  product,
  collapsible,
  showCertificateButtons = false,
  type = 'description',
  showUsageLeaflets = false,
  showLeafletMessage = false,
  productUsageLeaflets
}) => {
  const { t } = useTranslation()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const showCertificateList = useMemo(
    () =>
      Boolean(
        showCertificateButtons &&
          product?.assetCertificateList?.length &&
          product?.assetCertificateList?.length > 0
      ),
    [product?.assetCertificateList?.length, showCertificateButtons]
  )

  const handleDownload = useCallback((url: string) => {
    window.open(url, '_blank')
  }, [])

  const content = useMemo(
    () => (
      <div className="space-y-2">
        {type === 'description' &&
          parseHtml(product.description ?? '', {
            p: { className: 'break-words' }
            // TODO: PLUS-3556, strip the link elements from PDP description when the Akeneo content will be migrated to use product certificates as separate fields. Add `, true`
          })}
        {type === 'description' && product.pharmaceuticalAdvice && (
          <h5>{t('product.pharmaceutical-opinion')}</h5>
        )}
        {type === 'description' &&
          parseHtml(
            product.pharmaceuticalAdvice ?? '',
            { p: { className: 'break-words' } },
            true
          )}
        {type === 'usageNotes' &&
          parseHtml(
            product.usageNotes ?? '',
            { p: { className: 'break-words' } },
            true
          )}
        {type === 'usageNotes' &&
          showLeafletMessage &&
          t('product.learn-more.leaflet.message')}
        {showCertificateList &&
          product?.assetCertificateList?.map((certificateUrl, index) => (
            <Button
              key={`certificate-url-${index}`}
              variant="secondary"
              icon={<Doc role="presentation" className="icon-24" />}
              onClick={() => handleDownload(certificateUrl)}
              data-testid="certificateButton"
              className="border-ui-grey-light w-full"
            >
              {t('product.view-product-certificate')}
            </Button>
          ))}
      </div>
    ),
    [
      handleDownload,
      product?.assetCertificateList,
      product.description,
      product.pharmaceuticalAdvice,
      product.usageNotes,
      showCertificateList,
      showLeafletMessage,
      t,
      type
    ]
  )

  const usageLeaflets = useMemo(
    () =>
      showUsageLeaflets &&
      type === 'usageNotes' &&
      productUsageLeaflets?.map((usageLeaflet, index) => (
        <Button
          key={`usageLeaflet-url-${index}`}
          variant="tertiary"
          icon={<Download role="presentation" className="icon-24" />}
          onClick={() => handleDownload(usageLeaflet.url)}
          data-testid="usageLeafletButton"
          className={classNames('cursor-pointer xs-only:w-full mt-2', {
            'mr-2': index < productUsageLeaflets.length - 1
          })}
        >
          {usageLeaflet.type}
        </Button>
      )),
    [handleDownload, productUsageLeaflets, showUsageLeaflets, type]
  )

  return (
    <>
      {type === 'description' && <h5>{t('shared.details')}</h5>}
      <div className="space-y-1">
        {isCollapsed ? (
          <div
            data-testid="productDescriptionCollapsed"
            tabIndex={0}
            role="button"
            className="max-h-12 overflow-hidden relative cursor-pointer"
            onClick={() => setIsCollapsed(false)}
            onKeyDown={() => setIsCollapsed(false)}
          >
            {content}
            <div className="absolute bottom-0 right-0 left-0 h-4" />
          </div>
        ) : (
          content
        )}
        {collapsible && (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="font-light underline"
            aria-expanded={!isCollapsed}
          >
            {isCollapsed ? t('seo.read-more') : t('seo.show-less')}
          </button>
        )}
      </div>
      {usageLeaflets}
    </>
  )
}
