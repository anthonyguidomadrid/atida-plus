import { useRouter } from 'next/router'
import {
  FunctionComponent,
  useState,
  useEffect,
  useCallback,
  ChangeEvent
} from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { Select } from '~components/atoms/Select'
import { Button } from '~components/atoms/Button'
import {
  getLocaleFromBrowserPreferencesCookie,
  getCountrySelectorCookie,
  setSelectedCountryCookie
} from '~helpers/selectedCountryCookie'
import { getAllEnabledLocales } from '~domains/translated-routes'

export const CountrySelectorHeader: FunctionComponent = () => {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const [requestedLocale, setRequestedLocale] = useState<string>(locale ?? '')
  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false)
  const [buttonWasClicked, setButtonWasClicked] = useState<boolean>(false)
  const [
    isFeedbackMessageShowing,
    setIsFeedbackMessageShowing
  ] = useState<boolean>(false)
  const [
    isCountrySelectorShowing,
    setIsCountrySelectorShowing
  ] = useState<boolean>(false)

  const showFeedbackMessage = useCallback(() => {
    setIsFeedbackMessageShowing(true)

    const feedbackMessageTimer = setTimeout(() => {
      setIsFeedbackMessageShowing(false)
      setIsCountrySelectorShowing(false)
      setSelectedCountryCookie(requestedLocale ?? locale)
    }, 2000) // 2sec

    return () => {
      clearTimeout(feedbackMessageTimer)
    }
  }, [locale, requestedLocale])

  const handleCountrySelection = useCallback(() => {
    setButtonWasClicked(true)

    if (requestedLocale === locale) {
      setSelectedCountryCookie(requestedLocale ?? locale)
      setButtonWasClicked(false)
      showFeedbackMessage()
    } else {
      setSelectedCountryCookie(requestedLocale ?? locale, true)
      setIsLoadingButton(true)
      window.location.href = `${document.location.protocol}//${document.location.host}/${requestedLocale}/`
    }
  }, [locale, requestedLocale, showFeedbackMessage])

  const handleCountrySelectorChange = useCallback(
    (
      countrySelectorCookie: string | undefined,
      localeFromBrowserPreferences: string | undefined
    ) => {
      setIsCountrySelectorShowing(
        countrySelectorCookie
          ? countrySelectorCookie === locale
            ? false
            : true
          : !localeFromBrowserPreferences
      )

      if (!countrySelectorCookie && localeFromBrowserPreferences)
        setSelectedCountryCookie(localeFromBrowserPreferences)
    },
    [locale]
  )

  const handleLocaleChange = (event: ChangeEvent<HTMLSelectElement>) =>
    setRequestedLocale(event.target.value)

  useEffect(() => {
    /*
     * This sets the current locale in the cookie if the user doesn't
     * click the button within the first 15 seconds of being on the site
     */
    const timer = setTimeout(() => {
      if (isCountrySelectorShowing && !buttonWasClicked)
        handleCountrySelection()
    }, 15000)

    const countrySelectorCookie = getCountrySelectorCookie()
    const localeFromBrowserPreferences = getLocaleFromBrowserPreferencesCookie()

    handleCountrySelectorChange(
      countrySelectorCookie.selectedCountry,
      localeFromBrowserPreferences
    )

    return () => {
      clearTimeout(timer)
    }
  }, [
    buttonWasClicked,
    handleCountrySelectorChange,
    handleCountrySelection,
    isCountrySelectorShowing
  ])

  // @ts-ignore
  return isCountrySelectorShowing ? (
    <div
      className="flex flex-col sm:flex-row justify-center items-center bg-secondary-champagne-pink text-primary-oxford-blue p-2 xs-only:min-h-15.25 min-h-10.25"
      data-testid="countrySelectorHeader"
    >
      <div
        className={classNames({
          'xs-only:pb-2 sm:mr-2': !isFeedbackMessageShowing,
          'font-heading text-xl text-center': isFeedbackMessageShowing
        })}
      >
        <p>
          {isFeedbackMessageShowing
            ? t('country-selector-header.feedback-message')
            : t('country-selector-header.title')}
        </p>
      </div>
      {!isFeedbackMessageShowing && (
        <div className="flex">
          <Select
            data-testid="countrySelector"
            name="countrySelector"
            isCountrySelector={true}
            onChange={handleLocaleChange}
          >
            {getAllEnabledLocales()
              .sort((a: string, b: string) =>
                a === locale ? -1 : b === locale ? 1 : 0
              )
              .map(i => (
                <option
                  className="text-base w-27 sm:w-28 px-2.5 py-1.5"
                  key={i}
                  value={i}
                  data-testid="countrySelectorOptions"
                >
                  {t(`country-selector-header.${i}`)}
                </option>
              ))}
          </Select>
          <Button
            type="button"
            data-testid="countrySelectorButton"
            isLoading={isLoadingButton}
            onClick={handleCountrySelection}
          >
            {t('country-selector-header.button')}
          </Button>
        </div>
      )}
    </div>
  ) : null
}
