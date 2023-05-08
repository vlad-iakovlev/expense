import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router.js'
import { ROUTES } from '../../../../constants/routes.ts'
import { useIsOnline } from '../../../../hooks/useIsOnline.ts'
import { useIsTabVisible } from '../../../../hooks/useIsTabVisible.ts'

export const useCanLoadState = () => {
  const session = useSession()
  const isAuthenticated = session.status === 'authenticated'

  const isOnline = useIsOnline()

  const isTabVisible = useIsTabVisible()

  const router = useRouter()
  const isInvitePage = router.asPath.startsWith(ROUTES.INVITE(''))

  return isAuthenticated && isOnline && isTabVisible && !isInvitePage
}
