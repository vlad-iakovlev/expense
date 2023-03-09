import Head from 'next/head'
import { FC, useMemo } from 'react'
import { ROUTES } from '../../constants/routes'
import { OperationInfoCard } from '../cards/OperationInfo'
import { useOperationContext } from '../contexts/Operation'
import { Breadcrumbs, BreadcrumbSkeleton } from '../ui-kit/Breadcrumbs'
import { Columns } from '../ui-kit/Columns'

export const Operation: FC = () => {
  const { operationResponse } = useOperationContext()

  const parents = useMemo(() => {
    const wallet =
      operationResponse?.operation.expenseWallet ||
      operationResponse?.operation.incomeWallet

    return [
      {
        href: ROUTES.DASHBOARD,
        title: 'Dashboard',
      },
      ...(wallet
        ? [
            {
              href: ROUTES.GROUP(wallet.group.id),
              title: wallet.group.name,
            },
            {
              href: ROUTES.WALLET(wallet.id),
              title: `${wallet.name} ${wallet.currency.name}`,
            },
          ]
        : []),
    ]
  }, [
    operationResponse?.operation.expenseWallet,
    operationResponse?.operation.incomeWallet,
  ])

  return (
    <>
      <Head>
        <title>
          {operationResponse
            ? `Expense > ${operationResponse.operation.category} – ${operationResponse.operation.name}`
            : 'Loading...'}
        </title>
      </Head>

      {operationResponse ? (
        <Breadcrumbs
          title={`${operationResponse.operation.category} – ${operationResponse.operation.name}`}
          parents={parents}
        />
      ) : (
        <BreadcrumbSkeleton withParent />
      )}

      <Columns>
        <OperationInfoCard />
      </Columns>
    </>
  )
}
