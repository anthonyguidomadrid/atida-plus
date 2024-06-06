import classNames from 'classnames'
import useInView from 'react-cool-inview'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { ExpertSignature } from '~components/molecules/ExpertSignature'
import { selectPDPDetailsData } from '~domains/product'
import { Product } from '~domains/product/types'
import { ProductDetails } from './ProductDetails'
import { ProductReviews } from './ProductReviews'
import { useFeatureFlags } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'
import { useBrandUrl } from '~helpers/useBrandUrl'
import { LegacyRef } from 'react'

export type PDPDetailsProps = {
  reviewsRef?: LegacyRef<HTMLDivElement>
}

export const PDPDetails = ({ reviewsRef }: PDPDetailsProps) => {
  const [
    isHotjarEventTriggersEnabled,
    isEnabledExpertSignature
  ] = useFeatureFlags([
    FeatureFlag.PDP_ENABLE_HOTJAR_EVENT_TRIGGERS,
    FeatureFlag.PDP_ENABLE_EXPERT_SIGNATURE
  ])

  const { t } = useTranslation()
  const productDetailsData = useSelector(selectPDPDetailsData)
  const { brandUrl } = useBrandUrl()

  const { observe: productDetailsRef } = useInView({
    onEnter: ({ unobserve }) => {
      unobserve()
      if (isHotjarEventTriggersEnabled) {
        const hj =
          //@ts-ignore Missing hotjar type
          window.hj ||
          function () {
            // eslint-disable-next-line prefer-rest-params
            ;(hj.q = hj.q || []).push(arguments)
          }
        hj('event', 'product_description_pdp')
      }
    }
  })

  return (
    <div
      className={classNames(
        'col-span-12 mb-5 md:col-start-1 md:col-end-7 lg:col-end-8 md:row-start-4',
        {
          'sm:mt-2 md:mt-0':
            productDetailsData.images && productDetailsData.images?.length > 1
        }
      )}
      ref={isHotjarEventTriggersEnabled ? productDetailsRef : undefined}
    >
      <span className="font-body font-semibold font-medium flex text-lg lg:text-2xl mb-3">
        {t('product.product-details-title')}
      </span>
      <ProductDetails
        product={productDetailsData as Product}
        brandDetailsPageUrl={brandUrl ?? ''}
      />

      {isEnabledExpertSignature && <ExpertSignature />}

      <div
        key={productDetailsData.id}
        ref={reviewsRef}
        className="pt-4 flex flex-col"
        id="reviews"
      >
        <span className="font-body font-semibold text-lg mb-4">
          {t('reviews.title')}
        </span>
        <ProductReviews
          key={productDetailsData.id}
          product={productDetailsData as Product}
        />
      </div>
    </div>
  )
}
