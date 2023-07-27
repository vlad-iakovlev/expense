import { NextPage } from 'next'
import { useRouter } from 'next/router.js'
import { useState } from 'react'
import { Page } from '../../../components/layout/Page/Page.tsx'
import { Group } from '../../../components/pages/Group.tsx'
import { CategoryFilterProvider } from '../../../contexts/CategoryFilter/CategoryFilter.tsx'

const GroupPage: NextPage = () => {
  const router = useRouter()
  const [groupId] = useState(router.query.groupId)

  if (typeof groupId !== 'string') {
    return null
  }

  return (
    <Page>
      <CategoryFilterProvider>
        <Group groupId={groupId} />
      </CategoryFilterProvider>
    </Page>
  )
}

export default GroupPage