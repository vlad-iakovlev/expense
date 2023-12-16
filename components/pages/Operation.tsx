import { useMemo } from 'react'
import { ROUTES } from '../../constants/routes.js'
import { useOperation } from '../../contexts/RootStore/hooks/useOperation.js'
import { OperationInfoCard } from '../cards/OperationInfo/OperationInfo.jsx'
import { NextHead } from '../next/Head.js'
import { Breadcrumbs } from '../ui-kit/Breadcrumbs/Breadcrumbs.jsx'
import { Columns } from '../ui-kit/Columns/Columns.jsx'
import { Title } from '../ui-kit/Title/Title.jsx'

interface Props {
  operationId: string
}

export const Operation = ({ operationId }: Props) => {
  const { operation } = useOperation({ operationId })

  const parents = useMemo(() => {
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
      <NextHead>
        <title>{`Expense > ${operation.category} – ${operation.name}`}</title>
      </NextHead>

      <Breadcrumbs parents={parents} />
      <Title title={operation.name} />

      <Columns>
        <OperationInfoCard operationId={operationId} />
      </Columns>
    </>
  )
}
