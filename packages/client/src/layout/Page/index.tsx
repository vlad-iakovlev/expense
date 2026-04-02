import { Container } from '@/components/Container'
import { PageAuthGuard } from './AuthGuard'
import { PageStoreGuard } from './StoreGuard'

type PageProps = {
  children?: React.ReactNode
}

export const Page = ({ children }: PageProps) => (
  <main className="min-h-screen bg-primary-background pt-[calc(env(safe-area-inset-top)+4.5rem)] pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)]">
    <Container className="py-8">{children}</Container>
  </main>
)

Page.AuthGuard = PageAuthGuard
Page.StoreGuard = PageStoreGuard
