import { prismaAdapter } from '@better-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import assert from 'assert'
import { betterAuth } from 'better-auth'

assert(process.env.AUTH_URL, 'AUTH_URL is not set')
assert(process.env.AUTH_SECRET, 'AUTH_SECRET is not set')
assert(process.env.AUTH_GOOGLE_ID, 'AUTH_GOOGLE_ID is not set')
assert(process.env.AUTH_GOOGLE_SECRET, 'AUTH_GOOGLE_SECRET is not set')

const prisma = new PrismaClient()

export const auth = betterAuth({
  appName: 'Expense',
  baseURL: process.env.AUTH_URL,
  secret: process.env.AUTH_SECRET,
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
    transaction: true,
  }),
  socialProviders: {
    google: {
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      overrideUserInfoOnSignIn: true,
    },
  },
})
