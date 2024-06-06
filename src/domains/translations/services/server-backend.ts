import type { BackendModule, Services } from 'i18next'
import { I18nNamespace } from '~config/constants/i18n-namespaces'
import { createReduxStore } from '~domains/redux'
import {
  namespacesFailure,
  namespacesFulfill,
  namespacesRequest,
  namespacesSuccess,
  namespacesTrigger
} from '../slices'
import { fetchTranslations } from './fetch-translations'

if (typeof window !== 'undefined')
  throw new Error('This file should not be called client-side')

type BackendOptions = {
  reduxStore: ReturnType<typeof createReduxStore>
}

export const backend: BackendModule<BackendOptions> & {
  store?: BackendOptions['reduxStore']
  logger?: Services['logger']
} = {
  type: 'backend',
  store: undefined,
  logger: undefined,

  init: function (services, backendOptions, _i18nextOptions) {
    if (!backendOptions?.reduxStore) {
      throw new Error(
        'i18next server backend requires the reduxStore configuration option'
      )
    }

    this.store = backendOptions.reduxStore
    this.logger = services.logger
  },

  read: function (language, namespace: I18nNamespace, callback) {
    this.store?.dispatch(namespacesTrigger({ language, namespace }))
    this.store?.dispatch(namespacesRequest({ language, namespace }))

    fetchTranslations(language, namespace)
      .then(translations => {
        this.store?.dispatch(namespacesSuccess({ language, namespace }))
        callback(null, translations)
      })
      // TODO: should probably be axios error once actual fetching is added
      .catch((error: Error) => {
        this.store?.dispatch(
          namespacesFailure({ language, namespace, message: error.message })
        )
        callback(error, {})
      })
      .finally(() => {
        this.store?.dispatch(namespacesFulfill({ language, namespace }))
      })
  },

  create: function (_languages, _namespace, _key, _fallbackValue) {
    // This capability is unused, but required to satisfy the BackendModule interface
    this.logger.warn('Create is unimplemented')
  }
}
