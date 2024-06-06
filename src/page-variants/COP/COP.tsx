import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'

import { CategoryOverviewLayout } from '~components/templates/CategoryOverviewLayout'
import { MetaData } from '~components/meta/MetaData'
import { MainSectionHeader } from '~components/molecules/MainSectionHeader'
import { SeoContent } from '~components/atoms/SeoContent'
import { parseHtml } from '~helpers'
import { ContentBlock, selectContent } from '~domains/page'
import { selectData, selectIsLoading } from '~domains/promotion'
import { LoadingSpinner } from '~components/atoms/LoadingSpinner'
import { Promotion } from '~domains/contentful/normalizers/promotion'
import {
  triggerReportPageViewed,
  triggerReportPromotionListViewed
} from '~domains/analytics'
import { AlternateLinks } from '~components/meta/AlternateLinks'
import { transformContentSlugsToHreflang } from '~domains/translated-routes'
import { selectMenuData } from '~domains/menu/selectors'
import { MenuItem } from '~domains/contentful/normalizers/menu-item'
import { SimpleHeader } from '~components/molecules/SimpleHeader'
import { BreadcrumbsStructuredData } from '~components/meta/StructuredData'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'

export const COP = () => {
  const dispatch = useDispatch()
  const { locale } = useRouter()
  const isSeoStructuredDataCopAndPopBreadcrumbs = useFeatureFlag(
    FeatureFlag.SEO_STRUCTURED_DATA_COP_AND_POP_BREADCRUMBS
  )
  const content = useSelector(selectContent)
  const { categoryCop } = content || {}
  const promotions = useSelector(selectData)
  const promotionsToShow =
    categoryCop?.linkedPromotions && categoryCop?.linkedPromotions?.length > 0
      ? categoryCop?.linkedPromotions
      : promotions?.slice(0, 4)
  const isLoading = useSelector(selectIsLoading)
  const menu = useSelector(selectMenuData)

  const subcategories = menu?.items?.map((item: MenuItem) => ({
    id: item?.id,
    title: item?.title || item?.link?.label,
    url: item?.link?.url
  }))
  const seoBreadcrumbs = useMemo(() => {
    return (
      (content?.title !== null && [
        {
          title: content?.title
        }
      ]) ||
      []
    )
  }, [content])

  const breadcrumbs = useMemo(
    () => [
      {
        title: content?.title ?? '',
        path: `/${content?.slug}` ?? ''
      }
    ],
    [content]
  )
  useEffect(() => {
    const storage = globalThis?.sessionStorage
    if (!storage) return
    storage.removeItem('scroll-position-product-id-marker')
  }, [])

  useEffect(() => {
    categoryCop?.category &&
      dispatch(
        triggerReportPageViewed({
          page: 'Category Overview',
          pageType: 'pop',
          category: categoryCop?.category
        })
      )
  }, [dispatch, categoryCop?.category])

  useEffect(() => {
    promotionsToShow &&
      dispatch(
        triggerReportPromotionListViewed({ promotions: promotionsToShow })
      )
  }, [dispatch, promotionsToShow])

  return (
    <>
      <MetaData
        title={content?.seo?.title}
        description={content?.seo?.description}
        keywords={content?.seo?.keywords}
        image={content?.seo?.image?.url}
        noIndex={content?.seo?.noIndex}
        noFollow={content?.seo?.noFollow}
        canonicalHrefOverride={content?.seo?.canonicalHrefOverride}
      />
      {isSeoStructuredDataCopAndPopBreadcrumbs && (
        <BreadcrumbsStructuredData breadcrumbs={seoBreadcrumbs} />
      )}
      <AlternateLinks
        links={transformContentSlugsToHreflang(
          locale as string,
          content?.allSlugs ?? undefined
        )}
      />

      <main data-testid="copLayout">
        <MainSectionHeader backgroundColor={categoryCop?.color}>
          {props => (
            <SimpleHeader
              title={content?.title ?? undefined}
              image={categoryCop?.category?.image}
              breadcrumbs={breadcrumbs}
              {...props}
            />
          )}
        </MainSectionHeader>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <CategoryOverviewLayout
            // applying unique key here means that the component is forced to re-mount on SPA page transition - meaning less risk of data not being refreshed
            key={categoryCop?.category?.id}
            contentBlocks={content?.contentBlocks as ContentBlock[]}
            promotionDetails={{
              promotions: promotionsToShow as Promotion[],
              totalNumPromotions: promotions?.length
            }}
            categoryDetails={{
              title: categoryCop?.category?.title,
              subcategories,
              url: categoryCop?.categoryPageSlug,
              id: categoryCop?.category?.id
            }}
          />
        )}

        {/* Footer SEO content */}
        {content?.seo && (
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
    </>
  )
}
