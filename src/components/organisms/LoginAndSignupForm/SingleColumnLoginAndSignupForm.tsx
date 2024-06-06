import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { Notification } from '~components/atoms/Notification'
import { NewCustomerNotification } from '~components/atoms/NewCustomerNotification'
import { LoginForm } from '../LoginForm'
import { LoginAndSignupFormProps } from './types'
import { Button } from '~components/atoms/Button'
import { TranslationKeys } from '~config/constants/translation-keys'

export const SingleColumnLoginAndSignupForm: FunctionComponent<LoginAndSignupFormProps> = ({
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
  basketLogin
}) => {
  const { t } = useTranslation()

  const isLockoutError = error === TranslationKeys.Login.AccountLockout.content

  return (
    <div className="container flex flex-col items-center mt-3 sm:mt-5 sm:mb-8 md:mt-8 md:mb-9 lg:mb-12">
      {loginNotificationType && (
        <div className="w-full mb-3 sm:w-42 md:w-54">
          <Notification
            type="info"
            title={t(`login.${loginNotificationType}-notification.title`)}
            content={t(`login.${loginNotificationType}-notification.content`)}
          />
        </div>
      )}
      <LoginForm
        redirect={actualRedirect}
        passwordWasRestored={showReducedForm}
        userEmail={user && user?.email}
        notification={
          wasError ? (
            <Notification
              type="error"
              role="alert"
              title={
                isLockoutError
                  ? t(TranslationKeys.Login.AccountLockout.title)
                  : t(TranslationKeys.Login.Default.title)
              }
              content={error}
              translateRichText
              className="mb-2.5"
            />
          ) : showReducedForm ? (
            <Notification
              type="success"
              role="alert"
              title={t('account.reset-password.success')}
              className="mb-2.5"
              childrenClassName="text-s"
            />
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
      {hasGuestCheckoutButton && (
        <div
          data-testid="guestNotificationButtonWrapper"
          className="w-full sm:w-42 md:w-54 mb-3 -mt-1"
        >
          <Button
            data-testid="guestNotificationButton"
            variant="secondary"
            className="w-full"
            aria-label={t('checkout.guest.notification.button')}
            onClick={handleGuestCheckoutOnClick}
          >
            {t('checkout.guest.notification.button')}
          </Button>
        </div>
      )}
      <NewCustomerNotification
        url={`/create-account${actualRedirect ? `${actualRedirect}` : ''}`}
      />
    </div>
  )
}
