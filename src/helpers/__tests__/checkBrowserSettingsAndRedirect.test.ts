import { IncomingMessage, ServerResponse } from 'http'
import { fallbackDomainPerLocale } from '~domains/translated-routes/config/constants'
import { checkBrowserSettingsAndRedirect } from '~helpers/checkBrowserSettingsAndRedirect'

export const domainPerLocaleMock = {
  ...fallbackDomainPerLocale,
  'de-de': 'https://www.prod.atida.de/'
}

export const requestMocks: { [key: string]: IncomingMessage } = {
  withoutHeaders: {
    headers: {}
  } as IncomingMessage,
  withInvalidAcceptLanguageHeaders: {
    headers: {
      'accept-language': 'it-IT'
    }
  } as IncomingMessage,
  withValidAcceptLanguageHeaders: {
    headers: {
      'accept-language': 'pt-PT'
    }
  } as IncomingMessage,
  withInvalidExternalAcceptLanguageHeaders: {
    headers: {
      'accept-language': 'it-IT'
    }
  } as IncomingMessage,
  withValidExternalAcceptLanguageHeaders: {
    headers: {
      'accept-language': 'fr-FR'
    }
  } as IncomingMessage,
  withInvalidCloudfrontViewerCountryHeaders: ({
    headers: {
      'cloudfront-viewer-country': 'es'
    }
  } as unknown) as IncomingMessage,
  withValidCloudfrontViewerCountryHeaders: ({
    headers: {
      'cloudfront-viewer-country': 'fr'
    }
  } as unknown) as IncomingMessage
}

export const responseMock: ServerResponse = ({
  something: 'valid',
  writeHead: () => jest.fn(),
  end: () => jest.fn()
} as unknown) as ServerResponse

describe(checkBrowserSettingsAndRedirect, () => {
  it('should redirect to fallback locale/domain if no accept-language header is provided', () => {
    expect(
      checkBrowserSettingsAndRedirect(
        requestMocks.withoutHeaders,
        responseMock,
        domainPerLocaleMock
      )
    ).toBe('https://www.atida.com/es-es')
  })
  it('should redirect to fallback locale/domain if accept-language header was provided but it did not match with a valid one', () => {
    expect(
      checkBrowserSettingsAndRedirect(
        requestMocks.withInvalidAcceptLanguageHeaders,
        responseMock,
        domainPerLocaleMock
      )
    ).toBe('https://www.atida.com/es-es')
  })
  it('should redirect to accept-language locale if header is provided and matched with a valid one', () => {
    expect(
      checkBrowserSettingsAndRedirect(
        requestMocks.withValidAcceptLanguageHeaders,
        responseMock,
        domainPerLocaleMock
      )
    ).toBe('https://www.atida.com/pt-pt')
    expect(
      checkBrowserSettingsAndRedirect(
        {
          headers: {
            'accept-language': 'de-DE,en-GB'
          }
        } as IncomingMessage,
        responseMock,
        domainPerLocaleMock
      )
    ).toBe('https://www.prod.atida.de/')
  })
  it('should redirect to the Cloudfront Viewer Country locale/domain if headers were provided and the feature flag is turned on', () => {
    expect(
      checkBrowserSettingsAndRedirect(
        requestMocks.withValidCloudfrontViewerCountryHeaders,
        responseMock,
        domainPerLocaleMock,
        {
          shouldRedirectToExternalLocaleFromCloudfrontViewerCountry: true
        }
      )
    ).toBe('https://www.atida.com/es-es')
  })
  it('should redirect to fallback if Cloudfront Viewer Country headers were not provided, it is invalid, or the feature flag is turned off', () => {
    expect(
      checkBrowserSettingsAndRedirect(
        requestMocks.withoutHeaders,
        responseMock,
        domainPerLocaleMock,
        {
          shouldRedirectToExternalLocaleFromCloudfrontViewerCountry: true
        }
      )
    ).toBe('https://www.atida.com/es-es')
    expect(
      checkBrowserSettingsAndRedirect(
        requestMocks.withInvalidCloudfrontViewerCountryHeaders,
        responseMock,
        domainPerLocaleMock,
        {
          shouldRedirectToExternalLocaleFromCloudfrontViewerCountry: true
        }
      )
    ).toBe('https://www.atida.com/es-es')
    expect(
      checkBrowserSettingsAndRedirect(
        requestMocks.withValidCloudfrontViewerCountryHeaders,
        responseMock,
        domainPerLocaleMock,
        {
          shouldRedirectToExternalLocaleFromCloudfrontViewerCountry: false
        }
      )
    ).toBe('https://www.atida.com/es-es')
  })
  it('should redirect to external locale (foreign country) if the accept-language header is provided, it matches, and the feature flag is turned on', () => {
    expect(
      checkBrowserSettingsAndRedirect(
        requestMocks.withValidExternalAcceptLanguageHeaders,
        responseMock,
        domainPerLocaleMock,
        {
          shouldRedirectToForeignCountry: true,
          shouldRedirectToExternalLocaleFromBrowserSettings: true
        }
      )
    ).toBe('https://www.atida.fr/')
  })
  it('should redirect to fallback if the accept-language header for external locale (foreign country) is provided, but it doesn not match, or the feature flag is turned off', () => {
    expect(
      checkBrowserSettingsAndRedirect(
        requestMocks.withInvalidExternalAcceptLanguageHeaders,
        responseMock,
        domainPerLocaleMock,
        {
          shouldRedirectToForeignCountry: true,
          shouldRedirectToExternalLocaleFromBrowserSettings: true
        }
      )
    ).toBe('https://www.atida.com/es-es')
    expect(
      checkBrowserSettingsAndRedirect(
        requestMocks.withValidExternalAcceptLanguageHeaders,
        responseMock,
        domainPerLocaleMock,
        {
          shouldRedirectToForeignCountry: false,
          shouldRedirectToExternalLocaleFromBrowserSettings: false
        }
      )
    ).toBe('https://www.atida.com/es-es')
    expect(
      checkBrowserSettingsAndRedirect(
        requestMocks.withValidExternalAcceptLanguageHeaders,
        responseMock,
        domainPerLocaleMock,
        {
          shouldRedirectToForeignCountry: true,
          shouldRedirectToExternalLocaleFromBrowserSettings: false
        }
      )
    ).toBe('https://www.atida.com/es-es')
    expect(
      checkBrowserSettingsAndRedirect(
        requestMocks.withValidExternalAcceptLanguageHeaders,
        responseMock,
        domainPerLocaleMock,
        {
          shouldRedirectToForeignCountry: false,
          shouldRedirectToExternalLocaleFromBrowserSettings: true
        }
      )
    ).toBe('https://www.atida.com/es-es')
  })
})
