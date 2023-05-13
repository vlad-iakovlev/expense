import assert from 'assert'
import { useMemo } from 'react'
import {
  ClientCurrency,
  ClientStatisticsByCategory,
  ClientStatisticsType,
  ClientWallet,
} from '../../../types/client.ts'
import { stringToColor } from '../../../utils/stringToColor.ts'
import { uniq } from '../../../utils/uniq.ts'
import { useRootStore } from '../RootStore.tsx'
import { getDefaultCurrency } from '../getters/currencies.ts'

const WALLET_ID_FIELD = {
  [ClientStatisticsType.INCOMES]: 'incomeWalletId',
  [ClientStatisticsType.EXPENSES]: 'expenseWalletId',
} as const

const AMOUNT_FIELD = {
  [ClientStatisticsType.INCOMES]: 'incomeAmount',
  [ClientStatisticsType.EXPENSES]: 'expenseAmount',
} as const

interface Props {
  groupId?: string
  walletId?: string
  startDate?: Date
  endDate?: Date
  type: ClientStatisticsType
}

export const useStatisticsByCategory = ({
  groupId,
  walletId,
  startDate,
  endDate,
  type,
}: Props) => {
  const { state } = useRootStore()

  const statisticsByCategoryCurrency = useMemo(
    () => getDefaultCurrency(state, { groupId, walletId }),
    [groupId, state, walletId]
  )

  const currenciesMap = useMemo(() => {
    return state.currencies.reduce<Record<string, ClientCurrency | undefined>>(
      (acc, currency) => {
        acc[currency.id] = currency
        return acc
      },
      {}
    )
  }, [state.currencies])

  const walletsMap = useMemo(() => {
    return state.wallets.reduce<Record<string, ClientWallet | undefined>>(
      (acc, wallet) => {
        if (
          !wallet.removed &&
          (!groupId || wallet.groupId === groupId) &&
          (!walletId || wallet.id === walletId)
        ) {
          acc[wallet.id] = wallet
        }

        return acc
      },
      {}
    )
  }, [groupId, state.wallets, walletId])

  const statisticsByCategoryItems = useMemo<
    ClientStatisticsByCategory[]
  >(() => {
    const categories = uniq(
      state.operations.map((operation) => operation.category)
    ).sort((a, b) => a.localeCompare(b))

    return categories.reduce<ClientStatisticsByCategory[]>((acc, category) => {
      const operations = state.operations.filter((operation) => {
        return (
          !operation.removed &&
          operation.category === category &&
          walletsMap[operation[WALLET_ID_FIELD[type]] ?? ''] &&
          (!startDate || operation.date >= startDate) &&
          (!endDate || operation.date < endDate)
        )
      })

      if (operations.length) {
        const amount = operations.reduce<number>((acc, operation) => {
          const wallet = walletsMap[operation[WALLET_ID_FIELD[type]] ?? '']
          assert(wallet, 'Wallet not found')
          const currency = currenciesMap[wallet.currencyId]
          assert(currency, 'Currency not found')

          const amount =
            operation[AMOUNT_FIELD[type]] *
            (statisticsByCategoryCurrency.rate / currency.rate)

          return acc + amount
        }, 0)

        acc.push({
          category,
          color: stringToColor(category),
          amount,
        })
      }

      return acc
    }, [])
  }, [
    currenciesMap,
    endDate,
    startDate,
    state.operations,
    statisticsByCategoryCurrency.rate,
    type,
    walletsMap,
  ])

  return {
    statisticsByCategoryItems,
    statisticsByCategoryCurrency,
  }
}
