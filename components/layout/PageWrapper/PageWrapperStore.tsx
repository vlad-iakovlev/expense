import { FC, ReactNode } from 'react'
import { useRootStore } from '../../../stores/RootStore/RootStore.tsx'
import { Loading } from '../../pages/Loading/Loading.tsx'

interface Props {
  children: ReactNode
}

export const PageWrapperStore: FC<Props> = ({ children }) => {
  const { state } = useRootStore()

  return (
    <>
      {!!state.syncedAt && children}
      {!state.syncedAt && <Loading />}
    </>
  )
}
