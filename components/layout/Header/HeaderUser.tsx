import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useCallback, useState } from 'react'
import { Avatar } from '../../ui-kit/Avatar/Avatar.jsx'
import { Button } from '../../ui-kit/Button/Button.jsx'
import { Card } from '../../ui-kit/Card/Card.jsx'

interface Props {
  className?: string
}

export const HeaderUser = ({ className }: Props) => {
  const session = useSession()

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
        <Button
          disabled={isLoading}
          size="md"
          theme="green"
          onClick={handleSignIn}
        >
          Sign In
        </Button>
      )}

      {session.status === 'authenticated' && (
        <div>
          <button
            className="block rounded-full"
            type="button"
            aria-label="Profile"
            aria-haspopup="true"
            aria-expanded={isOpen ? 'true' : 'false'}
            onClick={handleProfileClick}
          >
            <Avatar
              src={session.data.user.image ?? undefined}
              name={session.data.user.name ?? undefined}
            />
          </button>

          <Card.Menu
            popupClassName="w-72 mt-2"
            isOpen={isOpen}
            position="below-right"
            popupAriaLabel="Profile popup"
            onClose={handlePopupClose}
          >
            <Card.Item
              label={
                <>
                  <div className="truncate text-xl">
                    {session.data.user.name}
                  </div>
                  <div className="truncate text-zinc-600">
                    {session.data.user.email}
                  </div>
                </>
              }
              role="menuitem"
              aria-label={`You are logged in as ${session.data.user.name} with email ${session.data.user.email}`}
            />

            <Card.Divider />

            <Card.Item
              disabled={isLoading}
              prefix={<ArrowRightOnRectangleIcon className="h-6 w-6" />}
              label="Sign Out"
              role="menuitem"
              onClick={handleSignOut}
            />
          </Card.Menu>
        </div>
      )}
    </div>
  )
}
