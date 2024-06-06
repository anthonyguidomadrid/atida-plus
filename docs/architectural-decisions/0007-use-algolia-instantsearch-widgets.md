# 7. Use Algolia InstantSearch Widgets

Date: 2021-03-03

## Status

In Progress

## Context

[Please find the overarching ADR for Algolia in the Wiki](https://olp.atlassian.net/wiki/spaces/ATIDA/pages/1247772817/10+using+algolia)

We need to integrate with Algolia to provide a search interface on the front-end. It should allow customers to apply filters, navigate through pages of results and use the search bar to narrow down results further.

## Decision

1. We have decided to initially build this functionality using [Algolia InstantSearch](https://www.algolia.com/doc/guides/building-search-ui/widgets/showcase/js/) (and related react components).

2. We need the Algolia config (App id, Api Key) in environment variables to be able to point different environments to different Algolia instances.However, as environment variables are not currently available at build time due to our docker set up, we have used the Next.js publicRuntimeConfig. This makes them available for the server side and client side.

## Consequences

We will be able to more rapidly build out the POP and Search functionality for Atida Plus because Algolia handles any API interactions (including updating the results list) for us.

Algolia InstantSearch components will use more operations within Algolia, which could add up quickly as we add more components. Additional costs could be avoided by introducing a caching layer, but would add more complexity.

POP and Search data will be separated from the rest of the site data (such as basket, PDP) which is currently stored and handled by redux & redux-saga.

We've had to introduce getInitialProps at the app level, because all pages will need the search bar using Algolia search. This means we have opted out of Automatic Static Optimization for all pages.

From the Next.js docs:

> A page that relies on publicRuntimeConfig must use getInitialProps to opt-out of Automatic Static Optimization. Runtime configuration won't be available to any page (or component in a page) without getInitialProps.

This solution may need to be re-visisted in the future if we find we need static generation of pages, however we feel that caching via CDN with other changes, may solve any performaance issues with less development time.
