import { selectedPaymentMethodSlice } from '../selected-payment-method'

describe(selectedPaymentMethodSlice.name, () => {
  describe(
    selectedPaymentMethodSlice.actions.setSelectedPaymentMethod.toString(),
    () => {
      it('successfully sets the selected payment method', () => {
        expect(
          selectedPaymentMethodSlice.reducer(
            {
              selectedPaymentMethod: '',
              isValid: false,
              isPaymentPending: false
            },
            selectedPaymentMethodSlice.actions.setSelectedPaymentMethod(
              'sibs_mbway'
            )
          )
        ).toEqual({
          selectedPaymentMethod: 'sibs_mbway',
          isValid: false,
          isPaymentPending: false
        })
      })

      it('successfully sets if payment method is valid or not', () => {
        expect(
          selectedPaymentMethodSlice.reducer(
            {
              selectedPaymentMethod: '',
              isValid: false,
              isPaymentPending: false
            },
            selectedPaymentMethodSlice.actions.setIsValidPaymentMethod(true)
          )
        ).toEqual({
          selectedPaymentMethod: '',
          isValid: true,
          isPaymentPending: false
        })
      })

      it('successfully sets the restored payment method from the cookie', () => {
        expect(
          selectedPaymentMethodSlice.reducer(
            {
              selectedPaymentMethod: '',
              isValid: false,
              isPaymentPending: false
            },
            selectedPaymentMethodSlice.actions.setIsPaymentPending(true)
          )
        ).toEqual({
          selectedPaymentMethod: '',
          isValid: false,
          isPaymentPending: true
        })
      })
    }
  )
})
