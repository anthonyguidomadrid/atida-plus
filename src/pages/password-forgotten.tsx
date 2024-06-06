import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { MetaData } from '~components/meta/MetaData'
import { AlternateLinks } from '~components/meta/AlternateLinks'
import {
  PasswordForgottenForm,
  PasswordForgottenFormValues
} from '~components/organisms/PasswordForgottenForm'
import {
  triggerReportPageViewed,
  triggerReportPasswordResetLinkRequested
} from '~domains/analytics'
import { getAlternateLinks } from '~domains/translated-routes'
import { MinimalPageLayout } from '~components/templates/MinimalPageLayout'
import { createReduxStore } from '~domains/redux'
import {
  customerCheckClear,
  passwordForgottenResetState,
  passwordForgottenSelectors,
  passwordForgottenTrigger,
  verifyResetPasswordTokenSelectors
} from '~domains/account'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import { Notification } from '~components/atoms/Notification'
import { Trans, useTranslation } from 'react-i18next'
import { AuthGuard } from '~components/helpers/AuthGuard'
import { loadFeatureFlags } from '~helpers/server-only/featureFlagClient'
import { Link } from '~components/atoms/Link/Link'
import { Button } from '~components/atoms/Button'
import { getPageCacheHeader } from '~helpers/server-only/cacheHeaders'

const PASSWORD_FORGOTTEN_EMAIL_SENT = 'password-forgotten.email-sent.content'

const PasswordForgotten: NextPage & {
  Layout?: (page: JSX.Element) => JSX.Element
} = () => {
  const wasSuccess = useSelector(passwordForgottenSelectors.selectWasSuccess)
  const { locale, push } = useRouter()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const resetTokenVerificationFailed = useSelector(
    verifyResetPasswordTokenSelectors.selectWasError
  )
  const resetTokenError = useSelector(
    verifyResetPasswordTokenSelectors.selectError
  )
  const [email, setEmail] = useState('')

  const handlePasswordForgottenOnSubmit = useCallback(
    (values: PasswordForgottenFormValues) => {
      setEmail(values.email)
      dispatch(passwordForgottenTrigger({ email: values.email }))
      dispatch(triggerReportPasswordResetLinkRequested())
      dispatch(customerCheckClear())
    },
    [dispatch]
  )

  useEffect(() => {
    dispatch(passwordForgottenResetState())
    dispatch(
      triggerReportPageViewed({ page: 'Reset Password', pageType: 'account' })
    )
  }, [dispatch])

  const emailNotAvailableHasNotificationContent = () =>
    t(PASSWORD_FORGOTTEN_EMAIL_SENT) !== PASSWORD_FORGOTTEN_EMAIL_SENT

  return (
    <>
      <MetaData
        title={t('seo.titles.password-forgotten')}
        indexation="noindex"
      />
      <AlternateLinks links={getAlternateLinks('back', locale)} />

      <main className="container flex flex-col items-center mb-4">
        {!wasSuccess && (
          <PasswordForgottenForm
            notification={
              resetTokenVerificationFailed ? (
                <Notification
                  type="warning"
                  role="alert"
                  title={t('account.verify-reset-password-token.error.title')}
                  content={resetTokenError?.message}
                  className="my-2.5"
                />
              ) : undefined
            }
            onSubmit={handlePasswordForgottenOnSubmit}
          />
        )}
        {wasSuccess && (
          <div className="w-42 sm:w-52">
            <h2 className="mb-3">
              {t('password-forgotten.email-sent.title', { email })}
            </h2>
            {emailNotAvailableHasNotificationContent() && (
              <div className="w-full">
                <Trans
                  i18nKey={PASSWORD_FORGOTTEN_EMAIL_SENT}
                  components={{
                    a: (
                      <Link
                        className="font-semibold"
                        extraParams={`?email=${email}`}
                      />
                    ),
                    p: <p className="mb-2" />
                  }}
                />
              </div>
            )}
            <Button
              className="w-full"
              variant="secondary"
              onClick={() => push(`/login?email=${email}`)}
            >
              {t('shared.back-to-login-page')}
            </Button>
          </div>
        )}
      </main>
    </>
  )
}

PasswordForgotten.Layout = (page: JSX.Element) => (
  <AuthGuard isAuthPage>
    <MinimalPageLayout>{page}</MinimalPageLayout>
  </AuthGuard>
)

export const getServerSideProps: GetServerSideProps = async context => {
  const cacheHeader = await getPageCacheHeader(context.locale, true)
  context.res.setHeader('Cache-Control', cacheHeader)
  const store = createReduxStore(context.locale)
  const featureFlags = await loadFeatureFlags(context.locale)

  return {
    props: {
      featureFlags,
      reduxState: store.getState()
    }
  }
}

export default PasswordForgotten
