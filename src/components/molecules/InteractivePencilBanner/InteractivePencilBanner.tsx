import {
  ComponentPropsWithoutRef,
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { ReactComponent as Cross } from '~assets/svg/navigation-24px/Cross.svg'
import { ReactComponent as Copy } from '~assets/svg/navigation-24px/Copy.svg'
import { Button } from '~components/atoms/Button'
import { Notification } from '~components/atoms/Notification'
import { copyToClipboard } from '~helpers/copyToClipboard'
import { useMutationObserver } from '~helpers'

export type InteractivePencilBannerProps = {
  closeIcon?: boolean
  initialCouponCode?: string
  initialShortOffer?: string
  className?: string
}

export const InteractivePencilBanner: FunctionComponent<
  ComponentPropsWithoutRef<'div'> & InteractivePencilBannerProps
> = ({
  closeIcon,
  initialCouponCode = '',
  initialShortOffer = '',
  className,
  ...props
}) => {
  const storage = globalThis?.sessionStorage
  const [isPencilBannerVisible, setIsPencilBannerVisible] = useState(true)
  useEffect(() => {
    const data = storage?.getItem('isPencilBannerVisible')
    if (data !== null) setIsPencilBannerVisible(JSON.parse(data))
  }, [storage])
  useEffect(() => {
    storage?.setItem(
      'isPencilBannerVisible',
      JSON.stringify(isPencilBannerVisible)
    )
  }, [isPencilBannerVisible, storage])
  const [isVoucherCodeCopied, setIsVoucherCodeCopied] = useState('')
  const handleCopyVoucherToClipboard = useCallback(copyToClipboard, [])
  const handleClose = () => {
    setIsPencilBannerVisible(false)
  }

  const { t } = useTranslation()

  // As Exponea driven code sets data attributes on interactivePencilBanner div,
  // the mutation observer is triggering the state change
  const interactivePencilBannerRef = useRef<HTMLDivElement>(null)
  const [couponCode, setCouponCode] = useState(initialCouponCode)
  const [shortOffer, setShortOffer] = useState(initialShortOffer)
  const onAttributesMutation = useCallback((mutationList: any[]) => {
    setCouponCode(mutationList[0]?.target?.dataset?.couponCode)
    setShortOffer(mutationList[0]?.target?.dataset?.shortOffer)
  }, [])
  useMutationObserver(interactivePencilBannerRef?.current, onAttributesMutation)

  return (
    <div
      id="interactivePencilBanner"
      data-testid="interactivePencilBanner"
      className={classNames(
        {
          'flex items-center justify-center align-center animate-fade-in h-5.5 sm:h-7': isPencilBannerVisible
        },
        { 'bg-secondary-champagne-pink': couponCode && shortOffer },
        { hidden: !isPencilBannerVisible },
        className
      )}
      data-coupon-code="@initial"
      data-short-offer="@initial"
      ref={interactivePencilBannerRef}
      {...props}
    >
      <div className="flex justify-between w-full sm:w-full sm:container sm:container-fixed">
        <div className="flex items-center overflow-hidden sm:m-auto">
          {couponCode && (
            <>
              <Button
                id="interactive-pencil-banner-copy-button"
                data-testid="interactive-pencil-banner-copy-button"
                onClick={() =>
                  handleCopyVoucherToClipboard(
                    couponCode,
                    setIsVoucherCodeCopied
                  )
                }
                icon={
                  <Copy className="icon-24 text-primary-white sm:icon-24" />
                }
                className={classNames(
                  'bg-secondary-portland-orange border-none text-primary-white',
                  'rounded-none whitespace-nowrap text-sm h-5.5 font-bold underline p-1.5',
                  'sm:no-underline sm:rounded sm:order-1 sm:h-5',
                  { hidden: !couponCode || !shortOffer },
                  { 'animate-fade-in': couponCode && shortOffer }
                )}
                aria-label={t('interactive-pencil-banner.copy-to-clipboard')}
              >
                <span className="hidden sm:inline">
                  {t('interactive-pencil-banner.copy')}{' '}
                </span>
                <span
                  id="interactive-pencil-banner-button-coupon-code"
                  data-testid="interactive-pencil-banner-button-coupon-code"
                >
                  {couponCode}
                </span>
              </Button>
              <span
                id="interactive-pencil-banner-coupon-code"
                data-testid="interactive-pencil-banner-coupon-code"
                className={classNames('font-bold hidden whitespace-nowrap', {
                  'sm:inline animate-fade-in': couponCode && shortOffer
                })}
              >{`${t('interactive-pencil-banner.coupon')} ${couponCode}`}</span>
            </>
          )}
          {shortOffer && (
            <p
              id="interactive-pencil-banner-short-offer"
              data-testid="interactive-pencil-banner-short-offer"
              className={classNames(
                'mr-auto pl-1.5 pr-2 text-xs whitespace-nowrap sm:text-base',
                { hidden: !couponCode && !shortOffer },
                { 'animate-fade-in': couponCode && shortOffer }
              )}
            >
              {shortOffer}
            </p>
          )}
        </div>
        {closeIcon && (
          <Button
            id="interactive-pencil-banner-close-button"
            data-testid="interactive-pencil-banner-close-button"
            onClick={handleClose}
            icon={<Cross className="icon-24 text-primary-oxford-blue" />}
            className={classNames(
              'right-0 w-5.5 h-5.5 min-w-5.5 bg-secondary-champagne-pink border-none',
              'text-primary-oxford-blue order-last',
              { hidden: !shortOffer && !couponCode },
              { 'animate-fade-in': couponCode && shortOffer }
            )}
            aria-label={t('shared.close-drawer')}
          />
        )}
      </div>
      <Notification
        data-testid="interactive-pencil-banner-notification-toaster"
        type="success"
        title={t('interactive-pencil-banner.coupon-code-copied')}
        className={classNames(
          'absolute max-w-43 left-0 right-0 mx-auto mt-15.5 z-10',
          { hidden: !isVoucherCodeCopied }
        )}
      />
    </div>
  )
}
