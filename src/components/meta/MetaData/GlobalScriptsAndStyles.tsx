import { ReactNode } from 'react'
import Head from 'next/head'

import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { FeatureFlag } from '~config/constants/feature-flags'
import { getTheme } from '~helpers/getTheme'

import { ThirdPartyScripts } from './ThirdPartyScripts'

export const GlobalScriptsAndStyles = ({
  children,
  performanceCookiesAreAccepted
}: {
  children?: ReactNode
  performanceCookiesAreAccepted?: boolean
}) => {
  const themeConfigFeatureFlag = useFeatureFlag(
    FeatureFlag.THEME_CONFIG
  ) as string

  const themeConfig = getTheme(themeConfigFeatureFlag)

  return (
    <>
      <Head>
        <style
          id="font-css"
          dangerouslySetInnerHTML={{
            __html: `:root {
              --color-transparent: ${themeConfig.colors.transparent};
              --color-primary-caribbean-green: ${themeConfig.colors.primary['caribbean-green'].DEFAULT};
              --color-primary-caribbean-green--lightest: ${themeConfig.colors.primary['caribbean-green'].lightest};
              --color-primary-caribbean-green--light: ${themeConfig.colors.primary['caribbean-green'].light};
              --color-primary-caribbean-green--dark: ${themeConfig.colors.primary['caribbean-green'].dark};
              --color-primary-caribbean-green--darker: ${themeConfig.colors.primary['caribbean-green'].darker};
              --color-primary-caribbean-green--darkest: ${themeConfig.colors.primary['caribbean-green'].darkest};
              --color-primary-prime: ${themeConfig.colors.primary.prime};
              --color-primary-white: ${themeConfig.colors.primary.white.DEFAULT};
              --color-primary-white--10: ${themeConfig.colors.primary.white[10]};
              --color-primary-oxford-blue: ${themeConfig.colors.primary['oxford-blue'].DEFAULT};
              --color-primary-oxford-blue--100: ${themeConfig.colors.primary['oxford-blue'][100]};
              --color-primary-oxford-blue--60: ${themeConfig.colors.primary['oxford-blue'][60]};
              --color-primary-oxford-blue--20: ${themeConfig.colors.primary['oxford-blue'][20]};
              --color-primary-oxford-blue--10: ${themeConfig.colors.primary['oxford-blue'][10]};
              --color-primary-oxford-blue--5: ${themeConfig.colors.primary['oxford-blue'][5]};
              --color-secondary-green--100: ${themeConfig.colors.secondary.green[100]};
              --color-secondary-green--30: ${themeConfig.colors.secondary.green[30]};
              --color-secondary-orange--100: ${themeConfig.colors.secondary.orange[100]};
              --color-secondary-orange--60: ${themeConfig.colors.secondary.orange[60]};
              --color-secondary-red--100: ${themeConfig.colors.secondary.red[100]};
              --color-secondary-red--40: ${themeConfig.colors.secondary.red[40]};
              --color-secondary-portland-orange: ${themeConfig.colors.secondary['portland-orange']};
              --color-secondary-atomic-tangerine: ${themeConfig.colors.secondary['atomic-tangerine']};
              --color-secondary-champagne-pink: ${themeConfig.colors.secondary['champagne-pink']};
              --color-secondary-champagne-pink--dark: ${themeConfig.colors.secondary['champagne-pink-dark']};
              --color-secondary-dark-sky-blue: ${themeConfig.colors.secondary['dark-sky-blue']};
              --color-secondary-air-superiority-blue: ${themeConfig.colors.secondary['air-superiority-blue']};
              --color-secondary-darkest-pink: ${themeConfig.colors.secondary['darkest-pink']};
              --color-secondary-dark-pink: ${themeConfig.colors.secondary['dark-pink']};
              --color-secondary-light-pink: ${themeConfig.colors.secondary['light-pink']};
              --color-secondary-light-beige: ${themeConfig.colors.secondary['light-beige']};
              --color-category-personal-care: ${themeConfig.colors.category['personal-care'].DEFAULT};
              --color-category-personal-care--light: ${themeConfig.colors.category['personal-care'].light};
              --color-category-medicines: ${themeConfig.colors.category.medicines.DEFAULT};
              --color-category-medicines--light: ${themeConfig.colors.category.medicines.light};
              --color-category-private-label: ${themeConfig.colors.category['private-label'].DEFAULT};
              --color-category-private-label--light: ${themeConfig.colors.category['private-label'].light};
              --color-category-pets: ${themeConfig.colors.category.pets.DEFAULT};
              --color-category-pets--light: ${themeConfig.colors.category.pets.light};
              --color-category-homeopathy-and-natural-products: ${themeConfig.colors.category['homeopathy-and-natural-products'].DEFAULT};
              --color-category-homeopathy-and-natural-products--light: ${themeConfig.colors.category['homeopathy-and-natural-products'].light};
              --color-category-vitamins-and-supplements: ${themeConfig.colors.category['vitamins-and-supplements'].DEFAULT};
              --color-category-vitamins-and-supplements--light: ${themeConfig.colors.category['vitamins-and-supplements'].light};
              --color-category-beauty: ${themeConfig.colors.category.beauty.DEFAULT};
              --color-category-beauty--light: ${themeConfig.colors.category.beauty.light};
              --color-category-baby-and-kids: ${themeConfig.colors.category['baby-and-kids'].DEFAULT};
              --color-category-baby-and-kids--light: ${themeConfig.colors.category['baby-and-kids'].light};
              --color-category-medical-supply-and-orthopedics: ${themeConfig.colors.category['medical-supply-and-orthopedics'].DEFAULT};
              --color-category-medical-supply-and-orthopedics--light: ${themeConfig.colors.category['medical-supply-and-orthopedics'].light};
              --color-category-nutrition-exercise-and-weight-loss: ${themeConfig.colors.category['nutrition-exercise-and-weight-loss'].DEFAULT};
              --color-category-nutrition-exercise-and-weight-loss--light: ${themeConfig.colors.category['nutrition-exercise-and-weight-loss'].light};
              --color-feedback-warning: ${themeConfig.colors.feedback.warning.DEFAULT};
              --color-feedback-warning--light: ${themeConfig.colors.feedback.warning.light};
              --color-feedback-warning--dark: ${themeConfig.colors.feedback.warning.dark};
              --color-feedback-error: ${themeConfig.colors.feedback.error.DEFAULT};
              --color-feedback-error--light: ${themeConfig.colors.feedback.error.light};
              --color-feedback-success: ${themeConfig.colors.feedback.success.DEFAULT};
              --color-feedback-success--light: ${themeConfig.colors.feedback.success.light};
              --color-feedback-info: ${themeConfig.colors.feedback.info.DEFAULT};
              --color-feedback-info--light: ${themeConfig.colors.feedback.info.light};
              --color-overlay: ${themeConfig.colors.overlay.DEFAULT};
              --color-overlay--light: ${themeConfig.colors.overlay.light};
              --color-overlay--dark: ${themeConfig.colors.overlay.dark};
              --color-ui-carribean-green-light: ${themeConfig.colors.ui['carribean-green-light']};
              --color-ui-carribean-green-lightest: ${themeConfig.colors.ui['carribean-green-lightest']};
              --color-ui-carribean-green-dark: ${themeConfig.colors.ui['carribean-green-dark']};
              --color-ui-guyabano: ${themeConfig.colors.ui.guyabano};
              --color-ui-quick-help: ${themeConfig.colors.ui['quick-help']};
              --color-ui-oxford-blue-light: ${themeConfig.colors.ui['oxford-blue-light']};
              --color-ui-primary-selected: ${themeConfig.colors.ui['primary-selected']};
              --color-ui-secondary-selected: ${themeConfig.colors.ui['secondary-selected']};
              --color-ui-star-yellow: ${themeConfig.colors.ui['star-yellow']};
              --color-ui-campaing: ${themeConfig.colors.ui.campaign.base};
              --color-ui-grey: ${themeConfig.colors.ui.grey.DEFAULT};
              --color-ui-grey--lightest: ${themeConfig.colors.ui.grey.lightest};
              --color-ui-grey--light: ${themeConfig.colors.ui.grey.light};
              --color-ui-grey--medium: ${themeConfig.colors.ui.grey.medium};
              --color-ui-grey--default-alt: ${themeConfig.colors.ui.grey['default-alt']};
              --color-ui-grey--dark: ${themeConfig.colors.ui.grey.dark};
              --color-ui-grey--dark-alt: ${themeConfig.colors.ui.grey['dark-alt']};
              --color-ui-grey--neutral: ${themeConfig.colors.ui.grey.neutral};
              --color-ui-grey--dark-check-box: ${themeConfig.colors.ui.grey['dark-check-box']};
              --color-ui-black: ${themeConfig.colors.ui.black};
              --color-ui-black--5: ${themeConfig.colors.ui['black-5']};
              --color-ui-black--10: ${themeConfig.colors.ui['black-10']};
              --color-labels-tangerine: ${themeConfig.colors.labels.tangerine.base};
              --color-labels-tangerine--light: ${themeConfig.colors.labels.tangerine.light};
              --color-labels-coral-red: ${themeConfig.colors.labels['coral-red'].base};
              --color-labels-coral-red--light: ${themeConfig.colors.labels['coral-red'].light};
              --color-labels-campaign-green: ${themeConfig.colors.labels['campaign-green']};
              --font-heading: ${themeConfig.fontFamily.heading};
              --font-body: ${themeConfig.fontFamily.body};
              --font-yotpo: ${themeConfig.fontFamily.yotpo};
            }
            @font-face{font-family:Moranga;src:url('/fonts/moranga-regular.woff2') format('woff2'),url('/fonts/moranga-regular.woff') format('woff');font-weight:400;font-style:normal;font-display:swap}@font-face{font-family:Sohne;src:url('/fonts/sohne-buch.woff2') format('woff2'),url('/fonts/sohne-buch.woff') format('woff');font-weight:300;font-style:normal;font-display:swap}@font-face{font-family:Moranga;src:url('/fonts/moranga-light.woff2') format('woff2'),url('/fonts/moranga-light.woff') format('woff');font-weight:300;font-style:normal;font-display:swap}@font-face{font-family:Sohne;src:url('/fonts/sohne-kraftig.woff2') format('woff2'),url('/fonts/sohne-kraftig.woff') format('woff');font-weight:500;font-style:normal;font-display:swap}@font-face{font-family:Sohne;src:url('/fonts/sohne-halbfett.woff2') format('woff2'),url('/fonts/sohne-halbfett.woff') format('woff');font-weight:600;font-style:normal;font-display:swap}@font-face{font-family:Monofett;src:url('/fonts/monofett-regular.ttf') format('ttf'),url('/fonts/monofett-regular.ttf') format('ttf');font-weight:400;font-style:normal;font-display:swap}@font-face{font-family:Modak;src:url('/fonts/modak-regular.ttf') format('ttf'),url('/fonts/modak-regular.ttf') format('ttf');font-weight:400;font-style:normal;font-display:swap}
            `
          }}
        />
      </Head>
      <ThirdPartyScripts
        performanceCookiesAreAccepted={performanceCookiesAreAccepted}
      />
      {children}
    </>
  )
}
