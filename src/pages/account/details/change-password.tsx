import type { GetServerSideProps } from 'next'
import { MetaData } from '~components/meta/MetaData'
import { getAlternateLinks } from '~domains/translated-routes'
import { useRouter } from 'next/router'
import { createReduxStore } from '~domains/redux'
import { Button } from '~components/atoms/Button/Button'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { AlternateLinks } from '~components/meta/AlternateLinks'
import {
  UpdatePasswordForm,
  UpdatePasswordFormValues
} from '~components/organisms/UpdatePasswordForm/UpdatePasswordForm'
import { Notification } from '~components/atoms/Notification'
import { selectCustomerReference } from '~domains/account/selectors/customer'
import { updateCustomerPasswordTrigger } from '~domains/account'
import {
  selectWasError,
  selectError
} from '~domains/account/selectors/update-customer-password'
import { NextPage } from 'next'
import { useCallback, useEffect, useState } from 'react'
import { AccountPageLayout } from '~components/templates/AccountPageLayout'
import { loadFeatureFlags } from '~helpers/server-only/featureFlagClient'
import {
  triggerReportPasswordReset,
  triggerReportPasswordResetFailed
} from '~domains/analytics/actions'
import { FeatureFlag } from '~config/constants/feature-flags'
import { getPageCacheHeader } from '~helpers/server-only/cacheHeaders'

const ChangePassword: NextPage & {
  Layout?: (page: JSX.Element) => JSX.Element
} = () => {
  const { t } = useTranslation()
  const { locale, back } = useRouter()
  const dispatch = useDispatch()
  const wasError = useSelector(selectWasError)
  const error = useSelector(selectError)
  const reference = useSelector(selectCustomerReference)
  const [formWasSubmitted, setFormWasSubmitted] = useState(false)

  const handleUpdatePasswordOnSubmit = useCallback(
    (values: UpdatePasswordFormValues) => {
      dispatch(
        updateCustomerPasswordTrigger({
          customerReference: reference,
          password: values.password,
          newPassword: values.newPassword,
          confirmNewPassword: values.confirmNewPassword
        })
      )
    },
    [dispatch, reference]
  )

  useEffect(() => {
    wasError &&
      dispatch(
        triggerReportPasswordResetFailed({
          error_message: t(error as string),
          error_key: error
        })
      )
  }, [dispatch, error, wasError, t])

  useEffect(() => {
    dispatch(triggerReportPasswordReset())
  }, [dispatch])

  return (
    <>
      <MetaData title={t('seo.titles.change-password')} indexation="noindex" />
      <AlternateLinks
        links={getAlternateLinks('account/details/change-password', locale)}
      />
      <div className="mx-3 sm:mx-0">
        <h1>{t('account.change-password.label')}</h1>
      </div>
      <div className="flex flex-col mx-3 mt-3 sm:mt-3.5 sm:mx-0 sm:col-start-4 sm:col-end-10">
        <UpdatePasswordForm
          notification={
            wasError &&
            formWasSubmitted && (
              <Notification
                type="error"
                role="alert"
                title={t('account.change-password.error')}
                content={error}
                className="mb-2"
              />
            )
          }
          onSubmit={values => {
            setFormWasSubmitted(true)
            handleUpdatePasswordOnSubmit(values)
          }}
        />
        <Button
          onClick={back}
          className="w-full mt-4"
          variant="tertiary"
          data-testid="cancelUpdateAccountFormButton"
        >
          {t('shared.cancel')}
        </Button>
      </div>
    </>
  )
}

ChangePassword.Layout = (page: JSX.Element) => (
  <AccountPageLayout hasAnyQuestionsBlock={false} isForm={true}>
    {page}
  </AccountPageLayout>
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

export default ChangePassword
