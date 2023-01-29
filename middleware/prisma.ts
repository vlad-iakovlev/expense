import { PrismaClient } from '@prisma/client'
import { Middleware } from 'next-api-middleware'

export const prismaMiddleware: Middleware = async (req, res, next) => {
  req.prisma = new PrismaClient()
  await next()
}
