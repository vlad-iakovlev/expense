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

export const select = {
  id: true,
  name: true,
  date: true,
  amount: true,
  category: true,
  wallet: {
    select: {
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
    },
  },
}

export const getOperations: NextApiHandler<GetOperationsResponse> = async (
  req,
  res
) => {
  const query = getOperationsQuerySchema.parse(req.query)

  const operations = await req.prisma.operation.findMany({
    where: {
      wallet: {
        id: query.walletId,
        group: {
          id: query.groupId,
          userIds: {
            has: req.session.user.id,
          },
        },
      },
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
      wallet: {
        group: {
          userIds: {
            has: req.session.user.id,
          },
        },
      },
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
      date: body.date,
      amount: body.amount,
      category: body.category,
      wallet: {
        connect: {
          id: body.walletId,
          group: {
            userIds: {
              has: req.session.user.id,
            },
          },
        },
      },
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
      wallet: {
        group: {
          userIds: {
            has: req.session.user.id,
          },
        },
      },
    },
    data: {
      name: body.name,
      date: body.date,
      amount: body.amount,
      category: body.category,
      walletId: body.walletId,
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
      wallet: {
        group: {
          userIds: {
            has: req.session.user.id,
          },
        },
      },
    },
  })

  res.status(200).json({ ok: true })
}
