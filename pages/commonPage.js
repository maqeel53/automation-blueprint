class CommonPage {
  constructor(page) {
    this.page = page
  }

  //========Getters========

  get burgerMenuButton() {
    return this.page.locator('#react-burger-menu-btn')
  }

  get closeBurgerMenu() {
    return this.page.locator('#react-burger-cross-btn')
  }

  get allItemsLink() {
    return this.page.locator('[data-test="inventory-sidebar-link"]')
  }

  get aboutLink() {
    return this.page.locator('[data-test="about-sidebar-link"]')
  }

  get logoutLink() {
    return this.page.locator('[data-test="logout-sidebar-link"]')
  }

  get resetLink() {
    return this.page.locator('[data-test="reset-sidebar-link"]')
  }

  get cartLink() {
    return this.page.locator('[data-test="shopping-cart-link"]')
  }

  get cartBadge() {
    return this.page.locator('[data-test="shopping-cart-badge"]')
  }

  //========Actions========

  async openMenu() {
    await this.burgerMenuButton.click()
  }

  async closeMenu() {
    await this.closeBurgerMenu.click()
  }

  async logout() {
    await this.openMenu()
    await this.logoutLink.click()
  }

  async resetAppState() {
    await this.openMenu()
    await this.resetLink.click()
    await this.closeMenu()
  }

  async goToCart() {
    await this.cartLink.click()
  }
}

export default CommonPage
