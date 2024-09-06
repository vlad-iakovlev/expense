import { NextPage } from 'next'
import { useRouter } from 'next/router.js'
import { Page } from '@/components/layout/Page/index.jsx'
import { GroupSettings } from '@/components/pages/GroupSettings.jsx'
import { CategoryFilterProvider } from '@/contexts/CategoryFilter.jsx'

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
