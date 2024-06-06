import type { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { breakpoints, useBreakpoint } from '~domains/breakpoints/'
import { useSelector } from 'react-redux'
import {
  selectAddresses,
  selectIsLoggedIn
} from '~domains/account/selectors/customer'
import { steps } from '~domains/checkout/config'
import { getLocaleFromCountry } from '~helpers'
import { useRouter } from 'next/router'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'
import { CircledNumber } from '~components/atoms/CircledNumber'

export type StepperProps = ComponentPropsWithoutRef<'article'> & {
  activeStep: number
  reachedStep: number
  guestStep: number
  reachedGuestStep: number
  setActiveStep: (newStep: number) => void
  setGuestStep: (newStep: number) => void
}

export const Stepper: FunctionComponent<StepperProps> = ({
  className,
  activeStep,
  guestStep,
  reachedStep,
  reachedGuestStep,
  setActiveStep,
  setGuestStep,
  ...props
}) => {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const isMissingAddressFormEnabled = Boolean(
    useFeatureFlag(FeatureFlag.CHECKOUT_MISSING_ADDRESS_FORM)
  )

  const isCheckoutHeaderNavigationUpdateStyleEnabled = useFeatureFlag(
    FeatureFlag.CHECKOUT_HEADER_NAVIGATION_UPDATE_STYLE
  )

  const isMiddleFormat = useBreakpoint(breakpoints.sm)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const addresses =
    useSelector(selectAddresses).filter(
      address => getLocaleFromCountry(address.country) === locale
    ).length > 0
  const isLoggedInWithAddress =
    isLoggedIn && (isMissingAddressFormEnabled ? addresses : true)

  const isCurrentOrPassedStep = (index: number) => {
    if (isCheckoutHeaderNavigationUpdateStyleEnabled) {
      if (isLoggedInWithAddress) {
        return activeStep >= index
      }
      return guestStep >= index
    }

    if (isLoggedInWithAddress) {
      return activeStep === index
    }
    return guestStep === index
  }

  return (
    <section
      className={classNames('flex justify-center')}
      data-testid="Stepper"
      {...props}
    >
      {steps
        .filter(step =>
          isLoggedInWithAddress
            ? step.id !== 'details'
            : step.id !== 'confirmation'
        )
        .map((step, index) => {
          return (
            <button
              key={index}
              className={classNames(
                'w-full cursor-pointer font-light text-sm',
                'md:text-base',
                {
                  'border-b-4 sm:py-1.5 py-1 md:py-3': !isCheckoutHeaderNavigationUpdateStyleEnabled,
                  'border-b-2 flex items-center justify-center h-7 sm:h-8': isCheckoutHeaderNavigationUpdateStyleEnabled,
                  'border-primary-caribbean-green': isCurrentOrPassedStep(
                    index
                  ),
                  'text-ui-grey border-primary-white': !isCurrentOrPassedStep(
                    index
                  ),
                  'text-primary-caribbean-green-dark':
                    isCheckoutHeaderNavigationUpdateStyleEnabled &&
                    (isLoggedInWithAddress
                      ? activeStep === index
                      : guestStep === index),
                  'cursor-not-allowed': isLoggedInWithAddress
                    ? reachedStep < index
                    : reachedGuestStep < index
                }
              )}
              onClick={() =>
                isLoggedInWithAddress
                  ? setActiveStep(index)
                  : setGuestStep(index)
              }
              aria-pressed={
                isLoggedInWithAddress
                  ? activeStep === index
                  : guestStep === index
              }
              disabled={
                isLoggedInWithAddress
                  ? reachedStep < index
                  : reachedGuestStep < index
              }
            >
              {isCheckoutHeaderNavigationUpdateStyleEnabled && isMiddleFormat && (
                <CircledNumber
                  badge={index + 1}
                  className={classNames('border w-3 h-3 leading-4 py-0.25', {
                    'border-primary-caribbean-green-dark bg-primary-caribbean-green-dark text-primary-white': isLoggedInWithAddress
                      ? activeStep === index
                      : guestStep === index,
                    'border-primary-oxford-blue bg-primary-oxford-blue text-primary-white': isLoggedInWithAddress
                      ? activeStep > index
                      : guestStep > index
                  })}
                />
              )}
              {isCheckoutHeaderNavigationUpdateStyleEnabled ? (
                <span
                  aria-current={
                    isLoggedInWithAddress
                      ? activeStep === index
                      : guestStep === index
                  }
                  className="font-normal"
                >
                  {!isMiddleFormat && index + 1}
                  <span
                    className={classNames('ml-1 sm:ml-0.5 sm:text-base', {
                      underline: isLoggedInWithAddress
                        ? activeStep > index
                        : guestStep > index
                    })}
                  >
                    {t(step.name)}
                  </span>
                </span>
              ) : (
                <span
                  aria-current={
                    isLoggedInWithAddress
                      ? activeStep === index
                      : guestStep === index
                  }
                >
                  {index + 1}
                  {isMiddleFormat ? `. ${t(step.name)}` : ''}
                </span>
              )}
            </button>
          )
        })}
    </section>
  )
}
