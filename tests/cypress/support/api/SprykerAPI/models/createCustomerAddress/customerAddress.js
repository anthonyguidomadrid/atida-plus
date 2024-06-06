import { District } from '../../../../enums/district'
import { Iso2Code } from '../../../../enums/iso2Code'
import { Province } from '../../../../enums/province'
import { Salutation } from '../../../../enums/salutation'

class Attributes {
  constructor({
    faker = require('faker'),
    randomFirstName = faker.name.firstName(),
    randomLastName = faker.name.lastName(),
    salutationMr = Salutation.MR,
    randomAddress1 = faker.address.streetAddress(),
    randomAddress2 = '',
    randomPhone = faker.phone.phoneNumberFormat(),
    randomCity = faker.address.city(),
    companyName = null,
    ptZipCode = Cypress.env('locale') == 'es' ? '43433' : '1234-122',
    ptIso2Code = Cypress.env('locale') == 'es' ? Iso2Code.ES : Iso2Code.PT,
    houseNumber = '5A',
    addition = 'additional address information',
    district = Cypress.env('locale') == 'es' ? '' : District.BRAGA,
    province = Cypress.env('locale') == 'es' ? Province.TARRAGONA : '',
    isDefaultShipping = false,
    isDefaultBilling = true,

    salutation = salutationMr,
    firstName = randomFirstName,
    lastName = randomLastName,
    address1 = randomAddress1,
    address2 = randomAddress2,
    zipCode = ptZipCode,
    city = randomCity,
    iso2Code = ptIso2Code,
    company = companyName,
    phone = randomPhone,
    houseNumber = houseNumber,
    addition = addition,
    district = district,
    province = province,
    isDefaultShipping = isDefaultShipping,
    isDefaultBilling = isDefaultBilling
  } = {}) {
    this.salutation = salutation
    this.firstName = firstName
    this.lastName = lastName
    this.address1 = address1
    this.address2 = address2
    this.zipCode = zipCode
    this.city = city
    this.iso2Code = iso2Code
    this.company = company
    this.phone = phone
    this.houseNumber = houseNumber
    this.addition = addition
    this.district = district
    this.province = province
    this.isDefaultBilling = isDefaultBilling
    this.isDefaultShipping = isDefaultShipping
  }
}

export class CustomerAddress {
  constructor({ attributes = new Attributes() } = {}) {
    this.type = 'addresses'
    this.attributes = attributes
  }
}

export class CustomerAddressData {
  constructor({ data = new CustomerAddress() } = {}) {
    this.data = data
  }
}
