import assert from 'assert'
import React from 'react'
import {
  ClientStatisticsItem,
  ClientStatisticsType,
  ClientWallet,
  PopulatedClientCurrency,
} from '@/types/client.js'
import { Decimal } from '@/utils/Decimal.js'
import { stringToColor } from '@/utils/stringToColor.js'
import { uniq } from '@/utils/uniq.js'
import {
  getDefaultCurrencyId,
  getPopulatedCurrency,
} from '../getters/currencies.js'
import { useRootStore } from '../index.jsx'

const WALLET_ID_FIELD = {
  [ClientStatisticsType.INCOMES]: 'incomeWalletId',
  [ClientStatisticsType.EXPENSES]: 'expenseWalletId',
} as const

const AMOUNT_FIELD = {
  [ClientStatisticsType.INCOMES]: 'incomeAmount',
  [ClientStatisticsType.EXPENSES]: 'expenseAmount',
} as const

interface UseStatisticsProps {
  groupId?: string
  walletId?: string
  startDate?: Date
  endDate?: Date
  type: ClientStatisticsType
}

export const useStatistics = ({
  groupId,
  walletId,
  startDate,
  endDate,
  type,
}: UseStatisticsProps) => {
  const { state } = useRootStore()

  const statisticsCurrency = React.useMemo(
    () =>
      getPopulatedCurrency(
        state,
        getDefaultCurrencyId(state, { groupId, walletId }),
      ),
    [groupId, state, walletId],
  )

  const currenciesMap = React.useMemo(
    () =>
      state.populatedCurrencies.reduce<
        Record<string, PopulatedClientCurrency | undefined>
      >((acc, currency) => {
        acc[currency.id] = currency
        return acc
      }, {}),
    [state.populatedCurrencies],
  )

  const walletsMap = React.useMemo(
    () =>
      state.wallets.reduce<Record<string, ClientWallet | undefined>>(
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
        {},
      ),
    [groupId, state.wallets, walletId],
  )

  const statisticsItems = React.useMemo<ClientStatisticsItem[]>(() => {
    const categories = uniq(
      state.operations.map((operation) => operation.category),
    ).sort((a, b) => a.localeCompare(b))

    return categories.reduce<ClientStatisticsItem[]>((acc, category) => {
      const operations = state.operations.filter(
        (operation) =>
          !operation.removed &&
          operation.category === category &&
          walletsMap[operation[WALLET_ID_FIELD[type]] ?? ''] &&
          (!startDate || operation.date >= startDate) &&
          (!endDate || operation.date < endDate),
      )

      const amount = operations.reduce((acc, operation) => {
        const wallet = walletsMap[operation[WALLET_ID_FIELD[type]] ?? '']
        assert(wallet, 'Wallet not found')
        const currency = currenciesMap[wallet.currencyId]
        assert(currency, 'Currency not found')

        const amount = operation[AMOUNT_FIELD[type]].mul(
          Decimal.fromNumber(statisticsCurrency.rate / currency.rate),
        )

        return acc.add(amount)
      }, Decimal.ZERO)

      acc.push({
        category,
        color: stringToColor(category),
        amount,
      })

      return acc
    }, [])
  }, [
    currenciesMap,
    endDate,
    startDate,
    state.operations,
    statisticsCurrency.rate,
    type,
    walletsMap,
  ])

  return {
    statisticsItems,
    statisticsCurrency,
  }
}
