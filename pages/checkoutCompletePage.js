class CheckoutCompletePage {
  constructor(page) {
    this.page = page
  }

  //========Getters========

  get pageTitle() {
    return this.page.locator('[data-test="title"]')
  }

  get completeHeader() {
    return this.page.locator('[data-test="complete-header"]')
  }

  get completeText() {
    return this.page.locator('[data-test="complete-text"]')
  }

  get backHomeButton() {
    return this.page.locator('[data-test="back-to-products"]')
  }

  get ponyExpressImage() {
    return this.page.locator('[data-test="pony-express"]')
  }

  //========Actions========

  async goBackHome() {
    await this.backHomeButton.click()
  }

  async getSuccessMessage() {
    return await this.completeHeader.textContent()
  }
}

export default CheckoutCompletePage
