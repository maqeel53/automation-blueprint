import { test, expect } from '../../support/fixtures.js'
import { createRequire } from 'module'
import { loginAsStandardUser } from '../../support/helpers.js'
import { handleUncaughtExceptions } from '../../support/utils/exceptionHandlers.js'

const require = createRequire(import.meta.url)
const productData = require('../../fixtures/productData.json')
const checkoutData = require('../../fixtures/checkoutData.json')

test.describe('Checkout — Validation', () => {

  test.beforeEach(async ({ page, productsPage, cartPage }) => {
    handleUncaughtExceptions(page)
    await loginAsStandardUser(page)

    // Pre-condition: add a product and navigate to checkout step one
    await productsPage.addToCart(productData.products.backpack.key)
    await productsPage.goToCart()
    await cartPage.proceedToCheckout()
  })

  //=========== Test Case Start ===========//
  test('@smoke Error when first name is empty', async ({ checkoutStepOnePage }) => {
    // Step 1: Leave first name empty, fill last name and zip
    await checkoutStepOnePage.fillCheckoutInfo('', 'Doe', '75063')
    await checkoutStepOnePage.submitForm()

    // Step 2: Verify first name required error
    await expect(checkoutStepOnePage.errorMessage).toContainText(checkoutData.errorMessages.firstNameRequired)
  })
  //=========== Test Case End ===========//

  //=========== Test Case Start ===========//
  test('@smoke Error when last name is empty', async ({ checkoutStepOnePage }) => {
    // Step 1: Fill first name, leave last name empty
    await checkoutStepOnePage.fillCheckoutInfo('John', '', '75063')
    await checkoutStepOnePage.submitForm()

    // Step 2: Verify last name required error
    await expect(checkoutStepOnePage.errorMessage).toContainText(checkoutData.errorMessages.lastNameRequired)
  })
  //=========== Test Case End ===========//

  //=========== Test Case Start ===========//
  test('@smoke Error when postal code is empty', async ({ checkoutStepOnePage }) => {
    // Step 1: Fill first and last name, leave postal code empty
    await checkoutStepOnePage.fillCheckoutInfo('John', 'Doe', '')
    await checkoutStepOnePage.submitForm()

    // Step 2: Verify postal code required error
    await expect(checkoutStepOnePage.errorMessage).toContainText(checkoutData.errorMessages.postalCodeRequired)
  })
  //=========== Test Case End ===========//

  //=========== Test Case Start ===========//
  test('@smoke Cancel checkout returns to cart', async ({ page, checkoutStepOnePage }) => {
    // Step 1: Click cancel on checkout form
    await checkoutStepOnePage.cancelCheckout()

    // Step 2: Verify user is returned to cart page
    await expect(page).toHaveURL(/cart\.html/)
  })
  //=========== Test Case End ===========//
})
