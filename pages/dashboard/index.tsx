import { NextPage } from 'next'
import Error from 'next/error'
import Head from 'next/head'
import useSWR from 'swr'
import { GetGroupsResponse } from '../../api/group'
import { Groups } from '../../components/Groups'
import { Container } from '../../components/ui-kit/Container'

const Dashboard: NextPage = () => {
  const { data, isLoading } = useSWR<GetGroupsResponse>('/api/group')
  const groups = data?.groups

  if (isLoading) return null
  if (!groups) return <Error statusCode={404} />

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
