import { ReactNode, forwardRef } from 'react'
import { PageTransition } from '../PageTransition/PageTransition.tsx'
import { Unauthenticated } from '../pages/Unauthenticated/Unauthenticated.tsx'
import { Container } from '../ui-kit/Container/Container.tsx'
import { PageWrapperAuth } from './PageWrapperAuth.tsx'
import { PageWrapperStore } from './PageWrapperStore.tsx'

interface Props {
  children: ReactNode
  unauthenticated?: ReactNode
}

export const PageWrapper = forwardRef<HTMLDivElement, Props>(
  function PageWrapper(
    { children, unauthenticated = <Unauthenticated /> },
    ref
  ) {
    return (
      <PageTransition className="main-content bg-zinc-300" ref={ref}>
        <Container className="py-6">
          <PageWrapperAuth unauthenticated={unauthenticated}>
            <PageWrapperStore>{children}</PageWrapperStore>
          </PageWrapperAuth>
        </Container>
      </PageTransition>
    )
  }
)
