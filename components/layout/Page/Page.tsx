import { ReactNode, forwardRef } from 'react'
import { Unauthenticated } from '../../pages/Unauthenticated/Unauthenticated.tsx'
import { Container } from '../../ui-kit/Container/Container.tsx'
import { PageAuth } from './PageAuth.tsx'
import { PageStore } from './PageStore.tsx'
import { PageTransition } from './PageTransition.tsx'

interface Props {
  children: ReactNode
  unauthenticated?: ReactNode
}

export const Page = forwardRef<HTMLDivElement, Props>(function Page(
  { children, unauthenticated = <Unauthenticated /> },
  ref
) {
  return (
    <PageTransition
      className="min-h-screen pt-[calc(env(safe-area-inset-top)+72px)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] bg-zinc-300"
      ref={ref}
    >
      <Container className="py-8">
        <PageAuth unauthenticated={unauthenticated}>
          <PageStore>{children}</PageStore>
        </PageAuth>
      </Container>
    </PageTransition>
  )
})
