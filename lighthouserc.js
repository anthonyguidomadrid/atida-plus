module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000/pt-pt',
        'http://localhost:3000/pt-pt/beleza-cop',
        'http://localhost:3000/pt-pt/jowae-matifying-balancing-fluid-40-ml',
        'http://localhost:3000/pt-pt/promocoes',
        'http://localhost:3000/pt-pt/test-promo-xmas',
        'http://localhost:3000/pt-pt/marcas',
        'http://localhost:3000/pt-pt/login',
        'http://localhost:3000/pt-pt/basket',
        'http://localhost:3000/pt-pt/beleza'
      ],
      startServerCommand: 'yarn start',
      startServerReadyPattern: 'Ready on http://localhost:3000'
    },
    upload: {
      target: 'lhci',
      serverBaseUrl: 'https://lighthouse.shared.atida.com/'
    }
  }
}
