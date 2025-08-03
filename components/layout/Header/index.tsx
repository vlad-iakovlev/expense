import { Container } from '@/components/common/Container.jsx'
import { HeaderLogo } from './Logo.jsx'
import { HeaderSync } from './Sync.jsx'
import { HeaderUser } from './User.jsx'

export const Header = () => (
  <header
    className="fixed top-0 z-10 w-full bg-green-700 pt-[env(safe-area-inset-top)] pr-[env(safe-area-inset-right)] pl-[env(safe-area-inset-left)]"
    aria-label="App header"
  >
    <Container className="flex h-18 items-center">
      <HeaderLogo className="min-w-0 flex-1" />
      <div
        className="pointer-events-none -ml-6 h-18 w-6 flex-none bg-linear-to-l from-green-700"
        aria-hidden="true"
      />
      <HeaderSync className="mr-4 flex-none sm:mr-6" />
      <HeaderUser className="flex-none" />
    </Container>
  </header>
)
