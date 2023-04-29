import assert from 'assert'
import { GetServerSideProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { NextError } from '../../components/next/Error.ts'
import { NextHead } from '../../components/next/Head.ts'
import { Wallet } from '../../components/pages/Wallet/Wallet.tsx'
import { Overlay } from '../../components/ui-kit/Overlay/Overlay.tsx'

interface Props {
  walletId: string
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const walletId = context.query.walletId
  assert(typeof walletId === 'string', 'walletId is not a string')
  return Promise.resolve({ props: { walletId } })
}

const WalletPage: NextPage<Props> = ({ walletId }) => {
  const session = useSession()

  return (
    <>
      {session.status === 'authenticated' ? (
        <Wallet walletId={walletId} />
      ) : (
        <NextHead>
          <title>Expense</title>
        </NextHead>
      )}

      {session.status === 'unauthenticated' && <NextError statusCode={403} />}

      <Overlay isVisible={session.status === 'loading'} />
    </>
  )
}

export default WalletPage
