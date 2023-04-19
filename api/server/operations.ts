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

export const getOperations: NextApiHandler<GetOperationsResponse> = async (
  req,
  res
) => {
  const query = getOperationsQuerySchema.parse(req.query)

  const operations = await prisma.operation.findMany({
    where: {
      OR: [
        {
          incomeWallet: {
            id: query.walletId,
            group: {
              id: query.groupId,
              userIds: {
                has: req.session.user.id,
              },
            },
          },
        },
        {
          expenseWallet: {
            id: query.walletId,
            group: {
              id: query.groupId,
              userIds: {
                has: req.session.user.id,
              },
            },
          },
        },
      ],
      category: query.category,
    },
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
    where: {
      id: query.operationId,
      OR: [
        {
          incomeWallet: {
            group: {
              userIds: {
                has: req.session.user.id,
              },
            },
          },
        },
        {
          expenseWallet: {
            group: {
              userIds: {
                has: req.session.user.id,
              },
            },
          },
        },
      ],
    },
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
          connect: {
            id: body.incomeWalletId,
            group: {
              userIds: {
                has: req.session.user.id,
              },
            },
          },
        },
      }),
      ...(body.expenseWalletId && {
        expenseWallet: {
          connect: {
            id: body.expenseWalletId,
            group: {
              userIds: {
                has: req.session.user.id,
              },
            },
          },
        },
      }),
    },
    select: operationSelector,
  })

  res.status(200).json({ operation })
}

export const updateOperation: NextApiHandler<UpdateOperationResponse> = async (
  req,
  res
) => {
  const body = updateOperationBodySchema.parse(req.body)

  const operation = await prisma.operation.update({
    where: {
      id: body.operationId,
      OR: [
        {
          incomeWallet: {
            group: {
              userIds: {
                has: req.session.user.id,
              },
            },
          },
        },
        {
          expenseWallet: {
            group: {
              userIds: {
                has: req.session.user.id,
              },
            },
          },
        },
      ],
    },
    data: {
      name: body.name,
      category: body.category,
      date: body.date,
      incomeAmount: body.incomeAmount,
      expenseAmount: body.expenseAmount,
      incomeWalletId: body.incomeWalletId,
      expenseWalletId: body.expenseWalletId,
    },
    select: operationSelector,
  })

  res.status(200).json({ operation })
}

export const deleteOperation: NextApiHandler<DeleteOperationResponse> = async (
  req,
  res
) => {
  const query = deleteOperationQuerySchema.parse(req.query)

  await prisma.operation.delete({
    where: {
      id: query.operationId,
      OR: [
        {
          incomeWallet: {
            group: {
              userIds: {
                has: req.session.user.id,
              },
            },
          },
        },
        {
          expenseWallet: {
            group: {
              userIds: {
                has: req.session.user.id,
              },
            },
          },
        },
      ],
    },
  })

  res.status(200).json({ ok: true })
}
