import NextLink from 'next/link'
import { ReactNode, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { selectPDPHeaderData } from '~domains/product'
import { useUnitVolumeWithContentSizeFactor } from '~helpers/useUnitVolumeWithContentSizeFactor'
import { Link } from '~components/atoms/Link'
import { Reviews } from '~components/atoms/Reviews'
import { useBrandUrl } from '~helpers/useBrandUrl'

export const PDPHeader = () => {
  const { t } = useTranslation()

  const headerData = useSelector(selectPDPHeaderData)
  const unitVolumeWithContentSizeFactor = useUnitVolumeWithContentSizeFactor(
    headerData?.unitVolume,
    headerData?.contentSizeFactor,
    headerData?.bundleSizeFactor
  )

  const { brandUrl } = useBrandUrl()

  const brand = useMemo(
    () =>
      brandUrl ? (
        <NextLink href={brandUrl} passHref key={brandUrl}>
          <Link data-testid="brandURL" className="text-ui-grey">
            {headerData?.brand?.label}
          </Link>
        </NextLink>
      ) : (
        <p className="inline-flex">{headerData?.brand?.label}</p>
      ),
    [brandUrl, headerData?.brand?.label]
  )

  const pzn = useMemo(
    () => (headerData?.pzn ? t('product.pzn', { pzn: headerData.pzn }) : null),
    [headerData?.pzn, t]
  )

  const productInfo = useMemo(
    () =>
      [brand, headerData?.format?.label, unitVolumeWithContentSizeFactor, pzn]
        .filter(value => !!value)
        .reduce<ReactNode[]>(
          (prev, curr) => [prev, !!prev.length ? ' - ' : null, curr],
          []
        ),
    [brand, headerData?.format?.label, pzn, unitVolumeWithContentSizeFactor]
  )

  if (!headerData) return null
  return (
    <header className="col-span-12" data-testid="productHeader">
      <h1 className="text-xl mb-1.5 sm:text-3xl lg:text-5xl lg:mb-1">
        {headerData.name}
      </h1>
      <small
        data-testid="productHeaderProductInfo"
        className="block text-sm text-ui-grey h-2.5"
      >
        {productInfo}
      </small>
      <a href="#reviews" className="no-underline h-2 mt-1.5 w-full">
        <Reviews
          numberOfReviews={headerData.rating?.numberOfReviews}
          rating={headerData.rating?.averageRating}
          showTranslation
        />
      </a>
    </header>
  )
}
