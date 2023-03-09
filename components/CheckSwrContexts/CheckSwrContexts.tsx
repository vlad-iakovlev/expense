import Error from 'next/error'
import { FC, ReactElement, useContext } from 'react'
import { CategoriesContext } from '../contexts/Categories'
import { CurrenciesContext } from '../contexts/Currencies'
import { useErrorContext } from '../contexts/Error'
import { GroupContext } from '../contexts/Group'
import { GroupsContext } from '../contexts/Groups'
import { useLoadingContext } from '../contexts/Loading'
import { OperationContext } from '../contexts/Operation'
import { OperationsContext } from '../contexts/Operations'
import { StatisticsByCategoryContext } from '../contexts/StatisticsByCategory'
import { WalletContext } from '../contexts/Wallet'
import { WalletsContext } from '../contexts/Wallets'

interface Props {
  renderError?: () => ReactElement | null
  renderLoading?: () => ReactElement | null
  renderContent: () => ReactElement | null
}

export const CheckSwrContexts: FC<Props> = ({
  renderError = () => <Error statusCode={404} />,
  renderLoading = () => null,
  renderContent,
}) => {
  const { isLoading } = useLoadingContext()
  const { hasError } = useErrorContext()

  const contexts = [
    useContext(CategoriesContext),
    useContext(CurrenciesContext),
    useContext(GroupContext),
    useContext(GroupsContext),
    useContext(OperationContext),
    useContext(OperationsContext),
    useContext(StatisticsByCategoryContext),
    useContext(WalletContext),
    useContext(WalletsContext),
  ]

  if (isLoading || contexts.some((context) => context?.isLoading)) {
    return <>{renderLoading()}</>
  }

  if (hasError || contexts.some((context) => context?.hasError)) {
    return <>{renderError()}</>
  }

  return <>{renderContent()}</>
}
