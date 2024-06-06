import { includeInArrayAtPosition } from '../arrays'

describe(includeInArrayAtPosition, () => {
  it('returns the array with the element inserted at the defined position', () => {
    expect(
      includeInArrayAtPosition(['Jan', 'March', 'April', 'June'], 1, 'Feb')
    ).toEqual(['Jan', 'Feb', 'March', 'April', 'June'])
  })
})
