import { signIn, signOut, useSession } from 'next-auth/react'
import { FC, useCallback, useRef, useState } from 'react'
import { Avatar } from '../ui-kit/Avatar'
import { Button } from '../ui-kit/Button'
import { Card } from '../ui-kit/Card'

export const HeaderUser: FC = () => {
  const session = useSession()

  const profileButtonRef = useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleProfileClick = useCallback(() => {
    setIsOpen(true)
  }, [])

  const handlePopupClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleSignIn = useCallback(async () => {
    try {
      setIsLoading(true)
      await signIn('google')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleSignOut = useCallback(async () => {
    try {
      setIsOpen(false)
      setIsLoading(true)
      await signOut()
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <div>
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
              src={session.data.user?.image || ''}
              name={session.data.user?.name || ''}
            />
          </button>

          <Card.Popup
            className="mt-2 w-72"
            noMaxWidth
            isOpen={isOpen}
            anchorRef={profileButtonRef}
            position="below-right"
            onClose={handlePopupClose}
          >
            <Card.Title
              title={session.data.user?.name || ''}
              subtitle={session.data.user?.email || ''}
            />

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
