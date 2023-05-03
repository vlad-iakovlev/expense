import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router.js'
import { FC, useCallback, useRef, useState } from 'react'
import { ROUTES } from '../../constants/routes.ts'
import { Avatar } from '../ui-kit/Avatar/Avatar.tsx'
import { Button } from '../ui-kit/Button/Button.tsx'
import { Card } from '../ui-kit/Card/Card.tsx'

interface Props {
  className?: string
}

export const HeaderUser: FC<Props> = ({ className }) => {
  const session = useSession()
  const router = useRouter()

  const profileButtonRef = useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleProfileClick = useCallback(() => {
    setIsOpen(true)
  }, [])

  const handlePopupClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleSignIn = useCallback(() => {
    void (async () => {
      try {
        setIsLoading(true)
        await signIn('google')
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  const handleSignOut = useCallback(() => {
    void (async () => {
      try {
        setIsOpen(false)
        setIsLoading(true)
        await router.push(router.asPath, ROUTES.DASHBOARD)
        await signOut()
      } finally {
        setIsLoading(false)
      }
    })()
  }, [router])

  return (
    <div className={className}>
      {session.status === 'unauthenticated' && (
        <Button disabled={isLoading} onClick={handleSignIn}>
          Sign In
        </Button>
      )}

      {session.status === 'authenticated' && (
        <>
          <button
            ref={profileButtonRef}
            className="block rounded-full"
            type="button"
            onClick={handleProfileClick}
          >
            <Avatar
              src={session.data.user.image ?? undefined}
              name={session.data.user.name ?? undefined}
            />
          </button>

          <Card.Popup
            className="mt-2 w-72"
            isOpen={isOpen}
            anchorRef={profileButtonRef}
            position="below-right"
            onClose={handlePopupClose}
          >
            <Card.Text>
              <p className="text-xl truncate">{session.data.user.name}</p>
              <p className="text-zinc-600 truncate">
                {session.data.user.email}
              </p>
            </Card.Text>

            <Card.Divider />

            <Card.Button disabled={isLoading} onClick={handleSignOut}>
              Sign Out
            </Card.Button>
          </Card.Popup>
        </>
      )}
    </div>
  )
}
