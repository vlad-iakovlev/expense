import { NextApiHandler } from 'next'
import { z } from 'zod'
import { ClientWallet } from '../../models/wallet'
import { isValidObjectId } from '../../utils/isValidObjectId'
import { walletSelect } from './constants'

const querySchema = z.object({
  groupId: z.string().refine(isValidObjectId),
  walletId: z.string().refine(isValidObjectId),
})

const bodySchema = z.object({
  name: z.string().min(1).optional(),
  currencyId: z.string().refine(isValidObjectId).optional(),
})

export type UpdateWalletBody = z.infer<typeof bodySchema>

export interface UpdateWalletResponse {
  wallet: ClientWallet
}

export const updateWallet: NextApiHandler<UpdateWalletResponse> = async (
  req,
  res
) => {
  const query = querySchema.parse(req.query)
  const body = bodySchema.parse(req.body)

  const wallet = await req.prisma.wallet.update({
    where: {
      id: query.walletId,
      group: {
        id: query.groupId,
        userIds: {
          has: req.session.user.id,
        },
      },
    },
    data: {
      name: body.name,
      currency: {
        connect: {
          id: body.currencyId,
        },
      },
    },
    select: walletSelect,
  })

  res.status(200).json({ wallet })
}
