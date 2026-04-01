import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'
import { useCallback, useState } from 'react'
import { signIn, signOut, useSession } from '@/auth-client'
import { Avatar } from '@/components/common/Avatar'
import { Button } from '@/components/common/Button'
import { Card } from '@/components/common/Card'

type HeaderUserProps = {
  className?: string
}

export const HeaderUser = ({ className }: HeaderUserProps) => {
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
        await signIn.social({ provider: 'google' })
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

  if (session.isPending) return null

  return (
    <div className={className}>
      {session.data ? (
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
              name={session.data.user.name}
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
                  <div className="truncate text-tertiary-foreground">
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
              prefix={<ArrowRightStartOnRectangleIcon className="h-6 w-6" />}
              label="Sign Out"
              role="menuitem"
              onClick={handleSignOut}
            />
          </Card.Menu>
        </div>
      ) : (
        <Button
          className="bg-green-800 text-white shadow-inner"
          disabled={isLoading}
          size="md"
          onClick={handleSignIn}
        >
          Sign In
        </Button>
      )}
    </div>
  )
}
