import { NextApiHandler } from 'next'
import { ClientWallet } from '../models/wallet'

const walletSelect = {
  id: true,
  name: true,
  emoji: true,
  color: true,
  currency: {
    select: {
      id: true,
      name: true,
      symbol: true,
    },
  },
}

export interface GetWalletsResponse {
  wallets: ClientWallet[]
}

export const getWallets: NextApiHandler<GetWalletsResponse> = async (
  req,
  res
) => {
  const wallets = await req.prisma.wallet.findMany({
    where: {
      group: {
        userIds: {
          has: req.session.user.id,
        },
      },
    },
    select: walletSelect,
  })

  res.status(200).json({ wallets })
}
