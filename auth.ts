import { PrismaAdapter } from '@auth/prisma-adapter'
import { produce } from 'immer'
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { prisma } from './utils/server/prisma.js'

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session({ session, user }) {
      return produce(session, (draft) => {
        if (draft.user) {
          draft.user.id = user.id
        }
      })
    },
  },
  providers: [Google],
})
