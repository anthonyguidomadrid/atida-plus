declare module 'redux-wait-for-action' {
  import type { Middleware } from '@reduxjs/toolkit'
  const middleware: () => Middleware
  export const WAIT_FOR_ACTION: symbol
  export const ERROR_ACTION: symbol
  export const CALLBACK_ARGUMENT: symbol
  export const CALLBACK_ERROR_ARGUMENT: symbol
  export default middleware
}
