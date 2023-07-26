import { NextPage } from 'next'
import { useRouter } from 'next/router.js'
import { useState } from 'react'
import { Page } from '../../../components/layout/Page/Page.tsx'
import { GroupSettings } from '../../../components/pages/GroupSettings.tsx'
import { CategoryFilterProvider } from '../../../contexts/CategoryFilter/CategoryFilter.tsx'

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
