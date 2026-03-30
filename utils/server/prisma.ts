import { PrismaPostgresAdapter } from '@prisma/adapter-ppg'
import assert from 'assert'
import { PrismaClient } from '@/generated/prisma/client'

const connectionString = process.env.DATABASE_URL
assert(connectionString, 'DATABASE_URL is not set')

const adapter = new PrismaPostgresAdapter({ connectionString })

export const prisma = new PrismaClient({ adapter })
