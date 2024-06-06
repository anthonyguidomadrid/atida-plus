import { FunctionComponent, useCallback, useRef, useState } from 'react'
import { ReactComponent as WalletGreen } from '~assets/svg/WalletGreen.svg'
import { useTranslation } from 'react-i18next'
import { useFormatPrice } from '~domains/product'
import { LoadingSpinner } from '~components/atoms/LoadingSpinner'
import classNames from 'classnames'
import { NotificationModalLayout } from '~components/molecules/NotificationModalLayout'
import { breakpoints, useBreakpoint } from '~domains/breakpoints'
import {
  cookieStorageMechanism,
  parseHtml,
  useDetectOutsideClick
} from '~helpers'
import {
  GroupOfStaticContentBlocks,
  mapIconReferenceToIconComponent,
  StaticContentBlock
} from '~domains/contentful'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Button } from '~components/atoms/Button'
import { ReactComponent as Cross } from '~assets/svg/navigation-24px/Cross.svg'
import { SliderIndicators } from '~components/molecules/Slider/SliderIndicators'
import NextLink from 'next/link'
import { Link } from '~components/atoms/Link'
import { FeatureFlag } from '~config/constants/feature-flags'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'

export type CashBalanceProps = {
  amount: number
  currency?: string
  isLoading?: boolean
  className?: string
  modalData?: GroupOfStaticContentBlocks
  isMinified?: boolean
}

const ATIDA_CASH_INTRO_COOKIE_NAME = 'atida-cash-intro-seen'

export const CashBalance: FunctionComponent<CashBalanceProps> = ({
  amount = 0,
  currency = 'EUR',
  isLoading = false,
  className,
  modalData,
  isMinified
}) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const swiperRef = useRef<Swiper | null>(null)
  const atidaCashIntroCookie = cookieStorageMechanism().get(
    ATIDA_CASH_INTRO_COOKIE_NAME
  )
  const formatPrice = useFormatPrice()
  const { t } = useTranslation()
  const isSM = useBreakpoint(breakpoints.sm)
  const [activeSlide, setActiveSlide] = useState<number>(0)
  // @ts-ignore - missing correct swiper type
  const onSlideChange = swiper => {
    setActiveSlide(swiper?.activeIndex)
  }
  const slideTo = (slide: number) => {
    if (!swiperRef.current || slide === undefined) return
    // @ts-ignore - missing correct swiper type
    swiperRef.current.swiper.slideTo(slide)
  }

  const isLoyaltyAtidaCashHistoryEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_LOYALTY_ATIDA_CASH_HISTORY
  )

  const resetSliderOnClose = useCallback(() => {
    slideTo(0)
    setActiveSlide(0)
    // Set cookie for 10 years
    cookieStorageMechanism().set(ATIDA_CASH_INTRO_COOKIE_NAME, 'true', {
      expires: 3650
    })
  }, [])

  const [
    notificationModalOpen,
    setNotificationModalOpen
  ] = useDetectOutsideClick(
    modalRef,
    !atidaCashIntroCookie,
    false,
    resetSliderOnClose
  )
  const toggleIsDetailsModalOpen = () => setNotificationModalOpen(prev => !prev)

  const closeModal = () => {
    resetSliderOnClose()
    toggleIsDetailsModalOpen()
  }

  const onModalButtonClick = () => {
    const blocks = modalData?.blocks

    if (!blocks) return
    if (activeSlide !== blocks.length - 1) {
      slideTo(activeSlide + 1)
      return
    }

    closeModal()
  }

  return (
    <>
      <div
        className={classNames(
          'flex flex-col rounded-2xl bg-ui-carribean-green-lightest text-left overflow-hidden sm:flex-row',
          className
        )}
        data-testid="cash-balance"
      >
        <div className="flex-auto border border-ui-grey-light bg-primary-white rounded-2xl shadow-3xl">
          <div
            className={classNames(
              'flex flex-auto items-center justify-between p-3 sm:border-ui-grey-light sm:p-4',
              {
                'sm:border-b pb-2': !isMinified
              }
            )}
          >
            <div className="pr-2">
              <h5 className="text-base text-oxford-blue-default mb-1">
                {t('account.my-cash-balance.balance-title')}
              </h5>

              <div
                className={classNames('text-7xl m-0 font-semibold leading-13', {
                  'text-ui-grey-light': amount === 0,
                  'text-primary-caribbean-green-dark': amount > 0
                })}
                data-testid="cash-balance-amount-wrapper"
              >
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  <span data-testid="cash-balance-amount">
                    {formatPrice(amount, currency).withCurrency}
                  </span>
                )}
              </div>
            </div>

            <WalletGreen className="w-10" />
          </div>

          {!isMinified && (
            <>
              <p className="p-3 pt-0 sm:p-4 text-xs sm:text-base m-0 text-ui-grey-dark">
                {t('account.my-cash-balance.balance-text')}
              </p>
            </>
          )}
        </div>

        {!isMinified && (
          <div className="sm:w-28 p-0 shrink-0 sm:p-4">
            <div className="p-3 border-b border-primary-oxford-blue-10 sm:p-0 sm:border-0">
              <h5 className="text-base text-oxford-blue-default mb-1 hidden sm:block">
                {t('account.my-cash-balance.balance-learn-more-title')}
              </h5>

              <p className="text-base text-oxford-blue-default sm:mb-2">
                {t('account.my-cash-balance.balance-learn-more-text')}
              </p>
            </div>

            <div className="p-2 text-center sm:p-0 sm:text-left">
              {!isLoyaltyAtidaCashHistoryEnabled ? (
                <button
                  className="text-primary-oxford-blue hover:text-primary-oxford-blue font-semibold no-underline sm:underline"
                  onClick={toggleIsDetailsModalOpen}
                >
                  {t('account.my-cash-balance.balance-learn-more-link')}
                </button>
              ) : (
                <NextLink href="/account/my-atida-cash/history" passHref>
                  <Link className="font-semibold no-underline sm:underline">
                    {t('account.my-cash-balance.view-transaction-hisotry')}
                  </Link>
                </NextLink>
              )}
            </div>
          </div>
        )}
      </div>
      {!isMinified && modalData?.blocks && (
        <NotificationModalLayout
          isOpen={notificationModalOpen}
          modalRef={modalRef}
          className="max-w-[767px] sm:max-w-60"
          variant={isSM ? 'center' : 'bottom'}
          maxWidth={!isSM}
          isFixedPosition
          showIcon={false}
          hideButtonSection
          isCashBalanceModal
          children={
            <div
              className={classNames(
                'relative pt-1 px-1 pb-1',
                'xs:pt-0 xs:px-0 xs-only:-mt-1 xs-only:-mx-1 xs-only:min-w-full',
                'sm:pb-2 sm:max-w-full'
              )}
            >
              <Cross
                data-testid="close-modal"
                className={classNames(
                  'absolute top-1 right-1 w-3 cursor-pointer z-10',
                  'xs:top-0 xs:right-0'
                )}
                onClick={closeModal}
              />
              <Swiper
                ref={swiperRef}
                slidesPerView={1}
                pagination
                onSlideChange={onSlideChange}
                className="h-[205px] sm:w-[418px]"
                virtualTranslate={true}
              >
                {(modalData.blocks as StaticContentBlock[]).map(
                  (slide, index) => {
                    const Icon = mapIconReferenceToIconComponent(slide?.icon)
                    return (
                      <SwiperSlide
                        key={slide.title}
                        className={classNames(
                          `absolute top-0 right-0 left-0 bottom-0 transition-all ease-out duration-300`,
                          {
                            'opacity-0': activeSlide !== index,
                            'opacity-100': activeSlide === index
                          }
                        )}
                      >
                        <div className="pt-3" data-testid="sliderItem">
                          <div className="w-10 h-10 mx-auto mb-3">
                            <Icon />
                          </div>
                          <div className="text-center">
                            <h5>{slide.title}</h5>
                            <div className="mt-0.5">
                              {parseHtml(slide.content)}
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    )
                  }
                )}
              </Swiper>
              <div className="flex justify-center mb-4">
                <SliderIndicators
                  swiperRef={swiperRef}
                  slideTo={slideTo}
                  numberOfSlides={
                    (modalData.blocks as StaticContentBlock[]).length
                  }
                  activeSlide={activeSlide}
                />
              </div>

              <Button
                data-testid="modal-button"
                className="w-full hover:bg-primary-oxford-blue bg-ui-primary-selected"
                onClick={onModalButtonClick}
              >
                {activeSlide !== modalData.blocks.length - 1
                  ? t('atida-cash-intro.button.next')
                  : t('atida-cash-intro.button.close')}
              </Button>
            </div>
          }
        />
      )}
    </>
  )
}
