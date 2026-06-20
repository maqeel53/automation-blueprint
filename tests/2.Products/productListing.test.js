import { test, expect } from '../../support/fixtures.js'
import { createRequire } from 'module'
import { loginAsStandardUser } from '../../support/helpers.js'
import { handleUncaughtExceptions } from '../../support/utils/exceptionHandlers.js'

const require = createRequire(import.meta.url)
const productData = require('../../fixtures/productData.json')

test.describe('Product Listing', () => {

  test.beforeEach(async ({ page }) => {
    handleUncaughtExceptions(page)
    await loginAsStandardUser(page)
  })

  //=========== Test Case Start ===========//
  test('@smoke Products page displays all items', async ({ productsPage }) => {
    // Step 1: Verify Products title is visible
    await expect(productsPage.pageTitle).toHaveText('Products')

    // Step 2: Verify all 6 products are displayed
    await expect(productsPage.inventoryItems).toHaveCount(productData.totalProducts)
  })
  //=========== Test Case End ===========//

  //=========== Test Case Start ===========//
  test('@smoke Each product displays name, description, and price', async ({ productsPage }) => {
    // Step 1: Get all product names
    const names = await productsPage.getProductNames()

    // Step 2: Verify known products are present
    expect(names).toContain(productData.products.backpack.name)
    expect(names).toContain(productData.products.bikeLight.name)
    expect(names).toContain(productData.products.fleeceJacket.name)

    // Step 3: Get all product prices and verify they are displayed
    const prices = await productsPage.getProductPrices()
    expect(prices.length).toBe(productData.totalProducts)
  })
  //=========== Test Case End ===========//

  //=========== Test Case Start ===========//
  test('@smoke User can navigate to product detail page', async ({ page, productsPage }) => {
    // Step 1: Click on a product name
    await productsPage.clickProduct(productData.products.backpack.name)

    // Step 2: Verify navigation to product detail page
    await expect(page).toHaveURL(/inventory-item\.html/)

    // Step 3: Verify the product name is visible on detail page
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText(productData.products.backpack.name)
  })
  //=========== Test Case End ===========//
})
