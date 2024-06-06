# 4. Use i18next for localisation

Date: 2021-01-18

## Status

Accepted

## Context

Atida Plus needs to support a variety of countries and languages and translations for those languages need to be able to be edited by content editors without a code deployment.

We need to choose a localisation library that will allow us to fetch translations from contentful while also providing flexibility regarding performance optimisation and structuring inside contentful.

## Decision

We have decided to use i18next and react-i18next.

## Consequences

i18next is different to the library used for Atida Pure, this means there could be an additional learning curve when switching between projects. This also means we cannot port any improvements to Pure without also adopting i18next there as well (which would be a large refactoring).

i18next allows us to specify a backend connector that would be responsible for fetching translations from an external source.

i18next also allows us to split translations by namespaces which means we can take advantage of contentful resource bundles. This enables more scalability in the future, if the number of translations grows to more than contentful's default response limit, we can split the requests up by feature as opposed to arbitrary pagination.

i18next is a well known library and has an ecosystem covering more than react & next.js allowing more flexibility in the future.

i18next comes with additional functionality such as the ability to create missing translations at runtime.

i18next has a paid-for service that specialises in managing translation (which would be an alternative to contentful). Obviously their own service integrates perfectly with i18next and may be an option if we ever outgrow contentful for storing translations.
