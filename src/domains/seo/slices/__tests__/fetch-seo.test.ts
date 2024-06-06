import { hydrate } from '~domains/redux'
import { Seo } from '~domains/contentful'
import { seoBlockSlice } from '../fetch-seo'

describe(seoBlockSlice.name, () => {
  const pageSEOTriggerPayload = { locale: 'en-GB', slug: 'brands' }

  describe(seoBlockSlice.actions.trigger.toString(), () => {
    it('does nothing', () => {
      expect(
        seoBlockSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          seoBlockSlice.actions.trigger(pageSEOTriggerPayload)
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(seoBlockSlice.actions.request.toString(), () => {
    it('sets isLoading to true and other states to false', () => {
      expect(
        seoBlockSlice.reducer(
          {
            isLoading: false,
            wasSuccess: true,
            wasError: true,
            errorCode: 404,
            error: 'An error happened'
          },
          seoBlockSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(seoBlockSlice.actions.success.toString(), () => {
    it('sets wasSuccess to true and adds data to the state', () => {
      expect(
        seoBlockSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          seoBlockSlice.actions.success({
            title: 'Something',
            description: 'Something'
          } as Partial<Seo>)
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false,
        data: {
          title: 'Something',
          description: 'Something'
        }
      })
    })
  })

  describe(seoBlockSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        seoBlockSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          seoBlockSlice.actions.failure({
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

  describe(seoBlockSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        seoBlockSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: true,
            error: 'An error happened'
          },
          seoBlockSlice.actions.fulfill()
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
        seoBlockSlice.reducer(
          {
            isLoading: false,
            wasError: false,
            wasSuccess: false
          },
          hydrate({
            seo: {
              content: {
                isLoading: true,
                wasSuccess: true,
                wasError: false,
                data: {
                  title: 'Something',
                  description: 'Something'
                } as Partial<Seo>
              }
            }
          })
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false,
        data: {
          title: 'Something',
          description: 'Something'
        }
      })
    })
  })
})
