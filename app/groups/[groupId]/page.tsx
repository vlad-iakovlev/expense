'use client'

import { Page } from '@/components/layout/Page/index.jsx'
import { Group } from '@/components/pages/Group.jsx'
import { CategoryFilterProvider } from '@/contexts/CategoryFilter.jsx'

interface GroupPageProps {
  params: {
    groupId: string
  }
}

export default function GroupPage({ params }: GroupPageProps) {
  return (
    <Page>
      <CategoryFilterProvider>
        <Group groupId={params.groupId} />
      </CategoryFilterProvider>
    </Page>
  )
}
