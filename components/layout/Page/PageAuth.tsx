import { useSession } from 'next-auth/react'
import { FC, ReactNode } from 'react'
import { Home } from '../../pages/Home.tsx'
import { Loading } from '../../pages/Loading.tsx'

interface Props {
  children: ReactNode
}

export const PageAuth: FC<Props> = ({ children }) => {
  const session = useSession()

  return (
    <>
      {session.status === 'authenticated' && children}
      {session.status === 'unauthenticated' && <Home />}
      {session.status === 'loading' && <Loading />}
    </>
  )
}
