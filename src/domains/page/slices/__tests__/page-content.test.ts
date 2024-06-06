import { PageContent } from '~domains/page/types'
import { hydrate } from '~domains/redux'
import { pageContentSlice } from '../page-content'

describe(pageContentSlice.name, () => {
  describe(pageContentSlice.actions.trigger.toString(), () => {
    it('does nothing', () => {
      expect(
        pageContentSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          pageContentSlice.actions.trigger({ slug: '' })
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(pageContentSlice.actions.request.toString(), () => {
    it('sets isLoading to true and other states to false', () => {
      expect(
        pageContentSlice.reducer(
          {
            isLoading: false,
            wasSuccess: true,
            wasError: true,
            errorCode: 404,
            error: 'An error happened'
          },
          pageContentSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(pageContentSlice.actions.success.toString(), () => {
    it('sets wasSuccess to true and adds data to the state', () => {
      expect(
        pageContentSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          pageContentSlice.actions.success({
            title: 'Something'
          } as PageContent)
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false,
        content: { title: 'Something' }
      })
    })
  })

  describe(pageContentSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        pageContentSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          pageContentSlice.actions.failure({
            message: 'An error happened',
            code: 500
          })
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: true,
        error: 'An error happened',
        errorCode: 500
      })
    })
  })

  describe(pageContentSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        pageContentSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: true,
            error: 'An error happened'
          },
          pageContentSlice.actions.fulfill()
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
        pageContentSlice.reducer(
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
              'page-content': {
                isLoading: true,
                wasSuccess: true,
                wasError: false,
                content: { title: 'Something' } as PageContent
              }
            }
          })
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false,
        content: { title: 'Something' }
      })
    })
  })
})
