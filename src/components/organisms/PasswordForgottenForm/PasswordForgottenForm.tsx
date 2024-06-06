import { ComponentPropsWithoutRef, FunctionComponent, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import type { FormikHelpers } from 'formik'
import { Button } from '~components/atoms/Button'
import { FormField } from '~components/molecules/FormField'
import { TextField } from '~components/atoms/TextField'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import { ReactComponent as ChevronLeft } from '~assets/svg/navigation-16px/ChevronLeft.svg'
import NextLink from 'next/link'
import { Link } from '../../atoms/Link'
import { selectLoginEmail } from '~domains/account/selectors/login'
import { verifyResetPasswordTokenSelectors } from '~domains/account'
import { useRouter } from 'next/router'

export type PasswordForgottenFormValues = {
  email: string
}

export type PasswordForgottenFormProps = {
  notification?: JSX.Element
  onSubmit?: (
    values: PasswordForgottenFormValues,
    helpers: FormikHelpers<PasswordForgottenFormValues>
  ) => void
}

export const PasswordForgottenForm: FunctionComponent<
  Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'> &
    PasswordForgottenFormProps
  // eslint-disable-next-line @typescript-eslint/no-empty-function
> = ({ notification, onSubmit = () => {}, ...props }) => {
  const { t } = useTranslation()
  const { query, replace } = useRouter()
  const { email } = query
  const loginEmail = useSelector(selectLoginEmail)
  const initialValues = {
    email:
      loginEmail ??
      (typeof email === 'string' ? email : (email && email[0]) ?? '')
  }
  const resetTokenVerificationIsLoading = useSelector(
    verifyResetPasswordTokenSelectors.selectIsLoading
  )
  const passwordForgottenValidationSchema = Yup.object({
    email: Yup.string()
      .lowercase()
      .email(t('password-forgotten.invalid-email-format'))
      .required(t('password-forgotten.email.required'))
  })

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
    <>
      <div
        data-testid="PasswordForgottenForm"
        className="w-full xs:w-42 sm:w-54 md:w-54"
      >
        <p className="w-full mb-2">
          <NextLink href="/login" passHref prefetch={false}>
            <Link className="font-normal text-center text-sm cursor-pointer no-underline ml-0.5">
              <ChevronLeft className="icon-16 inline-block" />
              {t('shared.back')}
            </Link>
          </NextLink>
        </p>
        <h1 className="mb-1">{t('password-forgotten.title')}</h1>

        <p>{t('password-forgotten.subtitle')}</p>

        {notification}

        <Formik<PasswordForgottenFormValues>
          initialValues={initialValues}
          validateOnBlur={true}
          onSubmit={onSubmit}
          data-testid="passwordForgottenForm"
          validationSchema={passwordForgottenValidationSchema}
        >
          {({ errors, touched }) => (
            <>
              <Form className="mt-3" {...props}>
                <FormField
                  inputId="email"
                  label={t('form.field.email.label')}
                  data-testid="passwordForgottenFormEmail"
                  error={touched['email'] && errors['email']}
                >
                  <Field
                    component={TextField}
                    type="email"
                    name="email"
                    placeholder={t(
                      'password-forgotten.form.field.email.placeholder'
                    )}
                  />
                </FormField>

                <Button
                  type="submit"
                  variant="secondary"
                  className="w-full mt-2"
                  isLoading={resetTokenVerificationIsLoading}
                  data-testid="passwordForgottenFormButton"
                >
                  {t('password-forgotten.cta-button-text')}
                </Button>
              </Form>

              <div className="text-center w-full">
                <NextLink href="/login" prefetch={false}>
                  <Link
                    className="font-light cursor-pointer mt-2"
                    data-testid="passwordForgottenCancel"
                  >
                    {t('shared.cancel')}
                  </Link>
                </NextLink>
              </div>
            </>
          )}
        </Formik>
      </div>
    </>
  )
}
