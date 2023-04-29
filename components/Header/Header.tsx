import { FC } from 'react'
import { Container } from '../ui-kit/Container/Container.tsx'
import { HeaderLogo } from './HeaderLogo.tsx'
import { HeaderSync } from './HeaderSync.tsx'
import { HeaderUser } from './HeaderUser.tsx'

export const Header: FC = () => {
  return (
    <header className="sticky top-0 z-10 bg-green-600">
      <Container className="flex items-center justify-between h-[72px]">
        <HeaderLogo />
        <div className="flex item-center gap-4">
          <HeaderSync />
          <HeaderUser />
        </div>
      </Container>
    </header>
  )
}
