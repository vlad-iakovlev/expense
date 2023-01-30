import { NextApiRequest } from 'next'
import { ClientWallet } from '../../models/wallet'

export const populateWalletBalance = async (
  req: NextApiRequest,
  wallet: Omit<ClientWallet, 'balance'>
): Promise<ClientWallet> => {
  const aggregations = await req.prisma.operation.aggregate({
    where: {
      walletId: wallet.id,
    },
    _sum: {
      amount: true,
    },
  })

  return {
    ...wallet,
    balance: aggregations._sum.amount || 0,
  }
}
