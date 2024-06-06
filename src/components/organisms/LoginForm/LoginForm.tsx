import {
  ComponentPropsWithoutRef,
  FunctionComponent,
  useEffect,
  useState
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import { Button } from '~components/atoms/Button'
import { FormField } from '~components/molecules/FormField'
import { TextField } from '~components/atoms/TextField'
import { Trans, useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import NextLink from 'next/link'
import { Link } from '../../atoms/Link'

import { triggerReportPasswordForgotten } from '~domains/analytics/actions'
import {
  customerCheckClear,
  loginSetEmail,
  selectIsLoading as loginIsLoading
} from '~domains/account'
import { removeEmailTypos } from '~helpers'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'
import { useRouter } from 'next/router'
import { selectLoginIsLoading as socialLoginIsLoading } from '~domains/social'
import classNames from 'classnames'

export type LoginFormValues = {
  email: string
  password: string
}

export type LoginFormProps = {
  userEmail?: string
  redirect?: string
  passwordWasRestored?: boolean
  notification?: JSX.Element
  generalNotification?: JSX.Element
  onSubmit?: (values: LoginFormValues) => void
  renderFormOnly?: boolean
  basketLogin: boolean
  hasGuestCheckoutButton?: boolean
}

export const LoginForm: FunctionComponent<
  Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'> & LoginFormProps
> = ({
  notification,
  generalNotification,
  redirect,
  passwordWasRestored,
  userEmail,
  onSubmit,
  renderFormOnly,
  basketLogin,
  hasGuestCheckoutButton,
  ...props
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { locale, query, replace } = useRouter()
  const [passwordShown, setPasswordShown] = useState(false)
  const [disablePasswordBtn, setDisablePasswordBtn] = useState(true)
  const [showEmailWarning, setShowEmailWarning] = useState(false)
  const [emailWithoutTypos, setEmailWithoutTypos] = useState<
    string | undefined
  >(undefined)
  const isLoading = useSelector(loginIsLoading)
  const isSocialLoading = useSelector(socialLoginIsLoading)
  const emailRegex = /^.+@.+\.\w+$/

  const initialValues = {
    email:
      userEmail ??
      (typeof query?.email === 'string'
        ? query?.email
        : (query?.email && query?.email[0]) ?? ''),
    password: ''
  }
  const loginValidationSchema = Yup.object({
    email: Yup.string()
      .lowercase()
      .email(t('create-account.invalid-email-format'))
      .required(t('create-account.email.required')),
    password: Yup.string().required(t('create-account.password.required'))
  })

  const isTwoColumnLoginAndSignupEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_TWO_COLUMN_LOGIN_AND_SIGNUP
  )

  useEffect(() => {
    if (query?.email) {
      delete query?.email
      replace(
        {
          query: query
        },
        undefined,
        { shallow: true }
      )
    }
  }, [query, replace])

  return (
    <div
      data-testid="LoginForm"
      className={classNames('w-full', {
        'sm:max-w-42 md:max-w-54': !isTwoColumnLoginAndSignupEnabled
      })}
    >
      <>
        {!renderFormOnly && (
          <>
            {passwordWasRestored ? (
              <>
                <p className="text-primary-caribbean-green mb-1 mt-3">
                  {userEmail}
                </p>
                <h1 className="mb-3">{t('login.enter-password')}</h1>
              </>
            ) : (
              <>
                {basketLogin && (
                  <NextLink passHref href={'/basket'} prefetch={false}>
                    <Link className="underline pb-1.5" data-testid="BasketLink">
                      {t('basket.back-link-login')}
                    </Link>
                  </NextLink>
                )}
                <h2 className="text-5xl">{t('shared.login')}</h2>
                <p className="mb-2.5 mt-0.5">
                  {t('login.new-user.question')}
                  <NextLink
                    href={`/create-account${redirect ? `${redirect}` : ''}`}
                    prefetch={false}
                  >
                    <Link
                      href={`/create-account${redirect ? `${redirect}` : ''}`}
                      className="text-primary-oxford-blue font-normal cursor-pointer hover:text-primary-oxford-blue ml-0.5"
                    >
                      {t('create-account.title')}
                    </Link>
                  </NextLink>
                </p>
              </>
            )}
          </>
        )}
        {generalNotification}
        {notification}
      </>
      <Formik<LoginFormValues>
        initialValues={initialValues}
        validateOnChange={false}
        validateOnBlur={true}
        onSubmit={values => {
          dispatch(customerCheckClear())
          onSubmit?.(values)
        }}
        data-testid="loginForm"
        validationSchema={loginValidationSchema}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form {...props}>
            <FormField
              inputId="email"
              label={t('form.field.email.label')}
              data-testid="loginFormEmail"
              error={touched['email'] && errors['email']}
            >
              <Field
                data-testid="emailField"
                component={TextField}
                disabled={isLoading || isSocialLoading}
                type="email"
                name="email"
                placeholder={t('form.field.email.placeholder')}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue(e.target.name, e.target.value)
                  setEmailWithoutTypos(removeEmailTypos(e.target.value))
                  values.email.match(emailRegex) &&
                    dispatch(loginSetEmail({ email: e.target.value }))
                }}
                onBlur={() => {
                  setShowEmailWarning(!!emailWithoutTypos)
                  values.email.match(emailRegex) &&
                    dispatch(loginSetEmail({ email: values.email }))
                }}
              />
              {showEmailWarning && emailWithoutTypos && (
                <Trans
                  i18nKey="account.login.email-suggestion"
                  values={{
                    emailWithoutTypos: emailWithoutTypos
                  }}
                  components={{
                    button: (
                      <button
                        className="flex underline text-left text-primary-caribbean-green-dark"
                        onClick={() => {
                          setShowEmailWarning(false)
                          setFieldValue(
                            'email',
                            emailWithoutTypos ?? values.email
                          )
                        }}
                      />
                    ),
                    span: (
                      <span className="flex flex-row gap-0.5 mt-1 text-sm-base" />
                    )
                  }}
                />
              )}
            </FormField>
            <FormField
              inputId="password"
              label={t('form.field.password.label')}
              data-testid="loginFormPassword"
              onChange={() => setDisablePasswordBtn(false)}
              error={touched['password'] && errors['password']}
            >
              <Field
                data-testid="passwordField"
                component={TextField}
                disabled={isLoading || isSocialLoading}
                type={passwordShown ? 'text' : 'password'}
                name="password"
                placeholder={t('form.field.password.placeholder')}
                className="w-full"
              />
              <div className="relative flex w-full">
                <button
                  type="button"
                  data-testid="togglePassword"
                  onClick={() => setPasswordShown(!passwordShown)}
                  className="absolute font-light text-sm right-2 -top-4 disabled:text-ui-grey-light"
                  disabled={disablePasswordBtn}
                >
                  {t('create-account.password-show')}
                </button>
              </div>
            </FormField>
            {isTwoColumnLoginAndSignupEnabled && (
              <button
                onClick={() => dispatch(triggerReportPasswordForgotten())}
                className="w-full mt-2 flex"
              >
                <NextLink
                  href={`/${locale}/password-forgotten${
                    values?.email !== '' ? `?email=${values?.email}` : ''
                  }`}
                  passHref
                  prefetch={false}
                >
                  <Link
                    data-testid="passwordForgotten"
                    className="hover:text-primary-oxford-blue cursor-pointer"
                  >
                    {t('login.password-forgotten')}
                  </Link>
                </NextLink>
              </button>
            )}
            <Button
              type="submit"
              variant="secondary"
              className="w-full my-3"
              isLoading={isLoading || isSocialLoading}
              data-testid="loginFormButton"
              onClick={() =>
                passwordWasRestored &&
                setFieldValue('email', userEmail && userEmail)
              }
            >
              {t('shared.login')}
            </Button>
          </Form>
        )}
      </Formik>
      {!isTwoColumnLoginAndSignupEnabled && (
        <button
          onClick={() => dispatch(triggerReportPasswordForgotten())}
          className="w-full my-2 flex text-center justify-center"
        >
          <NextLink
            href={`/${locale}/password-forgotten${
              query?.email !== '' ? `?email=${query?.email}` : ''
            }`}
            passHref
            prefetch={false}
          >
            <Link
              data-testid="passwordForgotten"
              className="hover:text-primary-oxford-blue cursor-pointer"
            >
              {t('login.password-forgotten')}
            </Link>
          </NextLink>
        </button>
      )}
    </div>
  )
}
