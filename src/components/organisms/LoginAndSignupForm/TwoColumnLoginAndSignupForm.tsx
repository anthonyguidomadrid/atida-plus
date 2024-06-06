import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { Notification } from '~components/atoms/Notification'
import { NewCustomerNotification } from '~components/atoms/NewCustomerNotification'
import { LoginForm } from '../LoginForm'
import { LoginAndSignupFormProps } from './types'
import { breakpoints, useBreakpoint } from '~domains/breakpoints'
import {
  SocialLoginAndSignUp,
  SocialLoginAndSignUpServiceTypes
} from '~components/atoms/SocialLoginAndSignUp'
import { Button } from '~components/atoms/Button'
import { getOAuthUrl } from '~helpers/oauth'
import { useRouter } from 'next/router'
import { SOCIAL_LOGIN_SERVICE_TYPE } from '~config/constants/social-login-service-types'
import NextLink from 'next/link'
import { Link } from '../../atoms/Link'
import { TranslationKeys } from '~config/constants/translation-keys'
import { selectLoginEmail } from '~domains/account/selectors/login'
import { useDispatch, useSelector } from 'react-redux'
import { triggerReportSocialLoginAttempted } from '~domains/analytics'

export const TwoColumnLoginAndSignupForm: FunctionComponent<
  LoginAndSignupFormProps & {
    isFaceBookEnabled: boolean
    isGoogleEnabled: boolean
    isAppleEnabled: boolean
  }
> = ({
  loginNotificationType,
  actualRedirect,
  showReducedForm,
  user,
  wasError,
  error,
  hasMifarmaBanner,
  generalNotificationTitle,
  generalNotificationContent,
  handleLoginOnSubmit,
  hasGuestCheckoutButton,
  handleGuestCheckoutOnClick,
  basketLogin,
  isFaceBookEnabled,
  isGoogleEnabled,
  isAppleEnabled
}) => {
  const { push, locale, query } = useRouter()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const isTablet = useBreakpoint(breakpoints.sm)
  const { social } = query
  const isSocialLogin = Object.values(SOCIAL_LOGIN_SERVICE_TYPE).includes(
    social as SocialLoginAndSignUpServiceTypes
  )
  const isLockoutError = error === TranslationKeys.Login.AccountLockout.content

  const currentEmail = useSelector(selectLoginEmail)

  const getNotificationTitle = () => {
    if (isSocialLogin) {
      return t(TranslationKeys.Login.Social.title, { social })
    }

    return isLockoutError
      ? t(TranslationKeys.Login.AccountLockout.title)
      : t(TranslationKeys.Login.Default.title)
  }

  return (
    <div className="w-full h-full flex flex-col items-center sm:grid sm:grid-cols-2 sm:grid-flow-row">
      <div className="w-full h-full px-3 flex items-start justify-end p-3 sm:p-5 sm:pb-8 md:px-8 lg:px-10">
        <div className="w-full flex flex-col sm:max-w-38 sm:items-end md:max-w-48 lg:max-w-50">
          {isTablet && (
            <>
              <h2 className="w-full mb-2 sm:mb-4 text-5xl">
                {t('shared.login')}
              </h2>
              <h4 className="w-full font-normal text-2xl">
                {t('login.welcome-back')}
              </h4>
            </>
          )}
          <LoginForm
            hasGuestCheckoutButton={hasGuestCheckoutButton}
            renderFormOnly={isTablet}
            redirect={actualRedirect}
            passwordWasRestored={showReducedForm}
            userEmail={user && user?.email}
            notification={
              wasError ? (
                <Notification
                  type="error"
                  role="alert"
                  title={getNotificationTitle()}
                  content={
                    isSocialLogin
                      ? t(TranslationKeys.Login.Social.content, { social })
                      : t(error as string)
                  }
                  translateRichText
                  className="mb-2.5"
                >
                  {isSocialLogin && basketLogin ? (
                    <button
                      className="flex font-normal underline"
                      onClick={handleGuestCheckoutOnClick}
                    >
                      {t('login.continue-as-guest.cta')}
                    </button>
                  ) : (
                    <NextLink
                      href={`/${locale}/password-forgotten${
                        currentEmail !== '' && currentEmail != undefined
                          ? `?email=${currentEmail}`
                          : ''
                      }`}
                      passHref
                      prefetch={false}
                    >
                      <Link
                        data-testid="passwordForgotten"
                        className="hover:text-primary-oxford-blue cursor-pointer"
                      >
                        {t('login.reset-password')}.
                      </Link>
                    </NextLink>
                  )}
                </Notification>
              ) : showReducedForm ? (
                <Notification
                  type="success"
                  role="alert"
                  title={t('account.reset-password.success')}
                  className="mb-2.5"
                  childrenClassName="text-s"
                />
              ) : loginNotificationType ? (
                <div className="w-full mb-3">
                  <Notification
                    type="info"
                    title={t(
                      `login.${loginNotificationType}-notification.title`
                    )}
                    content={t(
                      `login.${loginNotificationType}-notification.content`
                    )}
                  />
                </div>
              ) : undefined
            }
            generalNotification={
              !hasMifarmaBanner &&
              generalNotificationTitle &&
              generalNotificationContent ? (
                <Notification
                  type="info"
                  role="alert"
                  title={generalNotificationTitle}
                  content={generalNotificationContent}
                  className="mb-2.5 pt-3 pb-3"
                />
              ) : undefined
            }
            onSubmit={handleLoginOnSubmit}
            basketLogin={basketLogin}
          />
          {(isAppleEnabled || isFaceBookEnabled || isGoogleEnabled) && (
            <SocialLoginAndSignUp
              className="w-full"
              labelClassName="mt-1 mb-3 sm:mb-4"
              label="login.new-customer-notification-question"
              handleOnClick={serviceType => {
                push(getOAuthUrl(serviceType, locale, actualRedirect))
                dispatch(
                  triggerReportSocialLoginAttempted({
                    social_platform: serviceType,
                    clickedFrom: 'sign_in_page'
                  })
                )
              }}
              isAppleEnabled={isAppleEnabled}
              isFaceBookEnabled={isFaceBookEnabled}
              isGoogleEnabled={isGoogleEnabled}
            />
          )}
          {hasGuestCheckoutButton && (!isTablet || locale === 'de-de') && (
            <Button
              data-testid="continueAsGuestStaticContentBlockButton"
              variant="primary"
              className="w-full mt-3"
              aria-label={t('login.continue-as-guest.cta')}
              onClick={handleGuestCheckoutOnClick}
            >
              {t('login.continue-as-guest.cta')}
            </Button>
          )}
        </div>
      </div>
      <div className="w-full h-full flex items-center justify-start bg-ui-guyabano p-3 sm:p-5 sm:pb-8 md:px-8 lg:px-10">
        <NewCustomerNotification
          url={`/create-account${actualRedirect ? `${actualRedirect}` : ''}`}
          hasGuestCheckoutButton={hasGuestCheckoutButton}
          isTablet={isTablet}
          handleGuestCheckoutOnClick={handleGuestCheckoutOnClick}
        />
      </div>
    </div>
  )
}
