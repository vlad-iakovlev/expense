import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation.js'
import { ROUTES } from '@/constants/routes.js'
import { useIsTabVisible } from '@/hooks/useIsTabVisible.js'

export const useCanLoadState = () => {
  const session = useSession()
  const isTabVisible = useIsTabVisible()
  const pathname = usePathname()
  const isInvitePage = pathname.startsWith(ROUTES.INVITE(''))

  return session.status === 'authenticated' && isTabVisible && !isInvitePage
}
