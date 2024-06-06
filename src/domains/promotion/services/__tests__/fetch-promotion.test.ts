/**
 * @jest-environment node
 */
import { fetchPromotions } from '../fetch-promotions'
import { contentfulPromotion } from '~components/molecules/Promotions/Promotions.mock'
// @ts-ignore
import axios from 'axios'
import { limitPromotions } from '~domains/promotion/slices/content'
import dayjs from 'dayjs'
import { loadFeatureFlag } from '~helpers/server-only/featureFlagClient'

describe(fetchPromotions, () => {
  describe('fetch promotions', () => {
    it('creates the client passes the locale and skip to request', async () => {
      ;(axios.post as jest.Mock).mockResolvedValue({
        data: contentfulPromotion
      })

      await fetchPromotions('en-gb', '2')
      expect(axios.post).toHaveBeenLastCalledWith('', {
        query: expect.any(String),
        variables: {
          limit: limitPromotions,
          locale: 'en-GB',
          allLocales: ['en-GB', 'pt-PT', 'es-ES', 'de-DE'],
          skip: 2,
          where: {
            contentfulMetadata: {
              tags: {
                id_contains_all: 'country-gb'
              }
            },
            itemsToFilterBy_contains_some: undefined,
            itemsToFilterBy_contains_all: undefined,
            validFrom_exists: true,
            validFrom_lt: dayjs().format(),
            validTo_exists: true,
            validTo_gt: dayjs().format()
          }
        }
      })
    })

    it('returns the normalized response', async () => {
      ;(axios.post as jest.Mock).mockResolvedValueOnce({
        data: contentfulPromotion
      })
      const response = await fetchPromotions('en-gb', '2')
      expect(response).toMatchSnapshot()
    })
  })

  describe('filtering', () => {
    describe('when OR formula is on', () => {
      beforeEach(() => {
        ;(loadFeatureFlag as jest.Mock).mockResolvedValue(true)
      })

      it('passes undefined filter when filter list is empty', async () => {
        await fetchPromotions('en-gb', '2', [])
        expect(axios.post).toHaveBeenLastCalledWith('', {
          query: expect.any(String),
          variables: {
            limit: limitPromotions,
            locale: expect.any(String),
            allLocales: expect.any(Array),
            skip: expect.any(Number),
            where: {
              contentfulMetadata: expect.any(Object),
              itemsToFilterBy_contains_some: undefined,
              itemsToFilterBy_contains_all: undefined,
              validFrom_exists: expect.any(Boolean),
              validFrom_lt: expect.any(String),
              validTo_exists: expect.any(Boolean),
              validTo_gt: expect.any(String)
            }
          }
        })
      })

      it('passes filters when filter list is not empty', async () => {
        await fetchPromotions('en-gb', '2', ['filter-one', 'filter-two'])
        expect(axios.post).toHaveBeenLastCalledWith('', {
          query: expect.any(String),
          variables: {
            limit: limitPromotions,
            locale: expect.any(String),
            allLocales: expect.any(Array),
            skip: expect.any(Number),
            where: {
              contentfulMetadata: expect.any(Object),
              itemsToFilterBy_contains_some: ['filter-one', 'filter-two'],
              itemsToFilterBy_contains_all: undefined,
              validFrom_exists: expect.any(Boolean),
              validFrom_lt: expect.any(String),
              validTo_exists: expect.any(Boolean),
              validTo_gt: expect.any(String)
            }
          }
        })
      })
    })

    describe('when OR formula is off', () => {
      beforeEach(() => {
        ;(loadFeatureFlag as jest.Mock).mockResolvedValue(false)
      })

      it('passes undefined filter when filter list is empty', async () => {
        await fetchPromotions('en-gb', '2', [])
        expect(axios.post).toHaveBeenLastCalledWith('', {
          query: expect.any(String),
          variables: {
            limit: limitPromotions,
            locale: expect.any(String),
            allLocales: expect.any(Array),
            skip: expect.any(Number),
            where: {
              contentfulMetadata: expect.any(Object),
              itemsToFilterBy_contains_some: undefined,
              itemsToFilterBy_contains_all: [],
              validFrom_exists: expect.any(Boolean),
              validFrom_lt: expect.any(String),
              validTo_exists: expect.any(Boolean),
              validTo_gt: expect.any(String)
            }
          }
        })
      })

      it('passes filters when filter list is not empty', async () => {
        await fetchPromotions('en-gb', '2', ['filter-one', 'filter-two'])
        expect(axios.post).toHaveBeenLastCalledWith('', {
          query: expect.any(String),
          variables: {
            limit: limitPromotions,
            locale: expect.any(String),
            allLocales: expect.any(Array),
            skip: expect.any(Number),
            where: {
              contentfulMetadata: expect.any(Object),
              itemsToFilterBy_contains_some: undefined,
              itemsToFilterBy_contains_all: ['filter-one', 'filter-two'],
              validFrom_exists: expect.any(Boolean),
              validFrom_lt: expect.any(String),
              validTo_exists: expect.any(Boolean),
              validTo_gt: expect.any(String)
            }
          }
        })
      })
    })
  })
})
