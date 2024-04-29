import { NextPage } from 'next'
import { useRouter } from 'next/router.js'
import { useState } from 'react'
import { Page } from '@/components/layout/Page/index.jsx'
import { GroupSettings } from '@/components/pages/GroupSettings.jsx'
import { CategoryFilterProvider } from '@/contexts/CategoryFilter.jsx'

const GroupSettingsPage: NextPage = () => {
  const router = useRouter()
  const [groupId] = useState(router.query.groupId)

  if (typeof groupId !== 'string') {
    return null
  }

  return (
    <Page>
      <CategoryFilterProvider>
        <GroupSettings groupId={groupId} />
      </CategoryFilterProvider>
    </Page>
  )
}

export default GroupSettingsPage
