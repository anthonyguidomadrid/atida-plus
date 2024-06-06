import { useSelector } from 'react-redux'
import { selectFooter } from '~domains/page/selectors/common'
import { getCountryFromLocale } from '~helpers'
import { getAllEnabledLocales } from '~domains/translated-routes'
import { Footer } from '~components/organisms/Footer/Footer'
import { useRouter } from 'next/router'

export const PageLayoutFooter = () => {
  const { asPath } = useRouter()
  const footer = useSelector(selectFooter)

  return (
    <Footer
      className="mt-auto"
      importantLinks={footer?.importantLinks}
      serviceContactLinks={footer?.serviceContactLinks}
      providerBlocks={footer?.providerBlocks}
      newsletterBlockTitle={footer?.newsletterBlockTitle}
      newsletterSellingPoints={footer?.newsletterSellingPoints}
      termsConditionsLinks={footer?.termsConditionsLinks}
      socialMediaLinks={footer?.socialMediaLinks}
      copyright={footer?.copyright}
      countries={getAllEnabledLocales().map(locale => ({
        value: locale,
        label: getCountryFromLocale(locale)
      }))}
      hasAdditionalBottomPadding={asPath === '/basket'}
    />
  )
}
