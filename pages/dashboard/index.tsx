import { NextPage } from 'next'
import Head from 'next/head'
import useSWR from 'swr'
import { GetGroupsResponse } from '../../api/group'
import { Groups } from '../../components/Groups'
import { Container } from '../../components/ui-kit/Container'

const Dashboard: NextPage = () => {
  const { data } = useSWR<GetGroupsResponse>('/api/group')
  const groups = data?.groups

  if (!groups) {
    // TODO redirect
    return null
  }

  return (
    <>
      <Head>
        <title>Expense – Dashboard</title>
      </Head>

      <Container className="py-6">
        <Groups groups={groups} />
      </Container>
    </>
  )
}

export default Dashboard
