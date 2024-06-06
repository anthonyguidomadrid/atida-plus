export class Login {
  constructor(attributes) {
    this.type = 'access-tokens'
    this.attributes = attributes
  }
}

class Attributes {
  constructor(username, password) {
    this.username = username
    this.password = password
  }
}

export class LoginData {
  constructor(username, password) {
    this.data = new Login(new Attributes(username, password))
  }
}
