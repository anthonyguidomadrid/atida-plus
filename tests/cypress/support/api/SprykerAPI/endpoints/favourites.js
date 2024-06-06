const glueApiUrl =
  Cypress.env('locale') == 'es'
    ? Cypress.env('glueEsApiUrl')
    : Cypress.env('glueApiUrl')

export class FavouritesEndpoints {
  createWishlist(body, url = glueApiUrl, headers = {}) {
    return cy.postAuthRequest(`${url}wishlists`, body, headers)
  }

  addFavourites(body, url = glueApiUrl, headers = {}) {
    return cy.postAuthRequest(`${url}add-to-wishlist`, body, headers)
  }
}

export const favouritesEndpoints = new FavouritesEndpoints()
