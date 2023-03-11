import { Transition } from '@headlessui/react'
import Error from 'next/error'
import { FC, Fragment, ReactElement, useContext } from 'react'
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
import { Portal } from '../ui-kit/Portal'

interface Props {
  renderError?: () => ReactElement | null
  renderContent: () => ReactElement | null
}

export const CheckSwrContexts: FC<Props> = ({
  renderError = () => <Error statusCode={404} />,
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

  if (hasError || contexts.some((context) => context?.hasError)) {
    return <>{renderError()}</>
  }

  return (
    <>
      {renderContent()}

      <Portal>
        <Transition
          show={isLoading}
          className="fixed z-50 inset-0 bg-zinc-500"
          enter="transition ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-75"
          leave="transition ease-in duration-200"
          leaveFrom="opacity-75"
          leaveTo="opacity-0"
        />
      </Portal>
    </>
  )
}
