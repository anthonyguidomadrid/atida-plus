import { useEffect, ComponentPropsWithoutRef, FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  createCustomerProgressSelectors,
  setCurrentStep
} from '~domains/account'
import {
  selectActiveStep,
  selectGuestStep,
  selectReachedStep,
  selectReachedGuestStep,
  setActiveStep,
  setGuestStep
} from '~domains/checkout'
import { MinimalHeader } from '~components/organisms/MinimalHeader'
import { MinimalFooter } from '~components/organisms/MinimalFooter'
import { selectFooter } from '~domains/page/selectors'
import { Stepper } from '~components/molecules/Stepper'
import { toggleElementOverflow } from '~helpers/toggleElementOverflow'
import { MinimalNavigableHeader } from '~components/organisms/MinimalNavigableHeader'
import { ReactComponent as Back } from '~assets/svg/navigation-24px/Back.svg'
import { Button } from '~components/atoms/Button'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
export type MinimalPageLayoutProps = ComponentPropsWithoutRef<'div'> & {
  withStepper?: boolean
  withBackButton?: boolean
  reducedVerticalMargin?: boolean
}

export const MinimalPageLayout: FunctionComponent<MinimalPageLayoutProps> = ({
  withStepper = false,
  withBackButton = false,
  reducedVerticalMargin = false,
  children,
  ...props
}) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const router = useRouter()
  const footer = useSelector(selectFooter)
  const activeStep = useSelector(selectActiveStep)
  const guestStep = useSelector(selectGuestStep)
  const reachedStep = useSelector(selectReachedStep)
  const reachedGuestStep = useSelector(selectReachedGuestStep)
  const currentStep = useSelector(
    createCustomerProgressSelectors.selectCurrentStep
  )

  /* Fix stuck in scrolling which usually happens after navigating from mobile menu */
  useEffect(() => {
    toggleElementOverflow(true, document.body)
  }, [])

  const handleBackButtonClick = () => {
    if (currentStep === 1) {
      dispatch(setCurrentStep(0))
    } else {
      router.back()
    }
  }

  return (
    <div
      className="flex flex-col h-full"
      data-testid="minimalPageWrapper"
      {...props}
    >
      {withBackButton ? (
        <MinimalNavigableHeader
          reducedVerticalMargin={reducedVerticalMargin}
          button={
            <Button
              variant="back"
              singleIcon
              aria-label={t('shared.back')}
              icon={<Back role="presentation" className="icon-24" />}
              data-testid="headerBackButton"
              onClick={() => handleBackButtonClick()}
            />
          }
        />
      ) : (
        <MinimalHeader
          reducedVerticalMargin={reducedVerticalMargin}
          stepper={
            withStepper && (
              <Stepper
                activeStep={activeStep}
                guestStep={guestStep}
                reachedStep={reachedStep}
                reachedGuestStep={reachedGuestStep}
                setActiveStep={index => {
                  dispatch(setActiveStep(index))
                }}
                setGuestStep={index => {
                  dispatch(setGuestStep(index))
                }}
                data-testid="CheckoutStepper"
              />
            )
          }
        />
      )}

      <div
        className={classNames('flex-auto', {
          'mb-0': reducedVerticalMargin,
          'sm:mb-8 md:mb-9 lg:mb-12': !reducedVerticalMargin
        })}
      >
        {children}
      </div>
      <MinimalFooter
        className="mt-auto"
        termsConditionsLinks={footer?.termsConditionsLinks}
        copyright={footer?.copyright}
        withStepper
      />
    </div>
  )
}
