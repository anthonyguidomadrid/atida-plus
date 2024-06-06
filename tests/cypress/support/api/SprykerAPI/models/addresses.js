import { Address } from './address'

export class Addresses {
  constructor({ addresses = [new Address()] } = {}) {
    this.addresses = addresses
  }
}
