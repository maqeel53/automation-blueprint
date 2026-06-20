class CheckoutStepOnePage {
  constructor(page) {
    this.page = page
  }

  //========Getters========

  get pageTitle() {
    return this.page.locator('[data-test="title"]')
  }

  get firstNameInput() {
    return this.page.locator('[data-test="firstName"]')
  }

  get lastNameInput() {
    return this.page.locator('[data-test="lastName"]')
  }

  get postalCodeInput() {
    return this.page.locator('[data-test="postalCode"]')
  }

  get continueButton() {
    return this.page.locator('[data-test="continue"]')
  }

  get cancelButton() {
    return this.page.locator('[data-test="cancel"]')
  }

  get errorMessage() {
    return this.page.locator('[data-test="error"]')
  }

  //========Actions========

  async fillCheckoutInfo(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName)
    await this.lastNameInput.fill(lastName)
    await this.postalCodeInput.fill(postalCode)
  }

  async submitForm() {
    await this.continueButton.click()
  }

  async cancelCheckout() {
    await this.cancelButton.click()
  }

  async getErrorText() {
    return await this.errorMessage.textContent()
  }
}

export default CheckoutStepOnePage
