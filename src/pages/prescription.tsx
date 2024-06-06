import type { GetServerSideProps, NextPage } from 'next'
import { getAlternateLinks, getPageSlug } from '~domains/translated-routes'
import { AlternateLinks } from '~components/meta/AlternateLinks'
import { useDispatch, useSelector } from 'react-redux'
import { WAIT_FOR_ACTION } from 'redux-wait-for-action'
import { createReduxStore } from '~domains/redux'
import { loadFeatureFlags } from '~helpers/server-only/featureFlagClient'
import { getPageCacheHeader } from '~helpers/server-only/cacheHeaders'
import {
  pageContentFulfill,
  pageContentTrigger,
  selectContent
} from '~domains/page'
import { useRouter } from 'next/router'
import { useMemo, useState, useEffect, useCallback, useRef } from 'react'
import { MetaData } from '~components/meta/MetaData'
import { useTranslation } from 'react-i18next'
import {
  ContentBlockWithImage,
  GroupOfStaticContentBlocks
} from '~domains/contentful/normalizers'
import { parseHtml } from '~helpers'
import { ReactComponent as ChevronRight } from '~assets/svg/navigation-24px/ChevronRight.svg'
import classNames from 'classnames'
import { breakpoints, useBreakpoint } from '~domains/breakpoints'
import { ReactComponent as Arrow } from '~assets/svg/navigation-24px/ArrowForward.svg'
import { ReactComponent as Question } from '~assets/svg/navigation-24px/Question.svg'
import { scrollToTop } from '~helpers/scrollToTop'
import Link from 'next/link'
import { DecodedSuccessResult } from '~components/molecules/QRCodeScanner'
import { ReactComponent as Download } from '~assets/svg/navigation-24px/Download.svg'
import { ScannerUploader } from '~components/molecules/ScannerUploader/ScannerUploader'
import { ReactComponent as Information } from 'src/assets/svg/navigation-24px/Information.svg'
import {
  addPrescriptionToBasketTrigger,
  resetPrescriptionState,
  selectNumberOfItems
} from '~domains/basket'
import { clearAndSetTimeout } from '~helpers/clearAndSetTimeout'
import {
  selectPrescriptionIsLoading,
  selectPrescriptionWasSuccess
} from '~domains/basket/selectors/prescription'

const Prescription: NextPage & {
  Layout?: (page: JSX.Element) => JSX.Element
} = () => {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const content = useSelector(selectContent)
  const isDesktop = useBreakpoint(breakpoints.md)
  const isSmallScreen = useBreakpoint(breakpoints.sm)
  const dispatch = useDispatch()
  const isPrescriptionAddedToBasket = useSelector(selectPrescriptionWasSuccess)
  const numberOfBasketItems = useSelector(selectNumberOfItems)
  const isUploadLoading = useSelector(selectPrescriptionIsLoading)
  const preserveBasketItems = useRef(0)

  const groupOfStaticBlocks = useMemo(
    () =>
      content?.contentBlocks.filter(
        contentBlock =>
          contentBlock.contentType === 'GroupOfStaticContentBlocks'
      ) as GroupOfStaticContentBlocks[],
    [content?.contentBlocks]
  )

  const prescriptionBlocks = useMemo(
    () => groupOfStaticBlocks?.find(block => block?.type === 'Slider'),
    [groupOfStaticBlocks]
  )

  const [isPermissionStepPassed, setIsPermissionStepPassed] = useState(false)
  const [hasPermission, setHasPermission] = useState(false)
  const [uploadedPrescription, setUploadedPrescription] = useState([])
  const [isUploadError, setUploadError] = useState(false)
  const [selectedPrescription, setSelectedPrescription] = useState({
    desktop: prescriptionBlocks?.blocks?.[0],
    mobile: {}
  })
  const prescriptionMobileNavigationRef = useRef<HTMLDivElement>(null)

  const isScanner = selectedPrescription?.desktop?.header === 'scan'
  const isPost = selectedPrescription?.desktop?.header === 'post'
  const isUploadedPrescription = uploadedPrescription?.length

  const handleFileUpload = () => {
    dispatch(resetPrescriptionState())
    setUploadedPrescription([])
    setUploadError(false)
    preserveBasketItems.current = 0
    const fileinput = document.getElementById(
      'html5qr-code-full-region__filescan_input'
    )
    const uploadEvent = new MouseEvent('click')
    fileinput?.dispatchEvent(uploadEvent)
  }

  const handleAllowPermission = async () => {
    setUploadedPrescription([])
    setIsPermissionStepPassed(false)
    setHasPermission(true)
    preserveBasketItems.current = 0

    await clearAndSetTimeout(100, 'handleAllowPermission')
    const scanner = document.getElementById(
      'html5qr-code-full-region__camera_permission_button'
    )
    const clickEvent = new MouseEvent('click')
    scanner?.dispatchEvent(clickEvent)

    const checkScannerStatusInterval = setInterval(() => {
      if (
        document.getElementById('html5qr-code-full-region__scan_region')?.style
          .position === 'relative'
      ) {
        setIsPermissionStepPassed(true)
        clearInterval(checkScannerStatusInterval)
      }
      if (
        document
          .getElementById('html5qr-code-full-region__header_message')
          ?.innerHTML.toLocaleLowerCase()
          .includes('error')
      ) {
        setHasPermission(false)
        setIsPermissionStepPassed(true)
        clearInterval(checkScannerStatusInterval)
      }
    }, 20)
  }

  const handleScanError = useCallback(() => {
    if (!isScanner) {
      setUploadError(true)
    }
  }, [isScanner])

  const handleScanSuccess = useCallback(
    (_decodedText: string, decodedResult: DecodedSuccessResult) => {
      setUploadError(false)
      if (isScanner && !uploadedPrescription.length) {
        setHasPermission(false)
        setIsPermissionStepPassed(false)
      }
      const parsedPrescriptions = JSON.parse(decodedResult?.result?.text)?.urls

      setUploadedPrescription(parsedPrescriptions)
    },
    [isScanner, uploadedPrescription.length]
  )

  const handleAddPrescriptionToBasket = () => {
    preserveBasketItems.current = numberOfBasketItems
    dispatch(addPrescriptionToBasketTrigger(uploadedPrescription))
    setUploadedPrescription([])
    setUploadError(false)
  }

  useEffect(() => {
    const pageLayoutMinHeightDiv = document.getElementById(
      'page-layout-min-height-div'
    )
    const searchBar = document.getElementById('searchBar')
    const footer = document.getElementById('footer')

    if (
      !isSmallScreen &&
      (selectedPrescription.desktop?.header === 'upload' ||
        selectedPrescription.desktop?.header === 'scan') &&
      Object.keys(selectedPrescription.mobile).length
    ) {
      pageLayoutMinHeightDiv?.classList.remove('min-h-screen')
      if (searchBar) {
        searchBar.style.display = 'none'
      }
      if (selectedPrescription.desktop?.header === 'scan' && footer) {
        footer.style.display = 'none'
      }
      return
    }

    if (searchBar && searchBar.style.display === 'none') {
      searchBar.style.display = 'block'
    }
    if (footer && footer.style.display === 'none') {
      footer.style.display = 'block'
    }
    if (!pageLayoutMinHeightDiv?.classList.contains('min-h-screen')) {
      pageLayoutMinHeightDiv?.classList.add('min-h-screen')
    }
  }, [selectedPrescription, isSmallScreen])

  useEffect(() => {
    setUploadedPrescription([])
    setHasPermission(false)
    setIsPermissionStepPassed(false)
    preserveBasketItems.current = 0
  }, [selectedPrescription])

  return (
    <>
      <MetaData
        title={content?.seo?.title ?? t('seo.titles.prescription')}
        description={content?.seo?.description}
        keywords={content?.seo?.keywords}
        image={content?.seo?.image?.url}
        noIndex={content?.seo?.noIndex}
        noFollow={content?.seo?.noFollow}
        canonicalHrefOverride={content?.seo?.canonicalHrefOverride}
      />
      <AlternateLinks links={getAlternateLinks('prescription', locale)} />
      <section className="grid grid-cols-1 md:grid-cols-2 justify-center">
        {!isDesktop && (
          <div
            ref={prescriptionMobileNavigationRef}
            className="bg-primary-white ml-2 sm:ml-5 mr-3 sm:mr-8 my-3 relative"
          >
            <div
              className="flex"
              tabIndex={0}
              role="button"
              onClick={() =>
                setSelectedPrescription({
                  ...selectedPrescription,
                  mobile: {}
                })
              }
              onKeyDown={() =>
                setSelectedPrescription({
                  ...selectedPrescription,
                  mobile: {}
                })
              }
            >
              <Arrow className="icon-16 text-primary-oxford-blue rotate-180 mr-1.25 mt-[3px]" />
              <p className="font-semibold text-sm leading-[22px] underline">
                {Object.keys(selectedPrescription.mobile).length === 0
                  ? 'About ePrescription'
                  : prescriptionBlocks?.title}
              </p>
              <Question className="icon-22 text-primary-oxford-blue absolute right-0" />
            </div>
          </div>
        )}
        {(isDesktop ||
          (!isDesktop &&
            Object.keys(selectedPrescription.mobile).length === 0)) && (
          <div className="mx-2 sm:mx-12 md:mx-8 mt-4 relative">
            {isDesktop && (
              <p className="mb-3.25 text-sm leading-[22px] font-semibold underline">
                Breadcrumb placeholder
              </p>
            )}
            <h4 className="font-body mb-3 lg:mb-4 font-semibold lg:text-2xl leading-[26px]">
              {prescriptionBlocks?.title}
            </h4>
            {prescriptionBlocks?.blocks &&
              prescriptionBlocks?.blocks?.length > 0 &&
              prescriptionBlocks.blocks.map(block => (
                <div
                  tabIndex={0}
                  role="button"
                  className={classNames(
                    'flex rounded border p-3 mt-2 items-center',
                    {
                      'border-ui-grey-light':
                        (block !== selectedPrescription.desktop && isDesktop) ||
                        !isDesktop
                    },
                    {
                      'border-ui-oxford-blue':
                        block === selectedPrescription.desktop && isDesktop
                    }
                  )}
                  onClick={() => {
                    setSelectedPrescription({
                      desktop: block,
                      mobile: block
                    })
                    !isDesktop && scrollToTop()
                  }}
                  onKeyDown={() => {
                    setSelectedPrescription({
                      desktop: block,
                      mobile: block
                    })
                    !isDesktop && scrollToTop()
                  }}
                >
                  <div>
                    <img
                      alt={block.title}
                      src={(block as ContentBlockWithImage).image?.url}
                      className="w-8"
                    />
                  </div>
                  <div className="px-3 mr-1">
                    <p className="font-semibold">{block.title}</p>
                    {parseHtml(block.content, {
                      p: {
                        className: 'mt-1'
                      }
                    })}
                  </div>
                  <ChevronRight className={'w-4 absolute right-3'} />
                </div>
              ))}
            <div className="my-3">
              <Link href="/">
                <a className="font-semibold">
                  {t('prescription.learn-more.link')}
                </a>
              </Link>
            </div>
          </div>
        )}
        {(isDesktop ||
          (!isDesktop &&
            Object.keys(selectedPrescription.mobile).length > 0)) && (
          <div
            className={classNames(
              'sm:bg-ui-guyabano sm:min-h-screen lg:pt-11 sm:px-8',
              {
                'sm:pt-10': !isScanner || uploadedPrescription.length,
                'md:pt-10': isScanner,
                'sm:pt-4': isScanner && !uploadedPrescription.length,
                'bg-ui-guyabano min-h-screen':
                  isScanner && isPermissionStepPassed && !hasPermission
              }
            )}
          >
            {isDesktop && (
              <div className="flex justify-between w-full lg:-mt-1 lg:mb-1">
                <h4 className="font-body font-semibold lg:text-2xl leading-[26px]">
                  {selectedPrescription.desktop?.title}
                </h4>
                <p className="underline">
                  {t('prescription.upload-need-help')}
                </p>
              </div>
            )}
            {!isPost && (
              <ScannerUploader
                handleFileUpload={handleFileUpload}
                handleScanError={handleScanError}
                handleScanSuccess={handleScanSuccess}
                handleAddPrescriptionToBasket={handleAddPrescriptionToBasket}
                handleAllowPermission={handleAllowPermission}
                uploadedPrescription={uploadedPrescription}
                isDesktop={isDesktop}
                isSmallScreen={isSmallScreen}
                isScanner={isScanner}
                isUploadError={isUploadError}
                isUploadLoading={isUploadLoading}
                isPrescriptionAddedToBasket={isPrescriptionAddedToBasket}
                numberOfItemsAddedToBasket={
                  numberOfBasketItems - preserveBasketItems.current
                }
                icon={
                  isScanner ? (
                    <Information className="absolute top-2.5 left-2.5 md:top-1.5 md:left-1.5 lg:top-2.5 lg:left-2.5 w-3" />
                  ) : (
                    <Download className="absolute top-1.5 left-1.5 w-3" />
                  )
                }
                showUploaderButton={
                  ((!isUploadedPrescription && isSmallScreen) ||
                    (!!isUploadedPrescription && isDesktop)) &&
                  !isScanner
                }
                hasPermission={hasPermission}
                isPermissionStepPassed={isPermissionStepPassed}
                prescriptionMobileNavigationRef={
                  prescriptionMobileNavigationRef.current
                }
              />
            )}
          </div>
        )}
      </section>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const cacheHeader = await getPageCacheHeader(context.locale, true)
  context.res.setHeader('Cache-Control', cacheHeader)
  const store = createReduxStore(context.locale)
  const featureFlags = await loadFeatureFlags(context.locale)

  const slug = getPageSlug('prescription', context.locale) || 'prescription'
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

export default Prescription
