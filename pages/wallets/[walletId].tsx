import { NextPage } from 'next'
import { useRouter } from 'next/router.js'
import { forwardRef, useState } from 'react'
import { Page } from '../../components/layout/Page/Page.tsx'
import { Wallet } from '../../components/pages/Wallet.tsx'

const WalletPage = forwardRef<HTMLDivElement, NextPage>(function WalletPage(
  {},
  ref
) {
  const router = useRouter()
  const [walletId] = useState(router.query.walletId)

  if (typeof walletId !== 'string') {
    return null
  }

  return (
    <Page ref={ref}>
      <Wallet walletId={walletId} />
    </Page>
  )
})

export default WalletPage
