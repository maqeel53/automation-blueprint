class CartPage {
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

  get checkoutButton() {
    return this.page.locator('[data-test="checkout"]')
  }

  get continueShoppingButton() {
    return this.page.locator('[data-test="continue-shopping"]')
  }

  //========Actions========

  async getItemNames() {
    return await this.page.locator('[data-test="inventory-item-name"]').allTextContents()
  }

  async getItemPrices() {
    return await this.page.locator('[data-test="inventory-item-price"]').allTextContents()
  }

  async removeItem(productKey) {
    await this.page.locator(`[data-test="remove-${productKey}"]`).click()
  }

  async proceedToCheckout() {
    await this.checkoutButton.click()
  }

  async continueShopping() {
    await this.continueShoppingButton.click()
  }

  async getCartItemCount() {
    return await this.cartItems.count()
  }
}

export default CartPage
