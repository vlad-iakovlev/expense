import { useSession } from 'next-auth/react'
import { FC } from 'react'

export const PageHome: FC = () => {
  const session = useSession()

  return (
    <>
      {session.status === 'loading' && <div>Loading</div>}
      {session.status === 'authenticated' && <div>Authenticated</div>}
      {session.status === 'unauthenticated' && <div>Unauthenticated</div>}
    </>
  )
}
