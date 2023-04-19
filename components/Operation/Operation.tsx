import { FC, useMemo } from 'react'
import { ROUTES } from '../../constants/routes.ts'
import { OperationInfoCard } from '../cards/OperationInfo/OperationInfo.tsx'
import { useOperationContext } from '../contexts/Operation.tsx'
import { NextHead } from '../next/Head.ts'
import { BreadcrumbSkeleton } from '../ui-kit/Breadcrumbs/BreadcrumbSkeleton.tsx'
import { Breadcrumbs } from '../ui-kit/Breadcrumbs/Breadcrumbs.tsx'
import { Columns } from '../ui-kit/Columns/Columns.tsx'

export const Operation: FC = () => {
  const { operationResponse } = useOperationContext()

  const parents = useMemo(() => {
    const wallet =
      operationResponse?.operation.expenseWallet ??
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
      <NextHead>
        <title>
          {operationResponse
            ? `Expense > ${operationResponse.operation.category} – ${operationResponse.operation.name}`
            : 'Loading...'}
        </title>
      </NextHead>

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
