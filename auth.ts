import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import { produce } from 'immer'
import NextAuth from 'next-auth'
import Google, { GoogleProfile } from 'next-auth/providers/google'

const prisma = new PrismaClient()

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session({ session, user }) {
      return produce(session, (draft) => {
        draft.user.id = user.id
      })
    },
  },
  events: {
    async signIn({ user, profile, isNewUser }) {
      if (!isNewUser && user.id && profile) {
        const googleProfile = profile as GoogleProfile

        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            name: googleProfile.name,
            image: googleProfile.picture,
          },
        })
      }
    },
  },
  providers: [Google],
})
