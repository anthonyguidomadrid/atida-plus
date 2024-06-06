import { hydrate } from '~domains/redux'
import { namespacesSlice } from '../namespaces'

describe(namespacesSlice.name, () => {
  describe(namespacesSlice.actions.trigger.toString(), () => {
    it("sets up initial state for language/namespace pair when it's not there already", () => {
      expect(
        namespacesSlice.reducer(
          {},
          namespacesSlice.actions.trigger({ language: 'en', namespace: 'test' })
        )
      ).toEqual({
        en: {
          test: {
            isLoading: false,
            wasError: false,
            wasSuccess: false
          }
        }
      })
    })

    it('leaves state for language/namespace pair alone when it already exists', () => {
      expect(
        namespacesSlice.reducer(
          {
            en: {
              test: {
                isLoading: true,
                wasError: true,
                wasSuccess: false,
                error: 'Something'
              }
            }
          },
          namespacesSlice.actions.trigger({ language: 'en', namespace: 'test' })
        )
      ).toEqual({
        en: {
          test: {
            isLoading: false,
            wasError: false,
            wasSuccess: false
          }
        }
      })
    })
  })

  describe(namespacesSlice.actions.request.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        namespacesSlice.reducer(
          {
            en: {
              test: {
                isLoading: false,
                wasError: true,
                wasSuccess: false,
                error: 'Something'
              }
            }
          },
          namespacesSlice.actions.request({ language: 'en', namespace: 'test' })
        )
      ).toEqual({
        en: {
          test: {
            isLoading: true,
            wasError: true,
            wasSuccess: false,
            error: 'Something'
          }
        }
      })
    })

    it('does not error when called with incomplete state', () => {
      expect(
        namespacesSlice.reducer(
          {},
          namespacesSlice.actions.request({ language: 'en', namespace: 'test' })
        )
      ).toEqual({
        en: {
          test: {
            isLoading: true,
            wasError: false,
            wasSuccess: false
          }
        }
      })
    })
  })

  describe(namespacesSlice.actions.success.toString(), () => {
    it('sets wasSuccess to true', () => {
      expect(
        namespacesSlice.reducer(
          {
            en: {
              test: {
                isLoading: false,
                wasError: true,
                wasSuccess: false,
                error: 'Something'
              }
            }
          },
          namespacesSlice.actions.success({ language: 'en', namespace: 'test' })
        )
      ).toEqual({
        en: {
          test: {
            isLoading: false,
            wasError: true,
            wasSuccess: true,
            error: 'Something'
          }
        }
      })
    })

    it('does not error when called with incomplete state', () => {
      expect(
        namespacesSlice.reducer(
          {},
          namespacesSlice.actions.success({ language: 'en', namespace: 'test' })
        )
      ).toEqual({
        en: {
          test: {
            isLoading: false,
            wasError: false,
            wasSuccess: true
          }
        }
      })
    })
  })

  describe(namespacesSlice.actions.failure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        namespacesSlice.reducer(
          {
            en: {
              test: {
                isLoading: false,
                wasError: false,
                wasSuccess: false,
                error: 'Something'
              }
            }
          },
          namespacesSlice.actions.failure({
            language: 'en',
            namespace: 'test',
            message: 'An error happened'
          })
        )
      ).toEqual({
        en: {
          test: {
            isLoading: false,
            wasError: true,
            wasSuccess: false,
            error: 'An error happened'
          }
        }
      })
    })

    it('does not error when called with incomplete state', () => {
      expect(
        namespacesSlice.reducer(
          {},
          namespacesSlice.actions.failure({
            language: 'en',
            namespace: 'test',
            message: 'An error happened'
          })
        )
      ).toEqual({
        en: {
          test: {
            isLoading: false,
            wasError: true,
            wasSuccess: false,
            error: 'An error happened'
          }
        }
      })
    })
  })

  describe(namespacesSlice.actions.fulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        namespacesSlice.reducer(
          {
            en: {
              test: {
                isLoading: true,
                wasError: true,
                wasSuccess: false,
                error: 'Something'
              }
            }
          },
          namespacesSlice.actions.fulfill({ language: 'en', namespace: 'test' })
        )
      ).toEqual({
        en: {
          test: {
            isLoading: false,
            wasError: true,
            wasSuccess: false,
            error: 'Something'
          }
        }
      })
    })

    it('does not error when called with incomplete state', () => {
      expect(
        namespacesSlice.reducer(
          {},
          namespacesSlice.actions.fulfill({ language: 'en', namespace: 'test' })
        )
      ).toEqual({
        en: {
          test: {
            isLoading: false,
            wasError: false,
            wasSuccess: false
          }
        }
      })
    })
  })

  describe(hydrate.toString(), () => {
    it('replaces state with hydrated state', () => {
      expect(
        namespacesSlice.reducer(
          {
            en: {
              test: {
                isLoading: false,
                wasError: true,
                wasSuccess: false,
                error: 'Something'
              }
            }
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
            }
          })
        )
      ).toEqual({
        de: {
          something: {
            isLoading: false,
            wasError: true,
            wasSuccess: true,
            error: 'Something'
          }
        }
      })
    })
  })
})
