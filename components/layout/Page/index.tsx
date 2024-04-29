import { Container } from '@/components/common/Container.jsx'
import { PageAuth } from './Auth.jsx'
import { PageStore } from './Store.jsx'

interface Props {
  withStoreValidation?: boolean
  children: React.ReactNode
}

export const Page = ({ withStoreValidation = true, children }: Props) => (
  <main className="bg-primary min-h-screen pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] pt-[calc(env(safe-area-inset-top)+4.5rem)]">
    <Container className="py-8">
      <PageAuth>
        {withStoreValidation ? <PageStore>{children}</PageStore> : children}
      </PageAuth>
    </Container>
  </main>
)
