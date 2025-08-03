import { useRouter } from 'next/router'
import React from 'react'
import { acceptInvite } from '@/api/client/invites'
import { Loading } from '@/components/layout/Loading'
import { ROUTES } from '@/constants/routes'

interface InviteProps {
  token: string
}

export const Invite = ({ token }: InviteProps) => {
  const router = useRouter()

  React.useEffect(() => {
    void (async () => {
      try {
        await acceptInvite({ token })
      } finally {
        await router.push(ROUTES.DASHBOARD)
      }
    })()
  }, [router, token])

  return <Loading />
}
