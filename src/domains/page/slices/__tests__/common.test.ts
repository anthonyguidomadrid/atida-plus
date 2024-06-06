import { Common } from '~domains/page/types'
import { hydrate } from '~domains/redux'
import { commonSlice } from '../common'

describe(commonSlice.name, () => {
  describe(commonSlice.actions.trigger.toString(), () => {
    it('does nothing', () => {
      expect(
        commonSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          commonSlice.actions.trigger()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(commonSlice.actions.request.toString(), () => {
    it('sets isLoading to true and other states to false', () => {
      expect(
        commonSlice.reducer(
          {
            isLoading: false,
            wasSuccess: true,
            wasError: true,
            error: 'An error happened'
          },
          commonSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(commonSlice.actions.success.toString(), () => {
    it('sets wasSuccess to true and adds data to the state', () => {
      expect(
        commonSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          commonSlice.actions.success(({
            footer: {
              importantLinks: { title: 'Some title', items: [] }
            },
            organization: {}
          } as unknown) as Common)
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false,
        footer: { importantLinks: { title: 'Some title', items: [] } },
        organization: {}
      })
    })
  })

  describe(commonSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        commonSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          commonSlice.actions.failure({
            message: 'An error happened'
          })
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: true,
        error: 'An error happened'
      })
    })
  })

  describe(commonSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        commonSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: true,
            error: 'An error happened'
          },
          commonSlice.actions.fulfill()
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
        commonSlice.reducer(
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
              common: {
                isLoading: true,
                wasSuccess: true,
                wasError: false,
                footer: {
                  importantLinks: { title: 'Some title', items: [] },
                  serviceContactLinks: { title: '', items: [] },
                  providerBlocks: [],
                  newsletterBlockTitle: '',
                  newsletterSellingPoints: [],
                  termsConditionsLinks: { title: '', items: [] },
                  copyright: '',
                  socialMediaLinks: []
                }
              }
            }
          })
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false,
        footer: {
          importantLinks: { title: 'Some title', items: [] },
          serviceContactLinks: { title: '', items: [] },
          providerBlocks: [],
          newsletterBlockTitle: '',
          newsletterSellingPoints: [],
          termsConditionsLinks: { title: '', items: [] },
          copyright: '',
          socialMediaLinks: []
        }
      })
    })
  })
})
