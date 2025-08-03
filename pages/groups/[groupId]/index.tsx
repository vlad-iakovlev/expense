import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Page } from '@/components/layout/Page/index'
import { Group } from '@/components/pages/Group'
import { CategoryFilterProvider } from '@/contexts/CategoryFilter'

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
