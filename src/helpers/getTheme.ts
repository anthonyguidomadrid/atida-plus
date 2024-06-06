import { themes } from '~config/constants/theme'

export const getTheme = (theme: string) => {
  switch (theme) {
    case 'sparMed':
      return themes['sparMed']
    default:
      return themes['default']
  }
}
