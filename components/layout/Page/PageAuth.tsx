import { useSession } from 'next-auth/react'
import { Home } from '@/components/pages/Home.jsx'
import { Loading } from '@/components/pages/Loading.jsx'

interface Props {
  children: React.ReactNode
}

export const PageAuth = ({ children }: Props) => {
  const session = useSession()

  return (
    <>
      {session.status === 'authenticated' && children}
      {session.status === 'unauthenticated' && <Home />}
      {session.status === 'loading' && <Loading />}
    </>
  )
}
