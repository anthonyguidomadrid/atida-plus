import { AccountType } from '../../../enums/accountType'
import { Gender } from '../../../enums/gender'
import { Salutation } from '../../../enums/salutation'
import { Addresses } from './addresses'

export class Attributes {
  constructor({
    faker = require('faker'),
    randomNumber = Date.now(),
    randomFirstName = faker.name.firstName(),
    randomLastName = faker.name.lastName(),
    genderMale = Gender.MALE,
    salutationMr = Salutation.MR,
    randomEmail = `automationApi-${randomNumber}@gmail.com`,
    randomPassword = 'H6q!QEzh',
    acceptedTermsTrue = true,
    surchargeFalse = false,
    companyName = null,
    taxReferenceValue = Cypress.env('locale') == 'es'
      ? '12345678R'
      : '123456789',
    accountTypeBusiness = AccountType.PERSONAL,
    firstName = randomFirstName,
    lastName = randomLastName,
    gender = genderMale,
    salutation = salutationMr,
    email = randomEmail,
    password = randomPassword,
    confirmPassword = randomPassword,
    acceptedTerms = acceptedTermsTrue,
    addresses = new Addresses(),
    surcharge = surchargeFalse,
    taxReference = taxReferenceValue,
    accountType = accountTypeBusiness,
    company = companyName
  } = {}) {
    this.firstName = firstName
    this.lastName = lastName
    this.gender = gender
    this.salutation = salutation
    this.email = email
    this.password = password
    this.confirmPassword = confirmPassword
    this.acceptedTerms = acceptedTerms
    this.addresses = addresses
    this.surcharge = surcharge
    this.taxReference = taxReference
    this.accountType = accountType
    this.company = company
  }
}
