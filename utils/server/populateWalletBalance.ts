import { getOperationWhere } from '../../api/server/where/index.ts'
import { ClientWallet } from '../../api/types/wallets.ts'
import { prisma } from './prisma.ts'

export const populateWalletBalance = async (
  wallet: Omit<ClientWallet, 'balance'>
): Promise<ClientWallet> => {
  const incomes = await prisma.operation.aggregate({
    where: getOperationWhere({
      userId: wallet.group.users[0].id,
      walletId: wallet.id,
      type: 'income',
    }),
    _sum: {
      incomeAmount: true,
    },
  })

  const expenses = await prisma.operation.aggregate({
    where: getOperationWhere({
      userId: wallet.group.users[0].id,
      walletId: wallet.id,
      type: 'expense',
    }),
    _sum: {
      expenseAmount: true,
    },
  })

  return {
    ...wallet,
    balance:
      (incomes._sum.incomeAmount ?? 0) - (expenses._sum.expenseAmount ?? 0),
  }
}
