import { NextPage } from 'next'
import { useRouter } from 'next/router.js'
import React from 'react'
import { Page } from '@/components/layout/Page/index.jsx'
import { Invite } from '@/components/pages/Invite.jsx'

const InvitePage: NextPage = () => {
  const router = useRouter()
  const [token] = React.useState(router.query.token)

  if (typeof token !== 'string') {
    return null
  }

  return (
    <Page withStoreValidation={false}>
      <Invite token={token} />
    </Page>
  )
}

export default InvitePage
