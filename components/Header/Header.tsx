import { FC } from 'react'
import { Container } from '../ui-kit/Container/Container.tsx'
import { HeaderLogo } from './HeaderLogo.tsx'
import { HeaderUser } from './HeaderUser.tsx'

export const Header: FC = () => {
  return (
    <header className="sticky top-0 z-10 bg-green-600">
      <Container className="flex items-center justify-between h-[72px]">
        <HeaderLogo />
        <HeaderUser />
      </Container>
    </header>
  )
}
