import { useSession } from '@/auth-client'
import { Home } from '@/components/pages/Home'

type PageAuthProps = {
  children: React.ReactNode
}

export const PageAuth = ({ children }: PageAuthProps) => {
  const session = useSession()
  return session.isPending ? null : session.data ? children : <Home />
}
