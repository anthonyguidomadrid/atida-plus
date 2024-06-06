import { useSelector } from 'react-redux'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Link } from '~components/atoms/Link'
import NextLink from 'next/link'
import { useBrandUrl } from '~helpers/useBrandUrl'
import { useUnitVolumeWithContentSizeFactor } from '~helpers/useUnitVolumeWithContentSizeFactor'
import { selectPDPInfoDetailsData, useFormatWeight } from '~domains/product'
import { useMemo } from 'react'

export const PDPInfoDetails = () => {
  const { t } = useTranslation()
  const { brandUrl } = useBrandUrl()

  const infoDetailsData = useSelector(selectPDPInfoDetailsData)

  const brand = useMemo(
    () =>
      brandUrl ? (
        <NextLink href={brandUrl} passHref key={brandUrl}>
          <Link data-testid="brandURL" className="text-ui-grey">
            {infoDetailsData?.brand?.label}
          </Link>
        </NextLink>
      ) : (
        <p className="inline-flex">{infoDetailsData?.brand?.label}</p>
      ),
    [brandUrl, infoDetailsData?.brand?.label]
  )
  const unitVolumeWithContentSizeFactor = useUnitVolumeWithContentSizeFactor(
    infoDetailsData?.unitVolume,
    infoDetailsData?.contentSizeFactor
  )

  const formatWeight = useFormatWeight()
  const netWeight =
    infoDetailsData?.netWeight &&
    formatWeight(
      infoDetailsData?.netWeight?.amount,
      infoDetailsData?.netWeight?.unit,
      infoDetailsData?.netWeight?.unitLabel
    )

  return (
    <dl
      data-testid="PDPInfoDetails"
      className={classNames(
        'grid',
        'pt-3',
        'grid-cols-1',
        'gap-1',
        'text-sm',
        'lg:grid-cols-3',
        'sm:text-base',
        'lg:gap-3',
        'lg:pt-4'
      )}
    >
      {infoDetailsData?.pzn && (
        <div
          data-testid="pdpInfoDetailPzn"
          className="flex justify-between lg:block"
        >
          <dt className="font-semibold lg:mb-0.5">
            {t('pdp.info-detail-title-pzn')}
          </dt>
          <dd>{infoDetailsData?.pzn}</dd>
        </div>
      )}
      {infoDetailsData?.manufacturerName && (
        <div
          data-testid="pdpInfoDetailSupplier"
          className="flex justify-between lg:block"
        >
          <dt className="font-semibold  lg:mb-0.5">
            {t('pdp.info-detail-title-supplier')}
          </dt>
          <dd>{infoDetailsData?.manufacturerName}</dd>
        </div>
      )}
      {infoDetailsData?.format?.label && (
        <div
          data-testid="pdpInfoDetailDosage"
          className="flex justify-between lg:block"
        >
          <dt className="font-semibold lg:mb-0.5">
            {t('pdp.info-detail-title-dosage')}
          </dt>
          <dd>{infoDetailsData?.format?.label}</dd>
        </div>
      )}
      {unitVolumeWithContentSizeFactor && (
        <div
          data-testid="pdpInfoDetailSize"
          className="flex justify-between lg:block"
        >
          <dt className="font-semibold lg:mb-0.5">
            {t('pdp.info-detail-title-size')}
          </dt>
          <dd>{unitVolumeWithContentSizeFactor}</dd>
        </div>
      )}
      {netWeight && (
        <div
          data-testid="pdpInfoDetailWeight"
          className="flex justify-between lg:block"
        >
          <dt className="font-semibold lg:mb-0.5">
            {t('product.pdp.info-detail-title-weight')}
          </dt>
          <dd data-testid="pdpWeight">{netWeight}</dd>
        </div>
      )}

      {infoDetailsData?.brand?.label && (
        <div
          data-testid="pdpInfoDetailBrand"
          className="flex justify-between lg:block"
        >
          <dt className="font-semibold lg:mb-0.5">
            {t('product.brand-title')}
          </dt>
          {brand}
        </div>
      )}
    </dl>
  )
}
