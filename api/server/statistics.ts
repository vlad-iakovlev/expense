import { NextApiHandler } from 'next'
import { getDefaultCurrency } from '../../utils/server/getDefaultCurrency.ts'
import { getGroupDefaultCurrency } from '../../utils/server/getGroupDefaultCurrency.ts'
import { getStatisticsByCategoryItems } from '../../utils/server/getStatisticsByCategoryItems.ts'
import { getWalletCurrency } from '../../utils/server/getWalletCurrency.ts'
import { ClientCurrency } from '../types/currencies.ts'
import {
  GetStatisticsByCategoryResponse,
  StatisticsByCategoryItem,
} from '../types/statistics.ts'
import { getStatisticsByCategoryQuerySchema } from './schemas/statistics.ts'
import { walletSelector } from './selectors/index.ts'

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
    startDate: query.startDate,
    endDate: query.endDate,
    currency,
    wallets,
  })

  const expenses = await getStatisticsByCategoryItems(req, {
    type: 'expense',
    groupId: query.groupId,
    walletId: query.walletId,
    startDate: query.startDate,
    endDate: query.endDate,
    currency,
    wallets,
  })

  const itemsMap: Record<string, StatisticsByCategoryItem> = {}

  incomes.forEach((item) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    itemsMap[item.category] ??= {
      category: item.category,
      incomeAmount: 0,
      expenseAmount: 0,
    }

    itemsMap[item.category].incomeAmount += item.amount
  })

  expenses.forEach((item) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    itemsMap[item.category] ??= {
      category: item.category,
      incomeAmount: 0,
      expenseAmount: 0,
    }

    itemsMap[item.category].expenseAmount += item.amount
  })

  const items = Object.values(itemsMap).sort((item1, item2) => {
    if (item1.category < item2.category) return -1
    if (item1.category > item2.category) return 1
    return 0
  })

  res.status(200).json({
    statisticsByCategory: {
      currency,
      items,
    },
  })
}
