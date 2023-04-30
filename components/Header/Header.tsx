import { FC } from 'react'
import { Container } from '../ui-kit/Container/Container.tsx'
import { HeaderLogo } from './HeaderLogo.tsx'
import { HeaderSync } from './HeaderSync.tsx'
import { HeaderUser } from './HeaderUser.tsx'

export const Header: FC = () => {
  return (
    <header className="sticky top-0 z-10 bg-green-600">
      <Container className="flex items-center h-[72px] gap-4 sm:gap-6">
        <HeaderLogo />
        <div className="w-6 h-[72px] -ml-6 -mr-4 sm:-mr-6 bg-gradient-to-l from-green-600 pointer-events-none" />
        <HeaderSync />
        <HeaderUser />
      </Container>
    </header>
  )
}
