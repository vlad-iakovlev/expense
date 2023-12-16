import { NextPage } from 'next'
import { useRouter } from 'next/router.js'
import { useState } from 'react'
import { Page } from '../../../components/layout/Page/Page.jsx'
import { Group } from '../../../components/pages/Group.jsx'
import { CategoryFilterProvider } from '../../../contexts/CategoryFilter/CategoryFilter.jsx'

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
