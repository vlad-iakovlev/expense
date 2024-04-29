import { useRootStore } from '@/contexts/RootStore/index.jsx'
import { Loading } from '../Loading.jsx'

interface Props {
  children: React.ReactNode
}

export const PageStore = ({ children }: Props) => {
  const { state } = useRootStore()

  return (
    <>
      {!!state.syncedAt && children}
      {!state.syncedAt && <Loading />}
    </>
  )
}
