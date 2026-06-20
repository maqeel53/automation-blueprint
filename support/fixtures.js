import { test as base, expect } from '@playwright/test'
import LoginPage from '../pages/loginPage.js'
import ProductsPage from '../pages/productsPage.js'
import CartPage from '../pages/cartPage.js'
import CheckoutStepOnePage from '../pages/checkoutStepOnePage.js'
import CheckoutStepTwoPage from '../pages/checkoutStepTwoPage.js'
import CheckoutCompletePage from '../pages/checkoutCompletePage.js'
import CommonPage from '../pages/commonPage.js'

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page))
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page))
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page))
  },
  checkoutStepOnePage: async ({ page }, use) => {
    await use(new CheckoutStepOnePage(page))
  },
  checkoutStepTwoPage: async ({ page }, use) => {
    await use(new CheckoutStepTwoPage(page))
  },
  checkoutCompletePage: async ({ page }, use) => {
    await use(new CheckoutCompletePage(page))
  },
  commonPage: async ({ page }, use) => {
    await use(new CommonPage(page))
  },
})

export { expect }
