import assert from 'assert'
import { useMemo } from 'react'
import {
  ClientCurrency,
  ClientStatisticsByCategory,
  ClientWallet,
} from '../../../types/client.ts'
import * as P from '../../../utils/piped/index.ts'
import { stringToColor } from '../../../utils/stringToColor.ts'
import { useRootStore } from '../RootStore.tsx'
import { getDefaultCurrency } from '../getters/currencies.ts'

interface Props {
  groupId?: string
  walletId?: string
  startDate?: Date
  endDate?: Date
}

export const useStatisticsByCategory = ({
  groupId,
  walletId,
  startDate,
  endDate,
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
    return P.pipe(state.operations)
      .pipe(P.map(P.prop('category')))
      .pipe(P.sort((a, b) => a.localeCompare(b)))
      .pipe(
        P.reduce((acc, category) => {
          const incomeOperations = state.operations.filter((operation) => {
            return (
              !operation.removed &&
              operation.category === category &&
              operation.incomeWalletId &&
              walletsMap[operation.incomeWalletId] &&
              (!startDate || operation.date >= startDate) &&
              (!endDate || operation.date < endDate)
            )
          })

          const expenseOperations = state.operations.filter((operation) => {
            return (
              !operation.removed &&
              operation.category === category &&
              operation.expenseWalletId &&
              walletsMap[operation.expenseWalletId] &&
              (!startDate || operation.date >= startDate) &&
              (!endDate || operation.date < endDate)
            )
          })

          if (incomeOperations.length || expenseOperations.length) {
            const incomeAmount = incomeOperations.reduce<number>(
              (acc, operation) => {
                assert(
                  operation.incomeWalletId,
                  'incomeWalletId is not defined'
                )
                const wallet = walletsMap[operation.incomeWalletId]
                assert(wallet, 'Wallet not found')
                const currency = currenciesMap[wallet.currencyId]
                assert(currency, 'Currency not found')

                const amount =
                  operation.incomeAmount *
                  (statisticsByCategoryCurrency.rate / currency.rate)

                return acc + amount
              },
              0
            )

            const expenseAmount = expenseOperations.reduce<number>(
              (acc, operation) => {
                assert(
                  operation.expenseWalletId,
                  'incomeWalletId is not defined'
                )
                const wallet = walletsMap[operation.expenseWalletId]
                assert(wallet, 'Wallet not found')
                const currency = currenciesMap[wallet.currencyId]
                assert(currency, 'Currency not found')

                const amount =
                  operation.expenseAmount *
                  (statisticsByCategoryCurrency.rate / currency.rate)

                return acc + amount
              },
              0
            )

            acc.push({
              category,
              color: stringToColor(category),
              incomeAmount,
              expenseAmount,
            })
          }

          return acc
        }, [] as ClientStatisticsByCategory[])
      )
      .value()
  }, [
    currenciesMap,
    endDate,
    startDate,
    state.operations,
    statisticsByCategoryCurrency.rate,
    walletsMap,
  ])

  return {
    statisticsByCategoryItems,
    statisticsByCategoryCurrency,
  }
}
