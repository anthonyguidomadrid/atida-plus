import { customerAPI } from '../../support/api/endpoints/customer'
import { UserBuilder } from '../../support/builder/user.builder'

describe('Create customer API tests', () => {
  it('creates customer', () => {
    let userData = new UserBuilder().buildCustomerData()
    customerAPI.createCustomer(userData).then(response => {
      expect(response.status).to.eql(200)
    })
  })
})
