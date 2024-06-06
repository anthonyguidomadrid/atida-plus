import type { FunctionComponent } from 'react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

export type RestrictedZipCodeProps = {
  notificationType?: string
}

export const RestrictedZipCode: FunctionComponent<RestrictedZipCodeProps> = ({
  notificationType
}) => {
  const { t } = useTranslation()

  return (
    <div
      data-testid="restrictedZipCode"
      className={classNames('mt-3 mb-1 p-2', {
        'bg-feedback-warning-light': notificationType === 'warning',
        'bg-feedback-error-light': notificationType === 'error'
      })}
    >
      <p
        className={classNames('pb-1 text-lg leading-6 font-semibold', {
          'text-feedback-error': notificationType === 'error'
        })}
      >
        {t('create-account.zip-code.restricted-heading')}
      </p>
      <p>{t('create-account.zip-code.restricted-summary')}</p>
    </div>
  )
}
