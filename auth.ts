/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { prismaAdapter } from '@better-auth/prisma-adapter'
import { betterAuth } from 'better-auth'
import { prisma } from '@/utils/server/prisma'

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
