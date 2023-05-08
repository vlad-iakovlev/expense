import { NextPage } from 'next'
import { useRouter } from 'next/router.js'
import { useState } from 'react'
import { Page } from '../../components/layout/Page/Page.tsx'
import { Home } from '../../components/pages/Home.tsx'
import { Invite } from '../../components/pages/Invite.tsx'

const InvitePage: NextPage = () => {
  const router = useRouter()
  const [token] = useState(router.query.token)

  if (typeof token !== 'string') {
    return null
  }

  return (
    <Page withStoreValidation={false} unauthenticated={<Home />}>
      <Invite token={token} />
    </Page>
  )
}

export default InvitePage
