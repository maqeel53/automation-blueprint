import { test, expect } from '../../support/fixtures.js'
import { createRequire } from 'module'
import { handleUncaughtExceptions } from '../../support/utils/exceptionHandlers.js'

const require = createRequire(import.meta.url)
const userData = require('../../fixtures/userData.json')

test.describe('Login Functionality', () => {

  test.beforeEach(async ({ page }) => {
    handleUncaughtExceptions(page)
  })

  //=========== Test Case Start ===========//
  test('@smoke Valid login with standard user', async ({ loginPage }) => {
    const { username, password } = userData.users.standard

    // Step 1: Navigate to login page
    await loginPage.visit()

    // Step 2: Enter valid credentials and submit
    await loginPage.login(username, password)

    // Step 3: Verify user is redirected to the inventory page
    await expect(loginPage.page).toHaveURL(/inventory\.html/)
  })
  //=========== Test Case End ===========//

  //=========== Test Case Start ===========//
  test('@smoke Locked out user cannot login', async ({ loginPage }) => {
    const { username, password } = userData.users.lockedOut

    // Step 1: Navigate to login page
    await loginPage.visit()

    // Step 2: Attempt login with locked-out credentials
    await loginPage.login(username, password)

    // Step 3: Verify error message is displayed
    await expect(loginPage.errorMessage).toBeVisible()
    await expect(loginPage.errorMessage).toContainText('locked out')
  })
  //=========== Test Case End ===========//

  //=========== Test Case Start ===========//
  test('@smoke Invalid credentials show error', async ({ loginPage }) => {
    const { username, password } = userData.invalidCredentials

    // Step 1: Navigate to login page
    await loginPage.visit()

    // Step 2: Enter invalid credentials
    await loginPage.login(username, password)

    // Step 3: Verify error message for invalid credentials
    await expect(loginPage.errorMessage).toBeVisible()
    await expect(loginPage.errorMessage).toContainText('do not match')
  })
  //=========== Test Case End ===========//

  //=========== Test Case Start ===========//
  test('@smoke Login with empty credentials shows error', async ({ loginPage }) => {
    // Step 1: Navigate to login page
    await loginPage.visit()

    // Step 2: Click login without entering any credentials
    await loginPage.login('', '')

    // Step 3: Verify username required error
    await expect(loginPage.errorMessage).toBeVisible()
    await expect(loginPage.errorMessage).toContainText('Username is required')
  })
  //=========== Test Case End ===========//

  //=========== Test Case Start ===========//
  test('@smoke Login with empty password shows error', async ({ loginPage }) => {
    const { username } = userData.users.standard

    // Step 1: Navigate to login page
    await loginPage.visit()

    // Step 2: Enter username only, leave password empty
    await loginPage.login(username, '')

    // Step 3: Verify password required error
    await expect(loginPage.errorMessage).toBeVisible()
    await expect(loginPage.errorMessage).toContainText('Password is required')
  })
  //=========== Test Case End ===========//
})
