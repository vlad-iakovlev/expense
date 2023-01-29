import { Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { signIn, signOut, useSession } from 'next-auth/react'
import { FC, Fragment, useCallback, useState } from 'react'
import { Avatar } from '../ui-kit/Avatar'
import { Button } from '../ui-kit/Button'

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
          <div>
            <Menu.Button className="block rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-green-500">
              <Avatar
                src={session.data.user?.image}
                name={session.data.user?.name}
              />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <div className="px-4 py-2 text-sm">
                  <div className="text-gray-900">{session.data.user?.name}</div>
                  <div className="text-gray-500">
                    {session.data.user?.email}
                  </div>
                </div>
              </div>

              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={clsx(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block w-full px-4 py-2 text-sm text-left'
                      )}
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      )}
    </div>
  )
}
