import React from 'react'
import { OperationInfoCard } from '@/cards/OperationInfo/index.jsx'
import { Breadcrumbs } from '@/components/common/Breadcrumbs.jsx'
import { Columns } from '@/components/common/Columns.jsx'
import { Title } from '@/components/common/Title.jsx'
import { ROUTES } from '@/constants/routes.js'
import { useOperation } from '@/contexts/RootStore/hooks/useOperation.js'
import { useTitle } from '@/hooks/useTitle.js'

interface OperationProps {
  operationId: string
}

export const Operation = ({ operationId }: OperationProps) => {
  const { operation } = useOperation({ operationId })

  useTitle(`Expense > ${operation.category} – ${operation.name}`)

  const parents = React.useMemo(() => {
    const wallet = operation.expenseWallet ?? operation.incomeWallet

    if (!wallet) return undefined

    return [
      {
        href: ROUTES.DASHBOARD,
        title: 'Dashboard',
      },
      {
        href: ROUTES.GROUP(wallet.group.id),
        title: wallet.group.name,
      },
      {
        href: ROUTES.WALLET(wallet.id),
        title: `${wallet.name} ${wallet.currency.symbol}`,
      },
    ]
  }, [operation.expenseWallet, operation.incomeWallet])

  return (
    <>
      <Breadcrumbs parents={parents} />
      <Title title={operation.name} />

      <Columns>
        <OperationInfoCard operationId={operationId} />
      </Columns>
    </>
  )
}
