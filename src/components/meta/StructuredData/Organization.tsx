import { Organization as OrganizationType } from 'schema-dts'
import { jsonLdScriptProps } from 'react-schemaorg'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useSelector } from 'react-redux'
import getConfig from 'next/config'
import { selectOrganization } from '~domains/page'

export const Organization = () => {
  const { publicRuntimeConfig } = getConfig()
  const host = publicRuntimeConfig.host
  const organization = useSelector(selectOrganization)
  const { locale } = useRouter()

  return organization ? (
    <Head>
      <script
        key="organization-structured-data"
        type="application/ld+json"
        {...jsonLdScriptProps<OrganizationType>({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: organization.name,
          description: organization.description,
          telephone: organization.telephone,
          email: organization.email,
          sameAs: organization.sameAs,
          image: organization.imageUrl,
          url: `${host}/${locale}`,
          ...(organization.address && {
            address: {
              '@type': 'PostalAddress',
              ...organization.address
            }
          })
        })}
      />
    </Head>
  ) : null
}
