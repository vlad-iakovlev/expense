import { GetServerSideProps, NextPage } from 'next'
import Error from 'next/error'
import Head from 'next/head'
import useSWR from 'swr'
import { GetWalletResponse } from '../../../api/wallet'

interface Props {
  groupId: string
  walletId: string
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  return {
    props: {
      groupId: String(context.query.groupId),
      walletId: String(context.query.walletId),
    },
  }
}

const WalletPage: NextPage<Props> = ({ groupId, walletId }) => {
  const { data: walletData, isLoading: isWalletLoading } =
    useSWR<GetWalletResponse>(`/api/group/${groupId}/wallet/${walletId}`)
  const wallet = walletData?.wallet

  if (isWalletLoading) return null
  if (!wallet) return <Error statusCode={404} />

  return (
    <>
      <Head>
        <title>{`Expense – ${wallet.group.name} - ${wallet.name}`}</title>
      </Head>
    </>
  )
}

export default WalletPage
