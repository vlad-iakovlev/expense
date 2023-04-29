import { NextPage } from 'next'
import { useRouter } from 'next/router.js'
import { PageWrapper } from '../../components/PageWrapper/PageWrapper.tsx'
import { Group } from '../../components/pages/Group/Group.tsx'

const GroupPage: NextPage = () => {
  const router = useRouter()
  const groupId = router.query.groupId

  if (typeof groupId !== 'string') {
    return null
  }

  return (
    <PageWrapper>
      <Group groupId={groupId} />
    </PageWrapper>
  )
}

export default GroupPage
