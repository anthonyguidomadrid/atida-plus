import { Attributes } from './attributes'

const faker = require('faker')
export class Customer {
  constructor({ attributes = new Attributes() } = {}) {
    this.type = 'customers'
    this.attributes = attributes
  }
}

export class CustomerData {
  constructor({ data = new Customer() } = {}) {
    this.data = data
  }
}
