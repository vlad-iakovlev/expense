import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { signIn, signOut, useSession } from 'next-auth/react'
import { FC, useCallback, useRef, useState } from 'react'
import { Avatar } from '../../ui-kit/Avatar/Avatar.tsx'
import { Button } from '../../ui-kit/Button/Button.tsx'
import { Card } from '../../ui-kit/Card/Card.tsx'

interface Props {
  className?: string
}

export const HeaderUser: FC<Props> = ({ className }) => {
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
        await signOut()
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

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
            <Card.Text
              label={
                <>
                  <p className="text-xl truncate">{session.data.user.name}</p>
                  <p className="text-zinc-600 truncate">
                    {session.data.user.email}
                  </p>
                </>
              }
            />

            <Card.Divider />

            <Card.Button
              disabled={isLoading}
              prefix={<ArrowRightOnRectangleIcon className="w-6 h-6" />}
              label="Sign Out"
              onClick={handleSignOut}
            />
          </Card.Popup>
        </>
      )}
    </div>
  )
}
