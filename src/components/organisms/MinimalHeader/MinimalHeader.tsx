import type { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import NextLink from 'next/link'
import { ReactComponent as Logo } from '~assets/svg/atidaMifarmaLogo.svg'
import { ReactComponent as Lock } from '~assets/svg/navigation-24px/Lock.svg'
import { ReactComponent as SecureLock } from '~assets/svg/navigation-24px/SecureLock.svg'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'

export type MinimalHeaderProps = ComponentPropsWithoutRef<'header'> & {
  // TODO: shouldn't need to set this to boolean, fix consuming component
  stepper?: JSX.Element | boolean
  reducedVerticalMargin?: boolean
}

export const MinimalHeader: FunctionComponent<MinimalHeaderProps> = ({
  stepper,
  reducedVerticalMargin = false
}) => {
  const { t } = useTranslation()

  const isCheckoutHeaderNavigationUpdateStyleEnabled = useFeatureFlag(
    FeatureFlag.CHECKOUT_HEADER_NAVIGATION_UPDATE_STYLE
  )

  return (
    <header
      className={classNames(
        'flex-auto max-h-7 grid grid-cols-1 grid-rows-2-auto gap-0 mb-4',
        { 'md:max-h-10 md:h-10 md:mb-8': !reducedVerticalMargin },
        {
          'mb-3 sm:mb-5 md:mb-5':
            (!isCheckoutHeaderNavigationUpdateStyleEnabled || !stepper) &&
            reducedVerticalMargin,
          'mb-7 sm:mb-10 md:mb-13':
            isCheckoutHeaderNavigationUpdateStyleEnabled &&
            !!stepper &&
            reducedVerticalMargin
        }
      )}
      data-testid="MinimalHeader"
    >
      {/* Stepper placeholder */}
      {stepper && (
        <div
          className={classNames(
            'border-b border-ui-grey-light row-start-2 row-end-3 col-start-1 col-end-2',
            {
              'md:border-none md:row-start-1 md:row-end-2': !isCheckoutHeaderNavigationUpdateStyleEnabled
            }
          )}
          data-testid="StepperPlaceholder"
        >
          <div
            className={classNames(
              'mx-auto h-full text-center max-h-5',
              'grid gap-x-3 grid-cols-12 grid-rows-1-auto',
              {
                'container container-fixed sm:max-h-6 md:max-h-10': !isCheckoutHeaderNavigationUpdateStyleEnabled,
                'max-h-8 sm:max-h-10': isCheckoutHeaderNavigationUpdateStyleEnabled
              }
            )}
          >
            <div
              className={classNames('col-span-12  md:self-end md:relative', {
                'md:col-start-5 md:col-end-12 lg:col-end-11': !isCheckoutHeaderNavigationUpdateStyleEnabled,
                'md:col-start-1 md:col-end-13': isCheckoutHeaderNavigationUpdateStyleEnabled
              })}
            >
              {stepper}
            </div>
          </div>
        </div>
      )}
      <div
        className={classNames(
          'border-b border-ui-grey-light col-end-2 md:col-start-1 md:row-start-1 md:row-end-2'
        )}
      >
        <div
          className={classNames(
            'container container-fixed mx-auto px-2',
            'grid gap-x-3 grid-cols-12 grid-rows-1-auto',
            'sm:px-5',
            {
              'md:h-10 md:px-8':
                !isCheckoutHeaderNavigationUpdateStyleEnabled || !stepper,
              'sm:h-10':
                isCheckoutHeaderNavigationUpdateStyleEnabled && !!stepper
            }
          )}
        >
          {/* Atida Logo */}
          <div
            className={classNames(
              'self-center row-start-1 col-start-1 col-end-13',
              'flex',
              {
                'py-2  justify-center md:justify-start max-h-7':
                  !isCheckoutHeaderNavigationUpdateStyleEnabled || !stepper,
                'py-2.25 sm:py-2':
                  isCheckoutHeaderNavigationUpdateStyleEnabled && !!stepper
              }
            )}
          >
            <NextLink href="/" prefetch={false}>
              <a aria-label={t('atida.homepage')}>
                <Logo
                  className={classNames('icon-logo-mifarma', {
                    'xs-only:h-4.5':
                      isCheckoutHeaderNavigationUpdateStyleEnabled && !!stepper
                  })}
                />
              </a>
            </NextLink>
          </div>

          {/* Secure connection */}
          <div
            className={classNames(
              'py-2 flex flex-row items-center row-start-1 max-h-7',
              {
                'col-start-1 col-end-3 md:col-start-12 md:col-end-13 md:max-h-10 md:justify-self-end lg:col-start-10':
                  !isCheckoutHeaderNavigationUpdateStyleEnabled || !stepper,
                'col-start-7 col-end-13 justify-self-end text-ui-grey self-center':
                  isCheckoutHeaderNavigationUpdateStyleEnabled && !!stepper
              }
            )}
            data-testid="secureConnection"
          >
            <span
              className={classNames({
                'hidden text-xs lg:block mr-2':
                  !isCheckoutHeaderNavigationUpdateStyleEnabled || !stepper,
                'text-sm sm:text-base mr-1.5 pt-0.5 xs-only:leading-5.375':
                  isCheckoutHeaderNavigationUpdateStyleEnabled && !!stepper
              })}
            >
              {t('shared.secure-connection')}
            </span>
            {isCheckoutHeaderNavigationUpdateStyleEnabled && !!stepper ? (
              <SecureLock className="icon-18-22" />
            ) : (
              <Lock className="icon-24" />
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
