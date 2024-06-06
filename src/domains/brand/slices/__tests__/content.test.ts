import { contentSlice } from '../content'
import { clearStateErrors, hydrate } from '~domains/redux/actions'

const brands = {
  total: 1,
  items: [
    {
      title: 'Babaria',
      id: 'babaria-test-brand',
      url: 'brands/babaria',
      image: {
        description: '',
        title: 'Babaria Image',
        url:
          'https://images.ctfassets.net/7g2w796onies/38LA8ERIEBglSvG3XR2vCi/01fbdbc080c12381cf118fd8c90d1bf4/babaria-body-milk.jpeg',
        type: 'image/jpeg'
      }
    }
  ]
}

describe(contentSlice.name, () => {
  describe(contentSlice.actions.trigger.toString(), () => {
    it('does nothing on trigger', () => {
      expect(
        contentSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          contentSlice.actions.trigger()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(contentSlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        contentSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: false
          },
          contentSlice.actions.request()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(contentSlice.actions.success.toString(), () => {
    it('sets wasSuccess to true', async () => {
      expect(
        contentSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false,
            data: []
          },
          await contentSlice.actions.success(brands)
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: true,
        wasError: false,
        data: brands.items
      })
    })
  })

  describe(contentSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        contentSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          contentSlice.actions.failure({
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

  describe(contentSlice.actions.cancel.toString(), () => {
    it('does nothing on cancel', () => {
      expect(
        contentSlice.reducer(
          {
            isLoading: true,
            wasSuccess: false,
            wasError: false
          },
          contentSlice.actions.cancel()
        )
      ).toEqual({
        isLoading: true,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(contentSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        contentSlice.reducer(
          {
            isLoading: true,
            wasSuccess: true,
            wasError: false
          },
          contentSlice.actions.fulfill()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: true,
        wasError: false
      })
    })
  })

  describe(clearStateErrors.toString(), () => {
    it('clears all errors in the state', async () => {
      expect(
        contentSlice.reducer(
          {
            isLoading: false,
            wasSuccess: false,
            wasError: true,
            error: 'Some error'
          },
          clearStateErrors()
        )
      ).toEqual({
        isLoading: false,
        wasSuccess: false,
        wasError: false
      })
    })
  })

  describe(hydrate.toString(), () => {
    it('replaces state with hydrated state', () => {
      expect(
        contentSlice.reducer(
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
            brand: {
              content: {
                isLoading: false,
                wasError: false,
                wasSuccess: true,
                data: brands.items
              }
            }
          })
        )
      ).toEqual({
        isLoading: false,
        wasError: false,
        wasSuccess: true,
        data: brands.items
      })
    })
  })
})
