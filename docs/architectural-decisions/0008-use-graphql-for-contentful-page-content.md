# 8. Use GraphQL for Contentful page content

Date: 2021-04-13

## Status

Accepted

## Context

We want to be able to fetch page content in a single request, and as the project progresses the data requirements for a page have become more complex and may continue to grow in complexity in the future.

Contentful REST API is very basic in what you can get with a single request, whereas their GraphQL API is more flexible allowing you to fetch content linked in complex ways.

This need has mainly arisen from subcategory links on the POP. We need to fetch the subcategories for a category, but also the page that links to that subcategory so we can retrieve the URL.

## Decision

Reimplement Contentful page requests as GraphQL requests.

## Consequences

There is some inconsistency in how we fetch content from Contentful, resulting in the need to maintain a REST API normalizer as well as a GraphQL normalizer.

There may be a learning curve for engineers if they have not worked with GraphQL before.

We need to be mindful about making GraphQL queries too complex, as that could result in a slower request.
