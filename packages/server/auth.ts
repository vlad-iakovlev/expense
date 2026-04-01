/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { prisma } from '@expense/db/client'

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

export type AuthType = {
  session: typeof auth.$Infer.Session
}
