/**
 * @jest-environment node
 */
// @ts-ignore
import { getEntries } from 'contentful'
import {
  contentfulHeaderNavigation,
  contentfulHeaderNavigationNormalized
} from '~domains/page/__mocks__/contentfulHeaderNavigation'
import {
  contentfulOrganization,
  organizationNormalized
} from '~domains/page/__mocks__/contentfulOrganization'
import {
  contentfulTranslationLabels,
  contentfulTranslationLabelsNormalized
} from '~domains/page/__mocks__/contentfulTranslationInfoLabels'
import { loadFeatureFlags } from '~helpers/server-only/featureFlagClient'
import {
  contentfulFooter,
  contentfulFooterNormalized
} from '../../__mocks__/contentfulFooter'
import { fetchCommon } from '../fetch-common'
import { FeatureFlag } from '~config/constants/feature-flags'

describe(fetchCommon, () => {
  describe('default case', () => {
    beforeEach(() => {
      ;(loadFeatureFlags as jest.Mock).mockResolvedValue({
        [FeatureFlag.SEO_STRUCTURED_DATA_COP_AND_POP_BREADCRUMBS]: true,
        [FeatureFlag.CONTENTFUL_REPLACE_CDA_MENU_CALL_WITH_PRE_NORMALIZED_JSON]: false
      })
      ;(getEntries as jest.Mock)
        .mockResolvedValueOnce(contentfulFooter)
        .mockResolvedValueOnce(contentfulHeaderNavigation)
        .mockResolvedValueOnce(contentfulTranslationLabels)
        .mockResolvedValueOnce(contentfulOrganization)
        .mockResolvedValueOnce(contentfulHeaderNavigation)
    })

    it("creates the client passes the locale to contentful's getEntries", async () => {
      await fetchCommon('en-gb')
      expect(getEntries).toHaveBeenCalledTimes(5)
      expect(getEntries).toHaveBeenCalledWith({
        content_type: 'pageFooter',
        locale: 'en-GB',
        include: 6,
        limit: 1000,
        'fields.id': 'page-footer',
        'metadata.tags.sys.id[in]': 'country-gb',
        skip: 0
      })
      expect(getEntries).toHaveBeenCalledWith({
        content_type: 'menu',
        locale: 'en-GB',
        include: 8,
        limit: 1000,
        'fields.id': 'header-navigation-left',
        'metadata.tags.sys.id[in]': 'country-gb',
        skip: 0
      })
      expect(getEntries).toHaveBeenCalledWith({
        content_type: 'menu',
        locale: 'en-GB',
        include: 4,
        limit: 1000,
        'fields.id': 'header-navigation-right',
        'metadata.tags.sys.id[in]': 'country-gb',
        skip: 0
      })
      expect(getEntries).toHaveBeenCalledWith({
        content_type: 'translationInfoLabel',
        locale: 'en-GB',
        include: 3,
        limit: 1000,
        'metadata.tags.sys.id[in]': 'country-gb',
        skip: 0
      })
      expect(getEntries).toHaveBeenCalledWith({
        content_type: 'organization',
        locale: 'en-GB',
        include: 1,
        limit: 1000,
        'metadata.tags.sys.id[in]': 'country-gb',
        skip: 0
      })
    })

    it('normalizes the contentful response', async () => {
      const response = await fetchCommon('en-gb')
      expect(response).toEqual({
        ...contentfulFooterNormalized,
        headerNavigationLeft: contentfulHeaderNavigationNormalized,
        headerNavigationRight: contentfulHeaderNavigationNormalized,
        campaignLabels: contentfulTranslationLabelsNormalized,
        organization: organizationNormalized
      })
    })
  })

  describe('when organization structured data feature flag is on', () => {
    beforeEach(() => {
      ;(loadFeatureFlags as jest.Mock).mockResolvedValue({
        [FeatureFlag.SEO_STRUCTURED_DATA_COP_AND_POP_BREADCRUMBS]: true,
        [FeatureFlag.CONTENTFUL_REPLACE_CDA_MENU_CALL_WITH_PRE_NORMALIZED_JSON]: false
      })
      ;(getEntries as jest.Mock)
        .mockResolvedValueOnce(contentfulFooter)
        .mockResolvedValueOnce(contentfulHeaderNavigation)
        .mockResolvedValueOnce(contentfulTranslationLabels)
        .mockResolvedValueOnce(contentfulOrganization)
        .mockResolvedValueOnce(contentfulHeaderNavigation)
    })

    it('fetches the organization data', async () => {
      await fetchCommon('en-gb')
      expect(getEntries).toHaveBeenCalledTimes(5)
      expect(getEntries).toHaveBeenNthCalledWith(4, {
        content_type: 'organization',
        locale: 'en-GB',
        include: 1,
        limit: 1000,
        'metadata.tags.sys.id[in]': 'country-gb',
        skip: 0
      })
    })

    it('returns the normalized organization data', async () => {
      const response = await fetchCommon('en-gb')
      expect(response).toEqual({
        ...contentfulFooterNormalized,
        headerNavigationLeft: contentfulHeaderNavigationNormalized,
        headerNavigationRight: contentfulHeaderNavigationNormalized,
        campaignLabels: contentfulTranslationLabelsNormalized,
        organization: organizationNormalized
      })
    })
  })
})
