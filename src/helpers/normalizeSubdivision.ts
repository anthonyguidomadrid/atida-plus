import { normalizeNonPrintableCharacters } from './normalizeString'

export const normalizeSubdivision = (
  label: string | undefined,
  locale: string | undefined
): string => {
  if (!label) return ''
  switch (locale) {
    case 'es-es':
      if (label === 'La Coruña') {
        return 'A Coruña'
      }
      if (label === 'Santa Cruz de Tenerife') {
        return 'Santa Cruz De Tenerife'
      }
      if (label === 'Islas Baleares') {
        return 'Baleares'
      }
      if (label === 'Gerona') {
        return 'Girona'
      }
      return normalizeNonPrintableCharacters(label)
    case 'pt-pt':
      if (label === 'Viana do Castelo') return 'Viana Do Castelo'
      return label
    default:
      return label
  }
}
