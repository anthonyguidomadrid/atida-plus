import { ErrorWithName } from '~helpers/error'
import { hasOwnProperty } from '~helpers'

const isErrorWithName = (error: unknown): error is ErrorWithName =>
  typeof error === 'object' && error !== null && hasOwnProperty(error, 'name')

const toErrorWithName = (maybeError: unknown): ErrorWithName =>
  isErrorWithName(maybeError) ? maybeError : { name: null }

export const getErrorName = (error: unknown): string | null =>
  toErrorWithName(error).name
