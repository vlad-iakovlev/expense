import { NextApiHandler } from 'next'
import { z } from 'zod'
import { ClientWallet } from '../../models/wallet'
import { isValidObjectId } from '../../utils/isValidObjectId'
import { walletSelect } from './constants'
import { populateWalletBalance } from './utils'

const querySchema = z.object({
  groupId: z.string().refine(isValidObjectId),
})

export interface GetWalletsResponse {
  wallets: ClientWallet[]
}

export const getWallets: NextApiHandler<GetWalletsResponse> = async (
  req,
  res
) => {
  const query = querySchema.parse(req.query)

  const walletsWithoutBalance = await req.prisma.wallet.findMany({
    where: {
      group: {
        id: query.groupId,
        userIds: {
          has: req.session.user.id,
        },
      },
    },
    select: walletSelect,
  })

  const wallets = await Promise.all(
    walletsWithoutBalance.map((wallet) => populateWalletBalance(req, wallet))
  )

  res.status(200).json({ wallets })
}
