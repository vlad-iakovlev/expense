import { FC, ReactNode } from 'react'
import { Unauthenticated } from '../pages/Unauthenticated/Unauthenticated.tsx'
import { PageWrapperAuth } from './PageWrapperAuth.tsx'
import { PageWrapperStore } from './PageWrapperStore.tsx'

interface Props {
  children: ReactNode
  unauthenticated?: ReactNode
}

export const PageWrapper: FC<Props> = ({
  children,
  unauthenticated = <Unauthenticated />,
}) => {
  return (
    <PageWrapperAuth unauthenticated={unauthenticated}>
      <PageWrapperStore>{children}</PageWrapperStore>
    </PageWrapperAuth>
  )
}
