import {
  ComponentPropsWithoutRef,
  FunctionComponent,
  useEffect,
  useState
} from 'react'
import { PreferencePanel } from '~components/atoms/PreferencePanel'
import { ReactComponent as Edit } from '~assets/svg/navigation-24px/Edit.svg'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'

export type BusinessDetailsProps = {
  companyName?: string | null
  taxReference?: string | null
  equivalenceSurcharge?: boolean | null
}

export const BusinessDetails: FunctionComponent<
  ComponentPropsWithoutRef<'div'> & BusinessDetailsProps
> = ({ companyName, taxReference, equivalenceSurcharge, ...props }) => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  const [
    equivalenceSurchargeVisible,
    setEquivalenceSurchargeVisible
  ] = useState(false)
  useEffect(() => {
    setEquivalenceSurchargeVisible(
      locale === 'es-es' && typeof equivalenceSurcharge !== 'undefined'
    )
  }, [locale, equivalenceSurcharge])

  return (
    <div data-testid="businessDetails" {...props}>
      <h2 className="text-lg font-body mb-2">
        {t('account.business-details')}
      </h2>
      <div className="border border-ui-grey-light mt-2 px-2 pt-2 sm:px-3 sm:pt-3">
        {companyName && (
          <div data-testid="businessDetailsCompanyName" className="mb-2">
            <span className="block font-semibold mb-0.5">
              {t('form.field.company-name.label')}
            </span>
            <p className="truncate sm:mr-3">{companyName}</p>
          </div>
        )}
        {taxReference && (
          <div data-testid="businessDetailsTaxReference" className="mb-2">
            <span className="block font-semibold mb-0.5">
              {t('form.field.tax-reference-business.label')}
            </span>
            <span>{taxReference}</span>
          </div>
        )}
        {equivalenceSurchargeVisible && (
          <div
            data-testid="businessDetailsEquivalenceSurcharge"
            className="mb-2"
          >
            <span className="block font-semibold mb-0.5">
              {t('shared.equivalence-surcharge')}
            </span>
            <span>
              {equivalenceSurcharge
                ? t('shared.applied')
                : t('shared.not-applied')}
            </span>
          </div>
        )}
        <PreferencePanel
          title={t('account.change-business-details.label')}
          href="/account/details/change-business-details"
          icon={<Edit className="icon-24" />}
          data-testid="preferencePanelUpdateBusinessDetails"
        />
      </div>
    </div>
  )
}
