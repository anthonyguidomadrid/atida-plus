import type { EntryCollection } from 'contentful'
import { ContentfulOrganization } from '~domains/page'
import { contentfulOrganization } from '~domains/page/__mocks__/contentfulOrganization'
import { normalizeOrganization } from '../organization'

describe(normalizeOrganization, () => {
  it('normalizes the data', () => {
    const normalizedData = normalizeOrganization(
      contentfulOrganization as EntryCollection<ContentfulOrganization>
    )
    expect(normalizedData).toMatchSnapshot()
  })

  it('returns empty if there is no data', () => {
    expect(normalizeOrganization(undefined)).toEqual(undefined)
  })

  it('returns empty if there are no items', () => {
    expect(
      normalizeOrganization(({
        items: undefined
      } as unknown) as EntryCollection<ContentfulOrganization>)
    ).toEqual(undefined)
  })

  it('returns empty if there are zero items', () => {
    expect(
      normalizeOrganization(({
        items: []
      } as unknown) as EntryCollection<ContentfulOrganization>)
    ).toEqual(undefined)
  })

  it('returns empty if there is no first item', () => {
    expect(
      normalizeOrganization(({
        items: [undefined]
      } as unknown) as EntryCollection<ContentfulOrganization>)
    ).toEqual(undefined)
  })

  it('returns partial data', () => {
    expect(
      normalizeOrganization(({
        items: [{ fields: { name: 'Atida' } }]
      } as unknown) as EntryCollection<ContentfulOrganization>)
    ).toEqual({
      name: 'Atida'
    })
  })
})
