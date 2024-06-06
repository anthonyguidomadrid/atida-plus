class Helper {
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  getErrorMessage(selectors, errorText = '') {
    if (Array.isArray(selectors)) {
      selectors.forEach(selector => {
        cy.checkElementTextIsNotEmpty(selector, errorText)
      })
    } else {
      cy.checkElementTextIsNotEmpty(selectors, errorText)
    }
  }

  getProductImageUrl = (url, derivative) => {
    if (url) {
      return url
        .replace(/([^.]*)$/, 'png')
        .replace(/webimage-/, `Product%20${derivative}-`)
    }
    return `/images/no-image-Product%20${derivative}.png`
  }
}

module.exports = new Helper()
