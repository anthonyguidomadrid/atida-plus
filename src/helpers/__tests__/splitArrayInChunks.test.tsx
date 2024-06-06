import { splitArrayInChunks } from '../splitArrayInChunks'

const bigArray = ['1', '2', '3', '4', '5', '6', '7', '8']

describe(splitArrayInChunks, () => {
  it('splits array correctly based on passed chunkLength property', () => {
    const chunkedArray = splitArrayInChunks(bigArray, 3)
    expect(chunkedArray).toEqual([
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8']
    ])
    const secondChunkedArray = splitArrayInChunks(bigArray, 2)
    expect(secondChunkedArray).toEqual([
      ['1', '2'],
      ['3', '4'],
      ['5', '6'],
      ['7', '8']
    ])
  })
  it('returns unchanged array if the passed chunkLength property is bigger than the array length', () => {
    const thirdChunkedArray = splitArrayInChunks(bigArray, 10)
    expect(thirdChunkedArray).toEqual([
      ['1', '2', '3', '4', '5', '6', '7', '8']
    ])
  })
})
