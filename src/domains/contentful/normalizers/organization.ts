import type { EntryCollection } from 'contentful'
import { Organization, ContentfulOrganization } from '~domains/page'
import { removeUndefinedPropertiesFromObject } from '~helpers'

const normalizeOrganizationRest = (
  organizations?: EntryCollection<ContentfulOrganization>
): Organization | undefined => {
  const organization = organizations?.items?.[0]

  if (!organization) return undefined

  return removeUndefinedPropertiesFromObject({
    name: organization.fields.name,
    description: organization.fields.description,
    telephone: organization.fields.telephone,
    email: organization.fields.email,
    sameAs: organization.fields.sameAs,
    imageUrl: organization.fields.imageUrl,
    id: organization.fields.id,
    address: organization.fields.address?.fields
  })
}

export const normalizeOrganization = (
  organization?: EntryCollection<ContentfulOrganization>
): Organization | undefined => normalizeOrganizationRest(organization)
