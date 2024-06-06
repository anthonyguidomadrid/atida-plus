import { createClient } from 'contentful'
import type { ContentfulClientApi } from 'contentful'
import getConfig from 'next/config'
import {
  createRequestLoggingInterceptor,
  createResponseLoggingInterceptor
} from '~helpers'
import { cache } from '~helpers/server-only/redisClient'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

const { serverRuntimeConfig } = getConfig()

export const createContentfulClient = (): ContentfulClientApi => {
  return createClient({
    host: serverRuntimeConfig.cmsHost, // TODO check if in preview mode and use cmsPreviewHost
    accessToken: serverRuntimeConfig.cmsToken, // TODO use cmsPreviewToken when in preview mode
    space: serverRuntimeConfig.cmsSpaceId,
    environment: serverRuntimeConfig.cmsEnvironmentId,
    // If we should remove links to entries which could not be resolved - this is the key to being able to draft entries
    removeUnresolved: true,
    // @ts-ignore - contentful don't have types for this, for some reason
    requestLogger: createRequestLoggingInterceptor({
      includeParams: true,
      mode: 'contentful'
    }),
    // @ts-ignore - contentful don't have types for this, for some reason
    responseLogger: createResponseLoggingInterceptor({
      includeParams: true,
      mode: 'contentful'
    }),
    adapter: cache?.adapter
  })
}
