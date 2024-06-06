import { isSegmentInitialisedSlice } from '../is-segment-initialised'

describe(isSegmentInitialisedSlice.name, () => {
  describe(
    isSegmentInitialisedSlice.actions.setAsInitialised.toString(),
    () => {
      it('sets is initialised', () => {
        expect(
          isSegmentInitialisedSlice.reducer(
            {
              isInitialised: false
            },
            isSegmentInitialisedSlice.actions.setAsInitialised()
          )
        ).toEqual({
          isInitialised: true
        })
      })
    }
  )
})
