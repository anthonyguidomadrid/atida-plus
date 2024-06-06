/**
 * An Intl.DateTimeFormatOptions extension which completes TypeScript's
 * own definition with JavaScript's full definition.
 * Data taken from
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 */
export type DateTimeFormat = Intl.DateTimeFormatOptions & {
  dateStyle?: 'full' | 'long' | 'medium' | 'short'
  timeStyle?: 'full' | 'long' | 'medium' | 'short'
  calendar?:
    | 'buddhist'
    | 'chinese'
    | 'coptic'
    | 'ethiopia'
    | 'ethiopic'
    | 'gregory'
    | ' hebrew'
    | 'indian'
    | 'islamic'
    | 'iso8601'
    | 'japanese'
    | 'persian'
    | 'roc'
  dayPeriod?: 'narrow' | 'long' | 'short'
  numberingSystem?:
    | 'arab'
    | 'arabext'
    | 'bali'
    | 'beng'
    | 'deva'
    | 'fullwide'
    | 'gujr'
    | 'guru'
    | 'hanidec'
    | 'khmr'
    | 'knda'
    | 'laoo'
    | 'latn'
    | 'limb'
    | 'mlym'
    | 'mong'
    | 'mymr'
    | 'orya'
    | 'tamldec'
    | 'telu'
    | 'thai'
    | 'tibt'
  hourCycle?: 'h11' | 'h12' | 'h23' | 'h24'
  fractionalSecondDigits?: 0 | 1 | 2 | 3
}
