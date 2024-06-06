module.exports = {
  defaultLocale: 'en-gb',
  availableLocales: ['en-gb', 'pt-pt', 'es-es', 'de-de'],
  enabledLocales: ['pt-pt', 'es-es', 'de-de'],
  foreignRedirectionLocales: ['fr-fr'],
  routes: [
    {
      route: 'basket', // this maps to next.js page
      translations: {
        de: '/de/korb', // this is what the customer actually sees in the address bar
        'en-gb': '/basket',
        es: '/es/cesta'
      }
    },
    {
      route: 'product/:sku',
      translations: {
        de: '/de/produkt/:sku',
        'en-gb': '/product/:sku',
        es: '/es/producto/:sku'
      }
    },
    {
      route: 'product/:sku/add',
      translations: {
        de: '/de/produkt/:sku/hinzufugen',
        'en-gb': '/product/:sku/add',
        es: '/es/producto/:sku/anadir'
      }
    },
    {
      route: ':id/:name/user',
      translations: {
        de: '/de/:id/:name/nutzer',
        'en-gb': '/:id/:name/user',
        es: '/es/:id/:name/usuario'
      }
    }
  ]
}
