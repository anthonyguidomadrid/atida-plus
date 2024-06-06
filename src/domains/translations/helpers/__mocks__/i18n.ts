export const i18nReady = async (): Promise<null> => null

export const i18nInstance = {
  changeLanguage: jest.fn(),
  hasResourceBundle: jest.fn(),
  reloadResources: jest.fn()
}

export const createI18nInstance = jest.fn().mockImplementation(() => ({
  ready: i18nReady,
  instance: i18nInstance
}))
