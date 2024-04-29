'use client'

import { Page } from '@/components/layout/Page/index.jsx'
import { GroupSettings } from '@/components/pages/GroupSettings.jsx'
import { CategoryFilterProvider } from '@/contexts/CategoryFilter.jsx'

interface GroupSettingsPageProps {
  params: {
    groupId: string
  }
}

export default function GroupSettingsPage({ params }: GroupSettingsPageProps) {
  return (
    <Page>
      <CategoryFilterProvider>
        <GroupSettings groupId={params.groupId} />
      </CategoryFilterProvider>
    </Page>
  )
}
