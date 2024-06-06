import { useMemo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { ContentBlocksLayout } from '~components/templates/ContentBlocksLayout'
import { MetaData } from '~components/meta/MetaData'
import { AlternateLinks } from '~components/meta/AlternateLinks'
import { selectContent } from '~domains/page'
import { triggerReportPageViewed } from '~domains/analytics'
import { transformContentSlugsToHreflang } from '~domains/translated-routes'
import classNames from 'classnames'
import { parseHtml } from '~helpers'
import { Fonts } from '~components/meta/MetaData/PreloadFonts'
import { SeoContentProps } from '~components/atoms/SeoContent'

const Organization = dynamic<unknown>(() =>
  import('~components/meta/StructuredData').then(c => c.Organization)
)
const ContentSEO = dynamic<unknown>(() =>
  import('./ContentSEO').then(c => c.ContentSEO)
)
const SeoContent = dynamic<SeoContentProps>(() =>
  import('~components/atoms/SeoContent').then(c => c.SeoContent)
)

export const Content = () => {
  const { locale } = useRouter()
  const content = useSelector(selectContent)
  const dispatch = useDispatch()

  const isHomePage = useMemo(() => content?.slug === '/', [content])
  const isCampaignPage = useMemo(() => content?.isCampaignPage, [content])

  const titlePage = useMemo(
    () => (isHomePage ? 'Home' : content?.title || ''),
    [content, isHomePage]
  )

  const pageType = useMemo(
    () => (isHomePage ? 'home' : isCampaignPage ? 'campaign' : 'landing'),
    [isHomePage, isCampaignPage]
  )

  useEffect(() => {
    dispatch(
      triggerReportPageViewed({
        page: titlePage,
        pageType: pageType
      })
    )
  }, [dispatch, pageType, titlePage])

  return (
    <>
      <MetaData
        title={content?.seo?.title || content?.title || undefined}
        description={content?.seo?.description}
        preloadFonts={isHomePage ? [Fonts.title] : []}
        noIndex={content?.seo?.noIndex}
        noFollow={content?.seo?.noFollow}
        canonicalHrefOverride={content?.seo?.canonicalHrefOverride}
      />
      {isHomePage && (
        <>
          <ContentSEO />
          <Organization />
        </>
      )}
      <AlternateLinks
        links={transformContentSlugsToHreflang(
          locale as string,
          content?.allSlugs ?? undefined
        )}
      />
      <main className="mb-5 sm:mb-6 md:mb-7 lg:mb-9 overflow-hidden">
        <ContentBlocksLayout
          isLcp={true}
          key={content?.slug}
          contentBlocks={content?.contentBlocks ?? []}
          isHomePage={isHomePage}
        />
        {/* Footer SEO content */}
        {content?.seo?.copy && (
          <section className="flex bg-ui-guyabano mt-5 sm:mt-8 -mb-5 sm:-mb-8">
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
