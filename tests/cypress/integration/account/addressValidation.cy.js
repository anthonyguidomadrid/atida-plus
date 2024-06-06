import { addressDetailsEs } from '../../fixtures/esAddresses'
import { addressDetailsPt } from '../../fixtures/ptAddresses'
import { registrationPage } from '../../support/page-objects/pages/account/registrationPage'

const faker = require('faker')
const logger = require('pino')()
const result = []
// file path needs to be specified
const filePath = ''

describe.skip('Address Validation', () => {
  beforeEach(() => {
    cy.visit('/create-account')
  })

  after(() => {
    cy.writeFile(filePath, result)
  })

  addressDetailsEs.forEach(address => {
    it('Address validation ES' + address.address, () => {
      registrationPage.enterFirstName(faker.name.firstName())
      registrationPage.enterLastName(faker.name.lastName())
      registrationPage.enterEmailAddress('address+es@atida.com')
      registrationPage.enterPassword('P@ssword1')
      registrationPage.clickContinueButton()
      registrationPage.enterShippingAddressStreet(address.address)
      registrationPage.enterShippingAddressHouseNumber(address.houseNumber)
      registrationPage.enterShippingAddressZipCode(address.zipCode)
      cy.get(registrationPage.createAccountFormZipCodeId).blur()

      cy.intercept('GET', '/api/address/validate-address*').as(
        'validateAddress'
      )
      cy.wait('@validateAddress').then(({ response }) => {
        if (response.body.items[0]) {
          cy.log('Score: ' + String(response.body.items[0].scoring.queryScore))
          result.push(
            `${address.address}; ${address.houseNumber}; ${address.zipCode}; ${
              address.city
            }; ${address.province}; ${String(
              response.body.items[0].scoring.queryScore
            )};`
          )

          logger.info('Score: ' + response.body.items[0].scoring.queryScore)
        } else {
          cy.log('Score: ' + String(response.body.items[0].scoring.queryScore))
          result.push(
            `${address.address}; ${address.houseNumber}; ${address.zipCode}; ${address.city}; ${address.province}; 'No score';`
          )
          cy.log('Result not found')
        }
      })

      cy.get(registrationPage.createAccountFormCityId).should(
        'have.value',
        address.city
      )

      cy.get(
        registrationPage.addressShippingAddressFormSubdivisionSelectorId
      ).should('have.value', address.province)
    })
  })

  addressDetailsPt.forEach(address => {
    it('Address validation PT' + address.address, () => {
      registrationPage.enterFirstName(faker.name.firstName())
      registrationPage.enterLastName(faker.name.lastName())
      registrationPage.enterEmailAddress('address+pt@atida.com')
      registrationPage.enterPassword('P@ssword1')
      registrationPage.clickContinueButton()
      registrationPage.enterShippingAddressStreet(address.address)
      registrationPage.enterShippingAddressHouseNumber(address.houseNumber)
      registrationPage.enterShippingAddressZipCode(address.zipCode)
      cy.get(registrationPage.createAccountFormZipCodeId).blur()

      cy.intercept('GET', '/api/address/validate-address*').as(
        'validateAddress'
      )
      cy.wait('@validateAddress').then(({ response }) => {
        if (response.body.items[0]) {
          cy.log('Score: ' + String(response.body.items[0].scoring.queryScore))
          result.push(
            `${address.address}; ${address.houseNumber}; ${address.zipCode}; ${
              address.city
            }; ${address.district}; ${String(
              response.body.items[0].scoring.queryScore
            )};`
          )

          logger.info('Score: ' + response.body.items[0].scoring.queryScore)
        } else {
          cy.log('Score: ' + String(response.body.items[0].scoring.queryScore))
          result.push(
            `${address.address}; ${address.houseNumber}; ${address.zipCode}; ${address.city}; ${address.district}; 
            'No score';`
          )
          cy.log('Result not found')
        }
      })

      cy.get(registrationPage.createAccountFormCityId).should(
        'have.value',
        address.city
      )

      cy.get(
        registrationPage.addressShippingAddressFormSubdivisionSelectorId
      ).should('have.value', address.district)
    })
  })
})
