import { useLocation } from '@tanstack/react-router'
import { useSession } from '@/auth-client'
import { useIsTabVisible } from '@/hooks/useIsTabVisible'

export const useCanLoadState = () => {
  const session = useSession()
  const isTabVisible = useIsTabVisible()
  const location = useLocation()

  const isInvitePage = location.pathname.startsWith('/invites/')

  return !!session.data && isTabVisible && !isInvitePage
}
