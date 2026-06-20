class ProductsPage {
  constructor(page) {
    this.page = page
  }

  //========Getters========

  get pageTitle() {
    return this.page.locator('[data-test="title"]')
  }

  get inventoryList() {
    return this.page.locator('[data-test="inventory-list"]')
  }

  get inventoryItems() {
    return this.page.locator('[data-test="inventory-item"]')
  }

  get sortDropdown() {
    return this.page.locator('[data-test="product-sort-container"]')
  }

  get cartBadge() {
    return this.page.locator('[data-test="shopping-cart-badge"]')
  }

  get cartLink() {
    return this.page.locator('[data-test="shopping-cart-link"]')
  }

  //========Actions========

  async addToCart(productKey) {
    await this.page.locator(`[data-test="add-to-cart-${productKey}"]`).click()
  }

  async removeFromCart(productKey) {
    await this.page.locator(`[data-test="remove-${productKey}"]`).click()
  }

  async sortBy(sortValue) {
    await this.sortDropdown.selectOption(sortValue)
  }

  async goToCart() {
    await this.cartLink.click()
  }

  async getProductNames() {
    return await this.page.locator('[data-test="inventory-item-name"]').allTextContents()
  }

  async getProductPrices() {
    return await this.page.locator('[data-test="inventory-item-price"]').allTextContents()
  }

  async getCartBadgeCount() {
    return await this.cartBadge.textContent()
  }

  async clickProduct(productName) {
    await this.page.locator(`[data-test="inventory-item-name"]:has-text("${productName}")`).click()
  }
}

export default ProductsPage
