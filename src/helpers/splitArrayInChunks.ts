// Splitting array into smaller arrays based on chunkLength prop
// e.g. let bigArray = ['1','2','3','4','5','6','7','8']
// splitArrayInChunks(bigArray, 3)
// result: [['1','2','3'],['4','5','6'],['7','8']]

export const splitArrayInChunks = <Type>(
  arr: Type[],
  chunkLength: number
): Type[][] => {
  const chunks = []
  let i = 0

  while (i < arr.length) {
    chunks.push(arr.slice(i, (i += chunkLength)))
  }
  return chunks
}
