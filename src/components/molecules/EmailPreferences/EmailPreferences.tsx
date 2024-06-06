import { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import { Checkbox } from '~components/atoms/Checkbox'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

export type EmailPreferencesProps = {
  pinnedProductsNotificationsIsChecked?: boolean
  onChangePinnedProductsNotifications?: () => void
  personalRecommendationsIsChecked?: boolean
  onChangePersonalRecommendations?: () => void
}

export const EmailPreferences: FunctionComponent<
  ComponentPropsWithoutRef<'div'> & EmailPreferencesProps
> = ({
  pinnedProductsNotificationsIsChecked,
  personalRecommendationsIsChecked,
  onChangePinnedProductsNotifications,
  onChangePersonalRecommendations,
  className
}) => {
  const { t } = useTranslation()

  return (
    <div
      data-testid="emailPreferences"
      className={classNames('w-full', className)}
    >
      <h2 className="text-lg font-body mb-3">
        {t('account.email-preferences')}
      </h2>
      <div className="border border-ui-grey-light p-2">
        <Checkbox
          label={t('account.order-status-updates')}
          id={t('account.order-status-updates')}
          isChecked
          disabled
          className="mb-2"
          data-testid="orderStatusUpdated"
          variant="primary"
        />
        <Checkbox
          label={t('account.personal-recommendations')}
          id={t('account.personal-recommendations')}
          isChecked={personalRecommendationsIsChecked}
          onChange={onChangePersonalRecommendations}
          className="mb-2"
          data-testid="personalRecommendations"
          variant="primary"
        />
        <Checkbox
          label={t('account.pinned-products-notifications')}
          id={t('account.pinned-products-notifications')}
          isChecked={pinnedProductsNotificationsIsChecked}
          onChange={onChangePinnedProductsNotifications}
          data-testid="pinnedProductsNotifications"
          variant="primary"
        />
      </div>
    </div>
  )
}
