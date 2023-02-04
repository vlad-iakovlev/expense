import { Transition } from '@headlessui/react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { FC, useCallback, useEffect, useState } from 'react'
import { Avatar } from '../ui-kit/Avatar'
import { Button } from '../ui-kit/Button'
import { Card } from '../ui-kit/Card'

export const HeaderUser: FC = () => {
  const session = useSession()

  const [isShowing, setIsShowing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const show = useCallback(() => setIsShowing(true), [])
  const hide = useCallback(() => setIsShowing(false), [])

  useEffect(() => {
    if (isShowing) {
      setTimeout(() => document.addEventListener('click', hide), 0)
      return () => document.removeEventListener('click', hide)
    }
  }, [hide, isShowing])

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
        <div className="relative">
          <button className="block rounded-full" onClick={show}>
            <Avatar
              src={session.data.user?.image || ''}
              name={session.data.user?.name || ''}
            />
          </button>

          <Transition
            show={isShowing}
            className="absolute z-10 top-0 right-0 w-72 mt-12 origin-top-right"
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Card>
              <Card.Title
                title={session.data.user?.name || ''}
                subtitle={session.data.user?.email || ''}
              />

              <Card.Divider />

              <Card.Button disabled={isLoading} onClick={handleSignOut}>
                Sign Out
              </Card.Button>
            </Card>
          </Transition>
        </div>
      )}
    </div>
  )
}
