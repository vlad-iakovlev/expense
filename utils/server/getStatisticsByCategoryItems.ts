import { getOperationWhere } from '../../api/server/where/index.ts'
import { ClientCurrency } from '../../api/types/currencies.ts'
import { ClientWallet } from '../../api/types/wallets.ts'
import { prisma } from './prisma.ts'

interface GetCategoriesStatisticsParams {
  type: 'income' | 'expense'
  userId: string
  groupId?: string
  walletId?: string
  startDate?: string | Date
  endDate?: string | Date
  currency: ClientCurrency
  wallets: Omit<ClientWallet, 'balance'>[]
}

export const getStatisticsByCategoryItems = async (
  params: GetCategoriesStatisticsParams
) => {
  const rawItems = await prisma.operation.groupBy({
    where: {
      ...getOperationWhere({
        userId: params.userId,
        groupId: params.groupId,
        walletId: params.walletId,
        type: params.type,
      }),
      date: {
        gte: params.startDate,
        lt: params.endDate,
      },
    },
    by: ['category', `${params.type}WalletId`],
    _sum: {
      ...(params.type === 'income' && { incomeAmount: true }),
      ...(params.type === 'expense' && { expenseAmount: true }),
    },
  })

  return rawItems.map((item) => {
    const wallet = params.wallets.find(
      (wallet) => wallet.id === item[`${params.type}WalletId`]
    )

    if (!wallet) {
      throw new Error(
        `Can't find wallet with id ${item[`${params.type}WalletId`] ?? ''}`
      )
    }

    return {
      category: item.category,
      amount:
        (item._sum[`${params.type}Amount`] ?? 0) *
        (params.currency.rate / wallet.currency.rate),
    }
  }, [])
}
