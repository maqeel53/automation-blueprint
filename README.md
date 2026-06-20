# Automation Blueprint

> Production-grade Playwright automation framework showcasing enterprise QA patterns against [SauceDemo](https://www.saucedemo.com).

![Playwright](https://img.shields.io/badge/Playwright-v1.52-45ba63?logo=playwright&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-%3E%3D20-339933?logo=node.js&logoColor=white)
![CI](https://github.com/maqeel53/automation-blueprint/actions/workflows/ci.yml/badge.svg)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## Architecture

```
automation-blueprint/
├── pages/                          # Page Object Model (POM) classes
│   ├── loginPage.js                # Login form interactions
│   ├── productsPage.js             # Product listing, sorting, add-to-cart
│   ├── cartPage.js                 # Cart item management
│   ├── checkoutStepOnePage.js      # Checkout info form
│   ├── checkoutStepTwoPage.js      # Order summary & pricing
│   ├── checkoutCompletePage.js     # Success confirmation
│   └── commonPage.js               # Shared nav (burger menu, logout)
│
├── tests/                          # Test specifications
│   ├── 1.Auth/                     # Login & logout tests
│   ├── 2.Products/                 # Product listing & sorting
│   ├── 3.Cart/                     # Add/remove cart operations
│   └── 4.Checkout/                 # End-to-end checkout & validation
│
├── support/                        # Shared utilities
│   ├── fixtures.js                 # Playwright custom fixtures (POM injection)
│   ├── helpers.js                  # Reusable async helpers (login, checkout)
│   ├── config.js                   # Environment configuration
│   └── utils/
│       ├── exceptionHandlers.js    # Known error suppressors
│       └── faker.js                # Dynamic test data generation
│
├── fixtures/                       # Static test data (JSON)
│   ├── userData.json               # User credentials & roles
│   ├── productData.json            # Product catalog & pricing
│   └── checkoutData.json           # Checkout validation data
│
├── .github/workflows/ci.yml       # GitHub Actions CI pipeline
├── playwright.config.js            # Playwright configuration
├── .eslintrc.json                  # Code quality rules
└── package.json                    # Dependencies & scripts
```

---

## Key Patterns Demonstrated

| Pattern | Implementation |
|---|---|
| **Page Object Model** | Class-based POMs with getters + action methods |
| **Custom Fixtures** | `test.extend()` for automatic page object injection |
| **Data-Driven Testing** | JSON fixtures + Faker.js for dynamic data |
| **Helper Functions** | Shared login, checkout, reset workflows |
| **Multi-Reporter** | HTML + JSON + Allure reporting |
| **Cross-Browser** | Chromium, Firefox, WebKit |
| **Parallel Execution** | Fully parallel test runs |
| **CI/CD** | GitHub Actions with matrix strategy |
| **`data-test` Selectors** | Resilient locator strategy |
| **Error Handling** | Uncaught exception suppression |
| **ESLint** | Enforced code quality |

---

## Quick Start

### Prerequisites

- **Node.js** >= 20
- **npm** >= 9

### Installation

```bash
git clone https://github.com/maqeel53/automation-blueprint.git
cd automation-blueprint
npm install
npx playwright install --with-deps
```

### Run Tests

```bash
# Run all tests (all browsers)
npm test

# Run smoke tests only
npm run test:smoke

# Run specific browser
npm run test:chromium
npm run test:firefox
npm run test:webkit

# Run in headed mode (visible browser)
npm run test:headed
```

### View Reports

```bash
# Open HTML report
npm run report

# Generate & open Allure report
npm run report:allure
```

---

## Test Coverage

| Section | Tests | Scope |
|---|---|---|
| **Auth** | 6 | Login (valid, invalid, locked, empty), Logout |
| **Products** | 7 | Listing, detail page, sorting (A-Z, Z-A, price asc/desc) |
| **Cart** | 6 | Add single/multiple, remove from page/cart, continue shopping |
| **Checkout** | 7 | E2E single/multi product, validation errors, cancel, back home |
| **Total** | **26** | Full smoke coverage |

---

## CI/CD Pipeline

Tests run automatically on every **push** and **pull request** to `main` via GitHub Actions:

- **Matrix strategy**: runs across Chromium, Firefox, and WebKit in parallel
- **Artifacts**: HTML reports uploaded on every run, screenshots/videos on failure
- **Retention**: Reports kept for 14 days

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [Playwright](https://playwright.dev) | E2E test framework |
| [Faker.js](https://fakerjs.dev) | Dynamic test data generation |
| [Allure](https://allurereport.org) | Rich test reporting |
| [ESLint](https://eslint.org) | Code quality |
| [GitHub Actions](https://github.com/features/actions) | CI/CD |
| [dotenv](https://github.com/motdotla/dotenv) | Environment management |

---

## Author

**Muhammad Aqeel** — Sr. QA Engineer

- [LinkedIn](https://linkedin.com/in/muhammad-aqeel-583bbabb)
- [GitHub](https://github.com/maqeel53)

---

## License

This project is licensed under the [MIT License](LICENSE).
