import { FC, ReactNode } from 'react'
import { Container } from '../../ui-kit/Container/Container.tsx'
import { PageAuth } from './PageAuth.tsx'
import { PageStore } from './PageStore.tsx'

interface Props {
  withStoreValidation?: boolean
  children: ReactNode
}

export const Page: FC<Props> = ({ withStoreValidation = true, children }) => {
  return (
    <div className="min-h-screen pt-[calc(env(safe-area-inset-top)+4.5rem)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] bg-zinc-300">
      <Container className="py-8">
        <PageAuth>
          {withStoreValidation ? <PageStore>{children}</PageStore> : children}
        </PageAuth>
      </Container>
    </div>
  )
}
