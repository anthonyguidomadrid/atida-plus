# 2. Approach to translated routes

Date: 2021-01-12

## Status

Accepted

## Context

On Pure, we had a solution for translating page routes, however it did not leverage any of Next's native routing capabilities and included a lot of custom code.

## Decision

We will make use of Next's built in filesystem routing along with rewrites and redirects when creating new pages.

This approach introduces a [config file](/src/config/translated-routes.js) which will be the source of truth for any routes that need to be translated to different languages.

Each of these routes will have a rewrite attached for each language. For example:

- /de/korb => /de/basket
- /es/cesta => /es/basket

These rewrites will not be visible to end-users, but will ensure that Next.js knows how to map the translated route to it's own internal route.

Each of these routes will also have a redirect attached. For example:

- /de/basket => /de/korb
- /es/basket => /es/cesta

These redirects are not intended to be used heavily, but are there if a customer tries to access a route that is not valid for their language.

Currently we do not create redirects between languages such as:

- /es/korb => /es/cesta (will not be redirected, and will instead 404)

There is the option to include this functionality in the future if it is needed.

In addition to the rewrites and redirects, a number of helper functions have been created to ensure we can set up canonical and alternate meta tags correctly.

## Consequences

This solution adds some complexity to the routing as translated routes are not supported by Next.js natively. This means we have additional code to maintain.

Routing will work differently to how it does in Pure, however the basic idea is the same.

If Next.js introduces support for translated routing in the future, we should evaluate it and possibly deprecate this ADR and remove the custom functionality.
