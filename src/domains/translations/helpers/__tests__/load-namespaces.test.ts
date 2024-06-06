// @ts-ignore
import { i18nInstance } from '../i18n'
import { loadNamespaces } from '../load-namespaces'

describe(loadNamespaces, () => {
  it('loads all of the namespaces', async () => {
    await loadNamespaces(i18nInstance, 'cimode', ['some', 'namespaces'])
    expect(i18nInstance.reloadResources).toHaveBeenCalledTimes(2)
    expect(i18nInstance.reloadResources).toHaveBeenNthCalledWith(
      1,
      'cimode',
      'some'
    )
    expect(i18nInstance.reloadResources).toHaveBeenNthCalledWith(
      2,
      'cimode',
      'namespaces'
    )
  })

  it('does not load any namespaces that have already been loaded', async () => {
    ;(i18nInstance.hasResourceBundle as jest.Mock).mockImplementationOnce(
      () => true
    )
    await loadNamespaces(i18nInstance, 'cimode', ['some', 'namespaces'])
    expect(i18nInstance.reloadResources).toHaveBeenCalledTimes(1)
    expect(i18nInstance.reloadResources).toHaveBeenNthCalledWith(
      1,
      'cimode',
      'namespaces'
    )
  })
})
