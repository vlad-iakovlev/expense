import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/client.js'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
export const prisma = new PrismaClient({ adapter })

export * from './generated/client.js'
