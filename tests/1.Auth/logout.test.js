import { test, expect } from '../../support/fixtures.js'
import { loginAsStandardUser } from '../../support/helpers.js'
import { handleUncaughtExceptions } from '../../support/utils/exceptionHandlers.js'

test.describe('Logout Functionality', () => {

  test.beforeEach(async ({ page }) => {
    handleUncaughtExceptions(page)
    await loginAsStandardUser(page)
  })

  //=========== Test Case Start ===========//
  test('@smoke User can logout successfully', async ({ commonPage, loginPage }) => {
    // Step 1: Open burger menu and click logout
    await commonPage.logout()

    // Step 2: Verify user is redirected back to login page
    await expect(loginPage.usernameInput).toBeVisible()
    await expect(loginPage.passwordInput).toBeVisible()
    await expect(loginPage.loginButton).toBeVisible()
  })
  //=========== Test Case End ===========//
})
