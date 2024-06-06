import { AlternateLinksProps } from '~components/meta/AlternateLinks'
import { PageContent } from '~domains/page'

const trimLeadingAndTrailingSlash = (slug: string) =>
  slug.replace(/^\/|\/$/g, '')

export const transformContentSlugsToHreflang = (
  currentLocale: string,
  slugs: PageContent['allSlugs'] = {}
): AlternateLinksProps['links'] => {
  return Object.entries(slugs).map(([locale, slug]) => ({
    hrefLang: locale,
    href: `/${locale}${
      !slug || slug === '/' || slug === ''
        ? ''
        : `/${trimLeadingAndTrailingSlash(slug)}`
    }`
  }))
}
