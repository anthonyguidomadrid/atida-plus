import { removeUndefinedPropertiesFromObject } from '~helpers'
import { MethodRef, MethodRefData } from '../types'

export const normalizeCreatedPaymentMethod = (
  methodRefData?: MethodRefData
): MethodRef =>
  removeUndefinedPropertiesFromObject({
    methodRef: methodRefData?.method_ref
  })
