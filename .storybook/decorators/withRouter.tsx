import { action } from '@storybook/addon-actions'
import React from 'react'
import Router from 'next/router'
import { RouterContext } from 'next/dist/shared/lib/router-context'

export const withRouter = (Story, context) => {
  const {
    globals: { locale }
  } = context

  // @ts-ignore
  Router.router = {
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
    locale,
    push(url, as, options) {
      action('nextRouter.push')(url, as, options)
      return Promise.resolve(true)
    },
    replace(url, as, options) {
      action('nextRouter.replace')(url, as, options)
      return Promise.resolve(true)
    },
    reload() {
      action('nextRouter.reload')()
    },
    back() {
      action('nextRouter.back')()
    },
    prefetch(url, asPath, options) {
      action('nextRouter.prefetch')(url, asPath, options)
      return Promise.resolve()
    },
    beforePopState(cb) {
      action('nextRouter.beforePopState')(cb)
    },
    events: {
      on(type, handler) {
        action('nextRouter.events.on')(type, handler)
      },
      off(type, handler) {
        action('nextRouter.events.off')(type, handler)
      },
      emit(type) {
        action('nextRouter.events.emit')(type)
      }
    },
    isFallback: false
  }

  /* https://github.com/storybookjs/storybook/issues/12255 */
  return (
    <RouterContext.Provider value={Router.router}>
      {Story()}
    </RouterContext.Provider>
  )
}
