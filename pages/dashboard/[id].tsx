import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { GetGroupResponse } from '../../api/group'
import { Container } from '../../components/ui-kit/Container'

const DashboardId: NextPage = () => {
  const router = useRouter()
  const { data } = useSWR<GetGroupResponse>(`/api/group/${router.query.id}`)
  const group = data?.group

  if (!group) {
    // TODO redirect
    return null
  }

  return (
    <>
      <Head>
        <title>{`Expense – Group ${group.name || ''}`}</title>
      </Head>

      <Container className="py-6">
        <h1 className="text-xl font-medium mb-6">{group.name}</h1>
      </Container>
    </>
  )
}

export default DashboardId
