import { FC, ReactNode } from 'react'
import { Fallback } from '../../pages/Fallback.tsx'
import { Container } from '../../ui-kit/Container/Container.tsx'
import { PageAuth } from './PageAuth.tsx'
import { PageStore } from './PageStore.tsx'

interface Props {
  children: ReactNode
  unauthenticated?: ReactNode
}

export const Page: FC<Props> = ({
  children,
  unauthenticated = <Fallback />,
}) => {
  return (
    <div className="min-h-screen pt-[calc(env(safe-area-inset-top)+4.5rem)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] bg-zinc-300">
      <Container className="py-8">
        <PageAuth unauthenticated={unauthenticated}>
          <PageStore>{children}</PageStore>
        </PageAuth>
      </Container>
    </div>
  )
}
