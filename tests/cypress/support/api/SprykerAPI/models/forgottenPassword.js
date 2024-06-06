class ForgottenPassword {
  constructor(email) {
    this.type = 'customer-forgotten-password'
    this.attributes = new Attributes(email)
  }
}

class Attributes {
  constructor(email) {
    this.email = email
  }
}

export class ForgottenPasswordData {
  constructor(email) {
    this.data = new ForgottenPassword(email)
  }
}
