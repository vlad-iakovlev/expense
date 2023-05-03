import { NextPage } from 'next'
import { useRouter } from 'next/router.js'
import { forwardRef, useState } from 'react'
import { Page } from '../../components/layout/Page/Page.tsx'
import { Group } from '../../components/pages/Group.tsx'

const GroupPage = forwardRef<HTMLDivElement, NextPage>(function GroupPage(
  {},
  ref
) {
  const router = useRouter()
  const [groupId] = useState(router.query.groupId)

  if (typeof groupId !== 'string') {
    return null
  }

  return (
    <Page ref={ref}>
      <Group groupId={groupId} />
    </Page>
  )
})

export default GroupPage
