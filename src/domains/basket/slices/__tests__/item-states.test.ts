import { BasketWithProducts } from '~domains/basket/types'
import { itemStatesSlice } from '../item-states'

describe(itemStatesSlice.name, () => {
  describe(itemStatesSlice.actions.addToBasketTrigger.toString(), () => {
    it("sets up initial state for item when it's not there already", () => {
      expect(
        itemStatesSlice.reducer(
          {},
          itemStatesSlice.actions.addToBasketTrigger({
            sku: 'some-sku',
            quantity: 7
          })
        )
      ).toEqual({
        'some-sku': {
          isLoading: false,
          wasError: false,
          wasSuccess: false
        }
      })
    })

    it('resets state for item when it already exists', () => {
      expect(
        itemStatesSlice.reducer(
          {
            'some-sku': {
              isLoading: true,
              wasError: true,
              wasSuccess: false,
              error: 'Something'
            }
          },
          itemStatesSlice.actions.addToBasketTrigger({
            sku: 'some-sku',
            quantity: 7
          })
        )
      ).toEqual({
        'some-sku': {
          isLoading: false,
          wasError: false,
          wasSuccess: false
        }
      })
    })
  })

  describe(itemStatesSlice.actions.addToBasketRequest.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        itemStatesSlice.reducer(
          {
            'some-sku': {
              isLoading: false,
              wasError: true,
              wasSuccess: false,
              error: 'Something'
            }
          },
          itemStatesSlice.actions.addToBasketRequest({
            sku: 'some-sku',
            quantity: 7
          })
        )
      ).toEqual({
        'some-sku': {
          isLoading: true,
          wasError: true,
          wasSuccess: false,
          error: 'Something'
        }
      })
    })
  })

  describe(itemStatesSlice.actions.addToBasketSuccess.toString(), () => {
    it('sets wasSuccess to true', () => {
      expect(
        itemStatesSlice.reducer(
          {
            'some-sku': {
              isLoading: false,
              wasError: true,
              wasSuccess: false,
              error: 'Something'
            }
          },
          itemStatesSlice.actions.addToBasketSuccess({
            sku: 'some-sku',
            quantity: 7,
            data: {} as BasketWithProducts
          })
        )
      ).toEqual({
        'some-sku': {
          isLoading: false,
          wasError: true,
          wasSuccess: true,
          error: 'Something'
        }
      })
    })
  })

  describe(itemStatesSlice.actions.addToBasketFailure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        itemStatesSlice.reducer(
          {
            'some-sku': {
              isLoading: false,
              wasError: false,
              wasSuccess: false,
              error: 'Something'
            }
          },
          itemStatesSlice.actions.addToBasketFailure({
            sku: 'some-sku',
            quantity: 7,
            message: 'An error happened'
          })
        )
      ).toEqual({
        'some-sku': {
          isLoading: false,
          wasError: true,
          wasSuccess: false,
          error: 'An error happened'
        }
      })
    })
  })

  describe(itemStatesSlice.actions.addToBasketFulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        itemStatesSlice.reducer(
          {
            'some-sku': {
              isLoading: true,
              wasError: true,
              wasSuccess: false,
              error: 'Something'
            }
          },
          itemStatesSlice.actions.addToBasketFulfill({
            sku: 'some-sku',
            quantity: 7
          })
        )
      ).toEqual({
        'some-sku': {
          isLoading: false,
          wasError: true,
          wasSuccess: false,
          error: 'Something'
        }
      })
    })
  })

  // remove from basket
  describe(itemStatesSlice.actions.removeFromBasketTrigger.toString(), () => {
    it("sets up initial state for item when it's not there already", () => {
      expect(
        itemStatesSlice.reducer(
          {},
          itemStatesSlice.actions.removeFromBasketTrigger({
            id: 'some-id',
            sku: 'some-sku'
          })
        )
      ).toEqual({
        'some-id': {
          isLoading: false,
          wasError: false,
          wasSuccess: false
        }
      })
    })

    it('resets state for item when it already exists', () => {
      expect(
        itemStatesSlice.reducer(
          {
            'some-id': {
              isLoading: true,
              wasError: true,
              wasSuccess: false,
              error: 'Something'
            }
          },
          itemStatesSlice.actions.removeFromBasketTrigger({
            id: 'some-id',
            sku: 'some-sku'
          })
        )
      ).toEqual({
        'some-id': {
          isLoading: false,
          wasError: false,
          wasSuccess: false
        }
      })
    })
  })

  describe(itemStatesSlice.actions.removeFromBasketRequest.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        itemStatesSlice.reducer(
          {
            'some-id': {
              isLoading: false,
              wasError: true,
              wasSuccess: false,
              error: 'Something'
            }
          },
          itemStatesSlice.actions.removeFromBasketRequest({
            sku: 'some-sku',
            id: 'some-id'
          })
        )
      ).toEqual({
        'some-id': {
          isLoading: true,
          wasError: true,
          wasSuccess: false,
          error: 'Something'
        }
      })
    })
  })

  describe(itemStatesSlice.actions.removeFromBasketSuccess.toString(), () => {
    it('sets wasSuccess to true', () => {
      expect(
        itemStatesSlice.reducer(
          {
            'some-id': {
              isLoading: false,
              wasError: true,
              wasSuccess: false,
              error: 'Something'
            }
          },
          itemStatesSlice.actions.removeFromBasketSuccess({
            id: 'some-id',
            sku: 'some-sku',
            data: {} as BasketWithProducts
          })
        )
      ).toEqual({
        'some-id': {
          isLoading: false,
          wasError: true,
          wasSuccess: true,
          error: 'Something'
        }
      })
    })
  })

  describe(itemStatesSlice.actions.removeFromBasketFailure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        itemStatesSlice.reducer(
          {
            'some-id': {
              isLoading: false,
              wasError: false,
              wasSuccess: false,
              error: 'Something'
            }
          },
          itemStatesSlice.actions.removeFromBasketFailure({
            id: 'some-id',
            sku: 'some-sku',
            message: 'An error happened'
          })
        )
      ).toEqual({
        'some-id': {
          isLoading: false,
          wasError: true,
          wasSuccess: false,
          error: 'An error happened'
        }
      })
    })
  })

  describe(itemStatesSlice.actions.removeFromBasketFulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        itemStatesSlice.reducer(
          {
            'some-id': {
              isLoading: true,
              wasError: true,
              wasSuccess: false,
              error: 'Something'
            }
          },
          itemStatesSlice.actions.removeFromBasketFulfill({
            id: 'some-id',
            sku: 'some-sku'
          })
        )
      ).toEqual({
        'some-id': {
          isLoading: false,
          wasError: true,
          wasSuccess: false,
          error: 'Something'
        }
      })
    })
  })

  // change item quantity
  describe(itemStatesSlice.actions.changeItemQuantityTrigger.toString(), () => {
    it("sets up initial state for item when it's not there already", () => {
      expect(
        itemStatesSlice.reducer(
          {},
          itemStatesSlice.actions.changeItemQuantityTrigger({
            quantity: 1,
            sku: 'some-sku',
            id: 'some-id'
          })
        )
      ).toEqual({
        'some-sku': {
          isLoading: false,
          wasError: false,
          wasSuccess: false
        }
      })
    })

    it('resets state for item when it already exists', () => {
      expect(
        itemStatesSlice.reducer(
          {
            'some-sku': {
              isLoading: true,
              wasError: true,
              wasSuccess: false,
              error: 'Something'
            }
          },
          itemStatesSlice.actions.changeItemQuantityTrigger({
            sku: 'some-sku',
            quantity: 7,
            id: 'some-id'
          })
        )
      ).toEqual({
        'some-sku': {
          isLoading: false,
          wasError: false,
          wasSuccess: false
        }
      })
    })
  })

  describe(itemStatesSlice.actions.changeItemQuantityRequest.toString(), () => {
    it('sets isLoading to true', () => {
      expect(
        itemStatesSlice.reducer(
          {
            'some-sku': {
              isLoading: false,
              wasError: true,
              wasSuccess: false,
              error: 'Something'
            }
          },
          itemStatesSlice.actions.changeItemQuantityRequest({
            sku: 'some-sku',
            quantity: 7
          })
        )
      ).toEqual({
        'some-sku': {
          isLoading: true,
          wasError: true,
          wasSuccess: false,
          error: 'Something'
        }
      })
    })
  })

  describe(itemStatesSlice.actions.changeItemQuantitySuccess.toString(), () => {
    it('sets wasSuccess to true', () => {
      expect(
        itemStatesSlice.reducer(
          {
            'some-sku': {
              isLoading: false,
              wasError: true,
              wasSuccess: false,
              error: 'Something'
            }
          },
          itemStatesSlice.actions.changeItemQuantitySuccess({
            sku: 'some-sku',
            quantity: 7,
            data: {} as BasketWithProducts
          })
        )
      ).toEqual({
        'some-sku': {
          isLoading: false,
          wasError: true,
          wasSuccess: true,
          error: 'Something'
        }
      })
    })
  })

  describe(itemStatesSlice.actions.changeItemQuantityFailure.toString(), () => {
    it('sets wasError to true and adds error message', () => {
      expect(
        itemStatesSlice.reducer(
          {
            'some-sku': {
              isLoading: false,
              wasError: false,
              wasSuccess: false,
              error: 'Something'
            }
          },
          itemStatesSlice.actions.changeItemQuantityFailure({
            sku: 'some-sku',
            quantity: 7,
            message: 'An error happened'
          })
        )
      ).toEqual({
        'some-sku': {
          isLoading: false,
          wasError: true,
          wasSuccess: false,
          error: 'An error happened'
        }
      })
    })
  })

  describe(itemStatesSlice.actions.changeItemQuantityFulfill.toString(), () => {
    it('sets isLoading to false', () => {
      expect(
        itemStatesSlice.reducer(
          {
            'some-sku': {
              isLoading: true,
              wasError: true,
              wasSuccess: false,
              error: 'Something'
            }
          },
          itemStatesSlice.actions.changeItemQuantityFulfill({
            sku: 'some-sku',
            quantity: 7
          })
        )
      ).toEqual({
        'some-sku': {
          isLoading: false,
          wasError: true,
          wasSuccess: false,
          error: 'Something'
        }
      })
    })
  })
})
