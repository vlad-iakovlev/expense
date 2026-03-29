'use client'

import { useRouter } from 'next/navigation'
import { use } from 'react'
import { useEffect } from 'react'
import { acceptInvite } from '@/api/client/invites'
import { Page } from '@/components/layout/Page'
import { ROUTES } from '@/constants/routes'

type InvitePageProps = {
  params: Promise<{
    token: string
  }>
}

const InvitePage = ({ params }: InvitePageProps) => {
  const { token } = use(params)
  const router = useRouter()

  useEffect(() => {
    void (async () => {
      try {
        await acceptInvite({ token })
      } finally {
        router.push(ROUTES.DASHBOARD)
      }
    })()
  }, [router, token])

  return null
}

export default function WrappedInvitePage(props: InvitePageProps) {
  return (
    <Page>
      <InvitePage {...props} />
    </Page>
  )
}
