/**
 * @jest-environment node
 */
// @ts-ignore
import { getEntries } from 'contentful'
import { I18nNamespace } from '~config/constants/i18n-namespaces'
import { loadFeatureFlag } from '~helpers/server-only/featureFlagClient'
import { fetchTranslations } from '../fetch-translations'

describe(fetchTranslations, () => {
  describe('without pagination', () => {
    beforeEach(() => {
      getEntries.mockResolvedValue({
        total: 2333,
        limit: 1000,
        skip: 0,
        items: [
          {
            sys: {
              contentType: {
                sys: {
                  id: 'translation'
                }
              }
            },
            fields: {
              key: 'test',
              value: 'test - Common translation in english'
            }
          },
          {
            sys: {
              contentType: {
                sys: {
                  id: 'translation'
                }
              }
            },
            fields: {
              key: 'other-test',
              value: 'other-test - Other translation in english'
            }
          }
        ]
      })
    })

    it("creates the client passes the locale to contentful's getEntries", async () => {
      await fetchTranslations('en-gb', I18nNamespace.COMMON)
      expect(getEntries).toHaveBeenCalledTimes(1)
      expect(getEntries).toHaveBeenCalledWith({
        include: 1,
        'sys.contentType.sys.id[in]': 'translation,richTextTranslation',
        locale: 'en-GB',
        limit: 1000,
        skip: 0,
        'metadata.tags.sys.id[in]': 'country-gb'
      })
    })

    it('normalizes the contentful response to match what is expected for i18next', async () => {
      const response = await fetchTranslations('en-gb', I18nNamespace.COMMON)
      expect(response).toEqual({
        'other-test': 'other-test - Other translation in english',
        test: 'test - Common translation in english'
      })
    })
  })

  describe('with pagination', () => {
    beforeEach(() => {
      ;(loadFeatureFlag as jest.Mock).mockResolvedValue(true)
    })

    afterEach(() => {
      ;(loadFeatureFlag as jest.Mock).mockReset()
    })

    it('can fetch more than one page', async () => {
      getEntries.mockResolvedValueOnce({
        total: 3333,
        limit: 1000,
        skip: 0,
        items: [
          {
            sys: {
              contentType: {
                sys: {
                  id: 'translation'
                }
              }
            },
            fields: {
              key: 'test',
              value: 'test - Common translation in english'
            }
          },
          {
            sys: {
              contentType: {
                sys: {
                  id: 'translation'
                }
              }
            },
            fields: {
              key: 'other-test',
              value: 'other-test - Other translation in english'
            }
          }
        ]
      })
      getEntries.mockResolvedValueOnce({
        total: 3333,
        limit: 1000,
        skip: 1000,
        items: [
          {
            sys: {
              contentType: {
                sys: {
                  id: 'translation'
                }
              }
            },
            fields: {
              key: 'test-page-2',
              value: 'test - Common translation in english'
            }
          },
          {
            sys: {
              contentType: {
                sys: {
                  id: 'translation'
                }
              }
            },
            fields: {
              key: 'other-test-page-2',
              value: 'other-test - Other translation in english'
            }
          }
        ]
      })
      getEntries.mockResolvedValueOnce({
        total: 3333,
        limit: 1000,
        skip: 2000,
        items: [
          {
            sys: {
              contentType: {
                sys: {
                  id: 'translation'
                }
              }
            },
            fields: {
              key: 'test-page-3',
              value: 'test - Common translation in english'
            }
          },
          {
            sys: {
              contentType: {
                sys: {
                  id: 'translation'
                }
              }
            },
            fields: {
              key: 'other-test-page-3',
              value: 'other-test - Other translation in english'
            }
          }
        ]
      })
      getEntries.mockResolvedValueOnce({
        total: 3333,
        limit: 1000,
        skip: 3000,
        items: [
          {
            sys: {
              contentType: {
                sys: {
                  id: 'richTextTranslation'
                }
              }
            },
            fields: {
              key: 'test-page-rich-text',
              value: {
                data: {},
                content: [
                  {
                    data: {},
                    content: [
                      {
                        data: {},
                        marks: [],
                        value: 'Please check ',
                        nodeType: 'text'
                      },
                      {
                        data: {
                          uri: 'https://google.com'
                        },
                        content: [
                          {
                            data: {},
                            marks: [],
                            value: 'our FAQ',
                            nodeType: 'text'
                          }
                        ],
                        nodeType: 'hyperlink'
                      },
                      {
                        data: {},
                        marks: [],
                        value: ' or contact us.',
                        nodeType: 'text'
                      }
                    ],
                    nodeType: 'paragraph'
                  }
                ],
                nodeType: 'document'
              }
            }
          }
        ]
      })
      const response = await fetchTranslations('en-gb', I18nNamespace.COMMON)
      expect(getEntries).toHaveBeenCalledTimes(4)
      expect(getEntries).toHaveBeenNthCalledWith(1, {
        'sys.contentType.sys.id[in]': 'translation,richTextTranslation',
        include: 1,
        locale: 'en-GB',
        limit: 1000,
        skip: 0,
        'metadata.tags.sys.id[in]': 'country-gb'
      })
      expect(getEntries).toHaveBeenNthCalledWith(2, {
        'sys.contentType.sys.id[in]': 'translation,richTextTranslation',
        include: 1,
        locale: 'en-GB',
        limit: 1000,
        skip: 1000,
        'metadata.tags.sys.id[in]': 'country-gb'
      })
      expect(getEntries).toHaveBeenNthCalledWith(3, {
        'sys.contentType.sys.id[in]': 'translation,richTextTranslation',
        include: 1,
        locale: 'en-GB',
        limit: 1000,
        skip: 2000,
        'metadata.tags.sys.id[in]': 'country-gb'
      })
      expect(response).toEqual({
        'other-test': 'other-test - Other translation in english',
        test: 'test - Common translation in english',
        'other-test-page-2': 'other-test - Other translation in english',
        'other-test-page-3': 'other-test - Other translation in english',
        'test-page-2': 'test - Common translation in english',
        'test-page-3': 'test - Common translation in english',
        'test-page-rich-text':
          '<p>Please check <a href="https://google.com">our FAQ</a> or contact us.</p>'
      })
    })

    it('can fetch a single page', async () => {
      getEntries.mockResolvedValueOnce({
        total: 1000,
        limit: 1000,
        skip: 0,
        items: [
          {
            sys: {
              contentType: {
                sys: {
                  id: 'translation'
                }
              }
            },
            fields: {
              key: 'test',
              value: 'test - Common translation in english'
            }
          },
          {
            sys: {
              contentType: {
                sys: {
                  id: 'translation'
                }
              }
            },
            fields: {
              key: 'other-test',
              value: 'other-test - Other translation in english'
            }
          }
        ]
      })
      const response = await fetchTranslations('en-gb', I18nNamespace.COMMON)
      expect(getEntries).toHaveBeenCalledTimes(1)
      expect(getEntries).toHaveBeenNthCalledWith(1, {
        'sys.contentType.sys.id[in]': 'translation,richTextTranslation',
        include: 1,
        locale: 'en-GB',
        limit: 1000,
        skip: 0,
        'metadata.tags.sys.id[in]': 'country-gb'
      })
      expect(response).toEqual({
        'other-test': 'other-test - Other translation in english',
        test: 'test - Common translation in english'
      })
    })
  })

  describe('namespace: category-title', () => {
    beforeEach(() => {
      getEntries.mockResolvedValue({
        total: 2333,
        limit: 1000,
        skip: 0,
        items: [
          {
            sys: {
              contentType: {
                sys: {
                  id: 'category'
                }
              }
            },
            fields: {
              id: 'category_one',
              title: 'Category One'
            }
          },
          {
            sys: {
              contentType: {
                sys: {
                  id: 'category'
                }
              }
            },
            fields: {
              id: 'category_two',
              title: 'Category Two'
            }
          }
        ]
      })
    })

    it("creates the client passes the locale to contentful's getEntries", async () => {
      await fetchTranslations('en-gb', I18nNamespace.CATEGORY_TITLE)
      expect(getEntries).toHaveBeenCalledTimes(1)
      expect(getEntries).toHaveBeenCalledWith({
        content_type: 'category',
        locale: 'en-GB',
        include: 1,
        limit: 1000,
        'metadata.tags.sys.id[in]': 'country-gb',
        skip: 0
      })
    })

    it('normalizes the contentful response to match what is expected for i18next', async () => {
      const response = await fetchTranslations(
        'en-gb',
        I18nNamespace.CATEGORY_TITLE
      )
      expect(response).toEqual({
        category_one: 'Category One',
        category_two: 'Category Two'
      })
    })
  })
})
