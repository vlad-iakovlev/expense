import { Menu } from '@headlessui/react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { FC, useCallback } from 'react'
import { Avatar } from '../ui-kit/Avatar'
import { Button } from '../ui-kit/Button'
import { HeaderUser } from './HeaderUser'

export const Header: FC = () => {
  const session = useSession()

  const handleSignIn = useCallback(() => {
    signIn('google')
  }, [])

  const handleSignOut = useCallback(() => {
    signOut()
  }, [])

  console.log(session)

  return (
    <header className="sticky top-0 z-30 bg-green-600">
      <div className="flex items-center justify-between mx-auto max-w-8xl py-4 px-4 sm:px-6 lg:px-8 xl:px-8">
        <Link className="block text-xl font-bold uppercase text-white" href="/">
          Expense
        </Link>
        <div>
          {session.status === 'unauthenticated' && (
            <Button onClick={handleSignIn}>Sign In</Button>
          )}
          {session.status === 'authenticated' && (
            <HeaderUser
              email={session.data.user?.email || ''}
              image={session.data.user?.image || ''}
              name={session.data.user?.name || ''}
              onSignOut={handleSignOut}
            />
          )}
        </div>
      </div>
    </header>
  )
}
