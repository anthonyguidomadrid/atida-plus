import { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import { PreferencePanel } from '~components/atoms/PreferencePanel'
import { ReactComponent as NavUser } from '~assets/svg/navigation-24px/NavUser.svg'
import { ReactComponent as Lock } from '~assets/svg/navigation-24px/Lock.svg'
import { useTranslation } from 'react-i18next'
import { ACCOUNT_TYPE_BUSINESS } from '~config/constants/account-types'
import { AccountType } from '~domains/account'

export type PersonalDetailsProps = AccountType & {
  email?: string
  name?: string
  phone?: string
  salutation?: string
  taxReference?: string
  dateOfBirth?: string | null
}

export const PersonalDetails: FunctionComponent<
  ComponentPropsWithoutRef<'div'> & PersonalDetailsProps
> = ({
  email,
  name,
  phone,
  taxReference,
  accountType,
  dateOfBirth,
  ...props
}) => {
  const { t } = useTranslation()

  return (
    <div data-testid="personalDetails" {...props}>
      <h2 className="text-lg font-body mb-2">
        {t('account.personal-details')}
      </h2>
      <div className="border border-ui-grey-light mt-2 px-2 pt-2 sm:px-3 sm:pt-3">
        <div className="sm:grid sm:grid-cols-2">
          <div
            data-testid="personalDetailsName"
            className="mb-2 sm:col-start-1"
          >
            <span className="block font-semibold mb-0.5">
              {t('shared.customer.name')}
            </span>
            <p className="truncate sm:mr-3">{name}</p>
          </div>

          {dateOfBirth && (
            <div className="mb-2 sm:col-start-1">
              <span className="block font-semibold mb-0.5">
                {t('form.field.birth-date.label.no-asterisk')}
              </span>
              <span data-testid="personalDetailsdateOfBirth">
                {dateOfBirth}
              </span>
            </div>
          )}

          <div className="mb-2 sm:col-start-1">
            <span className="block font-semibold mb-0.5">
              {t('form.field.phone-number.label.no-asterisk')}
            </span>
            <span data-testid="personalDetailsPhone">
              {!phone ? t('account.form.field.not-provided') : phone}
            </span>
          </div>

          {taxReference && accountType !== ACCOUNT_TYPE_BUSINESS && (
            <div
              data-testid="personalDetailsTaxReference"
              className="mb-2 sm:col-start-1"
            >
              <span className="block font-semibold mb-0.5">
                {t('form.field.tax-reference.label')}
              </span>
              <span>{taxReference}</span>
            </div>
          )}
          <div
            data-testid="personalDetailsEmail"
            className="mb-2 sm:col-start-2 sm:row-start-1"
          >
            <span className="block font-semibold mb-0.5">
              {t('shared.email-address')}
            </span>
            <span>{email}</span>
          </div>
          <div
            data-testid="personalDetailsPassword"
            className="mb-2 sm:row-start-2 sm:col-start-2"
          >
            <span className="block font-semibold mb-0.5">
              {t('form.field.password.label')}
            </span>
            <input
              data-testid="passwordField"
              type="password"
              defaultValue="passwordExample"
              disabled
              className="disabled:bg-primary-white"
            />
          </div>
        </div>
        <PreferencePanel
          title={t('account.change-personal-details.label')}
          href="/account/details/change-personal-details"
          icon={<NavUser className="icon-24" />}
          data-testid="preferencePanelPersonalDetails"
        />
        <PreferencePanel
          title={t('password.reset-password-cta')}
          href="/account/details/change-password"
          icon={<Lock className="icon-24" />}
          data-testid="preferencePanelResetPassword"
        />
      </div>
    </div>
  )
}
