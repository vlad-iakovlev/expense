import { useSession } from '@/auth-client'
import { Home } from '@/layout/Home'

type PageAuthGuardProps = {
  children: React.ReactNode
}

export const PageAuthGuard = ({ children }: PageAuthGuardProps) => {
  const session = useSession()
  return session.isPending ? null : session.data ? children : <Home />
}
