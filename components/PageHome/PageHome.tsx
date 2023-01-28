import { useSession } from 'next-auth/react'
import { FC } from 'react'
import { Container } from '../ui-kit/Container'

export const PageHome: FC = () => {
  const session = useSession()

  return (
    <Container className="py-6">
      {session.status === 'loading' && <div>Loading</div>}
      {session.status === 'authenticated' && <div>Authenticated</div>}
      {session.status === 'unauthenticated' && <div>Unauthenticated</div>}
    </Container>
  )
}
