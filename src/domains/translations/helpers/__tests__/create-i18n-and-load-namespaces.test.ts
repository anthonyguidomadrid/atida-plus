// @ts-ignore
import { i18nInstance, i18nReady } from '../i18n'
import { createI18nAndLoadNamespaces } from '../create-i18n-and-load-namespaces'
import { loadNamespaces } from '../load-namespaces'
import { createReduxStore } from '~domains/redux'

jest.mock('../load-namespaces')

describe(createI18nAndLoadNamespaces, () => {
  it('waits for i18n to be initialised before changing language', () => {
    const instance = createI18nAndLoadNamespaces(
      'cimode',
      [],
      createReduxStore('cimode')
    )
    expect(i18nInstance.changeLanguage).not.toHaveBeenCalled()
    expect(instance instanceof Promise).toBe(true)
  })

  it('changes language once i18n is initialised', async () => {
    createI18nAndLoadNamespaces('cimode', [], createReduxStore('cimode'))
    expect(i18nInstance.changeLanguage).not.toHaveBeenCalled()
    await i18nReady
    expect(i18nInstance.changeLanguage).toHaveBeenCalledWith('cimode')
  })

  it('loads any additional namespaces that have been passed in', async () => {
    await createI18nAndLoadNamespaces(
      'cimode',
      ['other-namespace'],
      createReduxStore('cimode')
    )
    expect(loadNamespaces).toHaveBeenCalledWith(expect.any(Object), 'cimode', [
      'other-namespace'
    ])
  })

  it('returns the i18n instance at the end', async () => {
    const instance = await createI18nAndLoadNamespaces(
      'cimode',
      [],
      createReduxStore('cimode')
    )
    expect(instance.changeLanguage).not.toBeUndefined()
  })
})
