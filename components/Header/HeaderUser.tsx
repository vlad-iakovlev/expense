import { Menu, Transition } from '@headlessui/react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { FC, Fragment, useCallback, useState } from 'react'
import { Avatar } from '../ui-kit/Avatar'
import { Button } from '../ui-kit/Button'
import { Card } from '../ui-kit/Card'

export const HeaderUser: FC = () => {
  const session = useSession()
  const [isLoading, setIsLoading] = useState(false)

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
        <Menu as="div" className="relative">
          <Menu.Button className="block rounded-full">
            <Avatar
              src={session.data.user?.image || ''}
              name={session.data.user?.name || ''}
            />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-72 origin-top-right focus:outline-none">
              <Card>
                <Card.Title
                  title={session.data.user?.name || ''}
                  subtitle={session.data.user?.email || ''}
                />

                <Card.Divider />

                <Menu.Item
                  as={Card.Button}
                  disabled={isLoading}
                  onClick={handleSignOut}
                >
                  Sign Out
                </Menu.Item>
              </Card>
            </Menu.Items>
          </Transition>
        </Menu>
      )}
    </div>
  )
}
