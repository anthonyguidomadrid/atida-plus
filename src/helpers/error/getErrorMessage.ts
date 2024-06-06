import { hasOwnProperty } from '~helpers/hasOwnProperty'
import { ApiError, ErrorWithMessage } from '~helpers/error'
import { AxiosResponse } from 'axios'

const isErrorWithMessage = (error: unknown): error is ErrorWithMessage =>
  typeof error === 'object' &&
  error !== null &&
  hasOwnProperty(error, 'message')

const isSagaErrorWithMessage = (
  error: unknown
): error is ApiError<AxiosResponse<ErrorWithMessage>> =>
  typeof error === 'object' &&
  error !== null &&
  hasOwnProperty(error, 'response') &&
  typeof error.response === 'object' &&
  error.response !== null &&
  hasOwnProperty(error.response, 'data') &&
  typeof error.response.data === 'object' &&
  error.response.data !== null &&
  hasOwnProperty(error.response.data, 'message')

const toErrorWithMessage = (maybeError: unknown): ErrorWithMessage => {
  if (isSagaErrorWithMessage(maybeError))
    return { message: maybeError?.response?.data?.message }

  if (isErrorWithMessage(maybeError)) return maybeError

  return new Error(String(maybeError))
}

export const getErrorMessage = (error: unknown): string =>
  toErrorWithMessage(error).message
