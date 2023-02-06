import { NextApiHandler } from 'next'
import {
  CreateOperationResponse,
  DeleteOperationResponse,
  GetOperationResponse,
  GetOperationsResponse,
  UpdateOperationResponse,
} from '../types/operations'
import {
  createOperationBodySchema,
  deleteOperationQuerySchema,
  getOperationQuerySchema,
  getOperationsQuerySchema,
  updateOperationBodySchema,
} from './schemas/operations'

const walletSelect = {
  id: true,
  name: true,
  currency: {
    select: {
      id: true,
      name: true,
      symbol: true,
    },
  },
  group: {
    select: {
      id: true,
      name: true,
    },
  },
}

const select = {
  id: true,
  name: true,
  category: true,
  date: true,
  incomeAmount: true,
  expenseAmount: true,
  incomeWallet: {
    select: walletSelect,
  },
  expenseWallet: {
    select: walletSelect,
  },
}

export const getOperations: NextApiHandler<GetOperationsResponse> = async (
  req,
  res
) => {
  const query = getOperationsQuerySchema.parse(req.query)

  const operations = await req.prisma.operation.findMany({
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
    },
    orderBy: {
      date: 'desc',
    },
    skip: query.skip,
    take: query.take,
    select,
  })

  res.status(200).json({ operations })
}

export const getOperation: NextApiHandler<GetOperationResponse> = async (
  req,
  res
) => {
  const query = getOperationQuerySchema.parse(req.query)

  const operation = await req.prisma.operation.findFirstOrThrow({
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
    select,
  })

  res.status(200).json({ operation })
}

export const createOperation: NextApiHandler<CreateOperationResponse> = async (
  req,
  res
) => {
  const body = createOperationBodySchema.parse(req.body)

  const operation = await req.prisma.operation.create({
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
    select,
  })

  res.status(200).json({ operation })
}

export const updateOperation: NextApiHandler<UpdateOperationResponse> = async (
  req,
  res
) => {
  const body = updateOperationBodySchema.parse(req.body)

  const operation = await req.prisma.operation.update({
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
    select,
  })

  res.status(200).json({ operation })
}

export const deleteOperation: NextApiHandler<DeleteOperationResponse> = async (
  req,
  res
) => {
  const query = deleteOperationQuerySchema.parse(req.query)

  await req.prisma.operation.delete({
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
