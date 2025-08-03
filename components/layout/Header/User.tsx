import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
import { Avatar } from '@/components/common/Avatar.jsx'
import { Button } from '@/components/common/Button.jsx'
import { Card } from '@/components/common/Card/index.jsx'

interface HeaderUserProps {
  className?: string
}

export const HeaderUser = ({ className }: HeaderUserProps) => {
  const session = useSession()

  const [isOpen, setIsOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleProfileClick = React.useCallback(() => {
    setIsOpen(true)
  }, [])

  const handlePopupClose = React.useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleSignIn = React.useCallback(() => {
    void (async () => {
      try {
        setIsLoading(true)
        await signIn('google')
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  const handleSignOut = React.useCallback(() => {
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
          className="bg-green-800 text-white shadow-inner"
          disabled={isLoading}
          size="md"
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
              src={session.data.user?.image ?? undefined}
              name={session.data.user?.name ?? undefined}
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
                    {session.data.user?.name}
                  </div>
                  <div className="truncate text-tertiary-foreground">
                    {session.data.user?.email}
                  </div>
                </>
              }
              role="menuitem"
              aria-label={`You are logged in as ${session.data.user?.name} with email ${session.data.user?.email}`}
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
      )}
    </div>
  )
}
