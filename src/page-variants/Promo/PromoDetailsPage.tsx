import { useRouter } from 'next/router'
import NextLink from 'next/link'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { POPProps } from '../POP/POP'
import { createAlgoliaFrontendClient, getAlgoliaIndex } from '~domains/algolia'
import { selectContent } from '~domains/page'
import { triggerReportPageViewed } from '~domains/analytics'
import { MetaData } from '~components/meta/MetaData'
import { MinimalProductSearchLayout } from '~components/templates/MinimalProductSearchLayout'
import { PromotionHeader } from '~components/molecules/PromotionHeader'
import { PromotionTeaser } from '~components/molecules/PromotionTeaser'
import { Tag } from '~components/atoms/Tag'
import { Link } from '~components/atoms/Link'
import { brandPromotions } from './PromoDetailsPage.mock'
import { ReactComponent as PlusLarge } from '~assets/svg/navigation-24px/PlusLarge.svg'
import { isFeatureEnabled } from '~helpers/is-feature-enabled'
import { SeoContent } from '~components/atoms/SeoContent'
import { parseHtml } from '~helpers'
import { MainSectionHeader } from '~components/molecules/MainSectionHeader'

export type PromoDPProps = POPProps

export const PromoDP = ({ resultsState, searchFilters }: PromoDPProps) => {
  const dispatch = useDispatch()
  const { locale } = useRouter()
  const { t } = useTranslation()
  const content = useSelector(selectContent)
  const { labels, color, title, image, teaserImage, description } =
    content?.promotion || {}
  const indexName = getAlgoliaIndex(locale, 'productIndexes')
  const searchClient = createAlgoliaFrontendClient()
  const showBrandLinks = isFeatureEnabled(
    'FEATURE_BRAND_LINKS_PROMOTION_DETAIL_PAGE'
  )

  useEffect(() => {
    dispatch(
      triggerReportPageViewed({
        page: 'Promotion Detail Page',
        pageType: 'promo'
      })
    )
  }, [dispatch])

  return (
    <main data-testid="promodpLayout">
      <MetaData
        title={content?.seo?.title}
        description={content?.seo?.description}
        noIndex={content?.seo?.noIndex}
        noFollow={content?.seo?.noFollow}
        canonicalHrefOverride={content?.seo?.canonicalHrefOverride}
      />
      <MainSectionHeader backgroundColor={color}>
        {props => (
          <PromotionHeader
            title={title}
            description={description}
            image={image || teaserImage}
            labels={labels}
            {...props}
          />
        )}
      </MainSectionHeader>

      <div
        className={classNames('container-fixed grid mx-auto mt-3', {
          'md:grid-cols-promo-dp': showBrandLinks,
          'px-2 md:px-8': !showBrandLinks
        })}
      >
        {showBrandLinks && (
          <section
            className={classNames('sm:grid hidden sm:col-span-1 sm:max-h-19')}
          >
            <p className="text-base m-0 font-body font-semibold">
              {t('promotions.brands-in-promotions')}
            </p>
            {brandPromotions.map(brand => (
              <NextLink key={brand} href="/promotions/avene" prefetch={false}>
                <Link
                  data-testid="promotionImageLink"
                  className={classNames(
                    'mt-2 font-body font-light no-underline cursor-pointer',
                    'hover:font-semibold hover:text-primary-caribbean-green',
                    'active:font-semibold active:text-primary-caribbean-green'
                  )}
                >
                  {brand}
                </Link>
              </NextLink>
            ))}
          </section>
        )}
        <div className="w-full grid sm:grid-cols-6">
          <section
            className={classNames(
              'sm:col-start-1 sm:col-end-6 sm:w-11/12 md:w-full sm:justify-self-end'
            )}
          >
            <MinimalProductSearchLayout
              // applying unique key here means that the component is forced to re-mount on SPA page transition - meaning less risk of data not being refreshed
              key={content?.promotion?.id}
              locale={locale}
              indexName={indexName}
              searchClient={searchClient}
              resultsState={resultsState}
              filters={searchFilters}
              category={content?.category}
            />
          </section>
          {isFeatureEnabled(
            'FEATURE_INTERESTING_FOR_YOU_PROMO_DETAIL_PAGE'
          ) && (
            <section
              className={classNames('sm:col-start-1 grid sm:col-end-6 w-full')}
            >
              <div className="sm:w-11/12 sm:justify-self-end">
                <p
                  className={classNames(
                    'xs:col-span-1 xs:text-lg xs:font-body font-light lg:font-normal mb-4 lg:max-w-sm max-w-xs'
                  )}
                >
                  {t('promotions.teasers-title')}
                </p>
                <div
                  className={classNames(
                    'grid grid-cols-1 sm:grid-cols-2 gap-3'
                  )}
                >
                  <PromotionTeaser
                    name={content?.promotion?.title}
                    categoryColor={content?.promotion?.color}
                    teaserImage={content?.promotion?.teaserImage}
                    teaserType={true}
                    shortDescription={content?.promotion?.teaserDescription}
                    labels={content?.promotion?.labels}
                    isSponsoredContent={content?.promotion?.isSponsoredContent}
                    sponsoredContentPosition={
                      content?.promotion?.sponsoredContentPosition
                    }
                  />
                  <PromotionTeaser
                    name={content?.promotion?.title}
                    categoryColor={content?.promotion?.color}
                    teaserImage={content?.promotion?.teaserImage}
                    teaserType={true}
                    shortDescription={content?.promotion?.teaserDescription}
                    labels={content?.promotion?.labels}
                    isSponsoredContent={content?.promotion?.isSponsoredContent}
                    sponsoredContentPosition={
                      content?.promotion?.sponsoredContentPosition
                    }
                  />
                </div>
                <div className="sm:grid justify-center grid sm:col-start-3 sm:col-end-5">
                  <Tag
                    href="/promotions/avene"
                    className={classNames('sm:max-w-24 sm:my-3')}
                  >
                    <PlusLarge className="icon-24" />
                    {t('promotions.view-all')}
                  </Tag>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
      {/* Footer SEO content */}
      {content?.seo?.copy && (
        <section className="flex bg-ui-guyabano">
          <span
            className={classNames(
              'grid grid-cols-12 px-2',
              'sm:px-5',
              'md:px-8',
              'md:container-fixed md:mx-auto'
            )}
          >
            <SeoContent
              header={content?.seo?.header}
              children={parseHtml(content?.seo?.copy, {
                ul: {
                  className: 'list-disc mt-2 ml-1'
                },
                ol: {
                  className: 'list-decimal mt-2 ml-1'
                },
                li: {
                  className: 'ml-2.25'
                },
                p: {
                  className: 'mb-1.5'
                }
              })}
            />
          </span>
        </section>
      )}
    </main>
  )
}
