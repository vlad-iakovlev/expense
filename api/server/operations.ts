import { NextApiHandler } from 'next'
import { prisma } from '../../utils/server/prisma.ts'
import {
  CreateOperationResponse,
  DeleteOperationResponse,
  GetOperationResponse,
  GetOperationsResponse,
  UpdateOperationResponse,
} from '../types/operations.ts'
import {
  createOperationBodySchema,
  deleteOperationQuerySchema,
  getOperationQuerySchema,
  getOperationsQuerySchema,
  updateOperationBodySchema,
} from './schemas/operations.ts'
import { operationSelector } from './selectors/index.ts'
import { getOperationWhere, getWalletWhere } from './where/index.ts'

export const getOperations: NextApiHandler<GetOperationsResponse> = async (
  req,
  res
) => {
  const query = getOperationsQuerySchema.parse(req.query)

  const operations = await prisma.operation.findMany({
    where: getOperationWhere({
      userId: req.session.user.id,
      groupId: query.groupId,
      walletId: query.walletId,
    }),
    orderBy: {
      date: 'desc',
    },
    skip: query.skip,
    take: query.take,
    select: operationSelector,
  })

  res.status(200).json({ operations })
}

export const getOperation: NextApiHandler<GetOperationResponse> = async (
  req,
  res
) => {
  const query = getOperationQuerySchema.parse(req.query)

  const operation = await prisma.operation.findFirstOrThrow({
    where: getOperationWhere({
      userId: req.session.user.id,
      operationId: query.operationId,
    }),
    select: operationSelector,
  })

  res.status(200).json({ operation })
}

export const createOperation: NextApiHandler<CreateOperationResponse> = async (
  req,
  res
) => {
  const body = createOperationBodySchema.parse(req.body)

  const operation = await prisma.operation.create({
    data: {
      name: body.name,
      category: body.category,
      date: body.date,
      incomeAmount: body.incomeAmount,
      expenseAmount: body.incomeAmount,
      ...(body.incomeWalletId && {
        incomeWallet: {
          connect: getWalletWhere({
            userId: req.session.user.id,
            walletId: body.incomeWalletId,
          }),
        },
      }),
      ...(body.expenseWalletId && {
        expenseWallet: {
          connect: getWalletWhere({
            userId: req.session.user.id,
            walletId: body.expenseWalletId,
          }),
        },
      }),
    },
    select: {
      id: true,
    },
  })

  res.status(200).json({ operationId: operation.id })
}

export const updateOperation: NextApiHandler<UpdateOperationResponse> = async (
  req,
  res
) => {
  const body = updateOperationBodySchema.parse(req.body)

  await prisma.operation.update({
    where: getOperationWhere({
      userId: req.session.user.id,
      operationId: body.operationId,
    }),
    data: {
      name: body.name,
      category: body.category,
      date: body.date,
      incomeAmount: body.incomeAmount,
      expenseAmount: body.expenseAmount,
      incomeWalletId: body.incomeWalletId,
      expenseWalletId: body.expenseWalletId,
    },
    select: {
      id: true,
    },
  })

  res.status(200).json({ ok: true })
}

export const deleteOperation: NextApiHandler<DeleteOperationResponse> = async (
  req,
  res
) => {
  const query = deleteOperationQuerySchema.parse(req.query)

  await prisma.operation.update({
    where: getOperationWhere({
      userId: req.session.user.id,
      operationId: query.operationId,
    }),
    data: {
      removed: true,
    },
    select: {
      id: true,
    },
  })

  res.status(200).json({ ok: true })
}
