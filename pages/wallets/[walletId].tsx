import { NextPage } from 'next'
import { useRouter } from 'next/router.js'
import { forwardRef, useState } from 'react'
import { PageWrapper } from '../../components/PageWrapper/PageWrapper.tsx'
import { Wallet } from '../../components/pages/Wallet/Wallet.tsx'

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
    <PageWrapper ref={ref}>
      <Wallet walletId={walletId} />
    </PageWrapper>
  )
})

export default WalletPage
