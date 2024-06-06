import NextLink from 'next/link'
import {
  ComponentPropsWithoutRef,
  FunctionComponent,
  memo,
  useMemo
} from 'react'
import classNames from 'classnames'
import { breakpoints, useBreakpoint } from '~domains/breakpoints/'
import {
  mapIconReferenceToIconComponent,
  Menu,
  Link as ContentfulLink
} from '~domains/contentful'
import { FooterProviderBlock, Selector } from '~domains/page'
import { FeatureFlag } from '~config/constants/feature-flags'
import { useFeatureFlag } from '~components/helpers/FeatureFlags'
import { Link } from '~components/atoms/Link'
import { IconBadge } from '~components/atoms/IconBadge'
import { NewsletterForm } from '~components/organisms/NewsletterForm'
import { LocaleSwitchers } from './components/LocaleSwitchers'
import { AccordionPanel } from '~components/atoms/AccordionPanel'
import { ReactComponent as Checkmark } from '~assets/svg/navigation-24px/Checkmark.svg'
import { parseHtml, isExternalLink } from '~helpers'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { selectItems, selectTotals } from '~domains/basket'

export type FooterProps = ComponentPropsWithoutRef<'footer'> & {
  importantLinks?: Menu
  serviceContactLinks?: Menu
  providerBlocks?: FooterProviderBlock[]
  newsletterBlockTitle?: string
  newsletterSellingPoints?: string[]
  countries?: Selector[]
  languages?: Selector[]
  termsConditionsLinks?: Menu
  socialMediaLinks?: FooterProviderBlock[]
  copyright?: string
  hasAdditionalBottomPadding?: boolean
}

const FooterSection: FunctionComponent<
  ComponentPropsWithoutRef<'section'> & { isFirst?: boolean; isLast?: boolean }
> = ({ isFirst = false, isLast = false, className, ...props }) => (
  <section
    className={classNames(
      {
        'pb-3.625 sm:pb-4 lg:pb-5 border-b border-ui-oxford-blue-light': !isLast,
        'pt-3 sm:pt-4 lg:pt-5': !isFirst
      },
      className
    )}
    {...props}
  />
)

const FooterComponent: FunctionComponent<FooterProps> = ({
  importantLinks,
  serviceContactLinks,
  providerBlocks = [],
  newsletterBlockTitle,
  newsletterSellingPoints,
  countries,
  languages,
  termsConditionsLinks,
  socialMediaLinks,
  copyright,
  className,
  hasAdditionalBottomPadding,
  ...props
}) => {
  const { t } = useTranslation()
  const isLargeFormat = useBreakpoint(breakpoints.md)
  const isSmallFormat = useBreakpoint(breakpoints.sm)
  const isFooterCountrySelectorFeatureEnabled = useFeatureFlag(
    FeatureFlag.FOOTER_COUNTRY_SELECTOR
  )
  const isFooterTrustedShopsEnabled = useFeatureFlag(
    FeatureFlag.FOOTER_TRUSTED_SHOPS
  )

  const itemsInBasket = useSelector(selectItems)
  const totals = useSelector(selectTotals)

  const renderSocialMediaLinksAsIcons = (links?: ContentfulLink[]) =>
    links
      ?.filter(({ icon }) => icon)
      .map(({ label, icon, url }, idx) => {
        const Icon = mapIconReferenceToIconComponent(icon)
        return (
          <Link
            data-testid={`socialIconLink${label}`}
            key={idx}
            href={url ?? ''}
            target="_blank"
            aria-label={label}
            className={classNames('mb-2', {
              'mr-2': idx !== links.length - 1
            })}
            icon={<Icon className="icon-32" />}
          >
            <span className="sr-only">{label}</span>
          </Link>
        )
      })

  const serviceContactLinksContent = (
    <div
      data-testid="contactInformationContent"
      className={classNames(
        'grid grid-cols-1',
        'sm:grid-cols-3 sm:gap-3',
        'sm:grid-rows-max-content',
        'sm:mt-3 md:mt-0'
      )}
    >
      {serviceContactLinks?.items?.map(
        ({ link: { label, url, content, icon } = {} }, idx) => {
          const Icon = mapIconReferenceToIconComponent(icon)
          return (
            <div
              key={idx}
              className={classNames('mt-3 sm:mt-0', {
                'sm:row-span-2': content?.length
              })}
            >
              <NextLink href={url || ''} passHref prefetch={false}>
                <Link
                  className="text-primary-white hover:text-primary-white focus:text-primary-white no-underline"
                  icon={
                    <Icon
                      role="presentation"
                      className="relative icon-24 mr-1 -top-fixed-1px"
                    />
                  }
                  data-testid={`footerLink-${label}`}
                >
                  {label}
                </Link>
              </NextLink>

              <div
                className={classNames('text-sm', {
                  'ml-4': !!icon
                })}
              >
                {parseHtml(content)}
              </div>
            </div>
          )
        }
      )}
    </div>
  )

  const additionalPaddingClass = useMemo(() => {
    if (hasAdditionalBottomPadding && itemsInBasket.length) {
      if (!!totals?.shippingTotal) return 'xs-only:pb-20'
      if (totals.shippingTotal === 0) return 'xs-only:pb-23.5'
    }
    return ''
  }, [hasAdditionalBottomPadding, itemsInBasket.length, totals.shippingTotal])

  return (
    <footer
      className={classNames(
        'container bg-primary-oxford-blue pt-3 sm:pt-6 pb-5 md:pb-6 text-primary-white',
        'antialiased', // used for light text on dark background: https://betterwebtype.com/articles/2019/06/16/5-keys-to-accessible-web-typography/
        additionalPaddingClass,
        className
      )}
      data-testid="footer"
      id="footer"
      {...props}
    >
      <FooterSection isFirst data-testid="importantLinks">
        {(importantLinks?.items?.length ?? 0) > 0 && (
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {importantLinks?.items?.map(({ link: { url, label } = {} }) => (
              <li key={label}>
                {!isExternalLink(url ?? '') ? (
                  <NextLink href={url ?? ''} passHref prefetch={false}>
                    <Link
                      className="text-primary-white hover:text-primary-white focus:text-primary-white no-underline"
                      data-testid={`footerLink-${label}`}
                    >
                      {label}
                    </Link>
                  </NextLink>
                ) : (
                  <Link
                    href={url ?? ''}
                    className="text-primary-white hover:text-primary-white focus:text-primary-white no-underline"
                    data-testid={`footerLink-${label}`}
                  >
                    {label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}
      </FooterSection>

      <FooterSection data-testid="serviceContactLinks">
        {serviceContactLinks &&
          (serviceContactLinks?.items?.length ?? 0) > 0 &&
          (isLargeFormat ? (
            <>
              <span>{serviceContactLinks.title}</span>
              {serviceContactLinksContent}
            </>
          ) : (
            <AccordionPanel
              heading={
                <span className="mb-0">{serviceContactLinks.title}</span>
              }
              data-testid="serviceContactLinksPanel"
            >
              {serviceContactLinksContent}
            </AccordionPanel>
          ))}
      </FooterSection>

      <FooterSection
        className="grid grid-cols-1 sm:grid-cols-3 gap-3"
        data-testid="providerBlocks"
      >
        {providerBlocks.length > 0 &&
          providerBlocks.map(({ title, content, icons }, idx) => (
            <div key={idx}>
              <span className="text-sm mb-1">{title}</span>
              <span className="text-sm sm:flex sm:min-h-5 lg:min-h-0">
                {parseHtml(content)}
              </span>
              <div className="flex flex-wrap mt-2 sm:w-19 md:w-28.5">
                {icons?.map((icon, idx) => {
                  const Icon = mapIconReferenceToIconComponent(icon)
                  return (
                    <IconBadge
                      key={idx}
                      className="mr-1 mb-1"
                      icon={<Icon className="icon-68-48" />}
                    />
                  )
                })}
              </div>
            </div>
          ))}
        {isFooterTrustedShopsEnabled && (
          <div>
            <span className="text-sm mb-1">
              {t('footer.trusted-shop.title')}
            </span>
            <span className="text-sm sm:flex sm:min-h-5 lg:min-h-0">
              {t('footer.trusted-shop.description')}
            </span>
            <div id="trusted-shops" className="w-10 h-6 mt-2" />
            <div id="trusted-shops-rating" className="mt-1 text-sm" />
          </div>
        )}
      </FooterSection>

      <FooterSection data-testid="newsletterBlock">
        <div className="sm:grid sm:grid-cols-3 sm:gap-3 lg:gap-5">
          <span className="col-start-1 col-end-2 flex mb-3">
            {newsletterBlockTitle}
          </span>
          {socialMediaLinks &&
            isSmallFormat &&
            socialMediaLinks?.map(({ title }) => (
              <span className="col-start-3" key={title}>
                {title}
              </span>
            ))}
        </div>
        <div className="sm:grid sm:grid-cols-3 lg:grid-cols-3 gap-3 lg:gap-5">
          <NewsletterForm className="mb-3 sm:mb-0 sm:col-start-2 sm:col-end-3 lg:relative lg:-top-2" />

          <ul className="sm:col-start-1 sm:row-start-1">
            {newsletterSellingPoints &&
              newsletterSellingPoints.map((text, idx) => (
                <li
                  key={text}
                  className={classNames('flex', {
                    'mb-3': idx !== newsletterSellingPoints.length - 1
                  })}
                >
                  <Checkmark
                    role="presentation"
                    className="text-primary-caribbean-green icon-24 mr-1.5"
                  />
                  {text}
                </li>
              ))}
          </ul>
          {isSmallFormat && socialMediaLinks && (
            <div data-testid="socialIcons" className="sm:col-start-3">
              {socialMediaLinks &&
                socialMediaLinks.map(({ links }, idx) => (
                  <div key={idx} className="flex flex-wrap mt-0.5">
                    {renderSocialMediaLinksAsIcons(links)}
                  </div>
                ))}
            </div>
          )}
        </div>
      </FooterSection>

      {!isSmallFormat && socialMediaLinks && (
        <FooterSection data-testid="socialIconsSection" className="xs:pb-1">
          {socialMediaLinks &&
            socialMediaLinks.map(({ title, links }, idx) => (
              <div key={idx}>
                <span className="text-lg mb-1">{title}</span>
                <div className="flex flex-wrap mt-3.5">
                  {renderSocialMediaLinksAsIcons(links)}
                </div>
              </div>
            ))}
        </FooterSection>
      )}

      <FooterSection>
        <LocaleSwitchers
          countries={
            isFooterCountrySelectorFeatureEnabled ? countries : undefined
          }
          languages={languages}
        />
      </FooterSection>

      <FooterSection isLast data-testid="termsConditionsLinks">
        {termsConditionsLinks && (
          <div className="sm:flex sm:justify-between">
            {(termsConditionsLinks.items?.length ?? 0) > 0 && (
              <ul className="flex mb-2 sm:mb-0">
                {termsConditionsLinks.items?.map(
                  ({ link: { url, label } = {} }) => (
                    <li key={label} className="items-start pr-3">
                      <NextLink href={url ?? ''} passHref prefetch={false}>
                        <Link
                          className="text-sm font-light text-primary-white hover:text-primary-white focus:text-primary-white no-underline"
                          data-testid={`footerLink-${label}`}
                        >
                          {label}
                        </Link>
                      </NextLink>
                    </li>
                  )
                )}
              </ul>
            )}

            {copyright &&
              parseHtml(copyright, {
                a: {
                  className:
                    'text-sm text-primary-white hover:text-primary-white focus:text-primary-white no-underline'
                }
              })}
          </div>
        )}
      </FooterSection>
    </footer>
  )
}

export const Footer = memo(FooterComponent)
