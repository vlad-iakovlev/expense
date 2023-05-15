import { FC } from 'react'
import { Container } from '../../ui-kit/Container/Container.tsx'
import { HeaderLogo } from './HeaderLogo.tsx'
import { HeaderSync } from './HeaderSync.tsx'
import { HeaderUser } from './HeaderUser.tsx'

export const Header: FC = () => {
  return (
    <header className="fixed z-10 top-0 w-full pt-[env(safe-area-inset-top)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] bg-green-600">
      <Container className="flex items-center h-[4.5rem]">
        <HeaderLogo className="flex-1 min-w-0" />
        <div className="flex-none h-[4.5rem] w-6 -ml-6 bg-gradient-to-l from-green-600 pointer-events-none" />
        <HeaderSync className="flex-none mr-4 sm:mr-6" />
        <HeaderUser className="flex-none" />
      </Container>
    </header>
  )
}
