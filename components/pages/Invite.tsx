import { useRouter } from 'next/router.js'
import { useEffect } from 'react'
import { acceptInvite } from '@/api/client/invites.js'
import { ROUTES } from '@/constants/routes.js'
import { Loading } from './Loading.jsx'

interface Props {
  token: string
}

export const Invite = ({ token }: Props) => {
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
