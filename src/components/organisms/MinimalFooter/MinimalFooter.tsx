import type { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import classNames from 'classnames'
import { Menu } from '~domains/contentful'
import NextLink from 'next/link'
import { Link } from '~components/atoms/Link'
import { LocaleSwitchers } from '../Footer/components/LocaleSwitchers'
import { parseHtml } from '~helpers'
import { Selector } from '~domains/page'
import { useSelector } from 'react-redux'
import { selectIsPaymentStepActive } from '~domains/checkout'

export type MinimalFooterProps = ComponentPropsWithoutRef<'footer'> & {
  termsConditionsLinks?: Menu
  copyright?: string
  languages?: Selector[]
  withStepper: boolean
}

const FooterSection: FunctionComponent<
  ComponentPropsWithoutRef<'section'> & { isFirst?: boolean; isLast?: boolean }
> = ({ isFirst = false, isLast = false, className, ...props }) => (
  <section
    className={classNames(
      {
        'pb-3 sm:pb-3.25 border-b border-ui-oxford-blue-light': !isLast,
        'pt-2 sm:pt-3': !isFirst
      },
      className
    )}
    {...props}
  />
)

export const MinimalFooter: FunctionComponent<MinimalFooterProps> = ({
  languages,
  termsConditionsLinks,
  copyright,
  withStepper,
  className,
  ...props
}) => {
  const isPaymentStepActive = useSelector(selectIsPaymentStepActive)

  return (
    <footer
      data-testid="MinimalFooter"
      className={classNames(
        'container',
        'pt-1.5',
        'bg-primary-oxford-blue',
        'text-primary-white',
        'antialiased', // used for light text on dark background: https://betterwebtype.com/articles/2019/06/16/5-keys-to-accessible-web-typography/
        className
      )}
      {...props}
    >
      <FooterSection>
        <LocaleSwitchers languages={languages} />
      </FooterSection>
      <FooterSection isLast data-testid="minimalFooterTermsConditionsLinks">
        {termsConditionsLinks && (
          <div
            className={classNames('sm:flex sm:justify-between', {
              'sm-and-below:pb-14.5': withStepper && isPaymentStepActive
            })}
          >
            {(termsConditionsLinks.items?.length ?? 0) > 0 && (
              <ul className="flex mb-2 sm:mb-3">
                {termsConditionsLinks.items?.map(
                  ({ link: { url, label } = {} }) => (
                    <li key={label} className="pr-3">
                      <NextLink href={url ?? ''} passHref prefetch={false}>
                        <Link className="text-sm font-light text-primary-white hover:text-primary-white focus:text-primary-white no-underline">
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
                    'mb-2 text-sm text-primary-white hover:text-primary-white focus:text-primary-white no-underline'
                }
              })}
          </div>
        )}
      </FooterSection>
    </footer>
  )
}
