import {
  ComponentPropsWithoutRef,
  FunctionComponent,
  useRef,
  useState
} from 'react'
import { Formik, Form, Field } from 'formik'
import { Button } from '~components/atoms/Button'
import { FormField } from '~components/molecules/FormField'
import { TextField } from '~components/atoms/TextField'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import { scrollToElement } from '~helpers'
import { PasswordStrengthIndicator } from '~components/molecules/PasswordStrengthIndicator'
import { selectWasError } from '~domains/account/selectors/update-customer-password'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import { PASSWORD_VALIDATION_REGEX } from '~config/constants/password-validation-regex'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'

export type UpdatePasswordFormValues = {
  password: string
  newPassword: string
  confirmNewPassword: string
}

export type UpdatePasswordFormProps = {
  notification?: JSX.Element | boolean
  onSubmit?: (values: UpdatePasswordFormValues) => void
}

const REQUIRED_LENGTH = 8

export const UpdatePasswordForm: FunctionComponent<
  Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'> & UpdatePasswordFormProps
> = ({ notification, onSubmit, ...props }) => {
  const { t } = useTranslation()
  const [disablePasswordBtn, setDisablePasswordBtn] = useState(true)
  const [passwordShown, setPasswordShown] = useState(false)
  const [newPasswordShown, setNewPasswordShown] = useState(false)
  const [confirmNewPasswordShown, setConfirmNewPasswordShown] = useState(false)
  const [
    showPasswordStrengthIndicator,
    setShowPasswordStrengthIndicator
  ] = useState(false)
  const scrollingElement = useRef<HTMLDivElement>(null)
  const wasError = useSelector(selectWasError)

  const isHideConfirmPasswordFieldEnabled = useFeatureFlag(
    FeatureFlag.ACCOUNT_HIDE_CONFIRM_PASSWORD_FIELD
  )

  const passwordValidationRegex = PASSWORD_VALIDATION_REGEX.GENERAL

  const initialValues = {
    password: '',
    newPassword: '',
    confirmNewPassword: ''
  }

  const UpdatePasswordValidationSchema = Yup.object({
    password: Yup.string()
      .required(t('create-account.password.required'))
      .min(REQUIRED_LENGTH, t('create-account.password-requirements')),
    newPassword: Yup.string()
      .required(t('create-account.password.required'))
      .matches(passwordValidationRegex, t('create-account.password-format')),
    ...(!isHideConfirmPasswordFieldEnabled && {
      confirmNewPassword: Yup.string()
        .required(t('create-account.password.required'))
        .matches(passwordValidationRegex, t('create-account.password-format'))
    })
  })

  return (
    <div data-testid="UpdatePasswordForm">
      {notification}
      <Formik<UpdatePasswordFormValues>
        initialValues={initialValues}
        validateOnChange={false}
        validateOnBlur={true}
        onSubmit={values => {
          if (isHideConfirmPasswordFieldEnabled) {
            values.confirmNewPassword = values.newPassword
          }
          onSubmit?.(values)
          scrollToElement(scrollingElement.current)
        }}
        data-testid="UpdatePasswordForm"
        validationSchema={UpdatePasswordValidationSchema}
      >
        {({
          values,
          errors,
          touched,
          setFieldValue,
          setFieldTouched,
          validateField
        }) => (
          <Form {...props}>
            <FormField
              className={classNames('mb-2', { 'mt-2': wasError })}
              inputId="password"
              label={t('form.field.current-password.label')}
              data-testid="loginFormPassword"
              onChange={() => setDisablePasswordBtn(false)}
              error={touched['password'] && errors['password']}
            >
              <Field
                data-testid="passwordField"
                autoComplete="current-password"
                component={TextField}
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
            <FormField
              inputId="newPassword"
              label={t('form.field.new-password.label')}
              data-testid="newPasswordFormPassword"
              onChange={() => setDisablePasswordBtn(false)}
              error={touched['newPassword'] && errors['newPassword']}
            >
              <Field
                data-testid="newPasswordField"
                autoComplete="new-password"
                component={TextField}
                type={newPasswordShown ? 'text' : 'password'}
                placeholder={t('form.field.new-password.placeholder')}
                name="newPassword"
                className="w-full"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue('newPassword', e.target.value)
                  setTimeout(() => validateField('newPassword'))
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
                  data-testid="toggleNewPassword"
                  onClick={() => setNewPasswordShown(!newPasswordShown)}
                  className="absolute font-light text-sm right-2 -top-4 disabled:text-ui-grey-light"
                  disabled={disablePasswordBtn}
                >
                  {t('create-account.password-show')}
                </button>
              </div>
            </FormField>
            {(values.newPassword.length > 0 ||
              showPasswordStrengthIndicator) && (
              <PasswordStrengthIndicator password={values.newPassword} />
            )}
            {!isHideConfirmPasswordFieldEnabled && (
              <FormField
                inputId="confirmNewPassword"
                label={t('form.field.confirm-password.label')}
                data-testid="confirmNewPasswordFormPassword"
                onChange={() => setDisablePasswordBtn(false)}
                error={
                  touched['confirmNewPassword'] && errors['confirmNewPassword']
                }
              >
                <Field
                  data-testid="confirmNewPasswordField"
                  autoComplete="new-password"
                  component={TextField}
                  type={confirmNewPasswordShown ? 'text' : 'password'}
                  placeholder={t('form.field.confirm-new-password.placeholder')}
                  name="confirmNewPassword"
                  className="w-full"
                />
                <div className="relative flex w-full">
                  <button
                    type="button"
                    data-testid="toggleConfirmNewPassword"
                    onClick={() =>
                      setConfirmNewPasswordShown(!confirmNewPasswordShown)
                    }
                    className="absolute font-light text-sm right-2 -top-4 disabled:text-ui-grey-light"
                    disabled={disablePasswordBtn}
                  >
                    {t('create-account.password-show')}
                  </button>
                </div>
              </FormField>
            )}
            <Button
              type="submit"
              className="w-full mt-4"
              data-testid="UpdatePasswordFormButton"
            >
              {t('account.change-password.save-new-password')}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
