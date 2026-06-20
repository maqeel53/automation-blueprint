import { faker } from '@faker-js/faker'

export const fakerUtils = {
  /**
   * Generate a random customer with clean first/last name, zip, etc.
   */
  customer() {
    return {
      firstName: faker.person.firstName().replace(/[^a-zA-Z]/g, ''),
      lastName: faker.person.lastName().replace(/[^a-zA-Z]/g, ''),
      postalCode: faker.location.zipCode('#####'),
    }
  },

  /**
   * Generate checkout info with realistic data.
   */
  checkoutInfo() {
    return {
      firstName: faker.person.firstName().replace(/[^a-zA-Z]/g, ''),
      lastName: faker.person.lastName().replace(/[^a-zA-Z]/g, ''),
      postalCode: faker.location.zipCode('#####'),
    }
  },
}
