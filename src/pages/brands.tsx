import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { MetaData } from '~components/meta/MetaData'
import {
  getAlternateLinks,
  getCanonicalLink,
  getPageSlug
} from '~domains/translated-routes'
import { AlternateLinks } from '~components/meta/AlternateLinks'
import { MainSectionHeader } from '~components/molecules/MainSectionHeader'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { getBrandFulfill, getBrandTrigger, selectData } from '~domains/brand'
import { WAIT_FOR_ACTION } from 'redux-wait-for-action'
import { createReduxStore } from '~domains/redux'
import NextLink from 'next/link'
import { Link } from '~components/atoms/Link'
import { getFirstLetter } from '~helpers/getFirstLetterOfString'
import { Brand } from '~domains/contentful/normalizers/brand'
import { TagList } from '~components/molecules/TagList/TagList'
import { Tag } from '~components/atoms/Tag/Tag'
import { useEffect } from 'react'

import { triggerReportPageViewed } from '~domains/analytics'
import { selectSeoData, seoBlockFulfill, seoBlockTrigger } from '~domains/seo'
import { loadFeatureFlags } from '~helpers/server-only/featureFlagClient'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'
import { SimpleHeader } from '~components/molecules/SimpleHeader'
import { Button } from '~components/atoms/Button'
import {
  scrollToTop,
  toggleBackToTopButtonVisibility
} from '~helpers/scrollToTop'
import { ReactComponent as ChevronUp } from '~assets/svg/navigation-16px/ChevronUp.svg'
import { getPageCacheHeader } from '~helpers/server-only/cacheHeaders'
import classNames from 'classnames'
import { SeoContentExpandable } from '~components/atoms/SeoContentExpandable'
import { parseHtml } from '~helpers'
import { SeoContent } from '~components/atoms/SeoContent'

const Brands: NextPage = () => {
  const { locale } = useRouter()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const seo = useSelector(selectSeoData)
  const brands = useSelector(selectData)

  const isShowSEOCopyContentOnBrandsAndPromotionsEnabled = useFeatureFlag(
    FeatureFlag.SEO_SHOW_COPY_CONTENT_ON_BRANDS_AND_PROMOTIONS_PAGES
  )

  let brandsByLetter: (
    | { letter: string | undefined; brands: Brand[] }
    | undefined
  )[] = []
  const brandsStartingByNumber: (
    | { letter: string | undefined; brands: Brand[] }
    | undefined
  )[] = []

  const charValueIsANumber = (string: string): boolean => {
    return !isNaN(parseInt(string))
  }

  const sortBrandsByTitle = (
    brands: Brand[] | undefined
  ): Brand[] | undefined => {
    const brandsToBeSorted = brands ? [...brands] : []
    brandsToBeSorted.sort((a, b) => {
      const titleA = a.title?.toUpperCase()
      const titleB = b.title?.toUpperCase()
      if (titleA && titleB && titleA < titleB) {
        return -1
      }
      if (titleA && titleB && titleA > titleB) {
        return 1
      }
      // names are equal
      return 0
    })
    return brandsToBeSorted
  }

  const sortedBrands = sortBrandsByTitle(brands)

  sortedBrands?.forEach((brand, index) => {
    const brandFirstLetter = getFirstLetter(brand?.title)
      ?.normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toUpperCase()
    if (
      index === 0 ||
      (brandFirstLetter !== brandsByLetter[brandsByLetter.length - 1]?.letter &&
        brandFirstLetter !==
          brandsStartingByNumber[brandsStartingByNumber.length - 1]?.letter)
    ) {
      const letterBrands = []
      letterBrands.push(brand)
      brandFirstLetter && charValueIsANumber(brandFirstLetter)
        ? brandsStartingByNumber.push({
            letter: brandFirstLetter,
            brands: letterBrands
          })
        : brandsByLetter.push({
            letter: brandFirstLetter,
            brands: letterBrands
          })
    } else {
      brandFirstLetter && charValueIsANumber(brandFirstLetter)
        ? brandsStartingByNumber &&
          brandsStartingByNumber[
            brandsStartingByNumber.length - 1
          ]?.brands.push(brand)
        : brandsByLetter &&
          brandsByLetter[brandsByLetter.length - 1]?.brands.push(brand)
    }
  })

  brandsByLetter = brandsByLetter.concat(brandsStartingByNumber)

  useEffect(() => {
    dispatch(
      triggerReportPageViewed({ page: 'Brands', pageType: 'brand_list' })
    )
  }, [dispatch])

  useEffect(() => {
    const storage = globalThis?.sessionStorage
    if (!storage) return
    storage.removeItem('scroll-position-product-id-marker')
  }, [])

  useEffect(() => {
    toggleBackToTopButtonVisibility()
    window.addEventListener('scroll', toggleBackToTopButtonVisibility)

    return function cleanup() {
      window.removeEventListener('scroll', toggleBackToTopButtonVisibility)
    }
  }, [])

  return (
    <>
      <MetaData
        title={seo?.title}
        description={seo?.description}
        noIndex={seo?.noIndex}
        noFollow={seo?.noFollow}
        canonicalHrefOverride={seo?.canonicalHrefOverride}
      />
      <AlternateLinks links={getAlternateLinks('brands')} />

      <MainSectionHeader backgroundColor={'category-beauty'}>
        {props => <SimpleHeader title={t('brands.heading')} {...props} />}
      </MainSectionHeader>

      {/* Top SEO content */}
      {isShowSEOCopyContentOnBrandsAndPromotionsEnabled && seo?.copyExpandable && (
        <article className="container container-fixed mx-auto my-4">
          <SeoContentExpandable children={parseHtml(seo.copyExpandable)} />
        </article>
      )}
      {brandsByLetter && brandsByLetter.length > 0 && (
        <>
          <section className="container md:border-b md:border-ui-grey-light pt-1.5 pb-0.5 mb-3">
            <TagList className="container container-fixed mx-auto">
              {brandsByLetter &&
                brandsByLetter.length > 0 &&
                brandsByLetter.map(letter => (
                  <Tag
                    className="w-5"
                    key={letter?.letter}
                    href={
                      getCanonicalLink('brands', locale) + `#${letter?.letter}`
                    }
                  >
                    {letter?.letter}
                  </Tag>
                ))}
            </TagList>
          </section>
          <main className="container container-fixed mx-auto flex flex-col mb-6 sm:mb-8 md:mb-9 lg:mb-12">
            {brandsByLetter &&
              brandsByLetter.length > 0 &&
              brandsByLetter.map(letter => {
                return (
                  <section key={`brands-for-letter-${letter?.letter}`}>
                    <h3
                      className="mt-5 mb-1.5 text-6xl font-normal"
                      id={`${letter?.letter}`}
                      key={`brands-starting-letter-${letter && letter.letter}`}
                    >
                      {letter && letter.letter}
                    </h3>
                    <hr
                      className="border-t md:border-ui-grey-light"
                      key={`brands-starting-separator-${
                        letter && letter.letter
                      }`}
                    />
                    <ul
                      className="mt-3 grid grid-cols-12 gap-1"
                      key={`brands-${letter && letter.letter}`}
                    >
                      {letter &&
                        letter.brands &&
                        letter.brands.length &&
                        letter.brands.map(brand => {
                          return (
                            <li
                              key={`brand-${brand.id}`}
                              className="col-span-6 sm:col-span-3 lg:col-span-2 mt-3"
                            >
                              <NextLink
                                passHref
                                href={`${brand.url}`}
                                prefetch={false}
                              >
                                <Link className="w-full sm:max-w-27 no-underline">
                                  {brand.title}
                                </Link>
                              </NextLink>
                            </li>
                          )
                        })}
                    </ul>
                  </section>
                )
              })}

            <Button
              id="backToTopButton"
              onClick={() => scrollToTop()}
              className="fixed bottom-3 z-20 transition-opacity duration-500 right-1 md:right-5 bg-primary-white text-primary-oxford-blue focus:outline-none"
              icon={<ChevronUp className="icon-16" />}
            />
          </main>
          {/* Footer SEO content */}
          {isShowSEOCopyContentOnBrandsAndPromotionsEnabled && seo?.copy && (
            <section className="flex bg-ui-guyabano">
              <span
                className={classNames(
                  'px-2',
                  'sm:px-5',
                  'md:px-8',
                  'md:container-fixed md:mx-auto'
                )}
              >
                <SeoContent
                  header={seo?.header}
                  children={parseHtml(seo?.copy)}
                />
              </span>
            </section>
          )}
        </>
      )}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const cacheHeader = await getPageCacheHeader(context.locale, true)
  context.res.setHeader('Cache-Control', cacheHeader)
  const store = createReduxStore(context.locale)
  const featureFlags = await loadFeatureFlags(context.locale)

  store.dispatch(getBrandTrigger())
  store.dispatch(
    seoBlockTrigger({
      slug: getPageSlug('brands', context.locale) || 'brands'
    })
  )

  await Promise.all([
    store.dispatch({
      type: 'brands',
      [WAIT_FOR_ACTION]: getBrandFulfill().type
    }),
    store.dispatch({
      type: 'seo-block',
      [WAIT_FOR_ACTION]: seoBlockFulfill().type
    })
  ])

  return {
    props: {
      featureFlags,
      reduxState: store.getState()
    }
  }
}

export default Brands
