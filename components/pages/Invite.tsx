import { useRouter } from 'next/router.js'
import { useEffect } from 'react'
import { acceptInvite } from '../../api/client/invites.ts'
import { ROUTES } from '../../constants/routes.ts'
import { Loading } from './Loading.tsx'

interface Props {
  token: string
}

export const Invite: React.FC<Props> = ({ token }) => {
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
