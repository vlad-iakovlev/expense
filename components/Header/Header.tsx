import { FC } from 'react'
import { Container } from '../ui-kit/Container'
import { HeaderLogo } from './HeaderLogo'
import { HeaderUser } from './HeaderUser'

export const Header: FC = () => {
  return (
    <header className="sticky top-0 z-30 bg-green-600">
      <Container className="flex items-center justify-between h-[72px]">
        <HeaderLogo />
        <HeaderUser />
      </Container>
    </header>
  )
}
