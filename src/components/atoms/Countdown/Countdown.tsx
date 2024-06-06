import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import { TimeLeft, useCountdown } from '~helpers'
import {
  CountdownProps,
  TimeMeasurementEnum,
  CountdownThemeEnum
} from '~components/atoms/Countdown'

/**
 * Renders a countdown component
 * @param finishingDate This sets the ending time of the countdown. It should be a string with the format ISO 8601. This prop is mandatory
 * @param isMinified [Optional] This indicates whether the countdown will be minified or not (boolean). False is set by default
 * @param theme [Optional] This indicates the countdown theme. The minified version has a different dark/light variation then the normal one. 'Dark' is set by default
 * @param showDaysWhenZero [Optional] This indicates if the 'days' value will be rendered if it's zero (boolean). True is set by default
 * @param className [Optional] This sets additional class names to the first div of the Countdown component
 */
export const Countdown = ({
  finishingDate,
  isMinified = false,
  theme = CountdownThemeEnum.dark,
  showDaysWhenZero = true,
  className
}: CountdownProps) => {
  const { t } = useTranslation()
  const timeLeft = useCountdown(finishingDate)

  // Don't render the component if the endDate is before the current date (Date.now()),
  // or at initialization, when the hook returns an empty object
  if (
    Object.keys(timeLeft).some(key => timeLeft[key as keyof TimeLeft] < 0) ||
    Object.keys(timeLeft).length <= 0
  )
    return null

  return (
    <div
      className={classNames(
        'flex',
        {
          'w-min justify-center items-center': !isMinified,
          'h-3 px-1 pt-0.5 flex items-center justify-start rounded-sm': isMinified,
          'bg-secondary-light-pink':
            isMinified && theme === CountdownThemeEnum.dark,
          'text-secondary-darkest-pink':
            isMinified && theme === CountdownThemeEnum.dark,
          'bg-primary-white-10':
            isMinified && theme === CountdownThemeEnum.light,
          'text-primary-white': isMinified && theme === CountdownThemeEnum.light
        },
        className
      )}
      data-testid="countDownComponent"
    >
      {Object.keys(timeLeft).map(key => {
        const type =
          TimeMeasurementEnum[key as keyof typeof TimeMeasurementEnum]
        const value = timeLeft[key as keyof TimeLeft]

        // For the minified version we have to show the time values with a 0 in front, when they otherwise would be single digit
        const doubleDigitValue =
          (isMinified && String(Math.abs(value)).length === 1 && `0${value}`) ||
          value

        return key === TimeMeasurementEnum.days &&
          timeLeft.days === 0 &&
          !showDaysWhenZero ? null : (
          <div
            className={classNames('flex justify-center items-center', {
              'flex-col': !isMinified,
              'mr-1': type !== TimeMeasurementEnum.seconds && !isMinified
            })}
            key={key}
          >
            <div
              className={classNames('flex justify-center items-center', {
                'w-7.25 h-6.5 font-heading text-3xl': !isMinified,
                'bg-overlay-light text-primary-white':
                  theme === CountdownThemeEnum.dark && !isMinified,
                'bg-overlay text-primary-oxford-blue':
                  theme === CountdownThemeEnum.light && !isMinified,
                'text-sm-base': isMinified
              })}
            >
              <span
                className={classNames({
                  'text-right font-bold': isMinified
                })}
              >
                {doubleDigitValue}
              </span>

              {/* When the countdown timer is "minified", we show the time measurements as abbreviations */}
              {isMinified && (
                <span className="ml-0.5 text-center opacity-75">
                  {type.charAt(0).toLocaleUpperCase()}
                </span>
              )}

              {/* COLON for minified version */}
              {isMinified && type !== TimeMeasurementEnum.seconds && (
                <span className="mx-0.75 text-center pb-0.25">:</span>
              )}
            </div>

            {/* When the countdown timer is on the CampaignHeroBanner,
                we show time measurements underneath their values as full words */}
            {!isMinified && (
              <p
                className={classNames('pt-0.5 text-xxs', {
                  'text-ui-grey': theme === CountdownThemeEnum.dark,
                  'text-ui-grey-dark': theme === CountdownThemeEnum.light
                })}
              >
                {value === 1
                  ? t(`countdown.${type}`).toLocaleUpperCase()
                  : t(`countdown.${type}_plural`).toLocaleUpperCase()}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
