import getConfig from 'next/config'

import { createClient, transformLocaleToUppercase } from '~helpers'
import { cache } from '~helpers/server-only/redisClient'
import { GetMenu, GetMenuQuery } from '~generated-graphql'
import { Menu, normalizeMenu } from '~domains/contentful'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

export const fetchMenuItemCollection = async (
  locale: string,
  menuTitle: string
): Promise<Menu | undefined> => {
  const { serverRuntimeConfig } = getConfig()

  const client = createClient({
    options: {
      baseURL: `${serverRuntimeConfig.cmsGraphQLHost}/spaces/${serverRuntimeConfig.cmsSpaceId}/environments/${serverRuntimeConfig.cmsEnvironmentId}`,
      headers: {
        Authorization: `Bearer ${serverRuntimeConfig.cmsToken}`
      },
      adapter: cache?.adapter
    },
    locale,
    interceptorOptions: {
      mode: 'contentful-graphql'
    }
  })

  const menuResponse = await client.post<{
    data: GetMenuQuery
  }>('', {
    query: GetMenu.loc?.source.body,
    variables: {
      locale: transformLocaleToUppercase(locale),
      menuTitle
    }
  })

  return normalizeMenu(menuResponse?.data?.data?.menuCollection ?? undefined)
}
