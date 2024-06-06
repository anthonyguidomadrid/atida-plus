import type { FunctionComponent } from 'react'
import classNames from 'classnames'
import React from 'react'
import { Link } from '~components/atoms/Link'
import { ReactComponent as NavAdvice } from '~assets/svg/navigation-24px/NavAdvice.svg'
import { useTranslation, Trans } from 'react-i18next'
import { useSelector } from 'react-redux'
import { selectContentLoading } from '~domains/page'
import { LoadingSpinner } from '~components/atoms/LoadingSpinner'

export type AnyQuestionsProps = {
  isFullWidth?: boolean
}

export const AnyQuestions: FunctionComponent<AnyQuestionsProps> = ({
  isFullWidth = false
}) => {
  const { t } = useTranslation()
  const isLoading = useSelector(selectContentLoading)

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div
      data-testid="anyQuestions"
      className={classNames('container bg-ui-quick-help w-full sm:w-auto', {
        'sm:mx-5 md:mx-8 lg:mx-22 mb-9': !isFullWidth
      })}
    >
      <div className="text-center pt-4 pb-4 sm:pt-7 md:pb-5 lg:pb-6">
        <h2
          data-testid="questionsTitle"
          className="mb-2 leading-4 sm:text-6xl lg:text-8xl"
        >
          {t('confirmation.any-questions-title')}
        </h2>
        <p data-testid="questionsMsg">
          {t('confirmation.any-questions-subtitle')}
        </p>
        <div className="mt-3 mb-2 px-4">
          <div data-testid="anyQuestionsContactUsLink">
            <Trans
              i18nKey={'any-questions.contact-us-link'}
              components={{
                a: (
                  <Link
                    target="_blank"
                    icon={<NavAdvice className="icon-24" />}
                    className="button button--primary text-white"
                  />
                )
              }}
            ></Trans>
          </div>
        </div>
        <div data-testid="anyQuestionsFAQLink">
          <Trans
            i18nKey={'any-questions.faq-link'}
            components={{ a: <Link target="_blank" /> }}
          ></Trans>
        </div>
      </div>
    </div>
  )
}
