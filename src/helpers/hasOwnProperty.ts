export function hasOwnProperty<X extends object, Y extends PropertyKey>(
  obj: X | null,
  prop: Y
): obj is X & Record<Y, unknown> {
  return obj?.hasOwnProperty(prop) ?? false
}
