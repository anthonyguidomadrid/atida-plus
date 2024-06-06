import {
  ComponentPropsWithoutRef,
  FunctionComponent,
  useCallback,
  useMemo,
  useRef,
  useState
} from 'react'
import {
  mapIconReferenceToIconComponent,
  VoucherCodes as VoucherCodesProps
} from '~domains/contentful'
import { ReactComponent as Copy } from '~assets/svg/navigation-24px/Copy.svg'
import { ReactComponent as ArrowDown } from '~assets/svg/navigation-24px/VoucherArrowDown.svg'
import { ReactComponent as ArrowUp } from '~assets/svg/navigation-24px/VoucherArrowUp.svg'
import { ReactComponent as Checkmark } from '~assets/svg/navigation-24px/Checkmark.svg'
import { ReactComponent as ArrowForward } from '~assets/svg/navigation-24px/ArrowForward.svg'
import {
  breakpoints,
  useBreakpoint,
  pixelBreakpoints
} from '~domains/breakpoints'
import classNames from 'classnames'
import { NotificationModalLayout } from '../NotificationModalLayout'
import { Button } from '~components/atoms/Button'
import { useTranslation } from 'react-i18next'
import { copyToClipboard } from '~helpers/copyToClipboard'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'
import { parseHtml, useDetectOutsideClick } from '~helpers'
import { useSize } from '~helpers/useSize'

export type VoucherCodeProps = {
  code?: string
  discount?: string
  description?: string
  title?: string
  voucherRichTextTitle?: string
}

export const VoucherCodes: FunctionComponent<
  ComponentPropsWithoutRef<'section'> & VoucherCodesProps
> = ({ items }) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const { width } = useSize(listRef)
  const [isVoucherCodeCopied, setIsVoucherCodeCopied] = useState('')
  const [voucherItem, setVoucherItem] = useState<VoucherCodeProps | undefined>(
    undefined
  )
  const [showDescription, setShowDescription] = useState(false)

  const [
    notificationModalOpen,
    setNotificationModalOpen
  ] = useDetectOutsideClick(modalRef, false)

  const isVoucherCodesNewDesignEnabled = useFeatureFlag(
    FeatureFlag.VOUCHER_CODES_NEW_DESIGN
  )

  const { t } = useTranslation()
  const isMobile = !useBreakpoint(breakpoints.xsOnly)
  const isDesktopSize = useBreakpoint(breakpoints.smBelow)
  const isMdSize = useBreakpoint(breakpoints.md)
  const isLgSize = useBreakpoint(breakpoints.lg)

  const triggerVoucherDescription = useCallback(
    (voucherCode?: VoucherCodeProps) => {
      setVoucherItem(voucherCode)
      setShowDescription(!showDescription)
    },
    [showDescription]
  )

  const copyVoucherToClipboard = useCallback(copyToClipboard, [])

  const handleNotificationModal = useCallback(
    (voucherCode: VoucherCodeProps) => {
      setVoucherItem(voucherCode)
      setNotificationModalOpen(true)
    },
    [setNotificationModalOpen]
  )

  const leftPadding = useMemo(
    () => width && (width - (pixelBreakpoints.md - 128)) / 2,
    [width]
  )

  return (
    <>
      {isVoucherCodesNewDesignEnabled ? (
        <section
          ref={listRef}
          data-testid="voucherCodes"
          className={classNames(
            'flex bg-ui-guyabano border-b border-ui-black-10 -mb-5 sm:-mb-6 md:-mb-7 lg:-mb-9',
            'w-screen relative left-1/2 right-1/2 -mx-w-1/2-screen'
          )}
        >
          <div
            style={
              items && items.length > 2 && isMdSize && !isLgSize
                ? { paddingLeft: `${leftPadding}px` }
                : !isDesktopSize && !isMobile
                ? { paddingLeft: '40px' }
                : isMobile
                ? { paddingLeft: '16px' }
                : {}
            }
            className={classNames(
              `lg:container lg:container-fixed lg:justify-center lg:mx-auto flex py-1 pr-2`,
              {
                'flex-nowrap hide-scrollbar overflow-x-auto':
                  items && items.length > 1,
                'sm:overflow-hidden md:justify-center sm:mx-auto':
                  items?.length === 1 || items?.length === 2,
                'w-full sm:w-auto sm:justify-center sm:mx-auto pr-2 sm:pr-0':
                  items?.length === 1
              }
            )}
          >
            {items?.map((voucher, idx) => {
              return (
                <div
                  key={idx}
                  className={classNames(
                    'relative flex flex-col voucher-background orange-border rounded shrink-0 px-2 mr-2 last:mr-0',
                    {
                      'h-full':
                        showDescription && voucher.code === voucherItem?.code
                    },
                    {
                      'h-4.5': voucher.code !== voucherItem?.code,
                      'w-full sm:w-auto': items?.length === 1
                    }
                  )}
                >
                  <div className="flex flex-col text-sm my-1">
                    <div
                      className={classNames('flex items-center', {
                        'justify-between': items.length === 1
                      })}
                    >
                      <div
                        role="button"
                        onKeyDown={() => triggerVoucherDescription(voucher)}
                        tabIndex={0}
                        onClick={() => triggerVoucherDescription(voucher)}
                        className={classNames('max-w-18 sm:max-w-27 pointer', {
                          'max-w-14 sm:max-w-24': items.length > 1
                        })}
                      >
                        {parseHtml(voucher.voucherRichTextTitle, {
                          p: {
                            className: 'truncate'
                          }
                        })}
                      </div>
                      <div className="w-0.125 h-full bg-secondary-atomic-tangerine mx-1 shrink-0" />
                      <div className="flex shrink-0">
                        <p className="hidden md:block">
                          {t('voucher.block.label')}:
                        </p>
                        {isVoucherCodeCopied === voucher.code ? (
                          <p className="text-secondary-atomic-tangerine ml-0.5">
                            {t('voucher.block.code-is-copied')} {voucher.code}
                          </p>
                        ) : (
                          <button
                            onClick={() =>
                              copyVoucherToClipboard(
                                voucher?.code,
                                setIsVoucherCodeCopied
                              )
                            }
                            className="underline text-secondary-portland-orange ml-0.5"
                          >
                            {t('voucher.block.copy-code')} {voucher.code}
                          </button>
                        )}
                      </div>
                      {showDescription && voucherItem?.code === voucher.code ? (
                        <ArrowUp
                          onClick={() => triggerVoucherDescription()}
                          className="icon-20 ml-1 cursor-pointer shrink-0"
                        />
                      ) : (
                        <ArrowDown
                          onClick={() => triggerVoucherDescription(voucher)}
                          className="icon-20 ml-1 cursor-pointer shrink-0"
                        />
                      )}
                    </div>
                    {voucherItem?.code === voucher.code && showDescription && (
                      <div className="pt-0.5 max-w-34 sm:max-w-50">
                        <p className="text-sm max-w-fit">
                          {voucher.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      ) : (
        <section
          data-testid="voucherCodes"
          className={classNames('flex justify-between', {
            'flex-nowrap flex-row h-full overflow-auto hide-scrollbar':
              !isDesktopSize && items && items.length > 1,
            'sm:overflow-hidden': items?.length === 1 || items?.length === 2
          })}
        >
          {items?.map((voucher, idx) => {
            const Icon = mapIconReferenceToIconComponent(voucher.icon)
            return (
              <div
                key={idx}
                className={classNames(
                  'relative border border-ui-grey-light rounded w-full md:mr-4 last:mr-0',
                  { 'flex-shrink-0 max-w-32 mr-2 ': !isDesktopSize },
                  {
                    'sm:max-w-full sm:flex-shrink':
                      items.length === 1 || items.length === 2
                  },
                  { 'max-w-full': items.length === 1 }
                )}
              >
                <div className="flex items-center justify-between bg-secondary-champagne-pink py-1 px-2 sm:py-1.5 sm:pl-3.25">
                  <div className="flex items-center">
                    <div className="border border-secondary-portland-orange text-secondary-portland-orange rounded text-center mr-1 px-1 py-0.5 max-h-4">
                      {voucher.icon ? (
                        <Icon
                          role="presentation"
                          className="icon-20 flex-shrink-0 "
                        />
                      ) : (
                        <span className="text-xs font-semibold">
                          {voucher.discount}
                        </span>
                      )}
                    </div>
                    <p className="text-base md:text-lg font-semibold text-clip overflow-hidden max-h-3">
                      {parseHtml(voucher.voucherRichTextTitle, {
                        p: {
                          className: 'truncate'
                        }
                      })}
                    </p>
                  </div>
                  <button onClick={() => handleNotificationModal(voucher)}>
                    <ArrowForward className="icon-20 mr-1 sm:hidden cursor-pointer" />
                  </button>
                </div>
                <div className="text-sm px-2 pb-6.25 pt-1.5 sm:pb-8 sm:pt-2 sm:px-3 sm:text-base">
                  <p className={classNames({ 'line-clamp-2': isMobile })}>
                    {voucher.description}
                  </p>
                  <div
                    className="absolute bottom-2 sm:bottom-3 flex items-center"
                    id="voucherTest"
                  >
                    {isVoucherCodeCopied === voucher?.code ? (
                      <>
                        <Checkmark className="icon-24 mr-1 text-primary-caribbean-green" />
                        <span className="text-base text-primary-caribbean-green cursor-default font-light">
                          {t('voucher.block.code-is-copied')}
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="icon-24 mr-1" />
                        <button
                          onClick={() =>
                            copyVoucherToClipboard(
                              voucher?.code,
                              setIsVoucherCodeCopied
                            )
                          }
                          className="underline cursor-pointer text-base font-light"
                        >
                          {t('voucher.block.copy-code')} {voucher.code}
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className="left-circle"></div>
                <div className="right-circle"></div>
              </div>
            )
          })}
          <NotificationModalLayout
            isOpen={notificationModalOpen}
            variant="bottom"
            showIcon={false}
            handleClose={() => setNotificationModalOpen(false)}
            isFixedPosition
            isVoucherCodeNotification={true}
            children={
              <div className="w-full" ref={modalRef}>
                <h4 className="text-xl font-semibold mb-2">
                  {voucherItem?.title}
                </h4>
                <p className="text-base mb-3">{voucherItem?.description}</p>
                <Button
                  onClick={() =>
                    copyVoucherToClipboard(
                      voucherItem?.code,
                      setIsVoucherCodeCopied
                    )
                  }
                  className={classNames('w-full h-6 flex focus:outline-none')}
                  variant={isVoucherCodeCopied ? 'notification' : 'secondary'}
                >
                  <div className="flex">
                    {isVoucherCodeCopied ? (
                      <>
                        <Checkmark className="icon-24 p-0.5 mr-1 bg-primary-caribbean-green-dark text-primary-white rounded-full" />
                        <p>
                          {t('voucher.you-copied-code')} {voucherItem?.code}
                        </p>
                      </>
                    ) : (
                      <>
                        {' '}
                        <Copy className="icon-24 mr-1" />
                        <p>
                          {' '}
                          {t('voucher.block.copy-code')} {voucherItem?.code}
                        </p>
                      </>
                    )}
                  </div>
                </Button>
              </div>
            }
          ></NotificationModalLayout>
        </section>
      )}
    </>
  )
}
