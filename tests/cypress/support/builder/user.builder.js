const faker = require('faker')

export class UserBuilder {
  constructor(data) {
    this.locale = data.locale
    this.accountType = data.accountType
    const randomNumber = Date.now()
    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()
    const password = 'H6q!QEzh'
    const address = faker.address.streetAddress()
    const phone = faker.phone.phoneNumberFormat()
    const city = faker.address.city()
    const email = `automation-${randomNumber}@gmail.com`
    const taxReference = data.taxReference
    const surcharge = data.surcharge ? data.surcharge : false
    this.user = {
      email: email,
      salutation: 'Mr',
      firstName: firstName,
      lastName: lastName,
      address: address,
      zipCode: this.locale == 'pt' ? '2740-029' : '27400',
      city: city,
      phone: phone,
      password: password,
      taxReference: taxReference,
      surcharge: surcharge
    }
  }

  setFirstName(firstName) {
    this.user.firstName = firstName
    return this
  }

  setLastName(lastName) {
    this.user.lastName = lastName
    return this
  }

  setEmail(email) {
    this.user.email = email
    return this
  }

  setAddress(address) {
    this.user.address = address
    return this
  }

  setZipCode(zipCode) {
    this.user.zipCode = zipCode
    return this
  }

  setCity(city) {
    this.user.city = city
    return this
  }

  setPhone(phone) {
    this.user.phone = phone
    return this
  }

  setPassword(password) {
    this.user.password = password
    return this
  }

  setCompany(company) {
    this.user.company = company
    return this
  }

  setSurcharge(boolean) {
    this.user.surcharge = boolean
    return this
  }

  build() {
    return this.user
  }

  buildCustomerData() {
    return {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      salutation: this.user.salutation,
      email: this.user.email,
      password: this.user.password,
      confirmPassword: this.user.password,
      acceptedTerms: true,
      emailNotification: false,
      accountType: this.accountType,
      company: this.user.company,
      surcharge: this.user.surcharge,
      taxReference: this.user.taxReference,
      company: this.user.company,
      addresses: {
        addresses: [
          {
            salutation: this.user.salutation,
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            address1: this.user.address,
            zipCode: this.user.zipCode,
            city: this.user.city,
            iso2Code: this.locale.toUpperCase(),
            phone: this.user.phone,
            isDefaultShipping: true,
            isDefaultBilling: true
          }
        ]
      }
    }
  }
}
