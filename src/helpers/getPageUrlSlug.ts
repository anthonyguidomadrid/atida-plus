import { GetServerSidePropsContext } from 'next'

export const getPageUrlSlug = (context: GetServerSidePropsContext): string => {
  if (context?.resolvedUrl) {
    const queryRedirectStr: string = context?.query?.redirect
      ? (<string[]>context.query.redirect).join('/')
      : ''

    const url: string = queryRedirectStr
      ? context.resolvedUrl.replace(queryRedirectStr, '')
      : context.resolvedUrl

    return url
      .replace(/^(\/?)([\w\/-]*?)(\w*--\d*)?(\?.*)*$/g, '$2')
      .replace(/\/?$/, '')
      .replace(/^\/?/, '')
  }

  return ''
}
