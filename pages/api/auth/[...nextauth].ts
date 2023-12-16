import { PrismaAdapter } from '@next-auth/prisma-adapter'
import assert from 'assert'
import { defaultImport } from 'default-import'
import defaultNextAuth, { AuthOptions } from 'next-auth'
import defaultGoogleProvider from 'next-auth/providers/google'
import { prisma } from '../../../utils/server/prisma.js'

const NextAuth = defaultImport(defaultNextAuth)
const GoogleProvider = defaultImport(defaultGoogleProvider)

assert(process.env.GOOGLE_CLIENT_ID, 'GOOGLE_CLIENT_ID is not defined')
assert(process.env.GOOGLE_CLIENT_SECRET, 'GOOGLE_CLIENT_SECRET is not defined')

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session({ session, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      }
    },
  },
}

export default NextAuth(authOptions)
