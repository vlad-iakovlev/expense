import { NextApiHandler } from 'next'
import { z } from 'zod'
import { ClientWallet } from '../../models/wallet'
import { isValidObjectId } from '../../utils/isValidObjectId'
import { walletSelect } from './constants'

const querySchema = z.object({
  groupId: z.string().refine(isValidObjectId),
  walletId: z.string().refine(isValidObjectId),
})

export interface GetWalletResponse {
  wallet: ClientWallet
}

export const getWallet: NextApiHandler<GetWalletResponse> = async (
  req,
  res
) => {
  const query = querySchema.parse(req.query)

  const wallet = await req.prisma.wallet.findFirstOrThrow({
    where: {
      id: query.walletId,
      group: {
        id: query.groupId,
        userIds: {
          has: req.session.user.id,
        },
      },
    },
    select: walletSelect,
  })

  res.status(200).json({ wallet })
}
