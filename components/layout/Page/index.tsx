import { Container } from '@/components/common/Container'
import { PageAuth } from './Auth'
import { PageStore } from './Store'

type PageProps = {
  withStoreValidation?: boolean
  children: React.ReactNode
}

export const Page = ({ withStoreValidation = true, children }: PageProps) => (
  <main className="min-h-screen bg-primary-background pt-[calc(env(safe-area-inset-top)+4.5rem)] pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)]">
    <Container className="py-8">
      <PageAuth>
        {withStoreValidation ? <PageStore>{children}</PageStore> : children}
      </PageAuth>
    </Container>
  </main>
)
