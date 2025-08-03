import Head from 'next/head'
import React from 'react'
import { OperationInfoCard } from '@/cards/OperationInfo/index'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { Columns } from '@/components/common/Columns'
import { Title } from '@/components/common/Title'
import { ROUTES } from '@/constants/routes'
import { useOperation } from '@/contexts/RootStore/hooks/useOperation'

interface OperationProps {
  operationId: string
}

export const Operation = ({ operationId }: OperationProps) => {
  const { operation } = useOperation({ operationId })

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
      <Head>
        <title>{`Expense > ${operation.category} – ${operation.name}`}</title>
      </Head>

      <Breadcrumbs parents={parents} />
      <Title title={operation.name} />

      <Columns>
        <OperationInfoCard operationId={operationId} />
      </Columns>
    </>
  )
}
