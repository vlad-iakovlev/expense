import { PrismaPostgresAdapter } from '@prisma/adapter-ppg'
import { PrismaClient } from '@/generated/prisma/client'

const adapter = new PrismaPostgresAdapter({
  connectionString: process.env.DATABASE_URL ?? '',
})

export const prisma = new PrismaClient({ adapter })
