import { usePathname } from 'next/navigation'
import { useSession } from '@/auth-client'
import { ROUTES } from '@/constants/routes'
import { useIsTabVisible } from '@/hooks/useIsTabVisible'

export const useCanLoadState = () => {
  const session = useSession()
  const isTabVisible = useIsTabVisible()
  const pathname = usePathname()
  const isInvitePage = pathname.startsWith(ROUTES.INVITE(''))

  return !!session.data?.user && isTabVisible && !isInvitePage
}
