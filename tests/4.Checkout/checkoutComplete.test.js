import { test, expect } from '../../support/fixtures.js'
import { createRequire } from 'module'
import { loginAsStandardUser } from '../../support/helpers.js'
import { handleUncaughtExceptions } from '../../support/utils/exceptionHandlers.js'
import { fakerUtils } from '../../support/utils/faker.js'

const require = createRequire(import.meta.url)
const productData = require('../../fixtures/productData.json')
const checkoutData = require('../../fixtures/checkoutData.json')

test.describe('Checkout — Complete Flow', () => {

  test.beforeEach(async ({ page }) => {
    handleUncaughtExceptions(page)
    await loginAsStandardUser(page)
  })

  //=========== Test Case Start ===========//
  test('@smoke End-to-end checkout with single product', async ({
    productsPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage, checkoutCompletePage,
  }) => {
    const { backpack } = productData.products
    const customer = fakerUtils.customer()

    // Step 1: Add product to cart
    await productsPage.addToCart(backpack.key)

    // Step 2: Navigate to cart
    await productsPage.goToCart()
    await expect(cartPage.cartItems).toHaveCount(1)

    // Step 3: Proceed to checkout
    await cartPage.proceedToCheckout()

    // Step 4: Fill in customer information
    await checkoutStepOnePage.fillCheckoutInfo(customer.firstName, customer.lastName, customer.postalCode)
    await checkoutStepOnePage.submitForm()

    // Step 5: Verify checkout overview — item and total are correct
    const items = await checkoutStepTwoPage.getItemNames()
    expect(items).toContain(backpack.name)

    // Step 6: Finish the order
    await checkoutStepTwoPage.finishOrder()

    // Step 7: Verify order success message
    await expect(checkoutCompletePage.completeHeader).toHaveText(checkoutData.successMessage)
    await expect(checkoutCompletePage.ponyExpressImage).toBeVisible()
  })
  //=========== Test Case End ===========//

  //=========== Test Case Start ===========//
  test('@smoke End-to-end checkout with multiple products', async ({
    productsPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage, checkoutCompletePage,
  }) => {
    const { backpack, bikeLight, onesie } = productData.products
    const { validCustomer } = checkoutData

    // Step 1: Add three products to cart
    await productsPage.addToCart(backpack.key)
    await productsPage.addToCart(bikeLight.key)
    await productsPage.addToCart(onesie.key)

    // Step 2: Navigate to cart and verify item count
    await productsPage.goToCart()
    await expect(cartPage.cartItems).toHaveCount(3)

    // Step 3: Proceed to checkout
    await cartPage.proceedToCheckout()

    // Step 4: Fill checkout info using static fixture data
    await checkoutStepOnePage.fillCheckoutInfo(
      validCustomer.firstName, validCustomer.lastName, validCustomer.postalCode,
    )
    await checkoutStepOnePage.submitForm()

    // Step 5: Verify subtotal matches sum of product prices
    const expectedSubtotal = backpack.priceNumeric + bikeLight.priceNumeric + onesie.priceNumeric
    const actualSubtotal = await checkoutStepTwoPage.getSubtotal()
    expect(actualSubtotal).toBeCloseTo(expectedSubtotal, 2)

    // Step 6: Verify total = subtotal + tax
    const tax = await checkoutStepTwoPage.getTax()
    const total = await checkoutStepTwoPage.getTotal()
    expect(total).toBeCloseTo(actualSubtotal + tax, 2)

    // Step 7: Finish order and verify success
    await checkoutStepTwoPage.finishOrder()
    await expect(checkoutCompletePage.completeHeader).toHaveText(checkoutData.successMessage)
  })
  //=========== Test Case End ===========//

  //=========== Test Case Start ===========//
  test('@smoke User can return to products after successful checkout', async ({
    page, productsPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage, checkoutCompletePage,
  }) => {
    const { onesie } = productData.products
    const customer = fakerUtils.customer()

    // Step 1: Add product → cart → checkout → fill info → finish
    await productsPage.addToCart(onesie.key)
    await productsPage.goToCart()
    await cartPage.proceedToCheckout()
    await checkoutStepOnePage.fillCheckoutInfo(customer.firstName, customer.lastName, customer.postalCode)
    await checkoutStepOnePage.submitForm()
    await checkoutStepTwoPage.finishOrder()

    // Step 2: Click "Back Home"
    await checkoutCompletePage.goBackHome()

    // Step 3: Verify user is back on products page
    await expect(page).toHaveURL(/inventory\.html/)
    await expect(productsPage.pageTitle).toHaveText('Products')
  })
  //=========== Test Case End ===========//
})
