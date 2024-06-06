import type { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import NextLink from 'next/link'
import { ReactComponent as Logo } from '~assets/svg/atidaMifarmaLogo.svg'
import { ReactComponent as Lock } from '~assets/svg/navigation-24px/Lock.svg'

export type MinimalNavigableHeaderProps = ComponentPropsWithoutRef<'header'> & {
  // TODO: shouldn't need to set this to boolean, fix consuming component
  button?: JSX.Element | boolean
  reducedVerticalMargin?: boolean
}

export const MinimalNavigableHeader: FunctionComponent<MinimalNavigableHeaderProps> = ({
  button,
  reducedVerticalMargin = false
}) => {
  const { t } = useTranslation()

  return (
    <header
      className={classNames(
        'container flex-auto flex flex-row justify-between max-h-7 gap-0 mb-4 border-b border-ui-grey-light',
        'sm:mb-5',
        'lg:grid lg: grid-cols-3',
        { 'md:max-h-10 md:h-10 md:mb-8': !reducedVerticalMargin },
        { 'mb-3 md:mb-5': reducedVerticalMargin }
      )}
      data-testid="MinimalNavigableHeader"
    >
      {/* Button */}
      {button && (
        <div
          className={classNames(
            'py-2 flex flex-row items-center max-h-7',
            'md:max-h-10 md:justify-self-end',
            'lg:justify-self-start'
          )}
        >
          {button}
        </div>
      )}
      {/* Atida Logo */}
      <div
        className={classNames(
          `py-2 self-center`,
          'justify-center max-h-7 flex',
          'md:justify-start',
          'lg:justify-center'
        )}
      >
        <NextLink href="/" prefetch={false}>
          <a>
            <Logo className="icon-logo-mifarma" />
          </a>
        </NextLink>
      </div>
      {/* Secure connection */}
      <div
        className={classNames(
          'py-2 flex flex-row items-center max-h-7',
          'md:max-h-10 md:justify-self-end'
        )}
        data-testid="secureConnection"
      >
        <span className="hidden text-xs mr-2 lg:block">
          {t('shared.secure-connection')}
        </span>
        <Lock className="icon-24" />
      </div>
    </header>
  )
}
