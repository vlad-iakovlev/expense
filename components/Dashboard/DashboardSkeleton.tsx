import Head from 'next/head'
import { FC } from 'react'
import { BreadcrumbSkeleton } from '../ui-kit/Breadcrumbs'
import { Card } from '../ui-kit/Card'
import { Columns } from '../ui-kit/Columns'

export const DashboardSkeleton: FC = () => {
  return (
    <>
      <Head>
        <title>Loading...</title>
      </Head>

      <div className="animate-pulse">
        <BreadcrumbSkeleton />

        <Columns>
          <Card.Skeleton elementsCount={3} />
          <Card.Skeleton elementsCount={6} />
          <Card.Skeleton elementsCount={6} />
        </Columns>
      </div>
    </>
  )
}
