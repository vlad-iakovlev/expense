import Head from 'next/head'
import { FC } from 'react'
import { ROUTES } from '../../constants/routes'
import { OperationInfoCard } from '../cards/OperationInfo'
import { useOperationContext } from '../contexts/Operation'
import { Breadcrumbs } from '../ui-kit/Breadcrumbs'

export const Operation: FC = () => {
  const { operation } = useOperationContext()

  return (
    <>
      <Head>
        <title>{`Expense > ${operation.category} – ${operation.description}`}</title>
      </Head>

      <Breadcrumbs>
        <Breadcrumbs.Link href={ROUTES.DASHBOARD} title="Dashboard" />
        <Breadcrumbs.Link
          href={ROUTES.GROUP(operation.wallet.group.id)}
          title={operation.wallet.group.name}
        />
        <Breadcrumbs.Link
          href={ROUTES.WALLET(operation.wallet.id)}
          title={operation.wallet.name}
        />
        <Breadcrumbs.Title
          title={`${operation.category} – ${operation.description}`}
        />
      </Breadcrumbs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start gap-6">
        <OperationInfoCard />
      </div>
    </>
  )
}
