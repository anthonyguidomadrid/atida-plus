import { PageRedirect } from '~domains/page/types'
import { pageRedirectSlice } from '../page-redirect'
import { hydrate } from '~domains/redux'

describe(pageRedirectSlice.name, () => {
  describe(pageRedirectSlice.actions.trigger.toString(), () => {
    it('does nothing', () => {
      expect(
        pageRedirectSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          pageRedirectSlice.actions.trigger()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(pageRedirectSlice.actions.request.toString(), () => {
    it('sets isLoading to true and other states to false', () => {
      expect(
        pageRedirectSlice.reducer(
          {
            isLoading: false,
            wasSuccess: true,
            wasError: true,
            error: 'An error happened'
          },
          pageRedirectSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(pageRedirectSlice.actions.success.toString(), () => {
    it('sets wasSuccess to true and adds data to the state', () => {
      expect(
        pageRedirectSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          pageRedirectSlice.actions.success(({
            pageRedirect: { slug: '/vitaminos', redirectTo: '/beleza/rosto' }
          } as unknown) as PageRedirect)
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false,
        pageRedirect: {
          pageRedirect: { slug: '/vitaminos', redirectTo: '/beleza/rosto' }
        }
      })
    })
  })

  describe(pageRedirectSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        pageRedirectSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          pageRedirectSlice.actions.failure({ message: 'An error happened' })
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: true,
        error: 'An error happened'
      })
    })
  })

  describe(pageRedirectSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to flase', () => {
      expect(
        pageRedirectSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: true,
            error: 'An error happened'
          },
          pageRedirectSlice.actions.fulfill()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: true,
        error: 'An error happened'
      })
    })
  })

  describe(hydrate.toString(), () => {
    it('replaces state with hydrated state', () => {
      expect(
        pageRedirectSlice.reducer(
          {
            isLoading: false,
            wasError: false,
            wasSuccess: false
          },
          hydrate({
            translations: {
              namespaces: {
                de: {
                  something: {
                    isLoading: false,
                    wasError: true,
                    wasSuccess: true,
                    error: 'Something'
                  }
                }
              }
            },
            page: {
              'page-redirect': {
                isLoading: true,
                wasSuccess: true,
                wasError: false,
                pageRedirect: {
                  slug: '/vitaminos',
                  redirectTo: '/beleza/rosto'
                }
              }
            }
          })
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false,
        pageRedirect: { slug: '/vitaminos', redirectTo: '/beleza/rosto' }
      })
    })
  })
})
