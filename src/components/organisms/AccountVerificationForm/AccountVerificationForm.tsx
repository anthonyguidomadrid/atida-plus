import { ComponentPropsWithoutRef, FunctionComponent, useState } from 'react'
import { useSelector } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import { Button } from '~components/atoms/Button'
import { FormField } from '~components/molecules/FormField'
import { TextField } from '~components/atoms/TextField'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import { PasswordStrengthIndicator } from '~components/molecules/PasswordStrengthIndicator'
import { selectVerifyIsLoading } from '~domains/social/selectors/verify'

export type AccountVerificationFormValues = {
  email: string
  password: string
}

export type AccountVerificationFormProps = {
  userEmail: string
  userName: string
  redirect?: string
  onSubmit?: (values: AccountVerificationFormValues) => void
  renderFormOnly?: boolean
  blockEmail?: boolean
}

export const AccountVerificationForm: FunctionComponent<
  Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'> &
    AccountVerificationFormProps
> = ({
  userEmail,
  userName,
  redirect,
  onSubmit,
  renderFormOnly = false,
  blockEmail = false,
  ...props
}) => {
  const { t } = useTranslation()
  const [passwordShown, setPasswordShown] = useState(false)
  const [disablePasswordBtn, setDisablePasswordBtn] = useState(true)
  const isLoading = useSelector(selectVerifyIsLoading)

  const [
    showPasswordStrengthIndicator,
    setShowPasswordStrengthIndicator
  ] = useState(false)

  const initialValues = {
    email: userEmail,
    password: ''
  }
  const accountVerificationValidationSchema = Yup.object({
    email: Yup.string()
      .lowercase()
      .email(t('create-account.invalid-email-format'))
      .required(t('create-account.email.required')),
    password: Yup.string().required(t('create-account.password.required'))
  })

  return (
    <div
      data-testid="accountVerificationForm"
      className="w-42 md:w-54 h-full flex flex-col gap-2"
    >
      {!renderFormOnly && (
        <>
          <h2>
            {t('account.account-varification.title', { firstName: userName })}
          </h2>
          <p>{t('account.account-verification.body')}</p>
        </>
      )}
      <Formik<AccountVerificationFormValues>
        initialValues={initialValues}
        validateOnChange={false}
        validateOnBlur
        enableReinitialize
        onSubmit={values => {
          onSubmit?.(values)
        }}
        validationSchema={accountVerificationValidationSchema}
      >
        {({ values, errors, touched }) => (
          <Form {...props}>
            <FormField
              inputId="email"
              label={t('form.field.email.label')}
              data-testid="accountVerificationFormEmail"
              error={touched['email'] && errors['email']}
            >
              <Field
                data-testid="emailField"
                className="text-ui-grey-dark bg-ui-grey-lightest border-0"
                component={TextField}
                disabled={blockEmail}
                type="email"
                name="email"
                placeholder={t('form.field.email.placeholder')}
              />
            </FormField>
            <FormField
              inputId="password"
              label={t('form.field.password.label')}
              data-testid="accountVerificationFormPassword"
              onChange={() => setDisablePasswordBtn(false)}
              error={touched['password'] && errors['password']}
            >
              <Field
                data-testid="passwordField"
                component={TextField}
                type={passwordShown ? 'text' : 'password'}
                name="password"
                placeholder={t('form.field.password.placeholder')}
                onBlur={() => setShowPasswordStrengthIndicator(false)}
                onFocus={() => setShowPasswordStrengthIndicator(true)}
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
            {(values.password.length > 0 || showPasswordStrengthIndicator) && (
              <PasswordStrengthIndicator password={values.password} />
            )}
            <Button
              type="submit"
              variant="secondary"
              className="w-full mt-1 mb-3"
              isLoading={isLoading}
              data-testid="accountVerificationFormButton"
            >
              {t('account.account-verification.cta')}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
