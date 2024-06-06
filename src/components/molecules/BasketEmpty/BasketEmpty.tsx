import type { ComponentPropsWithoutRef, FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import NextLink from 'next/link'
import { ReactComponent as LargeBasket } from '~assets/svg/LargeBasket.svg'

export const BasketEmpty: FunctionComponent<
  ComponentPropsWithoutRef<'div'>
> = ({ className, ...props }) => {
  const { t } = useTranslation()

  return (
    <div
      className={classNames(
        'container container-fixed mx-auto',
        'flex flex-col items-center',
        className
      )}
      data-testid="basketEmpty"
      {...props}
    >
      <LargeBasket className="max-w-14 max-h-11 stroke-current stroke-4 text-primary-caribbean-green" />
      <h2 className={classNames('mt-4 mb-2', 'md:text-5xl')}>
        {t('basket.is-empty-title')}
      </h2>
      <p className="mb-4">{t('basket.is-empty-text')}</p>
      <NextLink href="/" prefetch={false}>
        <a
          className={classNames(
            'button button--primary',
            'w-full',
            'sm:max-w-42',
            'lg:max-w-38'
          )}
        >
          {t('shared.continue-shopping')}
        </a>
      </NextLink>
    </div>
  )
}
