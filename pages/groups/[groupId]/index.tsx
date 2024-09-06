import { NextPage } from 'next'
import { useRouter } from 'next/router.js'
import { Page } from '@/components/layout/Page/index.jsx'
import { Group } from '@/components/pages/Group.jsx'
import { CategoryFilterProvider } from '@/contexts/CategoryFilter.jsx'

const GroupPage: NextPage = () => {
  const router = useRouter()

  if (typeof router.query.groupId !== 'string') {
    return null
  }

  return (
    <Page>
      <CategoryFilterProvider>
        <Group groupId={router.query.groupId} />
      </CategoryFilterProvider>
    </Page>
  )
}

export default GroupPage
