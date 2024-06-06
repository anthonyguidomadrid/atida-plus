import { AxiosError } from 'axios'

import { ErrorWithStatus, isApiError } from '~helpers/error'
import { hasOwnProperty } from '~helpers'

const isAxiosError = (error: unknown): error is AxiosError =>
  typeof error === 'object' && error !== null && hasOwnProperty(error, 'code')

const toErrorWithStatus = (maybeError: unknown): ErrorWithStatus =>
  isApiError(maybeError)
    ? { status: maybeError?.response?.status }
    : isAxiosError(maybeError)
    ? { status: Number(maybeError.code) }
    : { status: 500 }

export const getErrorStatus = (error: unknown): number =>
  toErrorWithStatus(error).status
