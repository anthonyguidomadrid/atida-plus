import { getAlgoliaIndex } from '../index-name'

describe(getAlgoliaIndex, () => {
  it('returns index-pt-pt when pt locale is called', () => {
    expect(getAlgoliaIndex('pt-pt', 'suggestionIndexes')).toEqual('index-pt-pt')
  })
})
