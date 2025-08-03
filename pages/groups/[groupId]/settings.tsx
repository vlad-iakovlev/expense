import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Page } from '@/components/layout/Page/index'
import { GroupSettings } from '@/components/pages/GroupSettings'
import { CategoryFilterProvider } from '@/contexts/CategoryFilter'

const GroupSettingsPage: NextPage = () => {
  const router = useRouter()

  if (typeof router.query.groupId !== 'string') {
    return null
  }

  return (
    <Page>
      <CategoryFilterProvider>
        <GroupSettings groupId={router.query.groupId} />
      </CategoryFilterProvider>
    </Page>
  )
}

export default GroupSettingsPage
