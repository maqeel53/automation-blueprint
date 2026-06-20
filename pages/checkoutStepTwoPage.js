class CheckoutStepTwoPage {
  constructor(page) {
    this.page = page
  }

  //========Getters========

  get pageTitle() {
    return this.page.locator('[data-test="title"]')
  }

  get cartItems() {
    return this.page.locator('[data-test="inventory-item"]')
  }

  get subtotalLabel() {
    return this.page.locator('[data-test="subtotal-label"]')
  }

  get taxLabel() {
    return this.page.locator('[data-test="tax-label"]')
  }

  get totalLabel() {
    return this.page.locator('[data-test="total-label"]')
  }

  get finishButton() {
    return this.page.locator('[data-test="finish"]')
  }

  get cancelButton() {
    return this.page.locator('[data-test="cancel"]')
  }

  //========Actions========

  async finishOrder() {
    await this.finishButton.click()
  }

  async cancelOrder() {
    await this.cancelButton.click()
  }

  async getItemNames() {
    return await this.page.locator('[data-test="inventory-item-name"]').allTextContents()
  }

  async getSubtotal() {
    const text = await this.subtotalLabel.textContent()
    return parseFloat(text.replace(/[^0-9.]/g, ''))
  }

  async getTax() {
    const text = await this.taxLabel.textContent()
    return parseFloat(text.replace(/[^0-9.]/g, ''))
  }

  async getTotal() {
    const text = await this.totalLabel.textContent()
    return parseFloat(text.replace(/[^0-9.]/g, ''))
  }
}

export default CheckoutStepTwoPage
