import { NextPage } from 'next'
import { useRouter } from 'next/router.js'
import { forwardRef, useState } from 'react'
import { PageWrapper } from '../../components/layout/PageWrapper/PageWrapper.tsx'
import { Group } from '../../components/pages/Group/Group.tsx'

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
    <PageWrapper ref={ref}>
      <Group groupId={groupId} />
    </PageWrapper>
  )
})

export default GroupPage
