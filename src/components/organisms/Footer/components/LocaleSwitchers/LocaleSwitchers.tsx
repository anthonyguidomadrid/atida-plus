import { useRouter } from 'next/router'
import type { FunctionComponent, ComponentPropsWithoutRef } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { Selector } from '~domains/page'
import { ReactComponent as LogoInverted } from '~assets/svg/atidaMifarmaLogoInverted.svg'
import { ReactComponent as ChevronDown } from '~assets/svg/navigation-16px/ChevronDown.svg'
import { setSelectedCountryCookie } from '~helpers/selectedCountryCookie'

export type LocaleSwitchersProps = ComponentPropsWithoutRef<'div'> & {
  countries?: Selector[]
  languages?: Selector[]
}

export const LocaleSwitchers: FunctionComponent<LocaleSwitchersProps> = ({
  countries,
  languages
}) => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  const handleCountrySelector = (requestedLocale: string): void => {
    if (requestedLocale !== locale) {
      setSelectedCountryCookie(requestedLocale, true)
      window.location.href = `${document.location.protocol}//${document.location.host}/${requestedLocale}/`
    }
  }

  return (
    <div
      className="grid grid-rows-2 sm:grid-rows-none sm:grid-cols-2"
      data-testid="localeSwitchersBlock"
    >
      {/* Atida Logo Inverted*/}
      <div className="text-left pb-3 border-b border-ui-oxford-blue-light sm:pb-0 sm:border-none">
        <LogoInverted className="icon-logo-mifarma" />
      </div>

      {/* Countries and languages */}
      <div className="self-center flex justify-start text-left text-base pt-3 sm:text-right sm:pt-0 sm:justify-end">
        {countries && (
          <div className="flex justify-end items-center">
            {/* eslint-disable-next-line jsx-a11y/no-onchange */}
            <select
              name="country"
              className="bg-primary-oxford-blue font-light pr-4 appearance-none"
              onChange={e => handleCountrySelector(e.target.value)}
            >
              {countries
                .sort((a, b) =>
                  a.value === locale ? -1 : b.value === locale ? 1 : 0
                )
                .map(({ value }) => (
                  <option
                    className="bg-primary-white text-ui-black"
                    key={value}
                    value={value}
                    defaultValue={countries[0].value}
                  >
                    {t(`country-selector-header.${value}`)}
                  </option>
                ))}
            </select>
            <ChevronDown className="w-2 h-2 absolute pointer-events-none" />
          </div>
        )}
        {languages && (
          <div
            className={classNames('flex justify-end items-center', {
              'ml-2': countries
            })}
          >
            <select
              name="language"
              className="bg-primary-oxford-blue font-light mr-0.5 appearance-none"
            >
              {languages.map(({ value, label }) => (
                <option
                  key={value}
                  value={value}
                  defaultValue={languages[0].value}
                >
                  {label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-2" />
          </div>
        )}
      </div>
    </div>
  )
}
