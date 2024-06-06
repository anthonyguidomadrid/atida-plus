import minimist from 'minimist'
import dotenv from 'dotenv'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import fetch from 'cross-fetch'
import compress from 'graphql-query-compress'

// eslint-disable-next-line -- TS is complaining about named exports, and the linter about the default one
import apollo from '@apollo/client'
import { getListOfAllLocales } from '../helpers/locales/getListOfAllLocales.mjs'
import { getListOfUsedLocales } from '../helpers/locales/getListOfUsedLocales.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const { ApolloClient, ApolloLink, HttpLink, from, gql, InMemoryCache } = apollo

// Get the data from DotEnv
let basicEnv = dotenv.config({ path: __dirname + '/../.env' }).parsed
let localEnv = dotenv.config({ path: __dirname + '/../.env.local' }).parsed
let envValues = { ...basicEnv, ...localEnv }

// Default values
let contentfulAccessToken = envValues.CMS_DELIVERY_TOKEN
let environmentId = 'dev'
let pageSlug = '/'
const availableLocales = getListOfAllLocales()
let locale = getListOfUsedLocales()[0]
let defaultContentBlocksLimit = 20
let contentBlocksLimit = defaultContentBlocksLimit
let queryCostHeader

async function execute() {
  if (!contentfulAccessToken) {
    console.error(
      '@@ERROR: A CMS Token should be present in an .env file (CMS_DELIVERY_TOKEN)'
    )
    process.exit(1)
  }

  let parsedArgs = minimist(process.argv.slice(2))

  if (
    parsedArgs.hasOwnProperty('locale') &&
    !availableLocales.includes(parsedArgs.locale)
  ) {
    console.error(
      `@@ERROR: The provided locale doesn't exist or it's unavailable at the moment. Please make sure you are typing the locale with the correct format, e.g. 'en-GB'. The available locales are: ${availableLocales}`
    )
    process.exit(1)
  }

  if (parsedArgs.hasOwnProperty('from')) environmentId = parsedArgs.from
  if (parsedArgs.hasOwnProperty('page')) pageSlug = parsedArgs.page
  if (
    parsedArgs.hasOwnProperty('locale') &&
    availableLocales.includes(parsedArgs.locale)
  )
    locale = parsedArgs.locale
  if (parsedArgs.hasOwnProperty('limit') && parsedArgs.limit > 0)
    contentBlocksLimit = parsedArgs.limit

  console.log(
    `@@LOG: Checking the ${
      pageSlug === '/' ? 'homepage' : `page with the slug '${pageSlug}'`
    } for ${environmentId} environment and '${locale}' locale`
  )
  contentBlocksLimit !== defaultContentBlocksLimit &&
    console.log(
      `@@LOG: You've specified a content blocks limit of ${contentBlocksLimit}`
    )

  // For retrieving the query cost header
  const afterwareLink = new ApolloLink((operation, forward) => {
    return forward(operation).map(response => {
      const context = operation.getContext()
      const {
        response: { headers }
      } = context
      if (headers) {
        queryCostHeader = headers.get('x-contentful-graphql-query-cost')
      }
      return response
    })
  })

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([
      afterwareLink,
      new HttpLink({
        uri: `https://graphql.contentful.com/content/v1/spaces/7g2w796onies/environments/${environmentId}`,
        fetch,
        headers: {
          Authorization: `Bearer ${contentfulAccessToken}`,
          'Content-Type': 'application/json'
        }
      })
    ]),
    headers: {
      Authorization: `Bearer ${contentfulAccessToken}`,
      'Content-Type': 'application/json'
    }
  })

  const GRAPHQL_QUERY = `
      query Page {
        pageCollection(
          limit: 1
          preview: false
          locale: "${locale}"
          where: { slug: "${pageSlug}" }
        ) {
          items {
            ...pageContent
          }
        }
      }
      fragment pageContent on Page {
        __typename
        title
        ptSlug: slug(locale: "pt-PT")
        esSlug: slug(locale: "es-ES")
        contentBlocksCollection(limit: ${contentBlocksLimit}) {
          items {
            __typename
            ...slider
            ...heroBanner
            ...campaignHeroBanner
            ...categoryGrid
            ...contentBlockWithImage
            ...uspsCard
            ...voucherCodes
            ...promotion
            ...staticContentBlock
            ...staticHeaderBlock
            ...exponeaRecommendation
            ...containerOfContentBlocks
            ...groupOfStaticContentBlocks
            ...topBrands
            ...linkBlock
            ...staticRecommendationBlock
          }
        }
        pageType
        referencedContent {
          __typename
          ...brand
          ...category
          ...promotion
          ...categoryCop
        }
        seo {
          __typename
          ...seo
        }
        contentfulMetadata {
          tags {
            id
          }
        }
      }
      fragment slider on Slider {
        contentBlocksCollection(limit: 5) {
          items {
            __typename
            heroBannerTitle: newTitle
            link {
              __typename
            }
            text {
              __typename
            }
            imageAsset {
              __typename
            }
          }
        }
      }
      fragment heroBanner on HeroBanner {
        heroBannerTitle: newTitle
        link {
          __typename
          icon {
            __typename
          }
          content {
            __typename
          }
        }
        text {
          __typename
        }
        imageAsset {
          __typename
        }
      }
      fragment campaignHeroBanner on CampaignHeroBanner {
        description {
          __typename
        }
        backgroundColor {
          __typename
        }
        image {
          __typename
        }
      }
      fragment categoryGrid on CategoryGrid {
        itemsCollection(limit: 20) {
          items {
            __typename
            imageAsset {
              __typename
            }
          }
        }
      }
      fragment contentBlockWithImage on ContentBlockWithImage {
        image {
          __typename
        }
        content {
          __typename
        }
        cta {
          __typename
          icon {
            __typename
          }
          content {
            __typename
          }
        }
        textLink {
          __typename
          icon {
            __typename
          }
          content {
            __typename
          }
        }
        bgColor {
          __typename
        }
        textColor {
          __typename
        }
      }
      fragment uspsCard on UspsCard {
        uspsCollection(limit: 5) {
          items {
            __typename
            ...usp
          }
        }
      }
      fragment usp on Usp {
        icon {
          __typename
        }
      }
      fragment promotion on Promotion {
        itemsToFilterBy
        description {
          __typename
        }
        promoInformation {
          __typename
        }
        color {
          __typename
        }
        image {
          __typename
        }
        teaserImage {
          __typename
        }
        categoriesCollection(limit: 5) {
          items {
            __typename
          }
        }
        labelsCollection(limit: 2) {
          items {
            __typename
          }
        }
        url: linkedFrom(allowedLocales: ["pt-PT"]) {
          pageCollection(limit: 35, locale: "pt-PT") {
            items {
              referencedContent {
                __typename
              }
            }
          }
        }
      }
      fragment staticContentBlock on StaticContentBlock {
        content {
          __typename
        }
      }
      fragment staticHeaderBlock on StaticHeaderBlock {
        title
      }
      fragment exponeaRecommendation on ExponeaRecommendation {
        title
      }
      fragment containerOfContentBlocks on ContainerOfContentBlocks {
        contentCollection(limit: 2) {
          items {
            __typename
            ... on Promotion {
              description {
                __typename
              }
              color {
                __typename
              }
              image {
                __typename
              }
              teaserImage {
                __typename
              }
              categoriesCollection(limit: 5) {
                items {
                  __typename
                }
              }
              labelsCollection(limit: 2) {
                __typename
              }
              isContentWithImage: teaserType
              url: linkedFrom(allowedLocales: ["pt-PT"]) {
                pageCollection(limit: 35, locale: "pt-PT") {
                  items {
                    referencedContent {
                      __typename
                      ... on Promotion {
                        id
                      }
                    }
                  }
                }
              }
            }
            ...marketingTeaser
          }
        }
      }
      fragment marketingTeaser on MarketingTeaser {
        color {
          __typename
        }
        image {
          __typename
        }
        bgColor {
          __typename
        }
      }
      fragment topBrands on TopBrands {
        brandsCollection(limit: 10) {
          items {
            title
            url: linkedFrom(allowedLocales: ["pt-PT"]) {
              pageCollection(limit: 2, locale: "pt-PT") {
                items {
                  slug
                }
              }
            }
          }
        }
      }
      fragment linkBlock on LinkBlock {
        __typename
        link {
          __typename
        }
      }
      fragment brand on Brand {
        image {
          __typename
        }
        logoImage {
          __typename
        }
      }
      fragment category on Category {
        color {
          __typename
        }
        image {
          __typename
        }
        subcategories: subcategoriesCollection {
          items {
            id
            linkedFrom(allowedLocales: ["pt-PT"]) {
              pageCollection(limit: 1, locale: "pt-PT") {
                items {
                  slug
                }
              }
            }
          }
        }
        linkedFrom(allowedLocales: ["pt-PT"]) {
          categoryCollection(limit: 1, locale: "pt-PT") {
            items {
              id
              linkedFrom(allowedLocales: ["pt-PT"]) {
                categoryCollection(limit: 1, locale: "pt-PT") {
                  items {
                    id
                  }
                }
              }
            }
          }
        }
      }
      fragment categoryCop on CategoryCop {
        __typename
        linkedCategory {
          subcategoriesCollection(limit: 25) {
            items {
              linkedFrom(allowedLocales: ["pt-PT"]) {
                pageCollection(limit: 1, locale: "pt-PT") {
                  items {
                    slug
                  }
                }
              }
            }
          }
          categoryPageSlug: linkedFrom(allowedLocales: ["pt-PT"]) {
            pageCollection(limit: 1, locale: "pt-PT") {
              items {
                slug
              }
            }
          }
        }
      }
      fragment seo on Seo {
        image {
          __typename
        }
        copy {
          __typename
        }
        copyExpandable {
          __typename
        }
      }
      fragment voucherCodes on VoucherCodes {
        title
        voucherCodesCollection(limit: 3) {
          items {
            __typename
            ...voucherCode
          }
        }
      }

      fragment voucherCode on VoucherCode {
        icon {
          __typename
        }
        voucherRichTextTitle: newTitle {
          __typename
        }
      }

      fragment groupOfStaticContentBlocks on GroupOfStaticContentBlocks {
        __typename
        staticContentBlocksCollection(limit: 20) {
          items {
            ... on StaticContentBlock {
              __typename
            }
            ... on ContentBlockWithImage {
              __typename
            }
          }
        }
      }

      fragment staticRecommendationBlock on StaticRecommendationBlock {
        title
      }
    `
  const COMPRESSED_GRAPHQL_QUERY = compress(GRAPHQL_QUERY)

  const originalQuerySize = Buffer.byteLength(GRAPHQL_QUERY, 'utf-8')
  const compressedQuerySize = Buffer.byteLength(
    COMPRESSED_GRAPHQL_QUERY,
    'utf-8'
  )

  console.log(
    '\x1b[1m',
    `@@LOG: GraphQL Query Size (original): ${originalQuerySize}`
  )
  console.log(
    '\x1b[1m',
    `@@LOG: GraphQL Query Size (compressed): ${compressedQuerySize}`
  )

  try {
    const response = await client.query({
      query: gql`
        ${COMPRESSED_GRAPHQL_QUERY}
      `
    })

    if (!response.data.pageCollection.items.length) {
      console.error(
        "@@ERROR: The page you requested doesn't exist or it doesn't have any published content blocks. Please try with another page slug"
      )
      process.exit(1)
    }
    console.log(
      '\x1b[1m',
      `@@LOG: Successful request. The number of content blocks in the page is ${response.data.pageCollection.items[0].contentBlocksCollection.items.length}`
    )
    console.log(
      '\x1b[1m',
      `@@LOG: The Contentful page query cost is ${queryCostHeader}`
    )
    process.exit()
  } catch (error) {
    if (error?.networkError?.response.status === 400) {
      console.error(
        '@@ERROR: ' + error?.networkError?.result?.errors[0]?.message
      )
    } else {
      console.error('@@ERROR', error)
    }
    process.exit(1)
  }
}

await execute()
