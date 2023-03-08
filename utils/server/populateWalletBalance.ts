import { NextApiRequest } from 'next'
import { ClientWallet } from '../../api/types/wallets'

export const populateWalletBalance = async (
  req: NextApiRequest,
  wallet: Omit<ClientWallet, 'balance'>
): Promise<ClientWallet> => {
  const incomes = await req.prisma.operation.aggregate({
    where: {
      incomeWalletId: wallet.id,
    },
    _sum: {
      incomeAmount: true,
    },
  })

  const expenses = await req.prisma.operation.aggregate({
    where: {
      expenseWalletId: wallet.id,
    },
    _sum: {
      expenseAmount: true,
    },
  })

  return {
    ...wallet,
    balance:
      (incomes._sum.incomeAmount || 0) - (expenses._sum.expenseAmount || 0),
  }
}
