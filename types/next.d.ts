import { PrismaClient } from '@prisma/client'
import 'next'
import { Session } from 'next-auth'

declare module 'next' {
  declare interface NextApiRequest {
    prisma: PrismaClient
    session: Session
  }
}
