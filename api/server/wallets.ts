import { NextApiHandler } from 'next'
import { populateWalletBalance } from '../../utils/server/populateWalletBalance.ts'
import { prisma } from '../../utils/server/prisma.ts'
import {
  CreateWalletResponse,
  DeleteWalletResponse,
  GetWalletResponse,
  GetWalletsResponse,
  SetWalletsOrderResponse,
  UpdateWalletResponse,
} from '../types/wallets.ts'
import {
  createWalletBodySchema,
  deleteWalletQuerySchema,
  getWalletQuerySchema,
  getWalletsQuerySchema,
  setWalletsOrderBodySchema,
  updateWalletBodySchema,
} from './schemas/wallets.ts'
import { walletSelector } from './selectors/index.ts'
import { getGroupWhere, getWalletWhere } from './where/index.ts'

export const getWallets: NextApiHandler<GetWalletsResponse> = async (
  req,
  res
) => {
  const query = getWalletsQuerySchema.parse(req.query)

  const walletsWithoutBalance = await prisma.wallet.findMany({
    where: getWalletWhere({
      userId: req.session.user.id,
      groupId: query.groupId,
    }),
    orderBy: [
      {
        group: {
          name: 'asc',
        },
      },
      {
        order: 'asc',
      },
    ],
    select: walletSelector,
  })

  const wallets = await Promise.all(
    walletsWithoutBalance.map(populateWalletBalance)
  )

  res.status(200).json({ wallets })
}

export const getWallet: NextApiHandler<GetWalletResponse> = async (
  req,
  res
) => {
  const query = getWalletQuerySchema.parse(req.query)

  const walletWithoutBalance = await prisma.wallet.findFirstOrThrow({
    where: getWalletWhere({
      userId: req.session.user.id,
      walletId: query.walletId,
    }),
    select: walletSelector,
  })

  const wallet = await populateWalletBalance(walletWithoutBalance)

  res.status(200).json({ wallet })
}

export const createWallet: NextApiHandler<CreateWalletResponse> = async (
  req,
  res
) => {
  const body = createWalletBodySchema.parse(req.body)

  const wallet = await prisma.wallet.create({
    data: {
      name: body.name,
      currency: {
        connect: {
          id: body.currencyId,
        },
      },
      group: {
        connect: getGroupWhere({
          userId: req.session.user.id,
          groupId: body.groupId,
        }),
      },
    },
    select: {
      id: true,
    },
  })

  res.status(200).json({ walletId: wallet.id })
}

export const updateWallet: NextApiHandler<UpdateWalletResponse> = async (
  req,
  res
) => {
  const body = updateWalletBodySchema.parse(req.body)

  await prisma.wallet.update({
    where: getWalletWhere({
      userId: req.session.user.id,
      walletId: body.walletId,
    }),
    data: {
      name: body.name,
      currencyId: body.currencyId,
      groupId: body.groupId,
    },
    select: {
      id: true,
    },
  })

  res.status(200).json({ ok: true })
}

export const deleteWallet: NextApiHandler<DeleteWalletResponse> = async (
  req,
  res
) => {
  const query = deleteWalletQuerySchema.parse(req.query)

  await prisma.wallet.update({
    where: getWalletWhere({
      userId: req.session.user.id,
      walletId: query.walletId,
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

export const setWalletsOrder: NextApiHandler<SetWalletsOrderResponse> = async (
  req,
  res
) => {
  const body = setWalletsOrderBodySchema.parse(req.body)

  await prisma.$transaction(
    body.walletIds.map((walletId, index) =>
      prisma.wallet.update({
        where: getWalletWhere({
          userId: req.session.user.id,
          walletId,
        }),
        data: {
          order: index,
        },
      })
    )
  )

  res.status(200).json({ ok: true })
}
