import { FeatureFlagValue } from '~components/helpers/FeatureFlags/hooks'
import { TAX_REFERENCE_REGEX } from '~config/constants/tax-reference-regex'

export const taxReferenceRegexByLocale = (
  locale: string,
  isPersonal: boolean,
  isAdditionalCIFFormatValidationEnabled?: FeatureFlagValue
): RegExp => {
  switch (locale) {
    case 'pt-pt':
      return TAX_REFERENCE_REGEX.PT_VAT
    case 'es-es':
      return isPersonal
        ? TAX_REFERENCE_REGEX.ES_DNI_NIE
        : isAdditionalCIFFormatValidationEnabled
        ? TAX_REFERENCE_REGEX.ES_NIF_CIF_NIE_EXTENDED
        : TAX_REFERENCE_REGEX.ES_NIF_CIF_NIE
    default:
      return TAX_REFERENCE_REGEX.REJECT_ALL
  }
}
