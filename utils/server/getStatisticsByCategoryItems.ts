import { NextApiRequest } from 'next'
import { ClientCurrency } from '../../api/types/currencies'
import { ClientWallet } from '../../api/types/wallets'

interface GetCategoriesStatisticsParams {
  type: 'income' | 'expense'
  groupId?: string
  walletId?: string
  startDate?: string | Date
  endDate?: string | Date
  currency: ClientCurrency
  wallets: Omit<ClientWallet, 'balance'>[]
}

export const getStatisticsByCategoryItems = async (
  req: NextApiRequest,
  params: GetCategoriesStatisticsParams
) => {
  const rawItems = await req.prisma.operation.groupBy({
    where: {
      [`${params.type}Wallet`]: {
        id: params.walletId,
        group: {
          id: params.groupId,
          userIds: {
            has: req.session.user.id,
          },
        },
      },
      date: {
        gte: params.startDate,
        lt: params.endDate,
      },
    },
    by: ['category', `${params.type}WalletId`],
    _sum: {
      [`${params.type}Amount`]: true,
    },
  })

  return rawItems.map((item) => {
    const wallet = params.wallets.find(
      (wallet) => wallet.id === item[`${params.type}WalletId`]
    )

    if (!wallet) {
      throw new Error(
        `Can't find wallet with id ${item[`${params.type}WalletId`]}`
      )
    }

    return {
      category: item.category,
      amount:
        (item._sum[`${params.type}Amount`] || 0) *
        (params.currency.rate / wallet.currency.rate),
    }
  }, [])
}
