class LoginPage {
  constructor(page) {
    this.page = page
  }

  //========Getters========

  get usernameInput() {
    return this.page.locator('[data-test="username"]')
  }

  get passwordInput() {
    return this.page.locator('[data-test="password"]')
  }

  get loginButton() {
    return this.page.locator('[data-test="login-button"]')
  }

  get errorMessage() {
    return this.page.locator('[data-test="error"]')
  }

  get errorButton() {
    return this.page.locator('.error-button')
  }

  //========Actions========

  async visit() {
    await this.page.goto('/')
  }

  async login(username, password) {
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
    await this.loginButton.click()
  }

  async getErrorText() {
    return await this.errorMessage.textContent()
  }

  async dismissError() {
    await this.errorButton.click()
  }
}

export default LoginPage
