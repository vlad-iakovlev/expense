import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { acceptInvite } from '@/api/client/invites'
import { Loading } from '@/components/layout/Loading'
import { ROUTES } from '@/constants/routes'

type InviteProps = {
  token: string
}

export const Invite = ({ token }: InviteProps) => {
  const router = useRouter()

  useEffect(() => {
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
