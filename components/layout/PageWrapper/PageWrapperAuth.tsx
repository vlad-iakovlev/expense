import { useSession } from 'next-auth/react'
import { FC, ReactNode } from 'react'
import { Loading } from '../../pages/Loading/Loading.tsx'

interface Props {
  children: ReactNode
  unauthenticated: ReactNode
}

export const PageWrapperAuth: FC<Props> = ({ children, unauthenticated }) => {
  const session = useSession()

  return (
    <>
      {session.status === 'authenticated' && children}
      {session.status === 'unauthenticated' && unauthenticated}
      {session.status === 'loading' && <Loading />}
    </>
  )
}
