# 12. Loading category labels as a new translation namespace

Date: 2022-02-23

## Status

Accepted

## Context

On some page types where we display product listings, we want to display a category facet. This for example, will allow customers to filter by category on brand detail pages (or promotion detail pages/search results page in the future).

In Algolia, we store the categories for each product, but it's an ID. The source of truth for actual category names is Contentful.

This means that we need to supplement the category filters with data from Contentful.

## Decision

We have taken the decision to use i18next namespaces to accommodate this.

This means that each page type / variant should be able to declare what translation namespaces they require (it will not be required to specify the global/common namespace). Basic Next.js pages can already do this, however we will need to allow page variants to return their namespace requirements, and initialise i18next _after_ the page props for a page variant have been determined.

It also means that we should fetch all lvl0 & lvl1 category names from contentful, for the pages that require the "category label" namespace.

An alternative would be to only fetch those category labels that are required, however this means the results are less cacheable (a different set would be needed for every page).

Implementing in this way would also give us more options in future for other complex translation requirements.

### Code Examples

When only one namespace is required for a component:

```jsx
const { t } = useTranslation('category');

return <span>{t('beauty_eyes')}</span>
```

```jsx
const { t } = useTranslation();

// product count would be a translation sourced from contentful, implementation unchanged

return <span>{t('product-count')}</span>
```

When multiple namespaces are required for a component:

```jsx
const { t } = useTranslation();

// product count would be a translation sourced from contentful, implementation unchanged

return <span>{t('category:beauty_eyes')} {t('product-count')}</span>
```
