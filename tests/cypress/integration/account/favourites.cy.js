import { header } from '../../support/page-objects/components/header'
import { loginPage } from '../../support/page-objects/pages/account/loginPage'
import { favouritesPage } from '../../support/page-objects/pages/account/favouritesPage'
import { pop } from '../../support/page-objects/pages/pop'
import { getErrorMessage } from '../../support/helper'
import { pdp } from '../../support/page-objects/pages/pdp'
import { homepage } from '../../support/page-objects/pages/homepage'
import { basketPage } from '../../support/page-objects/pages/basketPage'
import { DbHelper } from '../../support/db.helper'
import { FeatureTag } from '../../support/enums/featureTag'
import {
  Customer,
  CustomerData
} from '../../support/api/SprykerAPI/models/customer'
import { customersEndpoints } from '../../support/api/SprykerAPI/endpoints/customer'
import { Attributes } from '../../support/api/SprykerAPI/models/attributes'
import { Addresses } from '../../support/api/SprykerAPI/models/addresses'
import { LoginData } from '../../support/api/SprykerAPI/models/login'
import { FavouritesData } from '../../support/api/SprykerAPI/models/favourites'
import 'cypress-localstorage-commands'
import { favouritesEndpoints } from '../../support/api/SprykerAPI/endpoints/favourites'
import { WishlistData } from '../../support/api/SprykerAPI/models/wishlist'
import { addToBasket } from '../../support/page-objects/components/addToBasket'
import { skipOn } from '@cypress/skip-test'
import { FeatureFlag } from '../../../../src/config/constants/feature-flags'

const dbhelper = new DbHelper()
const apiUrl = Cypress.env('apiUrl')
const pageUri = Cypress.env('locale') == 'es' ? 'belleza' : '/beleza/rosto'
let productTitleText =
  Cypress.env('locale') == 'es'
    ? 'RENE Furterer Astera Champú Alta Tolerancia Sensible 200ml'
    : 'RENE Furterer Astera shampoo de alta tolerância 200ml'

let emailAddress
let password

describe(
  [FeatureTag.FAVOURITES],
  'Logged out customer with a favourite product',
  () => {
    beforeEach(() => {
      const randomNumber = Date.now()
      emailAddress = `automation-${randomNumber}@atida.com`
      password = 'P@ssword1'

      let customerData = new CustomerData({
        data: new Customer({
          attributes: new Attributes({
            email: emailAddress,
            password: password,
            confirmPassword: password,
            addresses: new Addresses()
          })
        })
      })

      customersEndpoints.createCustomer(customerData).then(response => {
        expect(response.status).to.eql(201)
        cy.setLocalStorage('customerReference', response.body.data.id)
      })

      customersEndpoints.loginCustomer(new LoginData(emailAddress, password))

      favouritesEndpoints.createWishlist(new WishlistData())
      favouritesEndpoints.addFavourites(new FavouritesData('944516464068'))

      cy.request({
        method: 'POST',
        url: `${apiUrl}account/logout`
      })
        .its('status')
        .should('eq', 204)

      cy.viewportPreset('samsung-s10-plus')
      cy.visit('/login')
      cy.checkFlag(addToBasket.basketNotificationFF).as('basketNotificationFF')
    })

    afterEach(() => {
      dbhelper.buildAndDeleteWhishlistItemQueryByUser(emailAddress)
      dbhelper.buildAndDeleteWhishlistQueryByUser(emailAddress)
      dbhelper.buildAndDeleteQueryByUser(emailAddress)
    })

    it('#2 Should see favourite products after login', () => {
      let numberOfFavouriteProducts = '1'

      loginPage.loginUser(emailAddress, password)

      header.clickFavouritesPinIcon(true)
      favouritesPage
        .getNumberOfProducts()
        .should('contain.text', numberOfFavouriteProducts)
      favouritesPage.getProductTitle().should('have.text', productTitleText)
    })

    it.skip('#9 Remove product from favourites', () => {
      loginPage.loginUser(emailAddress, password)

      header.clickFavouritesPinIcon(true)
      favouritesPage.clickRemoveButton()
      favouritesPage.verifyEmptyFavouritesPageIsDisplayed()
      cy.get(header.headerFavouritesBadgeId).should('not.exist')
    })

    it.skip('#10 Add product to the basket from favourites', () => {
      loginPage.loginUser(emailAddress, password)

      header.clickFavouritesPinIcon(true)
      favouritesPage.clickAddToBasketButton()
      cy.get('@basketNotificationFF').then(basketNotificationFF => {
        skipOn(basketNotificationFF === true, () => {
          addToBasket.closeMinicart()
        })
      })
      header.checkItemsCount(1, 'be.at.least')
      header.clickBasketButton()
      basketPage.verifyProductTitle(productTitleText)
    })
  }
)

describe([FeatureTag.FAVOURITES], 'Logged in customer', () => {
  beforeEach(() => {
    const randomNumber = Date.now()
    emailAddress = `automation-${randomNumber}@atida.com`
    password = 'P@ssword1'

    let customerData = new CustomerData({
      data: new Customer({
        attributes: new Attributes({
          email: emailAddress,
          password: password,
          confirmPassword: password,
          addresses: new Addresses()
        })
      })
    })

    customersEndpoints.createCustomer(customerData).then(response => {
      expect(response.status).to.eql(201)
      cy.setLocalStorage('customerReference', response.body.data.id)
    })

    cy.visit('/login')

    loginPage.loginUser(emailAddress, password)
  })

  afterEach(() => {
    dbhelper.buildAndDeleteWhishlistItemQueryByUser(emailAddress)
    dbhelper.buildAndDeleteWhishlistQueryByUser(emailAddress)
    dbhelper.buildAndDeleteQueryByUser(emailAddress)
  })

  it('#1 Should see empty Favourites page after login', () => {
    header.clickFavouritesPinIcon(true)
    favouritesPage.verifyEmptyFavouritesPageIsDisplayed()
    cy.get(header.headerFavouritesBadgeId).should('not.exist')
  })

  it('#3 Should add a product to favourites from POP', () => {
    cy.visit(pageUri)
    cy.get(pop.productCardLink)
      .find(pop.productTileTitle)
      .first()
      .invoke('text')
      .then(text => {
        cy.wrap(text).as('productTitle')
      })
    pop.addFirstProductToFavorites()
    cy.get(header.headerFavouritesBadgeId).should('be.visible')
    header.clickFavouritesPinIcon(false)
    favouritesPage.getNumberOfProducts().should('contain.text', '1')
    favouritesPage
      .getProductTitle()
      .invoke('text')
      .then(text => {
        cy.wrap(text).as('favouritesProductTitle')
      })

    cy.get('@productTitle').then(expectedText => {
      cy.get('@favouritesProductTitle').then(text => {
        expect(expectedText).to.be.equal(text)
      })
    })
  })

  it('#4 Should add a product to favourites from a PDP', () => {
    cy.visit(pageUri)
    pop.openFirstProductPDP()
    cy.get(pdp.productTitle)
      .invoke('text')
      .then(text => {
        cy.wrap(text).as('productTitle')
      })
    pdp.addProductToFavorites()
    cy.get(header.headerFavouritesBadgeId).should('be.visible')
    header.clickFavouritesPinIcon(false)
    favouritesPage.getNumberOfProducts().should('contain.text', '1')
    favouritesPage
      .getProductTitle()
      .invoke('text')
      .then(text => {
        cy.wrap(text).as('favouritesProductTitle')
      })

    cy.get('@productTitle').then(expectedText => {
      cy.get('@favouritesProductTitle').then(text => {
        expect(expectedText).to.be.equal(text)
      })
    })

    it('#5 Should add a product to favourites from a POP list view', () => {
      cy.visit(pageUri)
      cy.get(pop.productCardLink)
        .find(pop.productTileTitle)
        .first()
        .invoke('text')
        .then(text => {
          cy.wrap(text).as('productTitle')
        })
      pop.openGridListView()
      pop.addFirstProductToFavorites()
      cy.get(header.headerFavouritesBadgeId).should('be.visible')
      header.clickFavouritesPinIcon(true)
      favouritesPage.getNumberOfProducts().should('contain.text', '1')
      favouritesPage
        .getProductTitle()
        .invoke('text')
        .then(text => {
          cy.wrap(text).as('favouritesProductTitle')
        })

      cy.get('@productTitle').then(expectedText => {
        cy.get('@favouritesProductTitle').then(text => {
          expect(expectedText).to.be.equal(text)
        })
      })
    })

    it('#8 Should add a product to favourites from recommendations', () => {
      cy.get(pop.productCardLink)
        .find(pop.productTileTitle)
        .first()
        .invoke('text')
        .then(text => {
          cy.wrap(text).as('productTitle')
        })
      homepage.addFirstRecommendedProductToFavourites()
      cy.get(header.headerFavouritesBadgeId).should('be.visible')
      header.clickFavouritesPinIcon(true)
      favouritesPage.getNumberOfProducts().should('contain.text', '1')
      favouritesPage
        .getProductTitle()
        .invoke('text')
        .then(text => {
          cy.wrap(text).as('favouritesProductTitle')
        })

      cy.get('@productTitle').then(expectedText => {
        cy.get('@favouritesProductTitle').then(text => {
          expect(expectedText).to.be.equal(text)
        })
      })
    })
  })
})

describe([FeatureTag.FAVOURITES], 'Logged out customer', () => {
  before(() => {
    cy.checkFlag(FeatureFlag.ACCOUNT_FAVOURITES_GUEST_FAVOURITES).then(
      guestFavourites => {
        cy.skipOn(guestFavourites === true)
      }
    )
  })

  beforeEach(() => {
    const randomNumber = Date.now()
    emailAddress = `automation-${randomNumber}@atida.com`
    password = 'P@ssword1'

    let customerData = new CustomerData({
      data: new Customer({
        attributes: new Attributes({
          email: emailAddress,
          password: password,
          confirmPassword: password,
          addresses: new Addresses()
        })
      })
    })

    customersEndpoints.createCustomer(customerData).then(response => {
      expect(response.status).to.eql(201)
      cy.setLocalStorage('customerReference', response.body.data.id)
    })

    cy.visit(pageUri)
  })

  afterEach(() => {
    dbhelper.buildAndDeleteWhishlistItemQueryByUser(emailAddress)
    dbhelper.buildAndDeleteWhishlistQueryByUser(emailAddress)
    dbhelper.buildAndDeleteQueryByUser(emailAddress)
  })

  it('#14 Logged out customers should be redirected to the login page after clicking header pin icon', () => {
    header.clickFavouritesPinIcon(false)
    loginPage.verifyLoginFormIsDisplayed()
    getErrorMessage(loginPage.notificatonWrapperId)
  })

  it('#15 Logged out customers should be redirected to the login page when trying to pin a product from the product tile - grid view', () => {
    pop.addFirstProductToFavorites()
    loginPage.verifyLoginFormIsDisplayed()
    getErrorMessage(loginPage.notificatonWrapperId)
  })

  it('#33 Logged out customers should be redirected to the login page when trying to pin a product from the product tile - list view', () => {
    pop.openGridListView()
    pop.addFirstProductToFavorites()
    loginPage.verifyLoginFormIsDisplayed()
    getErrorMessage(loginPage.notificatonWrapperId)
  })

  it('#16 Logged out customers should be redirected to the login page when trying to pin a product from PDP', () => {
    pop.openFirstProductPDP()
    pdp.addProductToFavorites()
    loginPage.verifyLoginFormIsDisplayed()
    getErrorMessage(loginPage.notificatonWrapperId)
  })

  it('#32 Products should be added to the favourites list after login', () => {
    cy.visit(pageUri)
    cy.get(pop.productCardLink)
      .find('h3')
      .first()
      .invoke('text')
      .then(text => {
        cy.wrap(text).as('productTitle')
      })
    pop.addFirstProductToFavorites()
    loginPage.verifyLoginFormIsDisplayed()
    loginPage.loginUser(emailAddress, password)

    favouritesPage.getNumberOfProducts().should('contain.text', '1')

    favouritesPage
      .getProductTitle()
      .invoke('text')
      .then(text => {
        cy.wrap(text).as('favouritesProductTitle')
      })

    cy.get('@productTitle').then(expectedText => {
      cy.get('@favouritesProductTitle').then(text => {
        expect(expectedText).to.be.equal(text)
      })
    })
  })
})
