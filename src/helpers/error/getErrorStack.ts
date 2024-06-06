import { ErrorWithStack } from '~helpers/error'
import { hasOwnProperty } from '~helpers'

const isErrorWithStack = (error: unknown): error is ErrorWithStack =>
  typeof error === 'object' && error !== null && hasOwnProperty(error, 'stack')

const toErrorWithStack = (maybeError: unknown): ErrorWithStack =>
  isErrorWithStack(maybeError) ? maybeError : { stack: null }

export const getErrorStack = (error: unknown): string | null =>
  toErrorWithStack(error).stack
