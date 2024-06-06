import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { MetaData } from '~components/meta/MetaData'
import { AlternateLinks } from '~components/meta/AlternateLinks'
import {
  NewPasswordForm,
  NewPasswordFormValues
} from '~components/organisms/NewPasswordForm'
import { getAlternateLinks } from '~domains/translated-routes'
import { MinimalPageLayout } from '~components/templates/MinimalPageLayout'
import {
  triggerReportPageViewed,
  triggerReportPasswordReset,
  triggerReportPasswordResetFailed
} from '~domains/analytics'
import { createReduxStore } from '~domains/redux'
import { Notification } from '~components/atoms/Notification'
import {
  setNewPasswordTrigger,
  setNewPasswordSelectors,
  verifyResetPasswordTokenTrigger,
  verifyResetPasswordTokenSelectors
} from '~domains/account'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AuthGuard } from '~components/helpers/AuthGuard'
import { loadFeatureFlags } from '~helpers/server-only/featureFlagClient'
import { LoadingSpinner } from '~components/atoms/LoadingSpinner'
import { FeatureFlag } from '~config/constants/feature-flags'
import { getPageCacheHeader } from '~helpers/server-only/cacheHeaders'

const SetNewPassword: NextPage & {
  Layout?: (page: JSX.Element) => JSX.Element
} = () => {
  const { locale, query, push } = useRouter()
  const dispatch = useDispatch()
  const wasError = useSelector(setNewPasswordSelectors.selectWasError)
  const error = useSelector(setNewPasswordSelectors.selectError)
  const wasSuccess = useSelector(setNewPasswordSelectors.selectWasSuccess)
  const { t } = useTranslation()
  const user = useSelector(verifyResetPasswordTokenSelectors.selectUserInfo)
  const verifyWasError = useSelector(
    verifyResetPasswordTokenSelectors.selectWasError
  )
  const verifyWasSuccess = useSelector(
    verifyResetPasswordTokenSelectors.selectWasSuccess
  )
  const resetTokenError = useSelector(
    verifyResetPasswordTokenSelectors.selectError
  )
  const resetPasswordToken = query.resetPasswordToken?.toString() ?? ''

  const tokenInvalid = resetTokenError?.status === 404

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ;(verifyWasError || verifyWasSuccess) &&
      !tokenInvalid &&
      setIsLoading(false)
  }, [verifyWasError, verifyWasSuccess, tokenInvalid])

  useEffect(() => {
    dispatch(verifyResetPasswordTokenTrigger({ resetPasswordToken }))
  }, [dispatch, resetPasswordToken])

  useEffect(() => {
    wasSuccess && dispatch(triggerReportPasswordReset())
  }, [dispatch, wasSuccess])

  useEffect(() => {
    tokenInvalid && push('/password-forgotten')
  }, [push, tokenInvalid])

  const handleSetNewPasswordOnSubmit = useCallback(
    (values: NewPasswordFormValues) => {
      dispatch(
        setNewPasswordTrigger({
          redirect: '/login',
          password: values.password,
          confirmPassword: values.rePassword,
          restorePasswordKey: resetPasswordToken
        })
      )
    },
    [dispatch, resetPasswordToken]
  )

  useEffect(() => {
    dispatch(
      triggerReportPageViewed({
        page: 'Enter New Password',
        pageType: 'account'
      })
    )
  }, [dispatch])

  useEffect(() => {
    wasError &&
      dispatch(
        triggerReportPasswordResetFailed({
          error_key: error,
          error_message: t(error as string)
        })
      )
  }, [dispatch, wasError, error, t])

  return (
    <>
      <MetaData indexation="noindex" />
      <AlternateLinks
        links={getAlternateLinks(
          'set-new-password/:resetPasswordToken',
          locale,
          { resetPasswordToken }
        )}
      />

      <main className="container flex flex-col items-center mb-3">
        {!isLoading ? (
          <NewPasswordForm
            userEmail={user && user.email}
            onSubmit={handleSetNewPasswordOnSubmit}
            notification={
              tokenInvalid ? (
                <Notification
                  type="warning"
                  role="alert"
                  title={t('account.verify-reset-password-token.error.title')}
                  content={resetTokenError?.message}
                  className="mb-2.5"
                />
              ) : undefined
            }
            hasError={tokenInvalid}
          />
        ) : (
          <LoadingSpinner className="mt-15 sm:mt-20 lg:mt-30" />
        )}
      </main>
    </>
  )
}

SetNewPassword.Layout = (page: JSX.Element) => (
  <AuthGuard isAuthPage>
    <MinimalPageLayout>{page}</MinimalPageLayout>
  </AuthGuard>
)

export const getServerSideProps: GetServerSideProps = async context => {
  const cacheHeader = await getPageCacheHeader(context.locale)
  context.res.setHeader('Cache-Control', cacheHeader)
  const store = createReduxStore(context.locale)
  const featureFlags = await loadFeatureFlags(context.locale, [
    FeatureFlag.ACCOUNT_HIDE_CONFIRM_PASSWORD_FIELD
  ])

  return {
    props: {
      featureFlags,
      reduxState: store.getState()
    }
  }
}

export default SetNewPassword
