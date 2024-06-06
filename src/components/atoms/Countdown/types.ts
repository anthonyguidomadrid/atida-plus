export enum CountdownThemeEnum {
  dark = 'dark',
  light = 'light'
}

export type CountdownProps = {
  finishingDate: string
  isMinified?: boolean
  theme?: CountdownThemeEnum
  showDaysWhenZero?: boolean
  className?: string
}

export enum TimeMeasurementEnum {
  days = 'days',
  hours = 'hours',
  minutes = 'minutes',
  seconds = 'seconds'
}
