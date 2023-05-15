import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router.js'
import { ROUTES } from '../../../../constants/routes.ts'
import { useIsTabVisible } from '../../../../hooks/useIsTabVisible.ts'

export const useCanLoadState = () => {
  const session = useSession()
  const isTabVisible = useIsTabVisible()
  const router = useRouter()
  const isInvitePage = router.asPath.startsWith(ROUTES.INVITE(''))

  return session.status === 'authenticated' && isTabVisible && !isInvitePage
}
