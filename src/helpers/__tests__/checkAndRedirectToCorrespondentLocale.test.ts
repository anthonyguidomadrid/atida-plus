import { checkAndRedirectToCorrespondentLocale } from '~helpers/checkAndRedirectToCorrespondentLocale'
import {
  domainPerLocaleMock,
  requestMocks,
  responseMock
} from './checkBrowserSettingsAndRedirect.test'

describe(checkAndRedirectToCorrespondentLocale, () => {
  it('should not redirect if the current locale is valid', () => {
    expect(
      checkAndRedirectToCorrespondentLocale(
        requestMocks.withoutHeaders,
        responseMock,
        'es-es',
        domainPerLocaleMock
      )
    ).toBe(null)
    expect(
      checkAndRedirectToCorrespondentLocale(
        requestMocks.withoutHeaders,
        responseMock,
        'pt-pt',
        domainPerLocaleMock
      )
    ).toBe(null)
  })
  it('should redirect to the correspondent locale/domain if the current locale is not an enabled locale from that domain', () => {
    expect(
      checkAndRedirectToCorrespondentLocale(
        requestMocks.withoutHeaders,
        responseMock,
        'de-de',
        domainPerLocaleMock
      )
    ).toBe('https://www.prod.atida.de/')
  })
})
