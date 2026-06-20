import { test, expect } from '../../support/fixtures.js'
import { createRequire } from 'module'
import { loginAsStandardUser } from '../../support/helpers.js'
import { handleUncaughtExceptions } from '../../support/utils/exceptionHandlers.js'

const require = createRequire(import.meta.url)
const productData = require('../../fixtures/productData.json')

test.describe('Product Sorting', () => {

  test.beforeEach(async ({ page }) => {
    handleUncaughtExceptions(page)
    await loginAsStandardUser(page)
  })

  //=========== Test Case Start ===========//
  test('@smoke Sort products by name A to Z', async ({ productsPage }) => {
    // Step 1: Select "Name (A to Z)" sort option
    await productsPage.sortBy(productData.sortOptions.nameAZ)

    // Step 2: Get all product names
    const names = await productsPage.getProductNames()

    // Step 3: Verify names are in ascending alphabetical order
    const sorted = [...names].sort((a, b) => a.localeCompare(b))
    expect(names).toEqual(sorted)
  })
  //=========== Test Case End ===========//

  //=========== Test Case Start ===========//
  test('@smoke Sort products by name Z to A', async ({ productsPage }) => {
    // Step 1: Select "Name (Z to A)" sort option
    await productsPage.sortBy(productData.sortOptions.nameZA)

    // Step 2: Get all product names
    const names = await productsPage.getProductNames()

    // Step 3: Verify names are in descending alphabetical order
    const sorted = [...names].sort((a, b) => b.localeCompare(a))
    expect(names).toEqual(sorted)
  })
  //=========== Test Case End ===========//

  //=========== Test Case Start ===========//
  test('@smoke Sort products by price low to high', async ({ productsPage }) => {
    // Step 1: Select "Price (low to high)" sort option
    await productsPage.sortBy(productData.sortOptions.priceLowHigh)

    // Step 2: Get all product prices
    const prices = await productsPage.getProductPrices()
    const numericPrices = prices.map((p) => parseFloat(p.replace('$', '')))

    // Step 3: Verify prices are in ascending order
    const sorted = [...numericPrices].sort((a, b) => a - b)
    expect(numericPrices).toEqual(sorted)
  })
  //=========== Test Case End ===========//

  //=========== Test Case Start ===========//
  test('@smoke Sort products by price high to low', async ({ productsPage }) => {
    // Step 1: Select "Price (high to low)" sort option
    await productsPage.sortBy(productData.sortOptions.priceHighLow)

    // Step 2: Get all product prices
    const prices = await productsPage.getProductPrices()
    const numericPrices = prices.map((p) => parseFloat(p.replace('$', '')))

    // Step 3: Verify prices are in descending order
    const sorted = [...numericPrices].sort((a, b) => b - a)
    expect(numericPrices).toEqual(sorted)
  })
  //=========== Test Case End ===========//
})
