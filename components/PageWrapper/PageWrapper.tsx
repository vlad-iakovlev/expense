import { ReactNode, forwardRef } from 'react'
import { Unauthenticated } from '../pages/Unauthenticated/Unauthenticated.tsx'
import { Container } from '../ui-kit/Container/Container.tsx'
import { Scrollable } from '../ui-kit/Scrollable/Scrollable.tsx'
import { PageWrapperAuth } from './PageWrapperAuth.tsx'
import { PageWrapperStore } from './PageWrapperStore.tsx'
import { PageWrapperTransition } from './PageWrapperTransition.tsx'

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
      <PageWrapperTransition
        className="h-full pt-[calc(env(safe-area-inset-top)+72px)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] bg-zinc-300"
        ref={ref}
      >
        <Scrollable className="h-full" contentClassName="h-full">
          <Container className="py-6">
            <PageWrapperAuth unauthenticated={unauthenticated}>
              <PageWrapperStore>{children}</PageWrapperStore>
            </PageWrapperAuth>
          </Container>
        </Scrollable>
      </PageWrapperTransition>
    )
  }
)
