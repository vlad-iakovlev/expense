import { Transition } from '@headlessui/react'
import { FC, ReactElement, useContext } from 'react'
import { CategoriesContext } from '../contexts/Categories.tsx'
import { CurrenciesContext } from '../contexts/Currencies.tsx'
import { useErrorContext } from '../contexts/Error.tsx'
import { GroupContext } from '../contexts/Group.tsx'
import { GroupsContext } from '../contexts/Groups.tsx'
import { useLoadingContext } from '../contexts/Loading.tsx'
import { OperationContext } from '../contexts/Operation.tsx'
import { OperationsContext } from '../contexts/Operations.tsx'
import { StatisticsByCategoryContext } from '../contexts/StatisticsByCategory.tsx'
import { WalletContext } from '../contexts/Wallet.tsx'
import { WalletsContext } from '../contexts/Wallets.tsx'
import { NextError } from '../next/Error.ts'
import { Portal } from '../ui-kit/Portal/Portal.tsx'

interface Props {
  renderError?: () => ReactElement | null
  renderContent: () => ReactElement | null
}

export const CheckSwrContexts: FC<Props> = ({
  renderError = () => <NextError statusCode={404} />,
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
