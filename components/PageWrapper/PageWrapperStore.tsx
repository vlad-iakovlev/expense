import { FC, ReactNode } from 'react'
import { useRootStore } from '../../stores/RootStore/RootStore.tsx'
import { PageWrapperLoading } from './PageWrapperLoading.tsx'

interface Props {
  children: ReactNode
}

export const PageWrapperStore: FC<Props> = ({ children }) => {
  const { state } = useRootStore()

  return (
    <>
      {state.isReady && children}
      <PageWrapperLoading isLoading={!state.isReady} />
    </>
  )
}
