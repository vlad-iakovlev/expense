import { NextApiHandler } from 'next'
import { getDefaultCurrency } from '../../utils/server/getDefaultCurrency'
import { getGroupDefaultCurrency } from '../../utils/server/getGroupDefaultCurrency'
import { getStatisticsByCategoryItems } from '../../utils/server/getStatisticsByCategoryItems'
import { getWalletCurrency } from '../../utils/server/getWalletCurrency'
import { ClientCurrency } from '../types/currencies'
import { GetStatisticsByCategoryResponse } from '../types/statistics'
import { getStatisticsByCategoryQuerySchema } from './schemas/statistics'
import { walletSelector } from './selectors'

export const getStatisticsByCategory: NextApiHandler<
  GetStatisticsByCategoryResponse
> = async (req, res) => {
  const query = getStatisticsByCategoryQuerySchema.parse(req.query)

  let currency: ClientCurrency
  if (query.walletId) {
    currency = await getWalletCurrency(req, query.walletId)
  } else if (query.groupId) {
    currency = await getGroupDefaultCurrency(req, query.groupId)
  } else {
    currency = await getDefaultCurrency(req)
  }

  const wallets = await req.prisma.wallet.findMany({
    where: {
      group: {
        id: query.groupId,
        userIds: {
          has: req.session.user.id,
        },
      },
    },
    select: walletSelector,
  })

  const incomes = await getStatisticsByCategoryItems(req, {
    type: 'income',
    groupId: query.groupId,
    walletId: query.walletId,
    currency,
    wallets,
  })

  const expenses = await getStatisticsByCategoryItems(req, {
    type: 'expense',
    groupId: query.groupId,
    walletId: query.walletId,
    currency,
    wallets,
  })

  const itemsMap: Record<
    string,
    GetStatisticsByCategoryResponse['statisticsByCategory']['items'][number]
  > = {}

  incomes.forEach((item) => {
    itemsMap[item.category] ??= {
      category: item.category,
      incomeAmount: 0,
      expenseAmount: 0,
    }

    itemsMap[item.category].incomeAmount += item.amount
  })

  expenses.forEach((item) => {
    itemsMap[item.category] ??= {
      category: item.category,
      incomeAmount: 0,
      expenseAmount: 0,
    }

    itemsMap[item.category].expenseAmount += item.amount
  })

  res.status(200).json({
    statisticsByCategory: {
      currency,
      items: Object.values(itemsMap),
    },
  })
}
