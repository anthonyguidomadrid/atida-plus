import { ComponentPropsWithoutRef, FunctionComponent, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { Button } from '~components/atoms/Button'
import { FormField } from '~components/molecules/FormField'
import { TextField } from '~components/atoms/TextField'
import { useTranslation } from 'react-i18next'
import { ReactComponent as ChevronLeft } from '~assets/svg/navigation-16px/ChevronLeft.svg'
import { PasswordStrengthIndicator } from '~components/molecules/PasswordStrengthIndicator'
import NextLink from 'next/link'
import { Link } from '../../atoms/Link'
import * as Yup from 'yup'
import { PASSWORD_VALIDATION_REGEX } from '~config/constants/password-validation-regex'
import { FeatureFlag } from '~config/constants/feature-flags'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'

export type NewPasswordFormValues = {
  password: string
  rePassword: string
}

export type NewPasswordFormProps = {
  userEmail?: string
  notification?: JSX.Element
  onSubmit?: (values: NewPasswordFormValues) => void
  hasError?: boolean
}

export const NewPasswordForm: FunctionComponent<
  Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'> & NewPasswordFormProps
> = ({ userEmail, notification, onSubmit, hasError, ...props }) => {
  const { t } = useTranslation()
  const [passwordShown, setPasswordShown] = useState(false)
  const [disablePasswordButton, setDisablePasswordButton] = useState(true)
  const [rePasswordShown, setRePasswordShown] = useState(false)
  const [disableRePasswordButton, setDisableRePasswordButton] = useState(true)
  const [
    showPasswordStrengthIndicator,
    setShowPasswordStrengthIndicator
  ] = useState(false)

  const passwordValidationRegex = PASSWORD_VALIDATION_REGEX.GENERAL

  const initialValues = {
    password: '',
    rePassword: ''
  }

  const isHideConfirmPasswordFieldEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_HIDE_CONFIRM_PASSWORD_FIELD
  )

  const newPasswordValidationSchema = Yup.object({
    password: Yup.string()
      .required(t('create-account.password.required'))
      .matches(passwordValidationRegex, t('create-account.password-format')),
    ...(!isHideConfirmPasswordFieldEnabled && {
      rePassword: Yup.string()
        .required(t('create-account.password.required'))
        .matches(passwordValidationRegex, t('create-account.password-format'))
        .oneOf(
          [Yup.ref('password'), null],
          t('reset-password.passwords-do-not-match')
        )
    })
  })

  return (
    <>
      <p className="w-full sm:w-42 md:w-54">
        <NextLink href="/login" passHref prefetch={false}>
          <Link className="font-normal text-center text-sm cursor-pointer no-underline">
            <ChevronLeft className="icon-16 inline-block" />
            {t('shared.back')}
          </Link>
        </NextLink>
      </p>
      <div
        data-testid="newPasswordFormContainer"
        className="w-full sm:w-42 md:w-54"
      >
        <p
          data-testid="userEmail"
          className="text-primary-caribbean-green mb-1 mt-3"
        >
          {userEmail}
        </p>
        <h1 className="mb-3" data-testid="newPasswordLabel">
          {hasError
            ? t('password.reset-failed')
            : t('password.set-new-password')}
        </h1>
        {notification}
        {!hasError && (
          <>
            <Formik<NewPasswordFormValues>
              initialValues={initialValues}
              validateOnChange={false}
              validateOnBlur={true}
              validationSchema={newPasswordValidationSchema}
              onSubmit={values => {
                if (isHideConfirmPasswordFieldEnabled)
                  values.rePassword = values.password
                onSubmit?.(values)
              }}
              data-testid="newPasswordForm"
            >
              {({
                errors,
                touched,
                values,
                setFieldValue,
                setFieldTouched,
                validateField
              }) => (
                <Form {...props}>
                  <FormField
                    inputId="password"
                    label={t('form.field.password.label')}
                    onChange={() => setDisablePasswordButton(false)}
                    data-testid="newPasswordFormPassword"
                    error={touched['password'] && errors['password']}
                  >
                    <Field
                      data-testid="passwordField"
                      component={TextField}
                      type={passwordShown ? 'text' : 'password'}
                      name="password"
                      placeholder={t('form.field.password.placeholder')}
                      className="w-full"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue('password', e.target.value)
                        setTimeout(() => validateField('password'))
                      }}
                      onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
                        !touched.password && setFieldTouched(e.target.name)
                        validateField(e.target.name)
                        setShowPasswordStrengthIndicator(false)
                      }}
                      onFocus={() => setShowPasswordStrengthIndicator(true)}
                    />
                    <div className="relative flex w-full">
                      <button
                        type="button"
                        data-testid="togglePassword"
                        onClick={() => setPasswordShown(!passwordShown)}
                        className="absolute font-light text-sm right-2 -top-4 disabled:text-ui-grey-light"
                        disabled={disablePasswordButton}
                      >
                        {t('create-account.password-show')}
                      </button>
                    </div>
                  </FormField>
                  {(values.password.length > 0 ||
                    showPasswordStrengthIndicator) && (
                    <PasswordStrengthIndicator password={values.password} />
                  )}
                  {!isHideConfirmPasswordFieldEnabled && (
                    <FormField
                      inputId="rePassword"
                      label={t('form.field.repeat-password.label')}
                      onChange={() => setDisableRePasswordButton(false)}
                      data-testid="newPasswordFormRePassword"
                      error={touched['rePassword'] && errors['rePassword']}
                    >
                      <Field
                        data-testid="rePasswordField"
                        component={TextField}
                        type={rePasswordShown ? 'text' : 'password'}
                        name="rePassword"
                        placeholder={t('form.field.password.placeholder')}
                        className="w-full"
                      />
                      <div className="relative flex w-full">
                        <button
                          type="button"
                          data-testid="toggleRePassword"
                          onClick={() => setRePasswordShown(!rePasswordShown)}
                          className="absolute font-light text-sm right-2 -top-4 disabled:text-ui-grey-light"
                          disabled={disableRePasswordButton}
                        >
                          {t('create-account.password-show')}
                        </button>
                      </div>
                    </FormField>
                  )}
                  <Button
                    type="submit"
                    className="w-full mt-2"
                    data-testid="newPasswordFormButton"
                  >
                    {t('password.reset-password-cta')}
                  </Button>
                </Form>
              )}
            </Formik>
            <div className="mt-3 text-center">
              <NextLink href="/login" prefetch={false}>
                <Link
                  data-testid="cancelResetPassword"
                  className="hover:text-primary-oxford-blue cursor-pointer"
                >
                  {t('shared.cancel')}
                </Link>
              </NextLink>
            </div>
          </>
        )}
      </div>
    </>
  )
}
