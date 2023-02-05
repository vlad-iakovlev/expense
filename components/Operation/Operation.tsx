import Head from 'next/head'
import { FC, useMemo } from 'react'
import { ROUTES } from '../../constants/routes'
import { OperationInfoCard } from '../cards/OperationInfo'
import { useOperationContext } from '../contexts/Operation'
import { Breadcrumbs } from '../ui-kit/Breadcrumbs'

export const Operation: FC = () => {
  const { operation } = useOperationContext()

  const parents = useMemo(() => {
    return [
      {
        href: ROUTES.DASHBOARD,
        title: 'Dashboard',
      },
      {
        href: ROUTES.GROUP(operation.wallet.group.id),
        title: operation.wallet.group.name,
      },
      {
        href: ROUTES.WALLET(operation.wallet.id),
        title: `${operation.wallet.name} ${operation.wallet.currency.name}`,
      },
    ]
  }, [
    operation.wallet.currency.name,
    operation.wallet.group.id,
    operation.wallet.group.name,
    operation.wallet.id,
    operation.wallet.name,
  ])

  return (
    <>
      <Head>
        <title>{`Expense > ${operation.category} – ${operation.name}`}</title>
      </Head>

      <Breadcrumbs
        title={`${operation.category} – ${operation.name}`}
        parents={parents}
      />

      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-x-6 [&>*]:mb-6">
        <OperationInfoCard />
      </div>
    </>
  )
}
