import { config } from './config.js'

/**
 * Log in as the standard user and wait for the inventory page to load.
 */
export async function loginAsStandardUser(page) {
  await page.goto(config.url)
  await page.locator('[data-test="username"]').fill('standard_user')
  await page.locator('[data-test="password"]').fill('secret_sauce')
  await page.locator('[data-test="login-button"]').click()
  await page.waitForURL('**/inventory.html')
}

/**
 * Log in with any valid credentials.
 */
export async function loginWithCredentials(page, username, password) {
  await page.goto(config.url)
  await page.locator('[data-test="username"]').fill(username)
  await page.locator('[data-test="password"]').fill(password)
  await page.locator('[data-test="login-button"]').click()
}

/**
 * Reset app state — open burger menu and click reset, then go to inventory.
 */
export async function resetAppState(page) {
  await page.locator('#react-burger-menu-btn').click()
  await page.locator('[data-test="reset-sidebar-link"]').click()
  await page.locator('#react-burger-cross-btn').click()
}

/**
 * Logout via the burger menu.
 */
export async function logout(page) {
  await page.locator('#react-burger-menu-btn').click()
  await page.locator('[data-test="logout-sidebar-link"]').click()
}

/**
 * Add a product to the cart by its data-test button id.
 * @param {import('@playwright/test').Page} page
 * @param {string} productKey - e.g. 'sauce-labs-backpack'
 */
export async function addProductToCart(page, productKey) {
  await page.locator(`[data-test="add-to-cart-${productKey}"]`).click()
}

/**
 * Complete checkout with provided customer info.
 */
export async function completeCheckout(page, { firstName, lastName, postalCode }) {
  await page.locator('[data-test="checkout"]').click()
  await page.locator('[data-test="firstName"]').fill(firstName)
  await page.locator('[data-test="lastName"]').fill(lastName)
  await page.locator('[data-test="postalCode"]').fill(postalCode)
  await page.locator('[data-test="continue"]').click()
  await page.locator('[data-test="finish"]').click()
}
