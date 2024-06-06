import {
  ComponentPropsWithoutRef,
  FunctionComponent,
  useEffect,
  useState
} from 'react'
import { useTranslation } from 'react-i18next'
import { Formik, Form, Field } from 'formik'
import type { FormikErrors } from 'formik'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'

import { ReactComponent as Cross } from '~assets/svg/navigation-24px/Cross.svg'
import { Button } from '~components/atoms/Button'
import { TextField } from '~components/atoms/TextField'
import { FormField } from '~components/molecules/FormField'
import { Checkbox } from '~components/atoms/Checkbox'
import { triggerReportEmailSubscription } from '~domains/analytics'

export type NewsletterFormValues = {
  'newsletter-email'?: string
}

function validate(values: NewsletterFormValues) {
  const errors: FormikErrors<NewsletterFormValues> = {}
  // regex from: https://ui.dev/validate-email-address-javascript/
  if (
    !values['newsletter-email'] ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values['newsletter-email'])
  ) {
    errors['newsletter-email'] = 'shared.email-address.validation-error'
  }

  return errors
}

export const NewsletterForm: FunctionComponent<
  Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'>
> = props => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { route } = useRouter()
  const [isConsent, setConsent] = useState(false)
  const [subscribedEmail, setSubscribedEmail] = useState<string>('')

  useEffect(() => {
    setSubscribedEmail('')
  }, [route])

  const onSubscribe = (values: NewsletterFormValues) => {
    dispatch(
      triggerReportEmailSubscription({
        email: values['newsletter-email'],
        subscribed_from: 'page_footer',
        email_list: 'newsletter'
      })
    )
    setSubscribedEmail(values['newsletter-email'] ?? '')
  }

  return !subscribedEmail ? (
    <Formik<NewsletterFormValues>
      initialValues={{ 'newsletter-email': '' }}
      validate={validate}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={onSubscribe}
      data-testid="newsletterForm"
    >
      {({ errors, touched }) => (
        <Form {...props}>
          <FormField
            inputId="newsletter-email"
            label={t('shared.email-address')}
            data-testid="newsletterEmailFormField"
          >
            <Field
              component={TextField}
              type="email"
              name="newsletter-email"
              placeholder={t('newsletter.input-placeholder')}
              className="lg:max-w-66 text-base"
            />
          </FormField>
          <Checkbox
            aria-label={t('accessibility.consent-checkbox')}
            label={t('newsletter.consent')}
            id="consentCheckbox"
            isChecked={isConsent}
            onChange={() => setConsent(!isConsent)}
            className="mb-2"
            variant="secondary"
            data-testid="newsletterConsent"
          />
          <Button
            type="submit"
            disabled={!isConsent}
            // TODO ALERT INACCESSIBLE BUTTON COLORS: PLUS-102
            className={classNames(
              'w-full lg:max-w-28 border-none',
              'bg-primary-caribbean-green hover:bg-primary-caribbean-green focus:bg-primary-caribbean-green'
            )}
            data-testid="newsletterFormButton"
          >
            {t('newsletter.subscribe-action')}
          </Button>

          {errors['newsletter-email'] && touched['newsletter-email'] ? (
            <div
              role="alert"
              className="flex mt-2 py-1.5 px-2 bg-feedback-error-light text-feedback-error border border-feedback-error lg:max-w-66"
            >
              <Cross role="presentation" className="icon-24 mr-1" />
              {t(errors['newsletter-email'])}
            </div>
          ) : null}
        </Form>
      )}
    </Formik>
  ) : (
    <div className="flex flex-col pb-1.5 w-full sm:-mt-4">
      <h3 className="pb-1.5">{t('newsletter.title')}</h3>
      <p className="font-light font-body text-base pb-1.5">
        {t('newsletter.description1')}
      </p>
      <p className="text-primary-caribbean-green font-semibold font-body text-base pb-1.5">
        {subscribedEmail}
      </p>
      <p className="font-light font-body text-base pb-1.5 sm:pb-0">
        {t('newsletter.description2')}
      </p>
    </div>
  )
}
