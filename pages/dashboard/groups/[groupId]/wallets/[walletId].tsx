import { GetServerSideProps, NextPage } from 'next'
import Error from 'next/error'
import Head from 'next/head'
import { useCallback } from 'react'
import useSWR from 'swr'
import { getWallet } from '../../../../../api/client/wallets'

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
  const { data: { wallet } = {}, isLoading: isWalletLoading } = useSWR(
    `groups-${groupId}/wallet-${walletId}`,
    useCallback(() => getWallet(groupId, walletId), [groupId, walletId])
  )

  if (isWalletLoading) {
    return null
  }

  if (!wallet) {
    return <Error statusCode={404} />
  }

  return (
    <>
      <Head>
        <title>{`Expense – ${wallet.group.name} - ${wallet.name}`}</title>
      </Head>
    </>
  )
}

export default WalletPage
