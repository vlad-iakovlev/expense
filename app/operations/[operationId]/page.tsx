'use client'

import { useRouter } from 'next/navigation'
import { use, useMemo } from 'react'
import { useEffect } from 'react'
import { OperationInfoCard } from '@/cards/OperationInfo/index'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { Columns } from '@/components/common/Columns'
import { Title } from '@/components/common/Title'
import { Page } from '@/components/layout/Page'
import { ROUTES } from '@/constants/routes'
import { useOptionalOperation } from '@/contexts/RootStore/hooks/useOperation'

type OperationPageProps = {
  params: Promise<{
    operationId: string
  }>
}

const OperationPage = ({ params }: OperationPageProps) => {
  const { operationId } = use(params)
  const router = useRouter()
  const { operation } = useOptionalOperation({ operationId })

  useEffect(() => {
    if (!operation) {
      router.push(ROUTES.DASHBOARD)
    }
  }, [operation, router])

  const parents = useMemo(() => {
    if (!operation) return undefined

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
  }, [operation])

  if (!operation) return null

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

export default function WrappedOperationPage(props: OperationPageProps) {
  return (
    <Page>
      <OperationPage {...props} />
    </Page>
  )
}
