import { header } from '../../support/page-objects/components/header'
import { addressBookPage } from '../../support/page-objects/pages/account/addressBookPage'
import { Address } from '../../support/api/SprykerAPI/models/address'
import { Addresses } from '../../support/api/SprykerAPI/models/addresses'
import { Attributes } from '../../support/api/SprykerAPI/models/attributes'
import {
  CustomerData,
  Customer
} from '../../support/api/SprykerAPI/models/customer'
import { DbHelper } from '../../support/db.helper'
import { AccountType } from '../../support/enums/accountType'
import { District } from '../../support/enums/district'
import { registrationPage } from '../../support/page-objects/pages/account/registrationPage'
import { FeatureTag } from '../../support/enums/featureTag'
import { accountDetailsPage } from '../../support/page-objects/pages/account/accountDetailsPage'
import { getErrorMessage } from '../../support/helper'
import { onlyOn } from '@cypress/skip-test'
import { Province } from '../../support/enums/province'
import { notificationPopUp } from '../../support/page-objects/components/notificationPopUp'

const dbhelper = new DbHelper()
const pageUri = 'create-account'
let emailAddress
const faker = require('faker')

onlyOn(Cypress.env('locale') == 'pt', () => {
  describe(
    [FeatureTag.MULTI_STEP_REGISTRATION_FORM],
    'Multi-step registration form PT store',
    () => {
      beforeEach(() => {
        let randomNumber = Date.now()
        emailAddress = `automation-${randomNumber}@gmail.com`
        cy.visit(pageUri)
      })

      afterEach(() => {
        dbhelper.buildAndDeleteQueryByUser(emailAddress)
      })

      it([SuiteTag.SMOKE], '#539 Creates personal account', () => {
        let shipingAddress = new Address({
          district: District.BURGOS
        })

        let customerData = new CustomerData({
          data: new Customer({
            attributes: new Attributes({
              email: emailAddress,
              accountType: AccountType.PERSONAL,
              addresses: new Addresses({
                addresses: [shipingAddress]
              })
            })
          })
        })
        const data = {
          email: customerData.data.attributes.email,
          name: `${customerData.data.attributes.firstName} ${customerData.data.attributes.lastName}`,
          phone: customerData.data.attributes.addresses.addresses[0].phone
        }

        registrationPage.createCustomer(customerData)
        notificationPopUp.clickConfirmationButton()

        header.openAccountDetails()
        accountDetailsPage.getPersonalDetailsBlock(data)
      })

      it([SuiteTag.SMOKE], '#540 Creates business account', () => {
        let shipingAddress = new Address({
          district: District.BEJA
        })

        let customerData = new CustomerData({
          data: new Customer({
            attributes: new Attributes({
              email: emailAddress,
              accountType: AccountType.BUSINESS,
              taxReference: '123456789',
              company: 'Atida',
              addresses: new Addresses({
                addresses: [shipingAddress]
              })
            })
          })
        })
        const data = {
          email: customerData.data.attributes.email,
          name: `${customerData.data.attributes.firstName} ${customerData.data.attributes.lastName}`,
          phone: customerData.data.attributes.addresses.addresses[0].phone
        }

        const businessData = {
          companyName: customerData.data.attributes.company,
          taxReference: customerData.data.attributes.taxReference
        }

        registrationPage.createCustomer(customerData)
        notificationPopUp.clickConfirmationButton()
        header.openAccountDetails()
        accountDetailsPage.getPersonalDetailsBlock(data)
        accountDetailsPage.getBusinessDetailsBlock(businessData)
      })

      it(
        [SuiteTag.SMOKE],
        '#538 Sets separate billing address (Personal account)',
        () => {
          let shipingAddress = new Address({
            district: District.CANTABRIA
          })

          let billingAddress = new Address({
            district: District.BRAGA
          })

          let customerData = new CustomerData({
            data: new Customer({
              attributes: new Attributes({
                email: emailAddress,
                accountType: AccountType.PERSONAL,
                addresses: new Addresses({
                  addresses: [shipingAddress, billingAddress]
                })
              })
            })
          })

          registrationPage.createCustomer(customerData, false)
          notificationPopUp.clickConfirmationButton()

          header.openAddressBook()

          addressBookPage.isNumberOfAddressesCorrect(2)
          addressBookPage.verifyDefaultDeliveryAddressLabelIsDisplayed()
          addressBookPage.verifyDefaultBillingAddressLabelIsDisplayed(1)
        }
      )

      it(
        [SuiteTag.SMOKE],
        '#562 Sets separate billing address (Business account)',
        () => {
          let shipingAddress = new Address({
            district: District.EVORA
          })

          let billingAddress = new Address({
            district: District.BRAGA
          })

          let customerData = new CustomerData({
            data: new Customer({
              attributes: new Attributes({
                email: emailAddress,
                accountType: AccountType.BUSINESS,
                taxReference: '123456789',
                company: 'Atida',
                addresses: new Addresses({
                  addresses: [shipingAddress, billingAddress]
                })
              })
            })
          })

          registrationPage.createCustomer(customerData, false)
          notificationPopUp.clickConfirmationButton()

          header.openAddressBook()

          addressBookPage.isNumberOfAddressesCorrect(2)
          addressBookPage.verifyDefaultDeliveryAddressLabelIsDisplayed()
          addressBookPage.verifyDefaultBillingAddressLabelIsDisplayed(1)
        }
      )

      it(
        [SuiteTag.SMOKE],
        '#536 Marks address as default delivery and default billing when "Same as delivery" checkbox is checked',
        () => {
          let shipingAddress = new Address({
            district: District.CANTABRIA
          })

          let customerData = new CustomerData({
            data: new Customer({
              attributes: new Attributes({
                email: emailAddress,
                accountType: AccountType.BUSINESS,
                taxReference: '123456789',
                company: 'Atida',
                addresses: new Addresses({
                  addresses: [shipingAddress]
                })
              })
            })
          })

          registrationPage.createCustomer(customerData)
          notificationPopUp.clickConfirmationButton()
          header.openAddressBook()
          addressBookPage.isNumberOfAddressesCorrect(1)
          addressBookPage.verifyDefaultDeliveryAddressLabelIsDisplayed()
          addressBookPage.verifyDefaultBillingAddressLabelIsDisplayed()
        }
      )

      it('#622 Enforces company name for business account', () => {
        let shipingAddress = new Address({
          district: District.BRAGA
        })

        let customerData = new CustomerData({
          data: new Customer({
            attributes: new Attributes({
              email: emailAddress,
              accountType: AccountType.BUSINESS,
              taxReference: '123456789',
              company: 'Atida',
              addresses: new Addresses({
                addresses: [shipingAddress]
              })
            })
          })
        })

        registrationPage.changeAccountType()
        registrationPage.fillFirstStep(customerData)
        registrationPage.clickContinueButton()
        registrationPage.fillSecondStep(customerData, true)
        cy.get(registrationPage.addressFormCompanyFieldId).clear()
        registrationPage.clickSubmitButton()

        getErrorMessage(registrationPage.companyFieldErrorId)
      })
    }
  )
})

onlyOn(Cypress.env('locale') == 'es', () => {
  describe(
    [FeatureTag.MULTI_STEP_REGISTRATION_FORM],
    'Multi-step registration form ES store',
    () => {
      beforeEach(() => {
        let randomNumber = Date.now()
        emailAddress = `automation-${randomNumber}@gmail.com`
        cy.visit(pageUri)
      })

      afterEach(() => {
        dbhelper.buildAndDeleteQueryByUser(emailAddress)
      })

      it([SuiteTag.SMOKE], '#539 Creates personal account', () => {
        let shipingAddress = new Address({
          province: Province.BARCELONA,
          zipCode: '23434'
        })

        let customerData = new CustomerData({
          data: new Customer({
            attributes: new Attributes({
              email: emailAddress,
              accountType: AccountType.PERSONAL,
              addresses: new Addresses({
                addresses: [shipingAddress]
              })
            })
          })
        })
        const data = {
          email: customerData.data.attributes.email,
          name: `${customerData.data.attributes.firstName} ${customerData.data.attributes.lastName}`,
          phone: customerData.data.attributes.addresses.addresses[0].phone
        }

        registrationPage.createCustomer(customerData)
        notificationPopUp.clickConfirmationButton()
        header.clickLinkFromAccounMenu(header.accountMenuDetailsLinkId)
        accountDetailsPage.getPersonalDetailsBlock(data)
      })

      it([SuiteTag.SMOKE], '#540 Creates business account', () => {
        let shipingAddress = new Address({
          province: Province.BALEARES,
          zipCode: '23434'
        })

        let customerData = new CustomerData({
          data: new Customer({
            attributes: new Attributes({
              email: emailAddress,
              accountType: AccountType.BUSINESS,
              taxReference: '12345678A',
              company: 'Atida',
              addresses: new Addresses({
                addresses: [shipingAddress]
              })
            })
          })
        })
        const data = {
          email: customerData.data.attributes.email,
          name: `${customerData.data.attributes.firstName} ${customerData.data.attributes.lastName}`,
          phone: customerData.data.attributes.addresses.addresses[0].phone
        }

        const businessData = {
          companyName: customerData.data.attributes.company,
          taxReference: customerData.data.attributes.taxReference
        }

        registrationPage.createCustomer(customerData)
        notificationPopUp.clickConfirmationButton()
        header.clickLinkFromAccounMenu(header.accountMenuDetailsLinkId)
        accountDetailsPage.getPersonalDetailsBlock(data)
        accountDetailsPage.getBusinessDetailsBlock(businessData)
      })

      it('#538 Sets separate billing address (Personal account)', () => {
        let shipingAddress = new Address({
          province: Province.BURGOS,
          zipCode: '35877'
        })

        let billingAddress = new Address({
          province: Province.CANTABRIA,
          zipCode: '34555'
        })

        let customerData = new CustomerData({
          data: new Customer({
            attributes: new Attributes({
              email: emailAddress,
              accountType: AccountType.PERSONAL,
              addresses: new Addresses({
                addresses: [shipingAddress, billingAddress]
              })
            })
          })
        })

        registrationPage.createCustomer(customerData, false)
        notificationPopUp.clickConfirmationButton()

        header.openAddressBook()

        addressBookPage.isNumberOfAddressesCorrect(2)
        addressBookPage.verifyDefaultDeliveryAddressLabelIsDisplayed()
        addressBookPage.verifyDefaultBillingAddressLabelIsDisplayed(1)
      })

      it('#562 Sets separate billing address (Business account)', () => {
        let shipingAddress = new Address({
          province: Province.CANTABRIA,
          zipCode: '35877'
        })

        let billingAddress = new Address({
          province: Province.LA_RIOJA,
          zipCode: '35855'
        })

        let customerData = new CustomerData({
          data: new Customer({
            attributes: new Attributes({
              email: emailAddress,
              accountType: AccountType.BUSINESS,
              taxReference: 'X12345678S',
              company: 'Atida',
              addresses: new Addresses({
                addresses: [shipingAddress, billingAddress]
              })
            })
          })
        })

        registrationPage.createCustomer(customerData, false)
        notificationPopUp.clickConfirmationButton()
        header.openAddressBook()

        addressBookPage.isNumberOfAddressesCorrect(2)
        addressBookPage.verifyDefaultDeliveryAddressLabelIsDisplayed()
        addressBookPage.verifyDefaultBillingAddressLabelIsDisplayed(1)
      })

      it(
        [SuiteTag.SMOKE],
        '#536 Marks address as default delivery and default billing when "Same as delivery" checkbox is checked',
        () => {
          let shipingAddress = new Address({
            province: Province.ZAMORA,
            zipCode: '26554'
          })

          let customerData = new CustomerData({
            data: new Customer({
              attributes: new Attributes({
                email: emailAddress,
                accountType: AccountType.BUSINESS,
                taxReference: '12345678S',
                company: 'Atida',
                addresses: new Addresses({
                  addresses: [shipingAddress]
                })
              })
            })
          })

          registrationPage.createCustomer(customerData)
          notificationPopUp.clickConfirmationButton()
          header.openAddressBook()
          addressBookPage.isNumberOfAddressesCorrect(1)
          addressBookPage.verifyDefaultDeliveryAddressLabelIsDisplayed()
          addressBookPage.verifyDefaultBillingAddressLabelIsDisplayed()
        }
      )
    }
  )
})

describe(
  [FeatureTag.MULTI_STEP_REGISTRATION_FORM],
  'Account creation basics',
  () => {
    const incorrectEmailList = [
      'tets@gmai.com',
      'test@hmail.com',
      'test@g-mail.com',
      'test@gmaill.com',
      'test@gamil.com',
      'test@gnail.com',
      'test@gmial.com',
      'test@gamil.com',
      'test@hot-mail.com',
      'test@hoymail.com',
      'test@homail.com',
      'test@hotmai.com',
      'test@htomail.com',
      'test@hotmaill.com',
      'test@hornail.com',
      'test@hotnail.com',
      'test@htmail.com',
      'test@yagoo.com',
      'test@tahoo.com',
      'test@yaoo.com',
      'test@ya-hoo.com',
      'test@yahooo.com',
      'test@yaho.com',
      'test@yajoo.com',
      'test@yah00.com',
      'test@gmail.con',
      'test@yahoo.cmo'
    ]

    const incorrectPasswordList = [
      'P@ss123',
      'Passwrd',
      'GHUdB8nVJsMLLE87T44aMweiK6bExMKm6qpNrUxbXgrmxqdrq7ohr8I65XbPQ8q6jlzhVRaaa'
    ]

    const invalidEmailAddressList = [
      'emailAddress',
      'example.com',
      '.test@domain.com',
      'test@domain..com'
    ]

    beforeEach(() => {
      cy.viewportPreset('samsung-s10-plus')
      cy.visit(pageUri)
    })

    it('#466 Should get notification when mistyped email addresses', () => {
      incorrectEmailList.forEach(incorrectEmail => {
        registrationPage.enterEmailAddress(incorrectEmail)

        cy.get(registrationPage.createAccountFormEmailId).blur()
        getErrorMessage(registrationPage.notificationId)
      })
    })

    it(
      [SuiteTag.SMOKE],
      '#470 The required fields on the first step of the multi-step registration form cannot be empty',
      () => {
        registrationPage.clickContinueButton()
        getErrorMessage([
          registrationPage.firstNameErrorId,
          registrationPage.lastNameErrorId,
          registrationPage.emailErrorId,
          registrationPage.passwordErrorId
        ])

        cy.url().should('contain', pageUri)
      }
    )

    it(
      [SuiteTag.SMOKE],
      '#468 Should get an error when the password is not valid, #473 Should get an error when password is too short',
      () => {
        registrationPage.enterFirstName(faker.name.firstName())
        registrationPage.enterLastName(faker.name.lastName())
        registrationPage.enterEmailAddress(faker.internet.email())
        incorrectPasswordList.forEach(incorrectPassword => {
          registrationPage.enterPassword(incorrectPassword)
          registrationPage.clickContinueButton()
          getErrorMessage(registrationPage.passwordErrorId)
        })
      }
    )

    it(
      [SuiteTag.SMOKE],
      '#467 Should get error when the email is not valid',
      () => {
        registrationPage.enterFirstName(faker.name.firstName())
        registrationPage.enterLastName(faker.name.lastName())
        registrationPage.enterPassword('P@ssword1')
        invalidEmailAddressList.forEach(invalidEmailAddress => {
          registrationPage.enterEmailAddress(invalidEmailAddress)
          registrationPage.clickContinueButton()
          getErrorMessage(registrationPage.emailErrorId)
        })
      }
    )

    it('#471 Should get an error when firstName is too long', () => {
      registrationPage.enterFirstName(faker.random.alphaNumeric(101))
      registrationPage.enterLastName(faker.name.lastName())
      registrationPage.enterPassword('P@ssword1')
      registrationPage.enterEmailAddress(faker.internet.email())
      registrationPage.clickContinueButton()

      getErrorMessage(registrationPage.firstNameErrorId)
    })

    it('#472 Should get an error when lastName is too long', () => {
      registrationPage.enterFirstName(faker.name.firstName())
      registrationPage.enterLastName(faker.random.alphaNumeric(101))
      registrationPage.enterPassword('P@ssword1')
      registrationPage.enterEmailAddress(faker.internet.email())
      registrationPage.clickContinueButton()

      getErrorMessage(registrationPage.lastNameErrorId)
    })

    it('#474 Should get an error when password is too long', () => {
      registrationPage.enterFirstName(faker.name.firstName())
      registrationPage.enterLastName(faker.name.lastName())
      registrationPage.enterPassword(faker.random.alphaNumeric(73))
      registrationPage.enterEmailAddress(faker.internet.email())
      registrationPage.clickContinueButton()

      getErrorMessage(registrationPage.passwordErrorId)
    })
  }
)
