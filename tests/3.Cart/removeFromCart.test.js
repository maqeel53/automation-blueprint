import { test, expect } from '../../support/fixtures.js'
import { createRequire } from 'module'
import { loginAsStandardUser } from '../../support/helpers.js'
import { handleUncaughtExceptions } from '../../support/utils/exceptionHandlers.js'

const require = createRequire(import.meta.url)
const productData = require('../../fixtures/productData.json')

test.describe('Remove from Cart', () => {

  test.beforeEach(async ({ page }) => {
    handleUncaughtExceptions(page)
    await loginAsStandardUser(page)
  })

  //=========== Test Case Start ===========//
  test('@smoke Remove product from cart via products page', async ({ productsPage }) => {
    const { backpack } = productData.products

    // Step 1: Add product to cart
    await productsPage.addToCart(backpack.key)
    await expect(productsPage.cartBadge).toHaveText('1')

    // Step 2: Remove product from cart
    await productsPage.removeFromCart(backpack.key)

    // Step 3: Verify cart badge is no longer visible
    await expect(productsPage.cartBadge).not.toBeVisible()
  })
  //=========== Test Case End ===========//

  //=========== Test Case Start ===========//
  test('@smoke Remove product from cart page', async ({ productsPage, cartPage }) => {
    const { backpack, bikeLight } = productData.products

    // Step 1: Add two products to cart
    await productsPage.addToCart(backpack.key)
    await productsPage.addToCart(bikeLight.key)

    // Step 2: Navigate to cart page
    await productsPage.goToCart()

    // Step 3: Remove one product
    await cartPage.removeItem(backpack.key)

    // Step 4: Verify only one item remains in cart
    await expect(cartPage.cartItems).toHaveCount(1)

    // Step 5: Verify the correct item remains
    const remainingItems = await cartPage.getItemNames()
    expect(remainingItems).toContain(bikeLight.name)
    expect(remainingItems).not.toContain(backpack.name)
  })
  //=========== Test Case End ===========//

  //=========== Test Case Start ===========//
  test('@smoke Continue shopping after viewing cart', async ({ page, productsPage, cartPage }) => {
    const { backpack } = productData.products

    // Step 1: Add product to cart
    await productsPage.addToCart(backpack.key)

    // Step 2: Go to cart
    await productsPage.goToCart()

    // Step 3: Click "Continue Shopping"
    await cartPage.continueShopping()

    // Step 4: Verify user is back on products page
    await expect(page).toHaveURL(/inventory\.html/)
    await expect(productsPage.pageTitle).toHaveText('Products')
  })
  //=========== Test Case End ===========//
})
