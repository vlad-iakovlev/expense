import { NextApiHandler } from 'next'
import { z } from 'zod'
import { ClientWallet } from '../../models/wallet'
import { isValidObjectId } from '../../utils/isValidObjectId'
import { walletSelect } from './constants'
import { populateWalletBalance } from './utils'

const querySchema = z.object({
  groupId: z.string().refine(isValidObjectId),
})

const bodySchema = z.object({
  name: z.string().min(1),
  currencyId: z.string().refine(isValidObjectId),
})

export type CreateWalletBody = z.infer<typeof bodySchema>

export interface CreateWalletResponse {
  wallet: ClientWallet
}

export const createWallet: NextApiHandler<CreateWalletResponse> = async (
  req,
  res
) => {
  const query = querySchema.parse(req.query)
  const body = bodySchema.parse(req.body)

  const walletWithoutBalance = await req.prisma.wallet.create({
    data: {
      name: body.name,
      group: {
        connect: {
          id: query.groupId,
          userIds: {
            has: req.session.user.id,
          },
        },
      },
      currency: {
        connect: {
          id: body.currencyId,
        },
      },
    },
    select: walletSelect,
  })

  const wallet = await populateWalletBalance(req, walletWithoutBalance)

  res.status(200).json({ wallet })
}
