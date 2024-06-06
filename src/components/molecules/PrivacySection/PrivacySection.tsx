import { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import { PreferencePanel } from '~components/atoms/PreferencePanel'
import { ReactComponent as NavDelete } from '~assets/svg/navigation-24px/NavDelete.svg'
import { ReactComponent as ExternalLink } from '~assets/svg/navigation-24px/ExternalLink.svg'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

export const PrivacySection: FunctionComponent<
  ComponentPropsWithoutRef<'div'>
> = ({ className }) => {
  const { t } = useTranslation()
  return (
    <div
      data-testid="privacySection"
      className={
        (classNames('w-full border-b border-ui-grey-light'), className)
      }
    >
      <h2 className="text-lg font-body mb-3">{t('account.privacy.label')}</h2>
      <PreferencePanel
        data-testid="preferencePanelPersonalData"
        title={t('account.personal-data-request')}
        href="/account/details/personal-data-request"
        icon={<ExternalLink className="icon-24" />}
        isBold
      />
      <PreferencePanel
        data-testid="preferencePanelDeleteAccount"
        title={t('account.delete-account')}
        href="/account/details/delete-account"
        icon={<NavDelete className="icon-24" />}
        isBold
      />
    </div>
  )
}
