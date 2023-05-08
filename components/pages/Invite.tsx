import { FC, useEffect, useState } from 'react'
import { acceptInvite } from '../../api/client/invites.ts'
import { Loading } from './Loading.tsx'

interface Props {
  token: string
}

export const Invite: FC<Props> = ({ token }) => {
  const [, setState] = useState()

  useEffect(() => {
    void (async () => {
      try {
        await acceptInvite({ token })
        window.localStorage.clear()
        window.location.href = '/'
      } catch (error) {
        setState(() => {
          throw error
        })
      }
    })()
  }, [token])

  return <Loading />
}
