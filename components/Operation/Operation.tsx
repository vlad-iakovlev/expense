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
        <title>{`Expense > ${operation.category} – ${operation.name}`}</title>
      </Head>

      <Breadcrumbs>
        <Breadcrumbs.Link href={ROUTES.DASHBOARD} title="Dashboard" />
        <Breadcrumbs.Link
          href={ROUTES.GROUP(operation.wallet.group.id)}
          title={operation.wallet.group.name}
        />
        <Breadcrumbs.Link
          href={ROUTES.WALLET(operation.wallet.id)}
          title={`${operation.wallet.name} ${operation.wallet.currency.name}`}
        />
        <Breadcrumbs.Title
          title={`${operation.category} – ${operation.name}`}
        />
      </Breadcrumbs>

      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-x-6 [&>*]:break-inside-avoid [&>*]:mb-6">
        <OperationInfoCard />
      </div>
    </>
  )
}
