import dotenv from 'dotenv'

dotenv.config()

export const config = {
  url: process.env.BASE_URL || 'https://www.saucedemo.com',
}
