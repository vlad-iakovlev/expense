/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { prismaAdapter } from '@better-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import { betterAuth } from 'better-auth'

const prisma = new PrismaClient()

export const auth = betterAuth({
  appName: 'Expense',
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
    transaction: true,
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      overrideUserInfoOnSignIn: true,
    },
  },
})
