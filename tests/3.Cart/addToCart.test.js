import { test, expect } from '../../support/fixtures.js'
import { createRequire } from 'module'
import { loginAsStandardUser } from '../../support/helpers.js'
import { handleUncaughtExceptions } from '../../support/utils/exceptionHandlers.js'

const require = createRequire(import.meta.url)
const productData = require('../../fixtures/productData.json')

test.describe('Add to Cart', () => {

  test.beforeEach(async ({ page }) => {
    handleUncaughtExceptions(page)
    await loginAsStandardUser(page)
  })

  //=========== Test Case Start ===========//
  test('@smoke Add single product to cart', async ({ productsPage }) => {
    const { backpack } = productData.products

    // Step 1: Add backpack to cart
    await productsPage.addToCart(backpack.key)

    // Step 2: Verify cart badge shows 1 item
    await expect(productsPage.cartBadge).toHaveText('1')

    // Step 3: Verify the "Add to cart" button changed to "Remove"
    await expect(productsPage.page.locator(`[data-test="remove-${backpack.key}"]`)).toBeVisible()
  })
  //=========== Test Case End ===========//

  //=========== Test Case Start ===========//
  test('@smoke Add multiple products to cart', async ({ productsPage }) => {
    const { backpack, bikeLight, boltTShirt } = productData.products

    // Step 1: Add three products to cart
    await productsPage.addToCart(backpack.key)
    await productsPage.addToCart(bikeLight.key)
    await productsPage.addToCart(boltTShirt.key)

    // Step 2: Verify cart badge shows 3 items
    await expect(productsPage.cartBadge).toHaveText('3')
  })
  //=========== Test Case End ===========//

  //=========== Test Case Start ===========//
  test('@smoke Cart page shows correct items after adding', async ({ productsPage, cartPage }) => {
    const { backpack, onesie } = productData.products

    // Step 1: Add two products to cart
    await productsPage.addToCart(backpack.key)
    await productsPage.addToCart(onesie.key)

    // Step 2: Navigate to cart
    await productsPage.goToCart()

    // Step 3: Verify cart contains the correct items
    const itemNames = await cartPage.getItemNames()
    expect(itemNames).toContain(backpack.name)
    expect(itemNames).toContain(onesie.name)

    // Step 4: Verify cart has exactly 2 items
    await expect(cartPage.cartItems).toHaveCount(2)
  })
  //=========== Test Case End ===========//
})
