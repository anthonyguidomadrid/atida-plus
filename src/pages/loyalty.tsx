import type { GetServerSideProps, NextPage } from 'next'
import { MetaData } from '~components/meta/MetaData'
import { AlternateLinks } from '~components/meta/AlternateLinks'
import { getAlternateLinks, getPageSlug } from '~domains/translated-routes'
import { useRouter } from 'next/router'
import { createReduxStore } from '~domains/redux'
import {
  pageContentFulfill,
  pageContentTrigger,
  selectContent
} from '~domains/page'
import { WAIT_FOR_ACTION } from 'redux-wait-for-action'
import { useTranslation } from 'react-i18next'
import { loadFeatureFlags } from '~helpers/server-only/featureFlagClient'
import { getPageCacheHeader } from '~helpers/server-only/cacheHeaders'
import { FeatureFlag } from '~config/constants/feature-flags'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { useDispatch, useSelector } from 'react-redux'
import { Accordion } from '~components/molecules/Accordion'
import {
  GroupOfStaticContentBlocks,
  StaticContentBlock,
  ContentBlockWithImage
} from '~domains/contentful/normalizers'
import { AccordionPanel } from '~components/atoms/AccordionPanel'
import { parseHtml } from '~helpers'
import PageNotFound from './404'
import NextImage from 'next/image'
import NextLink from 'next/link'
import myAtidaLogo from './../assets/svg/myAtidaLogo.svg'
import loyaltyHeroImage4x from './../assets/png/loyaltyHeroVertical@4x.png'
import loyaltyHeroImage2x from './../assets/png/loyaltyHeroVertical@2x.png'
import loyaltyHeroSmallImage4x from './../assets/png/loyaltyHeroHorizontal@4x.png'
import loyaltyHeroSmallImage2x from './../assets/png/loyaltyHeroHorizontal@2x.png'
import { selectIsLoggedIn } from '~domains/account/selectors/customer'
import { Link } from '~components/atoms/Link'
import classNames from 'classnames'
import { PageLayout } from '~components/templates/PageLayout'
import { useEffect, useMemo } from 'react'
import { Slider } from '~components/molecules/Slider'
import { mapIconReferenceToIconComponent } from '~domains/contentful'
import { ReactComponent as CheckMark } from './../assets/svg/solid/Success.svg'
import { breakpoints, useBreakpoint } from '~domains/breakpoints'
import { ReactComponent as Check } from './../assets/svg/navigation-24px/Checkmark.svg'
import { useScrollHandler } from '~helpers/useScrollHandler'
import useIsElementInViewport from '~helpers/useIsElementInViewport'
import { LoadingSpinner } from '~components/atoms/LoadingSpinner'
import { triggerReportPageViewed } from '~domains/analytics'

const loyaltyHeroSizes = {
  width: 480,
  height: 480
}

const loyaltyHeroSmallSizes = {
  width: 480,
  height: 344
}

const myAtidaLogoSizes = {
  width: 89.25,
  height: 24
}

const stickyHeaderItems = [
  'loyalty.sticky-header.item-0',
  'loyalty.sticky-header.item-1',
  'loyalty.sticky-header.item-2'
]

const LoyaltyOnboarding: NextPage & {
  Layout?: (page: JSX.Element) => JSX.Element
} = () => {
  const { t } = useTranslation()
  const { locale, push } = useRouter()
  const dispatch = useDispatch()
  const content = useSelector(selectContent)
  const isLargeFormat = useBreakpoint(breakpoints.lg)
  const isMediumFormat = useBreakpoint(breakpoints.md)
  const isSmallFormat = useBreakpoint(breakpoints.sm)
  const { elementRef, isElementInViewport } = useIsElementInViewport(true)
  const { hideSearchBar } = useScrollHandler()

  const groupOfStaticBlocks = useMemo(
    () =>
      content?.contentBlocks.filter(
        contentBlock =>
          contentBlock.contentType === 'GroupOfStaticContentBlocks'
      ) as GroupOfStaticContentBlocks[],
    [content?.contentBlocks]
  )

  const faqBlocks = useMemo(
    () => groupOfStaticBlocks?.find(block => block?.type === 'Accordion'),
    [groupOfStaticBlocks]
  )

  const uspBlocks = useMemo(
    () => groupOfStaticBlocks?.find(block => block?.type === 'Bullet points'),
    [groupOfStaticBlocks]
  )

  const sliderBlocks = useMemo(
    () => groupOfStaticBlocks?.find(block => block.type === 'Slider'),
    [groupOfStaticBlocks]
  )

  const isLoyaltyEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_LOYALTY_ATIDA_CASH
  )
  const isLoggedIn = useSelector(selectIsLoggedIn)

  useEffect(() => {
    if (typeof isLoggedIn === 'boolean' && !isLoggedIn) {
      dispatch(
        triggerReportPageViewed({ page: 'My Atida cash', pageType: 'account' })
      )
    }
  }, [dispatch, isLoggedIn])

  if (!isLoyaltyEnabled) {
    return <PageNotFound />
  }

  if (isLoggedIn) {
    push('/account/my-atida-cash')
    return <LoadingSpinner className="h-w-1/2-screen xs-only:mt-10 lg:-mt-10" />
  }

  return (
    <>
      <MetaData
        title={content?.seo?.title ?? t('seo.titles.loyalty-onboarding')}
        description={content?.seo?.description}
        keywords={content?.seo?.keywords}
        image={content?.seo?.image?.url}
        noIndex={content?.seo?.noIndex}
        noFollow={content?.seo?.noFollow}
        canonicalHrefOverride={content?.seo?.canonicalHrefOverride}
      />
      <AlternateLinks links={getAlternateLinks('loyalty', locale)} />

      <main>
        <header className="lg:py-3 lg:px-8" ref={elementRef}>
          <div
            className={classNames(
              'bg-ui-guyabano leading-none rounded-bl-3xl rounded-br-3xl overflow-hidden',
              'sm:rounded-bl-4xl sm:rounded-br-4xl',
              'lg:rounded-t-4xl'
            )}
          >
            <div className="md:flex md:justify-center md:items-center md:justify-space-between md:mx-auto lg:gap-x-4">
              <div
                className={classNames(
                  'pt-4 pb-4 px-4 text-center leading-none',
                  'sm:px-5',
                  'md:max-w-64 md:flex-initial md:flex-shrink md:py-[104px] md:px-8',
                  'lg:py-[106px] lg:max-w-66 lg:md-4'
                )}
              >
                <div className="mx-auto md:mx-0 leading-0">
                  <NextImage
                    src={myAtidaLogo}
                    width={myAtidaLogoSizes.width}
                    height={myAtidaLogoSizes.height}
                    alt="atida account"
                  />

                  <h1 className="my-2">{t('loyalty.hero-header.title')}</h1>
                  <p
                    className={classNames(
                      'text-ui-grey-dark leading-6',
                      'lg:text-1.5xl'
                    )}
                  >
                    {t('loyalty.hero-header.text')}
                  </p>
                  {!isLoggedIn && (
                    <NextLink
                      href="/create-account/account/my-atida-cash"
                      passHref
                    >
                      <Link
                        className={classNames(
                          'inline-block text-base text-primary-white no-underline rounded transition-all duration-200',
                          'w-full mt-3 p-1.5 text-center',
                          'bg-primary-caribbean-green-dark hover:bg-primary-caribbean-green-darker focus:bg-primary-caribbean-green-darkest',
                          'sm:mt-4 sm:w-auto sm:px-3'
                        )}
                      >
                        {t('loyalty.hero-header.link')}
                      </Link>
                    </NextLink>
                  )}
                </div>
              </div>

              <div
                className={classNames(
                  'flex justify-center self-stretch w-full relative overflow-hidden h-43',
                  'md:h-auto md:max-w-64 md:flex-shrink',
                  'lg:max-w-66'
                )}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full md:w-full">
                  {isMediumFormat ? (
                    <img
                      className="h-full max-w-none md:w-auto mx-auto"
                      src={loyaltyHeroImage2x.src}
                      srcSet={loyaltyHeroImage4x.src}
                      width={loyaltyHeroSizes.width}
                      height={loyaltyHeroSizes.height}
                      alt={t('loyalty.hero-header.title')}
                    />
                  ) : (
                    <img
                      className="h-full max-w-none md:w-auto"
                      src={loyaltyHeroSmallImage2x.src}
                      srcSet={loyaltyHeroSmallImage4x.src}
                      width={loyaltyHeroSmallSizes.width}
                      height={loyaltyHeroSmallSizes.height}
                      alt={t('loyalty.hero-header.title')}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        <div
          className={classNames(
            'fixed bg-primary-white w-full h-auto py-2 z-10 border-ui-black-10 transition-all ease-linear duration-150 translate-y-0',
            {
              'opacity-0 pointer-events-none': isElementInViewport,
              'opacity-1': !isElementInViewport,
              'top-0 border-b': isSmallFormat,
              'bottom-0 border-t': !isSmallFormat,
              'translate-y-3': isSmallFormat && isElementInViewport,
              'translate-y-[73px]':
                !isElementInViewport &&
                isSmallFormat &&
                !isMediumFormat &&
                hideSearchBar,
              'translate-y-[139px]':
                (!isElementInViewport &&
                  isSmallFormat &&
                  isMediumFormat &&
                  hideSearchBar) ||
                (!isElementInViewport &&
                  isSmallFormat &&
                  !isMediumFormat &&
                  !hideSearchBar) ||
                (!isElementInViewport && isMediumFormat),
              'translate-y-[100%]': !isSmallFormat && isElementInViewport
            }
          )}
        >
          <div
            className={classNames(
              'container container-fixed mx-auto flex flex-col justify-center gap-x-3',
              'sm:justify-between sm:items-center sm:flex-row'
            )}
          >
            <div className="flex order-2 sm:order-1 gap-x-3 items-center">
              {isMediumFormat && (
                <div className="flex gap-x-3 order-2">
                  {stickyHeaderItems.map(item => (
                    <div key={item} className="flex gap-x-1">
                      <Check className="text-primary-caribbean-green w-3 h-3 -mt-0.25" />
                      <span className="text-sm-base lg:text-base">
                        {t(item)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              {(!isMediumFormat || isLargeFormat) && (
                <div
                  className={classNames(
                    'mt-1 w-full order-1 text-sm-base text-center',
                    'sm:mt-0 sm:text-base sm:text-left sm:w-auto sm:font-semibold'
                  )}
                >
                  {t('loyalty.sticky-header.text')}
                </div>
              )}
            </div>

            <NextLink href="/create-account/account/my-atida-cash" passHref>
              <Link
                className={classNames(
                  'inline-block text-base text-primary-white no-underline rounded transition-all duration-200',
                  'w-full p-1.5 order-1 flex-shrink-0 text-center',
                  'bg-primary-caribbean-green-dark hover:bg-primary-caribbean-green-darker focus:bg-primary-caribbean-green-darkest',
                  'sm:w-auto sm:px-3 sm:order-2'
                )}
              >
                {t('loyalty.sticky-header.link')}
              </Link>
            </NextLink>
          </div>
        </div>

        {uspBlocks?.blocks && uspBlocks.blocks?.length > 0 && (
          <section className="py-6 sm:py-7 md:py-8">
            <div className="container container-fixed text-center mx-auto">
              <h2 className="mb-4 sm:mb-5 lg:mb-8">{uspBlocks?.title}</h2>

              <div
                className={classNames(
                  'flex flex-col w-full items-start justify-center gap-y-4 gap-x-4',
                  'md:flex-row sm:gap-y-5'
                )}
              >
                {uspBlocks?.blocks?.map((contentBlock, index) => {
                  const Icon = mapIconReferenceToIconComponent(
                    (contentBlock as StaticContentBlock)?.icon
                  )
                  return (
                    <div
                      key={`usp-${index}`}
                      className="w-full md:shrink-1 md:basis-4/12 md:mx-w-34 lg:max-w-43"
                    >
                      <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 relative">
                        <CheckMark className="absolute top-0 right-0 icon-24" />
                        <Icon className="object-contain w-full h-full" />
                      </div>
                      <h4 className="text-lg-xl lg:text-2xl mb-1 font-normal">
                        {contentBlock.title}
                      </h4>
                      <div className="text-ui-grey-dark lg:text-1.5xl font-light">
                        {parseHtml(contentBlock.content)}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {sliderBlocks?.blocks && sliderBlocks.blocks?.length > 0 && (
          <section className="lg:px-8">
            <div
              className={classNames(
                'bg-ui-guyabano w-full py-6 px-7',
                'sm:py-7',
                'md:py-8',
                'lg:rounded-4xl lg:overflow-hidden'
              )}
            >
              <h2 className="mb-4 sm:mb-5 lg:mb-8 text-center lg:text-5xl text-3xl">
                {sliderBlocks?.title}
              </h2>
              <Slider
                showSlidesIndicators
                showArrowButtons={false}
                autoplay={false}
                slidesPerView={isMediumFormat ? 3 : 1}
                withNumericBullets
              >
                {sliderBlocks.blocks.map(block => (
                  <div
                    className={classNames(
                      'bg-ui-carribean-green-lightest mx-1 rounded-lg overflow-hidden',
                      'md:w-full md:h-auto',
                      'md:mx-2',
                      'sm:mx-1.5'
                    )}
                    key={block.title}
                    data-testid="sliderItem"
                  >
                    <div>
                      <img
                        alt={block.title}
                        src={(block as ContentBlockWithImage).image?.url}
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h5>{block.title}</h5>
                      {parseHtml(block.content, {
                        p: {
                          className: 'mt-1'
                        }
                      })}
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </section>
        )}

        {faqBlocks?.blocks && faqBlocks.blocks?.length > 0 && (
          <section className="container container-fixed mx-auto py-6 md:py-8">
            <div className="md:px-9.5 sm:px-8 lg:px-12">
              <h2 className="mb-4 sm:mb-5 lg:mb-8 text-center lg:text-5xl text-3xl">
                {parseHtml(faqBlocks.title, {
                  br: {
                    className: 'sm:hidden'
                  }
                })}
              </h2>
              <div className="lg:px-[15px]">
                <Accordion controlled data-testid="faqAccordion">
                  {faqBlocks?.blocks?.map((contentBlock, index) => (
                    <AccordionPanel
                      key={`faq-${index}`}
                      heading={contentBlock.title}
                      data-testid={contentBlock.title}
                      isBold
                    >
                      <div className="transition-all duration-300 md:mx-0">
                        {parseHtml(contentBlock.content, {
                          h2: {
                            className: 'mb-1'
                          },
                          p: {
                            className: 'inline-block mb-2'
                          }
                        })}
                      </div>
                    </AccordionPanel>
                  ))}
                </Accordion>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  )
}

LoyaltyOnboarding.Layout = (page: JSX.Element) => (
  <PageLayout>{page}</PageLayout>
)

export const getServerSideProps: GetServerSideProps = async context => {
  const cacheHeader = await getPageCacheHeader(context.locale, true)
  context.res.setHeader('Cache-Control', cacheHeader)
  const store = createReduxStore(context.locale)
  const featureFlags = await loadFeatureFlags(context.locale, [
    FeatureFlag.ACCOUNT_LOYALTY_ATIDA_CASH
  ])
  const slug = getPageSlug('loyalty', context.locale) || 'loyalty'
  store.dispatch(pageContentTrigger({ slug }))

  await store.dispatch({
    type: 'page-content',
    [WAIT_FOR_ACTION]: pageContentFulfill().type
  })

  return {
    props: {
      featureFlags,
      reduxState: store.getState()
    }
  }
}

export default LoyaltyOnboarding
