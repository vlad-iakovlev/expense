import { useRouter } from 'next/navigation.js'
import React from 'react'
import { acceptInvite } from '@/api/client/invites.js'
import { Loading } from '@/components/layout/Loading.jsx'
import { ROUTES } from '@/constants/routes.js'

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
        router.push(ROUTES.DASHBOARD)
      }
    })()
  }, [router, token])

  return <Loading />
}
