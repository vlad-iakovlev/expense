import { useSession } from 'next-auth/react'
import { Home } from '@/components/pages/Home'
import { Loading } from '../Loading'

interface PageAuthProps {
  children: React.ReactNode
}

export const PageAuth = ({ children }: PageAuthProps) => {
  const session = useSession()

  return (
    <>
      {session.status === 'authenticated' && children}
      {session.status === 'unauthenticated' && <Home />}
      {session.status === 'loading' && <Loading />}
    </>
  )
}
