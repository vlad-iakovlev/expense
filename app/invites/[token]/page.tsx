'use client'

import { Page } from '@/components/layout/Page/index.jsx'
import { Invite } from '@/components/pages/Invite.jsx'

interface InvitePageProps {
  params: {
    token: string
  }
}

export default function InvitePage({ params }: InvitePageProps) {
  return (
    <Page withStoreValidation={false}>
      <Invite token={params.token} />
    </Page>
  )
}
